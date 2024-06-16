// import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import FormControl from "@mui/material/FormControl";
// import { Link } from "react-router-dom";
// import "./Createproject.css";
// import { Autocomplete } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function CreateProject({
//   onProjectCreated,
//   selectedProject,
//   isEditing
// }) {
//   const [projectName, setProjectName] = useState("");
//   const [status, setStatus] = useState("");
//   const [hourlyRate, setHourlyRate] = useState("");
//   const [budget, setBudget] = useState("");
//   const [rows, setRows] = useState([{ id: 1, jobRole: "", empname: "", empid: "" }]);
//   const [availableMembers, setAvailableMembers] = useState([]);
//   const [jobRoles, setJobRoles] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedProject) {
//       setProjectName(selectedProject.name || "");
//       setStatus(selectedProject.status || "");
//       setHourlyRate(selectedProject.hourlyRate || "");
//       setBudget(selectedProject.budget || "");
//       setRows(selectedProject.team
//         ? selectedProject.team.map((member, index) => ({
//             id: index + 1,
//             jobRole: member.jobRole || "",
//             empname: member.empname || "",
//             empid: member.empid || "",
//           }))
//         : [{ id: 1, jobRole: "", empname: "", empid: "" }]);
//     }
//   }, [selectedProject]);

//   const fetchData = async () => {
//     try {
//       const membersResponse = await axios.get("http://localhost:5050/api/empname");
//       const jobRolesResponse = await axios.get("http://localhost:5050/api/jobrole");

//       setAvailableMembers(membersResponse.data);
//       setJobRoles(jobRolesResponse.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleAddRow = () => {
//     const newRow = { id: rows.length + 1, jobRole: "", empname: "", empid: "" };
//     setRows([...rows, newRow]);
//   };

//   const handleDeleteRow = (idToDelete) => {
//     const updatedRows = rows.filter((row) => row.id !== idToDelete);
//     setRows(updatedRows);
//   };

//   const handleChange = (item, field, value) => {
//     let updatedRows;

//     if (field === "empname" || field === "empid") {
//       const selectedMember = availableMembers.find((member) => {
//         if (field === "empname") return member.empname === value.empname;
//         if (field === "empid") return member.empid === value.empid;
//       });

//       if (selectedMember) {
//         updatedRows = rows.map((row) =>
//           row.id === item.id
//             ? {
//                 ...row,
//                 empname: selectedMember.empname,
//                 empid: selectedMember.empid,
//               }
//             : row
//         );
//       } else {
//         updatedRows = rows.map((row) =>
//           row.id === item.id ? { ...row, [field]: value } : row
//         );
//       }
//     } else {
//       updatedRows = rows.map((row) =>
//         row.id === item.id ? { ...row, [field]: value } : row
//       );
//     }
//     setRows(updatedRows);
//   };

//   const handleCreateProject = async () => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       toast.error("Please sign up first to create the project");
//       return;
//     }

//     const projectData = {
//       name: projectName,
//       status: status,
//       hourlyRate: hourlyRate,
//       budget: budget,
//       team: rows.map((row) => ({
//         jobRole: row.jobRole,
//         empname: row.empname,
//         empid: row.empid,
//       })),
//       createdBy: userId,
//     };

//     try {
//       let response;
//       if (selectedProject?._id) {
//         response = await axios.put(
//           `http://localhost:5050/api/projects/${selectedProject._id}`,
//           projectData
//         );
//         toast.success("Project updated successfully!");
//       } else {
//         response = await axios.post(
//           "http://localhost:5050/api/projects",
//           projectData
//         );
//         toast.success("Project created successfully!");
//       }
//       onProjectCreated();
//       console.log("Project created/updated successfully!", response);
//     } catch (error) {
//       console.error("Error creating/updating project:", error);
//       toast.error("Failed to create/update project. Please try again.");
//     }
//   };

//   const handleJobRoleChange = (jobRoleId) => {
//     const filtered = availableMembers.filter(
//       (member) => member.jobRole === jobRoleId
//     );
//     setFilteredMembers(filtered);
//   };

//   return (
//     <div className="createproject">
//       <ToastContainer />
//       <TextField
//         className="name"
//         id="outlined-basic"
//         label="Project Name"
//         variant="outlined"
//         value={projectName}
//         onChange={(e) => setProjectName(e.target.value)}
//       />
//       <FormControl className="status">
//         <InputLabel>Status</InputLabel>
//         <Select
//           label="Status"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Deactive">Deactivate</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField
//         className="hourlyRate"
//         id="outlined-basic"
//         label="Hourly Rate"
//         variant="outlined"
//         value={hourlyRate || selectedProject?.hourlyRate || ""}
//         type="number"
//         onChange={(e) => setHourlyRate(e.target.value)}
//       />
//       <TextField
//         className="budget"
//         id="outlined-basic"
//         label="Budget"
//         variant="outlined"
//         type="number"
//         value={budget || selectedProject?.budget || ""}
//         onChange={(e) => setBudget(e.target.value)}
//       />
//       <hr />
//       <InputLabel className="projectteam text-black">Project Team</InputLabel>
//       {rows.map(
//         (item) => (
//           console.log(item, "ITEMITEM"),
//           (
//             <div key={item.id}>
//               <FormControl sx={{ m: 1, ml: 4, mt: 2, minWidth: 186 }}>
//                 <InputLabel>Job role</InputLabel>
//                 <Select
//                   label="Job Role"
//                   value={item.jobRole || ""}
//                   onChange={(e) => {
//                     handleChange(item, "jobRole", e.target.value);
//                     handleJobRoleChange(e.target.value); // Call handleJobRoleChange here
//                   }}
//                 >
//                   {jobRoles.map((role) => (
//                     <MenuItem key={role._id} value={role._id}>
//                       {role.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 216 }}>
//                 <Autocomplete
//                   options={filteredMembers} // Use the entire member object as options
//                   getOptionLabel={(option) => option.empname} // Display the member's name
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Emp Name"
//                       variant="outlined"
//                     />
//                   )}
//                   value={item} // Use the entire item object
//                   onChange={(e, newValue) =>
//                     handleChange(item, "empname", newValue)
//                   }
//                 />
//               </FormControl>
//               <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 156 }}>
//                 <Autocomplete
//                   options={filteredMembers.map((member) => member.empid)}
//                   renderInput={(params) => (
//                     <TextField {...params} label="Emp ID" variant="outlined" />
//                   )}
//                   value={item.empid || ""} // Use item.empid directly as it represents the member's ID
//                   onChange={(e, newValue) =>
//                     handleChange(item, "empid", newValue)
//                   }
//                 />
//               </FormControl>

//               {item.id !== 1 && (
//                 <DeleteIcon
//                   className="deleteicon"
//                   onClick={() => handleDeleteRow(item.id)}
//                 />
//               )}
//             </div>
//           )
//         )
//       )}
//       <Link
//         className="addnewemp text-black text-decoration-none"
//         onClick={handleAddRow}
//       >
//         + Add new Employee
//       </Link>
//       <hr />
//       <Button
//         className="createproject-btn float-end"
//         variant="contained"
//         onClick={handleCreateProject}
//       >
//         {isEditing ? "Update" : "Create"}
//       </Button>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import FormControl from "@mui/material/FormControl";
// import { Link } from "react-router-dom";
// import "./Createproject.css";
// import { Autocomplete } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function CreateProject({
//   onProjectCreated,
//   isEditing,
//   projectData,
//   selectedProject,
// }) {
//   const [projectName, setProjectName] = useState("");
//   const [status, setStatus] = useState("");
//   const [hourlyRate, setHourlyRate] = useState("");
//   const [budget, setBudget] = useState("");
//   const [rows, setRows] = useState([
//     { id: 1, jobRole: "", empname: "", empid: "" },
//   ]);
//   const [availableMembers, setAvailableMembers] = useState([]);
//   const [jobRoles, setJobRoles] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [empId, setEmpId] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const membersResponse = await axios.get(
//           "http://localhost:5050/api/empname"
//         );
//         const jobRolesResponse = await axios.get(
//           "http://localhost:5050/api/jobrole"
//         );

//         setAvailableMembers(membersResponse.data);
//         setJobRoles(jobRolesResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (projectData) {
//       setProjectName(projectData.name || "");
//       setStatus(projectData.status || "");
//       setHourlyRate(projectData.hourlyRate || "");
//       setBudget(projectData.budget || "");
//       setRows(
//         projectData.team
//           ? projectData.team.map((member, index) => ({
//             id: index + 1,
//             jobRole: member.jobRole || "",
//             empname: member.empname || "",
//             empid: member.empid || "",
//           }))
//           : [{ id: 1, jobRole: "", empname: "", empid: "", empJobRole: "" }]
//       );
//     }
//   }, [projectData]);

//   const handleAddRow = () => {
//     const newRow = { id: rows.length + 1, jobRole: "", empname: "", empid: "" };
//     setRows([...rows, newRow]);
//   };

//   const handleDeleteRow = (idToDelete) => {
//     const updatedRows = rows.filter((row) => row.id !== idToDelete);
//     setRows(updatedRows);
//   };

//   const handleChange = (item, field, value) => {
//     let updatedRows;
//     console.log(item, "ididid");
//     if (field === "empname" || field === "empid") {
//       const selectedMember = availableMembers.find((member) => {
//         console.log(member, "VALUEUEUUE");
//         if (field === "empname") return member.empname === value.empname;
//         if (field === "empid") return member.empid === value.empid;
//       });

//       console.log(selectedMember?._id, "selectedMember");
//       setEmpId(selectedMember?._id);

//       if (selectedMember) {
//         console.log(selectedMember, "selectedMemberselectedMember");
//         updatedRows = rows.map((row) =>
//           row.id === item.id
//             ? {
//               ...row,
//               empname: selectedMember.empname,
//               empid: selectedMember.empid,
//               empJobRole: selectedMember._id
//             }
//             : row
//         );
//       } else {
//         updatedRows = rows.map((row) =>
//           row.id === item.id ? { ...row, [field]: value } : row
//         );
//       }
//     } else {
//       updatedRows = rows.map((row) =>
//         row.id === item.id ? { ...row, [field]: value } : row
//       );
//     }
//     setRows(updatedRows);
//   };

//   const handleCreateProject = async () => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       toast.error("Please signup first to create the project");
//       return;
//     }

//     const projectData = {
//       name: projectName,
//       status: status,
//       hourlyRate: hourlyRate,
//       budget: budget,
//       team: rows
//         .map((row) => ({
//           jobRole: row.jobRole,
//           empname: row.empJobRole,
//           empid: row.empJobRole,
//         }))
//         .filter((row) => row.empid !== "" && row.empname !== ""),
//       createdBy: userId,
//     };

//     try {
//       let response;
//       if (isEditing && selectedProject?._id) {
//         response = await axios.put(
//           `http://localhost:5050/api/projects/${selectedProject._id}`,
//           projectData
//         );
//         toast.success("Project updated successfully!");
//       } else {
//         response = await axios.post(
//           "http://localhost:5050/api/projects",
//           projectData
//         );
//         toast.success("Project created successfully!");
//       }
//       onProjectCreated();
//       console.log("Project created/updated successfully!", response);
//     } catch (error) {
//       console.error("Error creating/updating project:", error);
//       toast.error("Failed to create/update project. Please try again.");
//     }
//   };

//   const handleJobRoleChange = (jobRoleId) => {
//     const filtered = availableMembers.filter(
//       (member) => member.jobRole === jobRoleId
//     );
//     console.log(filtered, "JOBfiltered");
//     setFilteredMembers(filtered);
//   };

//   return (
//     <div className="createproject">
//       <ToastContainer />
//       <TextField
//         className="name"
//         id="outlined-basic"
//         label="Project Name"
//         variant="outlined"
//         value={projectName || selectedProject?.name}
//         onChange={(e) => setProjectName(e.target.value)}
//       />
//       <FormControl className="status">
//         <InputLabel>Status</InputLabel>
//         <Select
//           label="Status"
//           value={status || selectedProject?.status || ""}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Deactive">Deactivate</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField
//         className="hourlyRate"
//         id="outlined-basic"
//         label="Hourly Rate"
//         variant="outlined"
//         value={hourlyRate || selectedProject?.hourlyRate || ""}
//         type="number"
//         onChange={(e) => setHourlyRate(e.target.value)}
//       />
//       <TextField
//         className="budget"
//         id="outlined-basic"
//         label="Budget"
//         variant="outlined"
//         type="number"
//         value={budget || selectedProject?.budget || ""}
//         onChange={(e) => setBudget(e.target.value)}
//       />
//       <hr />
//       <InputLabel className="projectteam text-black">Project Team</InputLabel>
//       {rows.map(
//         (item) => (
//           console.log(item, "ITEMITEM"),
//           (
//             <div key={item.id}>
//               <FormControl sx={{ m: 1, ml: 4, mt: 2, minWidth: 186 }}>
//                 <InputLabel>Job role</InputLabel>
//                 <Select
//                   label="Job Role"
//                   value={item.jobRole || ""}
//                   onChange={(e) => {
//                     handleChange(item, "jobRole", e.target.value);
//                     handleJobRoleChange(e.target.value); // Call handleJobRoleChange here
//                   }}
//                 >
//                   {jobRoles.map((role) => (
//                     <MenuItem key={role._id} value={role._id}>
//                       {role.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 216 }}>
//                 <Autocomplete
//                   options={filteredMembers} // Use the entire member object as options
//                   getOptionLabel={(option) => option.empname} // Display the member's name
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Emp Name"
//                       variant="outlined"
//                     />
//                   )}
//                   value={item} // Use the entire item object
//                   onChange={(e, newValue) =>
//                     handleChange(item, "empname", newValue)
//                   }
//                 />
//               </FormControl>
//               <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 156 }}>
//                 <Autocomplete
//                   options={filteredMembers.map((member) => member.empid)}
//                   renderInput={(params) => (
//                     <TextField {...params} label="Emp ID" variant="outlined" />
//                   )}
//                   value={item.empid || ""} // Use item.empid directly as it represents the member's ID
//                   onChange={(e, newValue) =>
//                     handleChange(item, "empid", newValue)
//                   }
//                 />
//               </FormControl>

//               {item.id !== 1 && (
//                 <DeleteIcon
//                   className="deleteicon"
//                   onClick={() => handleDeleteRow(item.id)}
//                 />
//               )}
//             </div>
//           )
//         )
//       )}
//       <Link
//         className="addnewemp text-black text-decoration-none"
//         onClick={handleAddRow}
//       >
//         + Add new Employee
//       </Link>
//       <hr />
//       <Button
//         className="createproject-btn float-end"
//         variant="contained"
//         onClick={handleCreateProject}
//       >
//         {isEditing ? "Update" : "Create"}
//       </Button>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import './Project.css';
// import { Link } from 'react-router-dom';
// import { LuCalendarClock } from "react-icons/lu";
// import Modal from 'react-bootstrap/Modal';
// import Button from '@mui/material/Button';
// import CreateProject from '../Createproject/CreateProject';
// import axios from 'axios';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export default function Project() {
//   const [showCreateProject, setShowCreateProject] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [projectCreated, setProjectCreated] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [projectToDelete, setProjectToDelete] = useState(null);

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

//       const formattedProjects = response.data.map((project, index) => ({
//         id: project._id,
//         srno: index + 1,
//         ProjectName: project.name,
//         Createdby: project.createdBy,
//         Date: new Date().toLocaleDateString(),
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
//     fetchUserProjects();
//   }


//   const handleUpdateProject = async (project) => {
//     try {
//       const response = await axios.get(`http://localhost:5050/api/projects/${project.id}`);
//       setSelectedProject(response.data);
//       setShowCreateProject(true);
//     } catch (error) {
//       console.error('Error fetching project details:', error);
//       toast.error('Failed to fetch project details');
//     }
//   };

//   const handleOpenDeleteDialog = (projectId) => {
//     setProjectToDelete(projectId);
//     setOpenDeleteDialog(true);
//   };

//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setProjectToDelete(null);
//   };

//   const handleDeleteProject = async () => {
//     if (!projectToDelete) return;

//     try {
//       await axios.delete(`http://localhost:5050/api/projects/${projectToDelete}`);
//       setRows(rows.filter(row => row.id !== projectToDelete));
//       setProjects(projects.filter(project => project._id !== projectToDelete));
//       toast.success("Project deleted successfully");
//     } catch (error) {
//       toast.error("Error deleting project");
//       console.error('Error deleting project:', error);
//     }

//     handleCloseDeleteDialog();
//   };
//   const columns = [
//     { field: 'srno', headerName: 'Sr no.', width: 70, headerAlign: 'center', align: 'center' },
//     { field: 'ProjectName', headerName: 'Project Name', width: 360, headerAlign: 'center', align: 'center' },
//     { field: 'Createdby', headerName: 'Created By', width: 200, headerAlign: 'center', align: 'center' },
//     { field: 'Date', headerName: 'Date', width: 100, headerAlign: 'center', align: 'center' },
//     { field: 'status', headerName: 'Status', width: 200, headerAlign: 'center', align: 'center' },
//     { field: 'members', headerName: 'Members', width: 300, headerAlign: 'center', align: 'center' },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => (
//         <div>
//           <IconButton onClick={() => handleUpdateProject(params.row)}>
//             <EditIcon />
//           </IconButton>
//           <IconButton onClick={() => handleOpenDeleteDialog(params.row.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       )
//     }
//   ];

//   return (
//     <div className='project'>
//       <ToastContainer />
//       <h2 className='text-center fs-1'>Project List</h2>
//       <Button className="btn float-end" variant="contained" onClick={show}>+ New Project</Button>
//       <Button className="btn float-end me-4" variant="contained">
//         <Link className='text-white text-decoration-none' to="/report">Report</Link>
//       </Button>
//       <h5>PROJECTS</h5>

//       {projects.length > 0 ? (
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
//         <div className='project-container text-center'>
//           <LuCalendarClock id='calendaricon' />
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
//           <CreateProject onProjectCreated={handleProjectCreation} selectedProject={selectedProject} />
//         </Modal.Body>
//       </Modal>

//       <Dialog
//         open={openDeleteDialog}
//         onClose={handleCloseDeleteDialog}
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this project?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteProject} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { Autocomplete } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Textarea from '@mui/joy/Textarea';
import dayjs from 'dayjs';
import './AddReport.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddReport({ onReportAdded }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [projectNames, setProjectNames] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('');
  const [selectedEmployeeJobRole, setSelectedEmployeeJobRole] = useState('');
  const [remarks, setRemarks] = useState('');
  const [logHours, setLogHours] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found. Please login.');
        return;
      }

      try {
        const projectsResponse = await axios.get(`http://localhost:5050/api/user/${userId}`);

        setProjectNames(projectsResponse.data.map(project => ({ label: project.name, id: project._id })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const savedProjectId = localStorage.getItem('selectedProjectId');
    const savedEmpId = localStorage.getItem('selectedEmpId');
    if (savedProjectId) {
      handleProjectChange(null, { id: savedProjectId });
    }
    if (savedEmpId) {
      handleEmployeeIdChange(null, { id: savedEmpId });
    }
  }, []);

  const handleProjectChange = async (event, value) => {
    if (!value) return;

    try {
      localStorage.setItem('selectedProjectId', value.id);
      setSelectedProject(value);

      const response = await axios.get(`http://localhost:5050/api/project/members/${value.id}`);
      console.log(response, "response!!")
      const employeeOptions = response.data.team.map(member => ({ label: `${member.empid.empid}`, id: member.empid._id }));
      setEmployeeId(employeeOptions);
    } catch (error) {
      console.error('Error fetching project members:', error);
    }
  };


  const handleEmployeeIdChange = async (event, value) => {
    if (!value) return;
    try {
      localStorage.setItem('selectedEmpId', value.id);
      setSelectedEmployeeId(value.id);
    
      console.log(value.id, 'value.id');
      const response = await axios.get(`http://localhost:5050/api/employeeById/${value.id}`);
      const { name, jobRole } = response.data;
      setSelectedEmployeeName(name);
      setSelectedEmployeeJobRole(jobRole);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setLogHours(inputValue);

    const regex = /^([01]?[0-9]|2[0-3])\.[0-5][0-9]$/; // Regex for hh.mm format
    if (regex.test(inputValue)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAddReport = async () => {
    if (!selectedProject || !selectedEmployeeId || !selectedEmployeeName || !selectedEmployeeJobRole || !selectedDate || !logHours || error) {
      toast.error('Please fill in all required fields with valid data.');
      return;
    }

    const reportData = {
      projectName: selectedProject.id,
      employeeId: selectedEmployeeId,
      employeeName: selectedEmployeeName,
      jobRole: selectedEmployeeJobRole,
      date: selectedDate.format('YYYY-MM-DD'),
      logHours,
      remarks,
    };

    try {
      await axios.post('http://localhost:5050/api/addreport', reportData);
      toast.success('Report added successfully!');
      if (onReportAdded) {
        onReportAdded();
      }
    } catch (error) {
      console.error('Error adding report:', error);
      toast.error('Failed to add report.');
    }
  };

  return (
    <div className='addreport'>
      <ToastContainer />
      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 435 }}>
        <Autocomplete
          options={projectNames}
          getOptionLabel={(option) => option.label}
          onChange={handleProjectChange}
          renderInput={(params) => (
            <TextField {...params} label="Project Name" variant="outlined" />
          )}
        />
      </FormControl>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 200 }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={employeeId}
          getOptionLabel={(option) => option.label}
          onChange={handleEmployeeIdChange}
          renderInput={(params) => <TextField {...params} label="Emp ID" />}
        />
      </FormControl>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, width: 200 }}>
        <TextField
          label="Employee Name"
          variant="outlined"
          value={selectedEmployeeName}
          disabled
        />
      </FormControl>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, width: 200 }}>
        <TextField
          label="Job Role"
          variant="outlined"
          value={selectedEmployeeJobRole}
          disabled
        />
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl sx={{ m: 1, ml: 2, mt: 2, width: 200 }}>
          <DesktopDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(params) => <TextField {...params} className='reportdate' />}
          />
        </FormControl>
      </LocalizationProvider>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, mb: 2, minWidth: 435 }}>
        <TextField
          label="Log Hours"
          variant="outlined"
          placeholder="hh.mm"
          value={logHours}
          onChange={handleChange}
          error={error}
          helperText={error ? 'Invalid time format. Use hh.mm' : ''}
          fullWidth
        />
      </FormControl>

      <Textarea
        className="remarks"
        placeholder="Remarks"
        minRows={3}
        maxRows={6}
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <Button
        className="addbtn float-end me-5 mt-3 mb-3"
        variant="contained"
        onClick={handleAddReport}
      >Add
      </Button>
    </div>
  );
}
