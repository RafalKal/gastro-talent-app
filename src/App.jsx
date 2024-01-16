import './App.css'
import React from 'react';
import User from './components/employee/User';
import Settings from './components/employee/settings';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import LoginRegister from './components/login/LoginRegister';
import Layout from './components/Layout';
import Admin from './components/admin/Admin';
import Employer from './components/employer/Employer';
import Unathorized from './components/errorpages/Unathorized';
import Missing from './components/errorpages/Missing';
import RequireAuth from './components/RequireAuth';
import Users from './components/admin/userspage/Users';
import Profile from './components/admin/profile/Profile';
import Jobs from './components/admin/jobs/Jobs';
import UserIdProfile from './components/admin/userspage/UserIdProfile';
import ForgotPassword from './components/login/ForgotPassword';
import JobView from './components/home/JobView';
import Profession from './components/employee/Profession';

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
        <Route path="/jobs/:id" element={<JobView />} />
        {/*Protected routes*/}
        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="admin" element={<Admin />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/users/:id" element={<UserIdProfile />} />
          <Route path="admin/jobs" element={<Jobs />} />
          <Route path="admin/profile" element={<Profile />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.POTENTIAL_EMPLOYEE]} />}>
          <Route path="user" element={<User />} />
          <Route path="user/settings" element={<Settings />} />
          <Route path="profession" element={<Profession />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['POTENTIAL_EMPLOYER']} />}>
          <Route path="employer" element={<Employer />} />
        </Route>

        {/*Catch all*/}
        <Route path="*" element={<Missing />} />
      </Route>
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;