// import logo from './logo.svg';
// import './App.css';
// import React, { useState } from 'react'
// import Lognin from './components/login/Login.jsx';
// import Signup from './components/signup/Signup.jsx';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ForgotpassModal from './components/forgotpass/ForgotpassModal.jsx';
// import Dashboard from './components/dashboard/Dashboard.jsx';
// import Header from './components/header/Header.jsx'
// import Project from './components/projects/Project.jsx';
// import NoNavbar from './components/nonavbar/NoNavbar.jsx';
// import Report from './components/report/Report.jsx';
// import Workschedule from './components/workschedule/Workschedule.jsx'
// import Employees from './components/Employees/Employees.jsx'
// import Devloper_header from './components/devloper/Devloper_header.jsx';
// import Devloper_dashboard from './components/devloper/Devloper_dashboard.jsx';
// import DeveloperProject from './components/devloper/DeveloperProject.jsx';
// import DeveloperReport from './components/devloper/DeveloperReport.jsx'

// function App() {
 
//   return (
//     <div className="App">
//       <Router>
//         <NoNavbar>
//           <Header />
//         </NoNavbar>
   
//         <Routes>
//           <Route path="/employee" element={<Employees />} />
//           <Route path="/workschedule" element={<Workschedule />} />
//           <Route path="/developer" element={<Devloper_dashboard />} />
//           <Route path="/report" element={<Report />} />
//           {/* <Route path="/signup" element={<Signup handleRoleSelection={handleRoleSelection} />} /> */}
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<Lognin />} />
//           <Route path="/forgotpass" element={<ForgotpassModal />} />
//           <Route path="/project" element={<Project />} />
//           <Route path="/developer-project" element ={<DeveloperProject/>}/>
//           <Route path="/developer-report" element ={<DeveloperReport/>}/>
//         </Routes>
//       </Router>
//     </div>
//   );
// }


// export default App;

// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/login/Login.jsx';
// import Signup from './components/signup/Signup.jsx';
// import ForgotpassModal from './components/forgotpass/ForgotpassModal.jsx';
// import Dashboard from './components/dashboard/Dashboard.jsx';
// import Header from './components/header/Header.jsx';
// import Project from './components/projects/Project.jsx';
// import NoNavbar from './components/nonavbar/NoNavbar.jsx';
// import Report from './components/report/Report.jsx';
// import Workschedule from './components/workschedule/Workschedule.jsx';
// import Employees from './components/Employees/Employees.jsx';
// import DeveloperHeader from './components/devloper/Devloper_header.jsx';
// import DeveloperDashboard from './components/devloper/Devloper_dashboard.jsx';
// import DeveloperProject from './components/devloper/DeveloperProject.jsx';
// import DeveloperReport from './components/devloper/DeveloperReport.jsx';
// import DeveloperLayout from './components/layout/DeveloperLayout.jsx'; // Import the layout

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<NoNavbar><Header /></NoNavbar>}>
//             <Route index element={<Login />} />
//             <Route path="signup" element={<Signup />} />
//             <Route path="forgotpass" element={<ForgotpassModal />} />
//           </Route>

//           <Route path="/" element={<Header />}>
//             <Route path="employee" element={<Employees />} />
//             <Route path="workschedule" element={<Workschedule />} />
//             <Route path="report" element={<Report />} />
//             <Route path="project" element={<Project />} />
//           </Route>

//           <Route path="developer" element={<DeveloperLayout />}> {/* Wrapping developer routes in the DeveloperLayout */}
//             {/* <Route index element={<DeveloperDashboard />} /> */}
//             <Route path="developer-project" element={<DeveloperProject />} />
//             <Route path="developer-report" element={<DeveloperReport />} />
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import ForgotpassModal from './components/forgotpass/ForgotpassModal.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Project from './components/projects/Project.jsx';
import Report from './components/report/Report.jsx';
import Workschedule from './components/workschedule/Workschedule.jsx';
import Employees from './components/Employees/Employees.jsx';
import DeveloperDashboard from './components/devloper/Devloper_dashboard.jsx';
import DeveloperProject from './components/devloper/DeveloperProject.jsx';
import DeveloperReport from './components/devloper/DeveloperReport.jsx';
import MainLayout from './components/layout/MainLayout';
import DeveloperLayout from './components/layout/DeveloperLayout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpass" element={<ForgotpassModal />} />

          <Route element={<MainLayout />}>
            <Route path="employee" element={<Employees />} />
            <Route path="workschedule" element={<Workschedule />} />
            <Route path="report" element={<Report />} />
            <Route path="project" element={<Project />} />
          </Route>

          <Route path="developer" element={<DeveloperLayout />}>
            {/* <Route index element={<DeveloperDashboard />} /> */}
            <Route path="developer-project" element={<DeveloperProject />} />
            <Route path="developer-report" element={<DeveloperReport />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

