import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    // 상태 변수 정의
    const [authCode, setAuthCode] = useState('');
    const [error, setError] = useState('');

    // 입력값 변경 시 처리 함수
    const handleChange = (event) => {
        setAuthCode(event.target.value);
    };

    // 폼 제출 시 처리 함수
    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기에 로그인 처리 로직 추가
        // 영문자와 숫자로 이루어진 6자리 문자열인지 검사
        if (/^[A-Za-z0-9]{6}$/.test(authCode) || authCode === '') {
            alert(`사용자 인증 코드: ${authCode}`);
            setError(''); // 성공한 경우 에러 메시지를 초기화합니다.
        } else {
            setError('영문자와 숫자만 사용하여 6자리를 입력해주세요.');
            setAuthCode('');
        }
    };

    return (
        <div>
            <div className="login">
                <h1>이야기 놀이터</h1>
                <span>에 오신 것을 환영합니다:)</span>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={authCode}
                        onChange={handleChange}
                        placeholder="사용자 인증 코드"
                        style={{ marginTop: '20px' }}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">로그인</button>
                </form>
            </div>
            <div style={{ marginTop: '20px' }}>
                <span>처음이신가요? </span>
                {/* 회원가입 페이지로 이동하는 링크 */}
                <span style={{ textDecoration: 'underline' }}>
                    <Link to={'/signUp'}>회원가입하기</Link>
                </span>
            </div>
        </div>
    );
}

export default Login;
