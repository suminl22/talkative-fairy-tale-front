import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="py-3" style={{ backgroundColor: '#FCF06E', }}>
            <div className="container px-4 px-lg-5 my-5" >
                <div className="text-center text-black">
                    <h1 className="display-4 fw-bolder">야기야 노올자</h1>
                    <p className="lead fw-normal text-grey-50 mb-0">
                        생성형 이야기 챗봇 '야기'과 함께
                    </p>
                    <p className="lead fw-normal text-grey-50 mb-5">
                        세상에 단 하나 뿐인 나만의 동화책을 만들어보세요!
                    </p>
                    {/* 이야기 시작하기 버튼 */}
                    <Link
                        to="/chat"
                        className="btn btn-primary btn-lg"
                        style={{
                            backgroundColor: '#FFD700',
                            border: 'none',
                            color: 'black',
                            fontWeight: 'bold',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // 그림자 효과 추가
                            borderRadius: '8px', // 둥근 모서리 설정
                            transition: 'transform 0.3s ease', // hover 효과를 위한 transition 추가
                            textDecoration: 'none', // 기본 링크 스타일 제거
                            display: 'inline-block',
                        }}
                        // hover 시 버튼 크기 약간 확대
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                    이야기 시작하기
                    </Link>


                </div>
            </div>
        </header>
    );
}

export default Header;
