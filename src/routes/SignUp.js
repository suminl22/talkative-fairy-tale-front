import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    // 상태 변수 정의
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 입력값 변경 시 처리 함수
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAuthCodeChange = (event) => {
        setAuthCode(event.target.value);
    };

    // 회원가입 요청 보내는 함수
    const handleSignUp = async () => {
        try {
            const response = await axios.post('https://350b-2001-2d8-7090-eed7-795b-7c87-587e-8c0d.ngrok-free.app/register/user', {
                username: username,
                password: password
            });

            if (response.data === true) {
                alert("축하합니다! 회원가입이 완료되었습니다!");
                setError('');
                navigate('/');
            } else {
                setError('이미 존재하는 아이디입니다.');
            }
        } catch (error) {
            console.error('회원가입 요청 실패:', error);
            setError('회원가입 요청에 실패했습니다.');
        }
    };

    // 폼 제출 시 처리 함수
    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기에 회원가입 처리 로직 추가
        handleSignUp();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="login" style={{ textAlign: 'center' }}>
                <h1>이야기 놀이터가 처음이신가요?</h1>
                <span style={{ marginBottom: '30px' }}>놀이터에 입장하기 위하여 회원가입을 진행해주세요:)</span>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder="사용자 아이디"
                            />
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="비밀번호"
                            />
                        </div>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">회원가입하기</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
