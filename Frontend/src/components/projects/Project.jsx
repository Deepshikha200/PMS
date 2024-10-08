import React, { useState, useEffect } from 'react';
import './Project.css';
import { LuCalendarClock } from "react-icons/lu";
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import CreateProject from '../Createproject/CreateProject';
import axios from 'axios';
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Project() {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    fetchUserProjects();
  }, []);

  const fetchUserProjects = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found. Please login.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5050/api/user/${userId}`);
      setProjects(response.data);

      const formattedProjects = response.data.map((project, index) => ({
        id: project._id,
        srno: index + 1,
        ProjectName: project.name,
        Createdby: project.createdBy,
        Date: new Date().toLocaleDateString(),
        members: project.team.map(member => member.name).join(', '),
        status: project.status,
      }));

      setRows(formattedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const show = () => {
    setShowCreateProject(true);
  };

  const handleCloseProject = () => {
    setShowCreateProject(false);
    setSelectedProject(null);
    fetchUserProjects();
  };

  const handleProjectCreation = () => {
    setShowCreateProject(false);
    setSelectedProject(null); // Reset selectedProject state to null
    fetchUserProjects();
  };

  const handleUpdateProject = async (project) => {
    try {
      const response = await axios.get(`http://localhost:,5050/api/projects/${project.id}`);
      console.log(response.data, "RESRESR")
      setSelectedProject(response.data);
      setShowCreateProject(true);
    } catch (error) {
      console.error('Error fetching project details:', error);
      toast.error('Failed to fetch project details');
    }
  };

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
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Error deleting project");
      console.error('Error deleting project:', error);
    }

    handleCloseDeleteDialog();
  };

  const columns = [
    { field: 'srno', headerName: 'Sr no.', width: 70, headerAlign: 'center', align: 'center' },
    { field: 'ProjectName', headerName: 'Project Name', width: 360, headerAlign: 'center', align: 'center' },
    { field: 'Createdby', headerName: 'Created By', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'Date', headerName: 'Date', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Status', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'members', headerName: 'Members', width: 300, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
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
      <ToastContainer />
      <h2 className='text-center fs-1'>Project List</h2>
      <Button className="btn float-end" variant="contained" onClick={show}>+ New Project</Button>
      <h5>PROJECTS</h5>

      {projects.length > 0 ? (
        <div className='project-table'>
          <Box sx={{ height: 560, width: '100%', p: 5 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              disableColumnMenu
              autoHeight
              className='data-grid'
              checkboxSelection={false}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#1976D2',
                  color: 'white',
                },
                '& .MuiDataGrid-cell': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#e3f2fd',
                },
              }}
            />
          </Box>
        </div>
      ) : (
        <div className='project-container text-center'>
          <LuCalendarClock id='calendaricon' />
          <h3 className='mt-2 fw-bold'>Create your first project</h3>
          <p>No projects have been created yet. To start using this feature, create a new project.</p>
          <Button className="btn" variant="contained" onClick={show}>+ New Project</Button>
        </div>
      )}

      <Modal show={showCreateProject} onHide={handleCloseProject} className='custom-modal'>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject ? 'Update Project' : 'Create Project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateProject
            onProjectCreated={handleProjectCreation}
            isEditing={selectedProject ? true : false}
            projectData={selectedProject}
            updatedData={selectedProject}
          />
        </Modal.Body>
      </Modal>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
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
