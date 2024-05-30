// // import React, { useState, useEffect } from 'react';
// // import './Project.css';
// // import { Link } from 'react-router-dom';
// // import { LuCalendarClock } from "react-icons/lu";
// // import Modal from 'react-bootstrap/Modal';
// // import Button from '@mui/material/Button';
// // import CreateProject from '../Createproject/CreateProject';
// // import axios from 'axios';
// // import { Grid, Paper, Typography } from '@mui/material';

// // export default function Project() {
// //   const [showCreateProject, setShowCreateProject] = useState(false);
// //   const [projects, setProjects] = useState([]);
// //   const [projectCreated, setProjectCreated] = useState(false); // State to track project creation

// //   useEffect(() => {
// //     fetchUserProjects();
// //   }, []);

// //   const fetchUserProjects = async () => {
// //     const userId = localStorage.getItem('userId');
// //     console.log(userId);
// //     if (!userId) {
// //       console.error('User ID not found. Please login.');
// //       return;
// //     }

// //     try {
// //       const response = await axios.get(`http://localhost:5050/api/user/${userId}`);
// //       setProjects(response.data);
// //     } catch (error) {
// //       console.error('Error fetching projects:', error);
// //     }
// //   };

// //   function show() {
// //     setShowCreateProject(true);
// //   }

// //   function handleProjectCreation() {
// //     setProjectCreated(true);
// //     setShowCreateProject(false);
// //     fetchUserProjects(); // Fetch projects again after creation
// //   }

// //   return (
// //     <div className='project'>
// //       <h2 className='text-center fs-1'>Project List</h2>
// //       <Button className="btn float-end" variant="contained" onClick={show}>+ New Project</Button>
// //       <Button className="btn float-end me-4" variant="contained">
// //         <Link className='text-white text-decoration-none' to="/report">Report</Link>
// //       </Button>
// //       <h5>PROJECTS</h5>
      
// //       {projects.length > 0 ? (
// //         // Project Table
// //         <div className='project-table'>
// //           <h3>Your Projects</h3>
// //           <Paper sx={{ width: '100%', overflow: 'hidden' }}>
// //             <Grid container spacing={2} sx={{ padding: 2 }}>
// //               <Grid item xs={3}>
// //                 <Typography variant="h6" component="div">Project Name</Typography>
// //               </Grid>
// //               <Grid item xs={3}>
// //                 <Typography variant="h6" component="div">Status</Typography>
// //               </Grid>
// //               <Grid item xs={3}>
// //                 <Typography variant="h6" component="div">Hourly Rate</Typography>
// //               </Grid>
// //               <Grid item xs={3}>
// //                 <Typography variant="h6" component="div">Budget</Typography>
// //               </Grid>
// //             </Grid>
// //             {projects.map((project) => (
// //               <Grid container spacing={2} sx={{ padding: 2 }} key={project._id}>
// //                 <Grid item xs={3}>
// //                   {project.name}
// //                 </Grid>
// //                 <Grid item xs={3}>
// //                   {project.status}
// //                 </Grid>
// //                 <Grid item xs={3}>
// //                   {project.hourlyRate}
// //                 </Grid>
// //                 <Grid item xs={3}>
// //                   {project.budget}
// //                 </Grid>
// //               </Grid>
// //             ))}
// //           </Paper>
// //         </div>
// //       ) : (
// //         // Project Container
// //         <div className='project-container text-center'>
// //           <LuCalendarClock id='calendaricon'/>
// //           <h3 className='mt-2 fw-bold'>Create your first project</h3>
// //           <p>No projects have been created yet. To start using this feature, create a new project.</p>
// //           <Button className="btn" variant="contained" onClick={show}>+ New Project</Button>
// //         </div>
// //       )}
      
// //       <Modal show={showCreateProject} onHide={() => setShowCreateProject(false)} className='custom-modal'>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Create Project</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <CreateProject onProjectCreated={handleProjectCreation} />
// //         </Modal.Body>
// //       </Modal>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from 'react';
// import './Project.css';
// import { Link } from 'react-router-dom';
// import { LuCalendarClock } from "react-icons/lu";
// import Modal from 'react-bootstrap/Modal';
// import Button from '@mui/material/Button';
// import CreateProject from '../Createproject/CreateProject';
// import axios from 'axios';
// import { Grid, Paper, Typography } from '@mui/material';

// export default function Project() {
//   const [showCreateProject, setShowCreateProject] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [projectCreated, setProjectCreated] = useState(false); // State to track project creation

//   useEffect(() => {
//     fetchUserProjects();
//   }, []);

//   const fetchUserProjects = async () => {
//     const userId = localStorage.getItem('userId');
//     console.log(userId);
//     if (!userId) {
//       console.error('User ID not found. Please login.');
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:5050/api/user/${userId}`);
//       setProjects(response.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   function show() {
//     setShowCreateProject(true);
//   }

//   function handleProjectCreation() {
//     setProjectCreated(true);
//     setShowCreateProject(false);
//     fetchUserProjects(); // Fetch projects again after creation
//   }

//   return (
//     <div className='project'>
//       <h2 className='text-center fs-1'>Project List</h2>
//       <Button className="btn float-end" variant="contained" onClick={show}>+ New Project</Button>
//       <Button className="btn float-end me-4" variant="contained">
//         <Link className='text-white text-decoration-none' to="/report">Report</Link>
//       </Button>
//       <h5>PROJECTS</h5>
      
//       {projects.length > 0 ? (
//         // Project Table
//         <div className='project-table'>
//           <h3>Your Projects</h3>
//           <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//             <Grid container spacing={2} sx={{ padding: 2 }}>
//               <Grid item xs={3}>
//                 <Typography variant="h6" component="div">Project Name</Typography>
//               </Grid>
//               <Grid item xs={3}>
//                 <Typography variant="h6" component="div">Status</Typography>
//               </Grid>
//               <Grid item xs={3}>
//                 <Typography variant="h6" component="div">Team</Typography>
//               </Grid>
//               <Grid item xs={3}>
//                 <Typography variant="h6" component="div">Members</Typography>
//               </Grid>
//             </Grid>
//             {projects.map((project) => (
//               <Grid container spacing={2} sx={{ padding: 2 }} key={project._id}>
//                 <Grid item xs={3}>
//                   {project.name}
//                 </Grid>
//                 <Grid item xs={3}>
//                   {project.status}
//                 </Grid>
//                 <Grid item xs={3}>
//                   {project.team.map((team, index) => (
//                     <Typography key={index}>{team.name}</Typography>
//                   ))}
//                 </Grid>
//                 <Grid item xs={3}>
//                   {project.team.map((team, index) => (
//                     <Typography key={index}>{team.member}</Typography>
//                   ))}
//                 </Grid>
//               </Grid>
//             ))}
//           </Paper>
//         </div>
//       ) : (
//         // Project Container
//         <div className='project-container text-center'>
//           <LuCalendarClock id='calendaricon'/>
//           <h3 className='mt-2 fw-bold'>Create your first project</h3>
//           <p>No projects have been created yet. To start using this feature, create a new project.</p>
//           <Button className="btn" variant="contained" onClick={show}>+ New Project</Button>
//         </div>
//       )}
      
//       <Modal show={showCreateProject} onHide={() => setShowCreateProject(false)} className='custom-modal'>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Project</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <CreateProject onProjectCreated={handleProjectCreation} />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import './Project.css';
import { Link } from 'react-router-dom';
import { LuCalendarClock } from "react-icons/lu";
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import CreateProject from '../Createproject/CreateProject';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';

export default function Project() {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectCreated, setProjectCreated] = useState(false); // State to track project creation

  useEffect(() => {
    fetchUserProjects();
  }, []);

  const fetchUserProjects = async () => {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (!userId) {
      console.error('User ID not found. Please login.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5050/api/user/${userId}`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  function show() {
    setShowCreateProject(true);
  }

  function handleProjectCreation() {
    setProjectCreated(true);
    setShowCreateProject(false);
    fetchUserProjects(); // Fetch projects again after creation
  }

  return (
    <div className='project'>
      <h2 className='text-center fs-1'>Project List</h2>
      <Button className="btn float-end" variant="contained" onClick={show}>+ New Project</Button>
      <Button className="btn float-end me-4" variant="contained">
        <Link className='text-white text-decoration-none' to="/report">Report</Link>
      </Button>
      <h5>PROJECTS</h5>
      
      {projects.length > 0 ? (
        // Project Table
        <div className='project-table'>
          <h3>Your Projects</h3>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={3}>
                <Typography variant="h6" component="div">Project Name</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" component="div">Status</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" component="div">Team</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" component="div">Members</Typography>
              </Grid>
            </Grid>
            {projects.map((project) => (
              <Grid container spacing={2} sx={{ padding: 2 }} key={project._id}>
                <Grid item xs={3}>
                  {project.name}
                </Grid>
                <Grid item xs={3}>
                  {project.status}
                </Grid>
                <Grid item xs={3}>
                  {project.team.map((team, index) => (
                    <Typography key={index}>{team.name}</Typography>
                  ))}
                </Grid>
                <Grid item xs={3}>
                  {project.team.map((team, index) => (
                    <Typography key={index}>
                      {team.member ? (team.member.email ? team.member.email : 'No Email') : 'No Member'}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Paper>
        </div>
      ) : (
        // Project Container
        <div className='project-container text-center'>
          <LuCalendarClock id='calendaricon'/>
          <h3 className='mt-2 fw-bold'>Create your first project</h3>
          <p>No projects have been created yet. To start using this feature, create a new project.</p>
          <Button className="btn" variant="contained" onClick={show}>+ New Project</Button>
        </div>
      )}
      
      <Modal show={showCreateProject} onHide={() => setShowCreateProject(false)} className='custom-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateProject onProjectCreated={handleProjectCreation} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
