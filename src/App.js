import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './Home';
import Profile from './Profile';

function App() {
  return (
    <BrowserRouter>
    {/* <Navbar /> */}

    <Routes>
      <Route exact path="*" element={<Home/>}></Route>
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
