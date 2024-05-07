import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css'; // 이 경로는 Login.css 파일의 위치에 따라 달라질 수 있습니다.


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const saveTokenToLocalStorage = (token) => {
        localStorage.setItem('token', token);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await axios.post('https://350b-2001-2d8-7090-eed7-795b-7c87-587e-8c0d.ngrok-free.app/login', formData);

            if (response.status === 200) {
                alert("환영합니다!");
                saveTokenToLocalStorage(response.data.token);
                navigate('/home');
            } else {
                setError('아이디 혹은 비밀번호가 다릅니다...!');
            }
        } catch (error) {
            console.error('로그인 요청 실패:', error);
            setError('아이디 혹은 비밀번호가 다릅니다');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    return (
        <div className="login">
            <h1>Story Playground</h1>
            <span>에 오신 것을 환영합니다:)</span>
            <div className="form-container">
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
                    <button type="submit">로그인</button>
                </form>
            </div>
            <div>
                <span>처음이신가요? </span>
                <span>
                    <Link to={'/signUp'}>회원가입하기</Link>
                </span>
            </div>
        </div>
    );
}

export default Login;
