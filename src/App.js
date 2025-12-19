import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/pages/Header';
import Users from './components/pages/Users';
import Profile from './components/pages/Profile';
import Events from './components/pages/Events';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />

        <Routes>
          <Route path='/users' element={<Users />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path="/" element={<Users />} />
          <Route path='/events' element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
