// import React, { useState } from 'react'
// import './Project.css'
// import {Link} from 'react-router-dom';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import { LuCalendarClock } from "react-icons/lu";
// import Modal from 'react-bootstrap/Modal';
// import Button from '@mui/material/Button';
// import CreateProject from '../Createproject/CreateProject';
// export default function Project() {
//   const[Showcreateproject,setShowcreateproject]=useState(false)

//   function show()
//   {
//     setShowcreateproject(true)
//   }
//   return (
//     <div className='project'> 
//         <h2 className='text-center fs-1' >Project List</h2>
//             <Button className="btn float-end" variant="contained" onClick={show}>+ New Project</Button>
//             <Button className="btn float-end me-4" variant="contained" ><Link className='text-white text-decoration-none' to="/report">Report</Link></Button>
//             <h5 >PROJECTS</h5>
//         <div className='project-container text-center'>
//             {/* <EventNoteIcon id='calendaricon'></EventNoteIcon> */}
//             <LuCalendarClock id='calendaricon'/>
//             <h3 className='mt-2 fw-bold'>Create your first project</h3>
//              <p >No projects have been created yet. To start using this feature, create a new project.</p>
//              <Button className="btn" variant="contained" onClick={show}>+ New Project</Button>
//             </div>
//             <Modal  show={Showcreateproject} onHide={()=>setShowcreateproject(false) } className='custom-modal'>
//       <Modal.Header closeButton>
//           <Modal.Title >Create Project</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <CreateProject/>
//         </Modal.Body>
//       </Modal>
//     </div>
    
//   )
// }
import React, { useState } from 'react';
import './Project.css';
import { Link } from 'react-router-dom';
import { LuCalendarClock } from "react-icons/lu";
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import CreateProject from '../Createproject/CreateProject';
import Projecttable from '../projecttable/Projecttable.jsx';
export default function Project() {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false); // State to track project creation

  function show() {
    setShowCreateProject(true);
  }

  function handleProjectCreation() {
    setProjectCreated(true);
    setShowCreateProject(false);
  }

  return (
    <>
    <div className='project'>
      <h2 className='text-center fs-1'>Project List</h2>
      <Button className="btn float-end" variant="contained" onClick={show}>+ New Project</Button>
      <Button className="btn float-end me-4" variant="contained">
        <Link className='text-white text-decoration-none' to="/report">Report</Link>
      </Button>
      <h5>PROJECTS</h5>
      
      {projectCreated ? (
        // Project Table
        <div className='project-table'>
          <h3>Your Projects</h3>
          <Projecttable/>
          {/* Add your project table here */}
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
    </>
  );
}
