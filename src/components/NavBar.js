import React from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const onClick = () => {
    alert('로그아웃 했습니다!');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container px-4 px-lg-5 d-flex justify-content-between align-items-center">
      <a className="navbar-brand me-auto" href="#!">
        이야기 놀이터
      </a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="d-flex" onClick={onClick}>
          <span className="flex-grow-1"></span>
          <button className="btn btn-outline-dark ml-auto" type="submit">
            <i className="bi-cart-fill me-1" />
            Logout
          </button>
        </form>
      </div>
    </div>
    </nav>
  );
};

export default NavBar;
