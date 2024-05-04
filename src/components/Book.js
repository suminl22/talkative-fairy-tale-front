import React from 'react';
import '../styles.css';

function Book(){
    return (
        <div className="card h-100">
            {/* Product image*/}
            <img
              className="card-img-top"
              src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
              alt="..."
            />
            {/* Product details*/}
            <div className="card-body p-4">
              <div className="text-center">
                {/* Product name*/}
                <h5 className="fw-bolder">책 이름</h5>
                {/* Product price*/}
                여기는 뭐넣지?
              </div>
            </div>
            {/* Product actions*/}
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center">
                <a className="btn btn-outline-dark mt-auto" href="#">
                  이야기 만들러가기
                </a>
              </div>
            </div>
        </div>
    );
}

export default Book;