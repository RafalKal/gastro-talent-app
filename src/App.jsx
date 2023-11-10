import './App.css'
import React from 'react';
import User from './components/User';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginRegister from './components/login/LoginRegister';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Employer from './components/Employer';
import Unathorized from './components/Unathorized';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';

const ROLES = {
  VISITOR: 'VISITOR',
  ADMIN: 'ADMIN',
  POTENTIAL_EMPLOYEE: 'POTENTIAL_EMPLOYEE',
  POTENTIAL_EMPLOYER: 'POTENTIAL_EMPLOYER'
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/*Public routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unathorized />} />

        {/*Protected routes*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.VISITOR, ROLES.POTENTIAL_EMPLOYEE]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.POTENTIAL_EMPLOYEE]} />}>
          <Route path="user" element={<User />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['POTENTIAL_EMPLOYER']} />}>
          <Route path="employer" element={<Employer />} />
        </Route>

        {/*Catch all*/}
        <Route path="*" element={<Missing />} />
      </Route>
      <Route path="/login" element={<LoginRegister />} />
    </Routes>
  );
}

export default App;