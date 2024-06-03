// // // import React, { useState, useEffect } from 'react';
// // // import './Project.css';
// // // import { Link } from 'react-router-dom';
// // // import { LuCalendarClock } from "react-icons/lu";
// // // import Modal from 'react-bootstrap/Modal';
// // // import Button from '@mui/material/Button';
// // // import CreateProject from '../Createproject/CreateProject';
// // // import axios from 'axios';
// // // import { Grid, Paper, Typography } from '@mui/material';

// // // export default function Project() {
// // //   const [showCreateProject, setShowCreateProject] = useState(false);
// // //   const [projects, setProjects] = useState([]);
// // //   const [projectCreated, setProjectCreated] = useState(false); // State to track project creation

// // //   useEffect(() => {
// // //     fetchUserProjects();
// // //   }, []);

// // //   const fetchUserProjects = async () => {
// // //     const userId = localStorage.getItem('userId');
// // //     console.log(userId);
// // //     if (!userId) {
// // //       console.error('User ID not found. Please login.');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await axios.get(`http://localhost:5050/api/user/${userId}`);
// // //       setProjects(response.data);
// // //     } catch (error) {
// // //       console.error('Error fetching projects:', error);
// // //     }
// // //   };

// // //   function show() {
// // //     setShowCreateProject(true);
// // //   }

// // //   function handleProjectCreation() {
// // //     setProjectCreated(true);
// // //     setShowCreateProject(false);
// // //     fetchUserProjects(); // Fetch projects again after creation
// // //   }

// // //   return (
// // //     <div className='project'>
// // //       <h2 className='text-center fs-1'>Project List</h2>
// // //       <Button className="btn float-end" variant="contained" onClick={show}>+ New Project</Button>
// // //       <Button className="btn float-end me-4" variant="contained">
// // //         <Link className='text-white text-decoration-none' to="/report">Report</Link>
// // //       </Button>
// // //       <h5>PROJECTS</h5>
      
// // //       {projects.length > 0 ? (
// // //         // Project Table
// // //         <div className='project-table'>
// // //           <h3>Your Projects</h3>
// // //           <Paper sx={{ width: '100%', overflow: 'hidden' }}>
// // //             <Grid container spacing={2} sx={{ padding: 2 }}>
// // //               <Grid item xs={3}>
// // //                 <Typography variant="h6" component="div">Project Name</Typography>
// // //               </Grid>
// // //               <Grid item xs={3}>
// // //                 <Typography variant="h6" component="div">Status</Typography>
// // //               </Grid>
// // //               <Grid item xs={3}>
// // //                 <Typography variant="h6" component="div">Hourly Rate</Typography>
// // //               </Grid>
// // //               <Grid item xs={3}>
// // //                 <Typography variant="h6" component="div">Budget</Typography>
// // //               </Grid>
// // //             </Grid>
// // //             {projects.map((project) => (
// // //               <Grid container spacing={2} sx={{ padding: 2 }} key={project._id}>
// // //                 <Grid item xs={3}>
// // //                   {project.name}
// // //                 </Grid>
// // //                 <Grid item xs={3}>
// // //                   {project.status}
// // //                 </Grid>
// // //                 <Grid item xs={3}>
// // //                   {project.hourlyRate}
// // //                 </Grid>
// // //                 <Grid item xs={3}>
// // //                   {project.budget}
// // //                 </Grid>
// // //               </Grid>
// // //             ))}
// // //           </Paper>
// // //         </div>
// // //       ) : (
// // //         // Project Container
// // //         <div className='project-container text-center'>
// // //           <LuCalendarClock id='calendaricon'/>
// // //           <h3 className='mt-2 fw-bold'>Create your first project</h3>
// // //           <p>No projects have been created yet. To start using this feature, create a new project.</p>
// // //           <Button className="btn" variant="contained" onClick={show}>+ New Project</Button>
// // //         </div>
// // //       )}
      
// // //       <Modal show={showCreateProject} onHide={() => setShowCreateProject(false)} className='custom-modal'>
// // //         <Modal.Header closeButton>
// // //           <Modal.Title>Create Project</Modal.Title>
// // //         </Modal.Header>
// // //         <Modal.Body>
// // //           <CreateProject onProjectCreated={handleProjectCreation} />
// // //         </Modal.Body>
// // //       </Modal>
// // //     </div>
// // //   );
// // // }


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
// //                 <Typography variant="h6" component="div">Team</Typography>
// //               </Grid>
// //               <Grid item xs={3}>
// //                 <Typography variant="h6" component="div">Members</Typography>
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
// //                   {project.team.map((team, index) => (
// //                     <Typography key={index}>{team.name}</Typography>
// //                   ))}
// //                 </Grid>
// //                 <Grid item xs={3}>
// //                   {project.team.map((team, index) => (
// //                     <Typography key={index}>{team.member}</Typography>
// //                   ))}
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
    
// //   )
// // // }import React, { useState } from 'react';
// // 4
// // import React, { useState, useEffect } from 'react';
// // import './Project.css';
// // import { Link } from 'react-router-dom';
// // import { LuCalendarClock } from "react-icons/lu";
// // import Modal from 'react-bootstrap/Modal';
// // import Button from '@mui/material/Button';
// // import CreateProject from '../Createproject/CreateProject';
// // import axios from 'axios';
// // import { Grid, Paper, Typography } from '@mui/material';
// // import Box from '@mui/material/Box';
// // import { DataGrid } from '@mui/x-data-grid';

// // export default function Project() {
// //   const [showCreateProject, setShowCreateProject] = useState(false);
// //   const [projects, setProjects] = useState([]);
// //   const [projectCreated, setProjectCreated] = useState(false); // State to track project creation
// //   const [rows, setRows] = useState([]);

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
// // function show() {
// //     setShowCreateProject(true);
// //   }

// //   function handleProjectCreation() {
// //     setProjectCreated(true);
// //     setShowCreateProject(false);
// //     fetchUserProjects(); // Fetch projects again after creation
// //   }

// //   const columns = [
// //     { field: 'id', headerName: 'Sr no.', width: 100, headerAlign: 'center', align: 'center' },
// //     { field: 'ProjectName', headerName: 'Project Name', width: 300, headerAlign: 'center', align: 'center' },
// //     { field: 'Createdby', headerName: 'Created By', width: 200, headerAlign: 'center', align: 'center' },
// //     { field: 'Date', headerName: 'Date', width: 150, headerAlign: 'center', align: 'center' },
// //     { field: 'members', headerName: 'Members', width: 300, headerAlign: 'center', align: 'center' },
// //     { field: 'status', headerName: 'Status', width: 300, headerAlign: 'center', align: 'center' }
// //   ];
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
         
// //           {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}>
// //             <Grid container spacing={2} sx={{ padding: 2 }}>
// //               <Grid item xs={3}>
// //                 <Typography variant="h6" component="div">Project Name</Typography>
// //               </Grid>
// //               <Grid item xs={3}>
// //                 <Typography variant="h6" component="div">Status</Typography>
// //               </Grid>
// //               <Grid item xs={3}>
// //                 <Typography variant="h6" component="div">Team</Typography>
// //               </Grid>
// //               <Grid item xs={3}>
// //                 <Typography variant="h6" component="div">Members</Typography>
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
// //                   {project.team.map((team, index) => (
// //                     <Typography key={index}>{team.name}</Typography>
// //                   ))}
// //                 </Grid>
// //                 <Grid item xs={3}>
// //                   {project.team.map((team, index) => (
// //                     <Typography key={index}>
// //                       {team.member ? (team.member.email ? team.member.email : 'No Email') : 'No Member'}
// //                     </Typography>
// //                   ))}
// //                 </Grid>
// //               </Grid>
// //             ))}
// //           </Paper> */}
// //        <Box sx={{ height: 560, width: '100%', p: 5 }}>
// //         <DataGrid
// //           rows={rows}
// //           columns={columns}
// //                 initialState={{
// //             pagination: {
// //               paginationModel: {
// //                 pageSize: 100,
// //               },
// //             },
// //           }}
// //           pageSizeOptions={[100]}
// //           disableRowSelectionOnClick
// //           sx={{
// //             '& .MuiDataGrid-columnHeaders': {
// //               backgroundColor: '#1976D2',
// //               color: 'white',
// //             },
// //             '& .MuiDataGrid-cell': {
// //               backgroundColor: '#f5f5f5',
// //             },
// //             '& .MuiDataGrid-row:hover': {
// //               backgroundColor: '#000',
// //             },
// //           }}
// //         />
// //       </Box>

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
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// export default function Project() {
//   const [showCreateProject, setShowCreateProject] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [projectCreated, setProjectCreated] = useState(false); // State to track project creation
//   const [rows, setRows] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);

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

//       // Map the projects to the format expected by the DataGrid
//       const formattedProjects = response.data.map((project, index) => ({
//         id: index + 1,
//         ProjectName: project.name,
//         Createdby: project.createdBy || 'Unknown',
//         Date: new Date().toLocaleDateString(), // Adding the current date
//         members: project.team.map(member => member.name).join(', '),
//         status: project.status,
//       }));

//       setRows(formattedProjects);
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
//   function handleUpdateProject(project) {
//     setSelectedProject(project);
//     setShowCreateProject(true);
//   }
//   const handleDeleteProject = async (projectId) => {
//     try {
//       await axios.delete(`http://localhost:5050/api/projects/${projectId}`);
//       setRows(rows.filter(row => row.id !== projectId));
//       setProjects(projects.filter(project => project._id !== projectId));
//     } catch (error) {
//       console.error('Error deleting project:', error);
//     }
//   };

//   const columns = [
//     { field: 'id', headerName: 'Sr no.', width: 100, headerAlign: 'center', align: 'center' },
//     { field: 'ProjectName', headerName: 'Project Name', width: 300, headerAlign: 'center', align: 'center' },
//     { field: 'Createdby', headerName: 'Created By', width: 200, headerAlign: 'center', align: 'center' },
//     { field: 'Date', headerName: 'Date', width: 150, headerAlign: 'center', align: 'center' },
//     // { field: 'members', headerName: 'Members', width: 300, headerAlign: 'center', align: 'center' },
//     { field: 'status', headerName: 'Status', width: 300, headerAlign: 'center', align: 'center' },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 200,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => (
//         <div>
//           <IconButton onClick={() => handleUpdateProject(params.row)}>
//             <EditIcon />
//           </IconButton>
//           <IconButton onClick={() => handleDeleteProject(params.row.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       )
//     }
//   ];

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
//           <Box sx={{ height: 560, width: '100%', p: 5 }}>
//             <DataGrid
//               rows={rows}
//               columns={columns}
//               initialState={{
//                 pagination: {
//                   paginationModel: {
//                     pageSize: 100,
//                   },
//                 },
//               }}
//               pageSizeOptions={[100]}
//               disableRowSelectionOnClick
//               sx={{
//                 '& .MuiDataGrid-columnHeaders': {
//                   backgroundColor: '#1976D2',
//                   color: 'white',
//                 },
//                 '& .MuiDataGrid-cell': {
//                   backgroundColor: '#f5f5f5',
//                 },
//                 '& .MuiDataGrid-row:hover': {
//                   backgroundColor: '#000',
//                 },
//               }}
//             />
//           </Box>
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
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Project() {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectCreated, setProjectCreated] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

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

      const formattedProjects = response.data.map((project, index) => ({
        id: index + 1,
        ProjectName: project.name,
        Createdby: project.createdBy || 'Unknown',
        Date: new Date().toLocaleDateString(),
        members: project.team.map(member => member.name).join(', '),
        status: project.status,
      }));

      setRows(formattedProjects);
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
    fetchUserProjects();
  }

  function handleUpdateProject(project) {
    setSelectedProject(project);
    setShowCreateProject(true);
  }

  const handleOpenDeleteDialog = (projectId) => {
    setProjectToDelete(projectId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setProjectToDelete(null);
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      await axios.delete(`http://localhost:5050/api/projects/${projectToDelete}`);
      setRows(rows.filter(row => row.id !== projectToDelete));
      setProjects(projects.filter(project => project._id !== projectToDelete));
    } catch (error) {
      console.error('Error deleting project:', error);
    }

    handleCloseDeleteDialog();
  };

  const columns = [
    { field: 'id', headerName: 'Sr no.', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'ProjectName', headerName: 'Project Name', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'Createdby', headerName: 'Created By', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'Date', headerName: 'Date', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Status', width: 300, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleUpdateProject(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleOpenDeleteDialog(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <div className='project'>
      <h2 className='text-center fs-1'>Project List</h2>
      <Button className="btn float-end" variant="contained" onClick={show}>+ New Project</Button>
      <Button className="btn float-end me-4" variant="contained">
        <Link className='text-white text-decoration-none' to="/report">Report</Link>
      </Button>
      <h5>PROJECTS</h5>
      
      {projects.length > 0 ? (
        <div className='project-table'>
          <Box sx={{ height: 560, width: '100%', p: 5 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 100,
                  },
                },
              }}
              pageSizeOptions={[100]}
              disableRowSelectionOnClick
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#1976D2',
                  color: 'white',
                },
                '& .MuiDataGrid-cell': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#000',
                },
              }}
            />
          </Box>
        </div>
      ) : (
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

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle >Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProject} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
