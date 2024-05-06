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
      <div className="container-fluid d-flex justify-content-between align-items-center" style={{ padding: '0 2%' }}>
        <img src="src/img/logo.png" alt='이야기 놀이터 이미지' />
        <button className="btn btn-outline-dark" type="submit" onClick={onClick}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
