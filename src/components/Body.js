import React, { useState } from 'react';
import Book from '../components/Book';

function Body() {
  const [activeTab, setActiveTab] = useState('작성중');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderBooks = () => {
    const books = [];

    // 선택된 탭에 따라 책 목록을 다르게 구성
    if (activeTab === '작성중') {
      books.push(<div className="col mb-5" key={1}><Book action="edit" /></div>);
      books.push(<div className="col mb-5" key={2}><Book action="edit" /></div>);
      books.push(<div className="col mb-5" key={3}><Book action="edit" /></div>);
      books.push(<div className="col mb-5" key={4}><Book action="edit" /></div>);
      books.push(<div className="col mb-5" key={5}><Book action="edit" /></div>);
      books.push(<div className="col mb-5" key={6}><Book action="edit" /></div>);
    } else if (activeTab === '작성완료') {
      books.push(<div className="col mb-5" key={7}><Book action="read" /></div>);
      books.push(<div className="col mb-5" key={8}><Book action="read" /></div>);
      books.push(<div className="col mb-5" key={9}><Book action="read" /></div>);
    }

    return books;
  };

  return (
    <>
      {/* Tabbar */}
    <div className="container mt-1" style={{ paddingTop: '20px' }}>
        <ul className="nav nav-tabs" style={{ width: '100%', display: 'flex' }}>
            <li className="nav-item" style={{ flex: '1' }}>
            <button className={`nav-link ${activeTab === '작성중' ? 'active' : ''}`} onClick={() => handleTabClick('작성중')} style={{ backgroundColor: activeTab === '작성중' ? '#FCF06E' : 'white', color: 'black', width: '90%', fontWeight: activeTab === '작성완료' ? 'normal' : 'bold', margin: '0 auto' }}>작성중</button>
            </li>
            <li className="nav-item" style={{ flex: '1' }}>
            <button className={`nav-link ${activeTab === '작성완료' ? 'active' : ''}`} onClick={() => handleTabClick('작성완료')} style={{ backgroundColor: activeTab === '작성완료' ? '#FCF06E' : 'white', color: 'black', width: '90%', fontWeight: activeTab === '작성완료' ? 'bold' : 'normal', margin: '0 auto' }}>작성완료</button>
            </li>
        </ul>
    </div>
      {/* Section*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-1">
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center">
            {renderBooks()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Body;
