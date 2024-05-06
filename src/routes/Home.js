import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Book from '../components/Book';

function Home() {
  const [activeTab, setActiveTab] = useState('작성중');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderBooks = () => {
    const books = [];

    // 선택된 탭에 따라 책 목록을 다르게 구성
    if (activeTab === '작성중') {
      books.push(<div className="col mb-5" key={0}><Book action="create" /></div>);
      books.push(<div className="col mb-5" key={1}><Book action="edit" /></div>);
    } else if (activeTab === '작성완료') {
      books.push(<div className="col mb-5" key={2}><Book action="read" /></div>);
    }

    return books;
  };

  return (
    <>
      <NavBar />
      <Header />
      {/* Tabbar */}
      <div className="container">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === '작성중' ? 'active' : ''}`} onClick={() => handleTabClick('작성중')}>작성중</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === '작성완료' ? 'active' : ''}`} onClick={() => handleTabClick('작성완료')}>작성완료</button>
          </li>
        </ul>
      </div>
      {/* Section*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {renderBooks()}
          </div>
        </div>
      </section>
      {/* Footer*/}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright © OpenSourceSWProject Team7
          </p>
        </div>
      </footer>
      {/* Bootstrap core JS*/}
      {/* Core theme JS*/}
    </>
  );
}

export default Home;
