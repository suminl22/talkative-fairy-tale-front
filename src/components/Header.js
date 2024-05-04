import React from 'react';
import '../styles.css';

function Header(){
    return (
        <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 fw-bolder">야기야 노올자</h1>
                <p className="lead fw-normal text-white-50 mb-0">
                생성형 이야기 챗봇 '야기'과 함께
                </p>
                <p className="lead fw-normal text-white-50 mb-0">
                세상에 단 하나 뿐인 나만의 동화책을 만들어보세요!
                </p>
            </div>
            </div>
        </header>
    );
};

export default Header;