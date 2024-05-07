// Book.js
import React from 'react';
import { Link } from 'react-router-dom';

function Book({ action, title }) {
  let imageSrc;
  let btn;

  // action에 따라 이미지 src와 버튼 텍스트 설정
  // 일단 이미지는 dummy로 설정
  if (action === 'edit') {
    imageSrc = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
    btn = '수정하기';
  } else if (action === 'read') {
    imageSrc = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
    btn = '열람하기';
  } else {
    // 예외 처리: action이 유효하지 않은 경우 기본 이미지 사용
    imageSrc = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
  }

  return (
    <div className="card h-100" style={{ width: '200px' }}>
      {/* Product image*/}
      <img
        className="card-img-top"
        src={imageSrc}
        alt="..."
        style={{ height: '200px', width: '100%', objectFit: 'cover' }}
      />
      {/* Product details*/}
      <div className="card-body p-3">
        <div className="text-center" >
          {/* Product name*/}
          <h5 className="fw-bolder">{title}</h5>
        </div>
      </div>
      {/* Product actions*/}
      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div className="text-center">
          <Link
            to="/chat"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: '#FFD700',
              border: 'none',
              color: 'black',
              fontSize: '1rem',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              transition: 'transform 0.3s ease',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            {btn}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Book;
