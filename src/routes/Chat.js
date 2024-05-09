
import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../components/ChatBubble';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../config';
import SystemPrompting1 from '../components/S1';
import SystemPrompting2 from '../components/S2';

function Chat() {
    const [isComposing, setIsComposing] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 중인지 여부를 나타내는 상태 추가
    const messagesRef = useRef(null);
    const isAtBottomRef = useRef(true); // 맨 아래로 스크롤되었는지 여부를 추적하는 ref

    useEffect(() => {
        const fetchFirstSentence = async () => {
            try {
                const firstSentence = await getFirstSentence();
                const systemMessage = { role: "assistant", content: firstSentence };
                setMessages(prevMessages => [...prevMessages, systemMessage]);
                setIsLoading(false); // 응답을 받은 후 로딩 중 상태를 false로 변경
            } catch (error) {
                console.error('Error fetching first sentence:', error);
            }
        };
    
        fetchFirstSentence();
    }, []);
    

    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesRef.current && isAtBottomRef.current) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
            }
        };

        scrollToBottom();
    }, [messages]);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;
        isAtBottomRef.current = scrollTop + clientHeight >= scrollHeight;
    };

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.addEventListener('scroll', handleScroll);
            return () => {
                if (messagesRef.current) {
                    messagesRef.current.removeEventListener('scroll', handleScroll);
                }
            };
        }
    }, []);

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                if (!isComposing) {
                    event.preventDefault();
                    insertAtCaret('\n');
                }
            } else {
                if (!isComposing) {
                    event.preventDefault();
                    sendMessage();
                }
            }
        }
    };

    const insertAtCaret = (text) => {
        const txtarea = document.getElementById('message-input');
        const scrollPos = txtarea.scrollTop;
        let caretPos = txtarea.selectionStart;

        const front = txtarea.value.substring(0, caretPos);
        const back = txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
        txtarea.value = front + text + back;
        caretPos = caretPos + text.length;
        txtarea.selectionStart = caretPos;
        txtarea.selectionEnd = caretPos;
        txtarea.focus();
        txtarea.scrollTop = scrollPos;
    };

    const sendMessage = () => {

        const input = document.getElementById('message-input');
        const messageText = input.value.trim();
        if (messageText !== '') {
            // 이전 대화의 메시지와 사용자가 입력한 내용을 함께 전달합니다.
            const allMessages = messages.map(message => ({
                content: message.content,
                role: message.role
            }));
            // 사용자의 메시지를 추가합니다.
            const userMessage = { content: messageText, role: "user" };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            // 가짜 응답을 추가합니다.
            fetchGptAPITokenAndCommunicate(messageText, allMessages); // 모든 메시지 전달

            input.value = '';
        }
    };
    
    const getFirstSentence = async () => {
        try {
            // Fetch the GPT API token
            const tokenResponse = await axios.get(`${SERVER_URL}/chat-gpt/token`);
            const gptAPIToken = tokenResponse.data;
    
            // Prepare request data for GPT API with system prompt
            const requestData = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: SystemPrompting1,
                    }
                ],
                temperature: 1,
                max_tokens: 4096,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            };
    
            // Send request to GPT API
            const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${gptAPIToken}`
                }
            });
    
            // Extract and return the completed message from the response
            const completedMessage = response.data.choices[0].message.content;
            return completedMessage;
        } catch (error) {
            console.error('Error fetching GPT API token or communicating with GPT API:', error);
            // Handle error gracefully
            return null;
        }
    };

    const fetchGptAPITokenAndCommunicate = (inputText, allMessages) => {
        setIsLoading(true); // API 호출 전에 로딩 상태를 true로 설정합니다.
    
        // 추가: 시스템 프롬프팅 메시지를 messages 배열에 추가합니다.
        allMessages.unshift({
            role: "system",
            content: SystemPrompting2,
        });
    
        // 이전 대화에서 사용자와 시스템이 교환한 모든 메시지를 JSON 형식으로 변환하여 messages 배열에 추가합니다.
        const messages = allMessages.map(message => ({
            role: message.role,
            content: message.content
        }));
    
        // 사용자의 입력 메시지를 JSON 형식으로 추가합니다.
        messages.push({
            role: "user",
            content: inputText
        });
    
        // Make a POST request to fetch the GPT API token from the server
        axios.get(`${SERVER_URL}/chat-gpt/token`, { inputText })
            .then(response => {
                const data = response.data;
                // Assuming the token is in the 'token' field of the response data
                
                const gptAPIToken = data;
                // Now you can use the token for further API requests
    
                // Communicate with GPT API using the fetched token
                const requestData = {
                    model: "gpt-3.5-turbo",
                    messages: messages, // 변환된 메시지 배열을 전달합니다.
                    temperature: 1,
                    max_tokens: 4096,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                };
    
                // Use the GPT API token to fetch the response
                return axios.post('https://api.openai.com/v1/chat/completions', requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${gptAPIToken}` // Include the token in the request headers
                    }
                });
            })
            .then(response => {
                const data = response.data.choices[0].message.content;
                // Assuming the response contains the completed chat message
                const completedMessage = data;
                // Display the completed message in the chat bubble
                const computerMessage = { content: completedMessage, role: "assistant" };
                setMessages(prevMessages => [...prevMessages, computerMessage]);
            })
            .catch(error => {
                console.error('Error fetching GPT API token or communicating with GPT API:', error);
                // Handle error gracefully
            })
            .finally(() => {
                setIsLoading(false); // API 요청 완료 후에 로딩 상태를 false로 설정합니다.
            });
    };
    
    
    const handleInputChange = (event) => {
        // Handle input change logic here if needed
    };

    return (
        <div id="container" style={{ backgroundColor: '#eff3f7', display: 'flex', borderRadius: '5px' }}>
            <div id="sidebar" style={{ height: 'calc(100vh - 100px)', width: '15%', backgroundColor: '#FFD700', padding: '20px', display: 'flex', justifyContent: 'center', marginRight: '10px', borderRadius: '10px' }}>
                <Link to="/home" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '16', position: 'fix'}}>
                    돌아가기
                </Link>
                {/* 로그 부분은 여기에 추가 */}
            </div>
            <div id="chat-area" ref={messagesRef} style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <ChatBubble key={index} message={message.content} isUser={message.role === "user"} />
                ))}
                {/* 로딩 중인 경우 '...' 표시 */}
                {isLoading && <ChatBubble key="loading" message="문장을 만들고 있어용..." isUser={false} />}
            </div>
            <div id="input-area" style={{ display: 'flex', width: '90%', height: '50px', position: 'fixed', bottom: 20 }}>
            <div style={{ width: '20%', height: '80%' }}></div> {/* 공간 추가 */}
                <textarea
                    id="message-input"
                    placeholder="다음 이야기를 입력해줘"
                    onKeyDown={handleKeyPress}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    onChange={handleInputChange} /* handleInputChange 함수를 연결 */
                    style={{ 
                        width: 'calc(100% - 120px)',
                        height: '100%',
                        marginBottom: 20,
                        border: 'none',
                        outline: 'none',
                        borderRadius: '10px', // 테두리를 둥글게 만듭니다.
                        paddingRight: '10px' // 오른쪽 여백을 추가하여 텍스트와 테두리 사이의 간격을 조정합니다.
                    }} // 입력창의 높이를 현재 크기의 80%로 설정
                ></textarea>
                
                <div style={{ width: '20px', height: '80%' }}></div> {/* 공간 추가 */}
                <button onClick={sendMessage} style={{ 
                        width: '100px',
                        height: '100%', // 입력 창과 높이를 동일하게 설정합니다.
                        marginLeft: '10px',
                        backgroundColor: '#FFD700',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px', // 테두리를 둥글게 만듭니다.
                        color: 'black',
                        fontWeight: 'bold', // 입력 텍스트를 굵게 만듭니다.
                        fontSize: '16px', // 폰트 크기를 조정합니다.
                    }}>입력</button>
            </div>
        </div>
    );
}

export default Chat;