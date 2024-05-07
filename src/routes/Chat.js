import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../components/ChatBubble';
import { Link, useNavigate } from 'react-router-dom';

function Chat() {
    const [isComposing, setIsComposing] = useState(false);
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef(null);
    const isAtBottomRef = useRef(true); // 맨 아래로 스크롤되었는지 여부를 추적하는 ref
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;
            isAtBottomRef.current = scrollTop + clientHeight >= scrollHeight;
        };

        if (messagesRef.current) {
            messagesRef.current.addEventListener('scroll', handleScroll);
            return () => {
                messagesRef.current.removeEventListener('scroll', handleScroll);
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
            if (!event.shiftKey && !isComposing) {
                event.preventDefault();
                sendMessage();
            }
        }
    };

    const sendMessage = () => {
        const input = document.getElementById('message-input');
        const messageText = input.value.trim();
        if (messageText !== '') {
            // 사용자의 메시지를 추가합니다.
            const userMessage = { text: messageText, isUser: true };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            // 가짜 응답을 추가합니다.
            simulateComputerResponse(messageText);

            input.value = '';
        }
    };

    const simulateComputerResponse = (inputText) => {
        const length = inputText.length;
        const simulatedText = '가짜 응답 '.repeat(Math.ceil(length / 6)).trim();

        // 가짜 응답을 생성하여 추가합니다.
        const computerMessage = { text: simulatedText, isUser: false };
        setMessages(prevMessages => [...prevMessages, computerMessage]);
    };

    const handleInputChange = () => {
        // 입력창의 값이 변경될 때마다 스크롤을 가장 아래로 내립니다.
        const messagesDiv = messagesRef.current;
        if (messagesDiv) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    };

    const handleGoBack = () => {
        navigate('/home'); // 홈으로 이동
    };

    return (
        <div id="container" style={{ backgroundColor: '#FFD700', display: 'flex' }}>
            <div id="sidebar" style={{ width: '200px', backgroundColor: '#FFD700', padding: '20px' }}>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <button className="nav-button" style={{ marginBottom: '20px' }}>홈</button>
                </Link>
                {/* 로그 부분은 여기에 추가 */}
            </div>
            <div id="content" style={{ flex: '1', padding: '20px' }}>
                <div id="chat-area" ref={messagesRef} style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                    {messages.map((message, index) => (
                        <ChatBubble key={index} message={message.text} isUser={message.isUser} />
                    ))}
                </div>
                <div id="input-area" style={{ display: 'flex', width: '100%', position: 'fixed', bottom: 0 }}>
                    <textarea
                        id="message-input"
                        placeholder="다음 이야기를 입력해줘"
                        onKeyDown={handleKeyPress}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                        onChange={handleInputChange}
                        style={{ width: 'calc(100% - 120px)', height: '80%', marginBottom: 20, border: 'none', outline: 'none' }} // 입력창의 높이를 현재 크기의 80%로 설정
                    ></textarea>
                    <button onClick={sendMessage} style={{ width: '100px', height: '40px', marginLeft: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>입력</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
