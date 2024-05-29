import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Lognin from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotpassModal from './components/forgotpass/ForgotpassModal.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Header from './components/header/Header.jsx'
import Project from './components/projects/Project.jsx';
import NoNavbar from './components/nonavbar/NoNavbar.jsx';
import Report from './components/report/Report.jsx';
import Workschedule from './components/workschedule/Workschedule.jsx'
import Employees from './components/Employees/Employees.jsx'
import Devloper_header from './components/devloper/Devloper_header.jsx';
import Devloper_dashboard from './components/devloper/Devloper_dashboard.jsx';
function App() {
  // const [selectedRole, setSelectedRole] = useState('');

  // // Function to set the selected role when signing up
  // const handleRoleSelection = (role) => {
  //   setSelectedRole(role);
  // };
  // const [loggedInUserRole, setLoggedInUserRole] = useState('user'); // Assuming user is the default role

  // Function to set the role of the logged-in user
  // const setLoggedInUser = (role) => {
  //     setLoggedInUserRole(role);
  // };
  return (
    <div className="App">
      <Router>
        {/* <NoNavbar selectedRole={selectedRole}> */}
        <NoNavbar>
          <Header />
        </NoNavbar>
        <Routes>
          <Route path="/employee" element={<Employees />} />
          <Route path="/workschedule" element={<Workschedule />} />
          <Route path="/developer" element={<Devloper_dashboard />} />
          <Route path="/report" element={<Report />} />
          {/* <Route path="/signup" element={<Signup handleRoleSelection={handleRoleSelection} />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Lognin />} />
          <Route path="/forgotpass" element={<ForgotpassModal />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;

