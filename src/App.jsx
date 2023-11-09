import './App.css'
import React, { useState } from 'react';
import User from './components/User';
import userdata from './userdata';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './components/Home';
import NavApp from './components/NavApp';
import Footer from './components/Footer';
import Login from './components/login/Login';
import Register from './components/login/Register';
import LoginRegister from './components/login/LoginRegister';

function App() {
  const users = userdata.map(item => (
    <User
      key={item.id}
      {...item}
    />
  ));

  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavApp />
              <Outlet />
              <Footer />
            </div>
          }>
          <Route path="/" element={<Home />} />
          <Route
            path="/user"
            element={
              <div>
                <section className="user-list">{users}</section>
              </div>
            }
          />
        </Route>
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;