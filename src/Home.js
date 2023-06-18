import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './Profile';
import "./Home.css"
function Home() {
  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="dashboard-content" style={{width:"100%",margin:"0.5rem"}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route exact path="/profile" element={<Profile/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Home;
