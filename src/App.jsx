import './App.css'
import React from 'react';
import User from './components/User';
import userdata from './userdata';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavApp from './components/NavApp';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const users = userdata.map(item => (
    <User
      key={item.id}
      {...item}
    />
  ));

  return (
    <BrowserRouter>
      <NavApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<div>
          <section className="user-list">
            {users}
          </section>
        </div>} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;