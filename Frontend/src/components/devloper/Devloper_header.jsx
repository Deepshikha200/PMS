import React, { useState, useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import './DeveloperHeader.css'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Changepassword from '../changepassword/Changepassword';
import Modal from 'react-bootstrap/Modal';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

<Navbar.Toggle aria-controls="navbarScroll" />
export default function Devloper_header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userName, setUserName] = useState('');

  const [changepass, setchangepass] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  function show() {
    setchangepass(true)
  }
  const [userRole, setUserRole] = useState(null); // State to manage user role

  // Mock user role for demonstration
  useEffect(() => {
    // This would be fetched from your auth context or API in a real app
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole); // or 'user', 'manager', etc.
  }, []);

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.get(`http://localhost:5050/api/v1/name/${userId}`);
      setUserName(response.data.name);
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : '';

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the JWT token from localStorage
    localStorage.removeItem('userId'); // Clear the userid from localStorage
    localStorage.removeItem('jobRole'); // Clear the jobrole from localStorage
    navigate('/'); // Redirect to the login page
  };
  return (
    <>
      <div className="developerheader">
        <div className="container">
          <Navbar expand="lg" className="bg-body-tertiary p-4">
            <Navbar.Brand>
              <Link>
                <img
                  
                  src="logo2.png"

                  alt="logo"
                  className="logo"
                  height={40}
                  width={70}
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" >
              <div className='navbarscroll_inner d-flex justify-content-end align-items-center'>
                <Nav className=""
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                >
                  {/* <div className='search rounded border bg-white'>
                              <InputBase  sx={{ ml: 1, flex: 1,pl:2}} placeholder="Search "
                                //  inputProps={{ 'aria-label': 'search google maps' }}
                                  />
                                <IconButton type="button" sx={{marginLeft:'75px' }} aria-label="search">
                                 <SearchIcon />
                                    </IconButton>
                                    </div> */}
                </Nav>


                <Nav className="navbar-nav ">
                  <div className='nav-links'>
                    <Nav.Link as={Link} to="/developer/developer-project">
                      Projects
                    </Nav.Link>
                  </div>
                  <div className='links'>
                    <Link className='nav-link' to="/developer/developer-report">Report</Link>
                  </div>

                  <div className="empName ms-5">
                    <InputLabel className="fw-bold">{userName}</InputLabel>
                  </div>

                  <div className='links'>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 4 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "#1976D2" }}>{firstLetter}</Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >

                      <MenuItem onClick={show}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Change Password
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>

                  </div>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
      <Modal show={changepass} onHide={() => setchangepass(false)} className='changepass-modal'>
        <Modal.Header closeButton>
          <Modal.Title >Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Changepassword />
        </Modal.Body>
      </Modal>
    </>
  )
}
