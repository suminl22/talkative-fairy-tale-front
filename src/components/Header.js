import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="py-5" style={{backgroundColor :'#FCF06E'}}>
            <div className="container px-4 px-lg-5 my-5" >
                <div className="text-center text-black">
                    <h1 className="display-4 fw-bolder">야기야 노올자</h1>
                    <p className="lead fw-normal text-grey-50 mb-0">
                        생성형 이야기 챗봇 '야기'과 함께
                    </p>
                    <p className="lead fw-normal text-grey-50 mb-4">
                        세상에 단 하나 뿐인 나만의 동화책을 만들어보세요!
                    </p>
                    {/* 이야기 시작하기 버튼 */}
                    <Link to="/chat" className="btn btn-primary btn-lg" style={{ backgroundColor: '#FFD700', border: 'none', color: 'black' }}>
                        이야기 시작하기
                    </Link>

                </div>
            </div>
        </header>
    );
}

export default Header;
