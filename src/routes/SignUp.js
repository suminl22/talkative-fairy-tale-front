import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    // 상태 변수 정의
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 입력값 변경 시 처리 함수
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // 폼 제출 시 처리 함수
    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기에 회원가입 처리 로직 추가
        // 영문자와 숫자로 이루어진 6자리 문자열인지 검사
        if (/^[A-Za-z0-9]{6}$/.test(password) || password === '') {
            alert("축하합니다! 회원가입이 완료되었습니다!");
            setError(''); // 성공한 경우 에러 메시지를 초기화합니다.
            navigate('/')
        } else {
            setError('영문자와 숫자만 사용하여 6자리를 입력해주세요.');
            setPassword('');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="login" style={{ textAlign: 'center' }}>
                <h1>이야기 놀이터가 처음이신가요?</h1>
                <span style={{ marginBottom: '30px' }}>놀이터에 입장하기 위하여 회원가입을 진행해주세요:)</span>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="사용자 아이디"
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="사용자 비밀번호"
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">회원가입하기</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
