import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <Header />
    <Sidebar />
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route path='/dashboard/:id' element={<Dashboard />} />
    </Routes>
  </Router>
);