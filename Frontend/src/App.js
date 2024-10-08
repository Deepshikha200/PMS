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
import ProtectedRoute from './components/ProtectedRoute.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpass" element={<ForgotpassModal />} />

          <Route element={<MainLayout />}>
            <Route path="project/:projectId" element={<Project />} />

            <Route
              path="employee"
              element={
                <ProtectedRoute>
                  <Employees />
                </ProtectedRoute>
              }
            />

            <Route
              path="report"
              element={

                <Report />

              }
            />
            <Route
              path="project"
              element={

                <Project />

              }
            />
          </Route>

          <Route
            path="developer"
            element={
              <ProtectedRoute>
                <DeveloperLayout />

              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DeveloperDashboard />} />
            <Route path="developer-project" element={<DeveloperProject />} />
            <Route path="developer-report" element={<DeveloperReport />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


