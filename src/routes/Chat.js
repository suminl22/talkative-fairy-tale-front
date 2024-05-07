import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../components/ChatBubble';
import { Link } from 'react-router-dom';

function Chat() {
    const [isComposing, setIsComposing] = useState(false);
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef(null);
    const isAtBottomRef = useRef(true); // 맨 아래로 스크롤되었는지 여부를 추적하는 ref

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
            // 사용자의 메시지를 추가합니다.
            const userMessage = { text: messageText, isUser: true };
            setMessages(prevMessages => [...prevMessages, userMessage]);
    
            simulateComputerResponse(messageText);
            
            // 입력창을 초기화합니다.
            input.value = '';
        }
    };
    
    const simulateComputerResponse = (inputText) => {
        // 가짜 응답을 생성합니다.
        const length = inputText.length;
        const simulatedText = '가짜 응답 '.repeat(Math.ceil(length / 6)).trim();
    
        // 1초 동안 '···'을 표시합니다.
        const typingMessage = { text: '···', isUser: false };
        setMessages(prevMessages => [...prevMessages, typingMessage]);
    
        // 1초 후에 가짜 응답을 표시합니다.
        setTimeout(() => {
            // 가짜 응답을 생성하여 추가합니다.
            const computerMessage = { text: simulatedText, isUser: false };
            setMessages(prevMessages => [...prevMessages.filter(msg => msg.text !== '···'), computerMessage]);
        }, 1000);
    };
    

    const handleInputChange = () => {
        // 입력창의 값이 변경될 때마다 스크롤을 가장 아래로 내립니다.
        const messagesDiv = messagesRef.current;
        if (messagesDiv) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    };

    return (
        <div id="container" style={{ backgroundColor: '#FFD700', display: 'flex', borderRadius: '5px' }}>
            <div id="sidebar" style={{ height: '50px', width: '200px', backgroundColor: '#FFD700', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', borderRadius: '5px' }}>
                <Link to="/home" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '16', position: 'fix'}}>
                    홈으로 돌아가기
                </Link>
                {/* 로그 부분은 여기에 추가 */}
            </div>
            <div id="chat-area" ref={messagesRef} style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <ChatBubble key={index} message={message.text} isUser={message.isUser} />
                ))}
            </div>
            <div id="input-area" style={{ display: 'flex', width: '90%', height: '50px', position: 'fixed', bottom: 20 }}>
            <div style={{ width: '20%', height: '80%' }}></div> {/* 공간 추가 */}
                <textarea
                    id="message-input"
                    placeholder="다음 이야기를 입력해줘"
                    onKeyDown={handleKeyPress}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    onChange={handleInputChange}
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
