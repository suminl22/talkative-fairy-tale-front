// Body.js
import React, { useState, useEffect } from 'react';
import Book from '../components/Book';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Body() {
  const [activeTab, setActiveTab] = useState('작성중');
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/story/user/incomplete', {
          headers: {
            'Authorization': `${token}`
          }
        });
        let data = await response.data;
        let index = 1;
        for (let i of data) {
          i.title = `story#${index}`;
          index += 1;
        }
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleEditClick = (storyId) => {
    localStorage.setItem('currentStoryId', storyId);
    navigate('/chat');
  };

  const renderBooks = () => {
    return stories.map((story, index) => (
      <div className="col mb-5" key={index}>
        <Book
          action="edit"
          title={story.title} // 여기서 title을 전달합니다.
          onEdit={() => handleEditClick(story.id)}
        />
      </div>
    ));
  };

  return (
    <>
      {/* Tabbar */}
      <div className="container mt-1" style={{ paddingTop: '20px' }}>
        <ul className="nav nav-tabs" style={{ width: '100%', display: 'flex' }}>
          <li className="nav-item" style={{ flex: '1' }}>
            <button className={`nav-link ${activeTab === '작성중' ? 'active' : ''}`} onClick={() => setActiveTab('작성중')} style={{ backgroundColor: activeTab === '작성중' ? '#FCF06E' : 'white', color: 'black', width: '90%', fontWeight: activeTab === '작성완료' ? 'normal' : 'bold', margin: '0 auto' }}>작성중</button>
          </li>
          <li className="nav-item" style={{ flex: '1' }}>
            <button className={`nav-link ${activeTab === '작성완료' ? 'active' : ''}`} onClick={() => setActiveTab('작성완료')} style={{ backgroundColor: activeTab === '작성완료' ? '#FCF06E' : 'white', color: 'black', width: '90%', fontWeight: activeTab === '작성완료' ? 'bold' : 'normal', margin: '0 auto' }}>작성완료</button>
          </li>
        </ul>
      </div>
      {/* Section*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-1">
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-start">
            {renderBooks()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Body;
