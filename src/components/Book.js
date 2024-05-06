import React from 'react';
import '../styles.css';

function Book({ action }){
  let imageSrc;
  let title;
  let btn;
  
  // action에 따라 이미지 src 설정
  if (action === 'create') {
    imageSrc = "/img/book_cover_create.png";
    title = '';
    btn = '이야기 시작하기';
  } else if (action === 'edit') {
    imageSrc = "/img/book_cover_edit.png";
    title = '';
    btn = '이야기 수정하기'
  } else if (action === 'read') {
    imageSrc = "/img/book_cover_read.png";
    title = '완료된 이야기'
    btn = '이야기 보러가기'
  } else {
    // 예외 처리: action이 유효하지 않은 경우 기본 이미지 사용
    imageSrc = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
  }
    return (
        <div className="card h-100">
            {/* Product image*/}
            <img
              className="card-img-top"
              src={imageSrc}
              alt="..."
            />
            {/* Product details*/}
            <div className="card-body p-4">
              <div className="text-center">
                {/* Product name*/}
                <h5 className="fw-bolder">{title}</h5>
                {/* Product price*/}
                여기는 뭐넣지?
              </div>
            </div>
            {/* Product actions*/}
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center">
                <a className="btn btn-outline-dark mt-auto" href="#">
                  {btn}
                </a>
              </div>
            </div>
        </div>
    );
}

export default Book;