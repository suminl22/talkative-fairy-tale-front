import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../components/ChatBubble';

function Chat() {
    const [isComposing, setIsComposing] = useState(false);
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const messages = document.querySelectorAll('.message');
            messages.forEach(msg => {
                if (isElementInViewport(msg)) {
                    msg.classList.remove('fading-out');
                } else {
                    msg.classList.add('fading-out');
                }
            });
        };
        
        const messagesRefCopy = messagesRef.current;
        messagesRefCopy.addEventListener('scroll', handleScroll);
        return () => {
            messagesRefCopy.removeEventListener('scroll', handleScroll);
        };
    }, []); // 빈 배열을 전달하여 최초 렌더링 시에만 실행

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
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.bottom > 0 &&
            rect.top < (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    return (
        <div id="container" style={{ backgroundColor: '#FFD700' }}>
            <div id="sidebar" style={{ height: '50vh', overflowY: 'auto' }}>
                <button className="nav-button">홈</button>
                <button className="nav-button">설정</button>
            </div>
            <div id="chat-area" ref={messagesRef} style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <ChatBubble key={index} message={message.text} isUser={message.isUser} />
                ))}
            </div>
            <div id="input-area" style={{ display: 'flex', width: 'calc(100% - 200px)', position: 'fixed', bottom: 0 }}>
                <textarea
                    id="message-input"
                    placeholder="다음 이야기를 입력해줘"
                    onKeyDown={handleKeyPress}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    style={{ width: 'calc(100% - 120px)', height: '80%', marginBottom: 20 }} // 입력창의 높이를 현재 크기의 80%로 설정
                ></textarea>
                <div style={{ width: '20px', height: '80%' }}></div> {/* 공간 추가 */}
                <button onClick={sendMessage} style={{ width: '100px', height: '80%', marginTop: 'auto', marginBottom: '20px' }}>입력</button> {/* '입력' 버튼 */}
            </div>
            <div style={{ height: '20px' }}></div> {/* 두 컴포넌트 사이에 약간의 여백 */}
        </div>
    );
}

export default Chat;
