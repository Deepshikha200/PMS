import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import "./Createproject.css";
import { Autocomplete } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProject({
  onProjectCreated,
  isEditing,
  projectData,
  updatedData,
}) {
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [budget, setBudget] = useState("");
  const [rows, setRows] = useState([
    { id: 1, jobRole: "", empname: "", empid: "" }
  ]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await axios.get(
          "https://ems-api.antiers.work/api/empname"
        );
        const jobRolesResponse = await axios.get(
          "https://ems-api.antiers.work/api/jobrole"
        );

        setAvailableMembers(membersResponse.data);
        console.log("hellooooo", availableMembers)
        setJobRoles(jobRolesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (projectData) {
      setProjectName(projectData.name || "");
      setStatus(projectData.status || "");
      setHourlyRate(projectData.hourlyRate || "");
      setBudget(projectData.budget || "");
      setRows(
        projectData.team
          ? projectData.team.map((member, index) => ({
            id: index + 1,
            jobRole: member.jobRole || "",
            empname: member.empname.empname || "",
            empid: member.empid.empid || "",
          }))
          : [{ id: 1, jobRole: "", empname: "", empid: "" }]
      );
    }
  }, [projectData]);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, jobRole: "", empname: "", empid: "" };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (idToDelete) => {
    const updatedRows = rows.filter((row) => row.id !== idToDelete);
    setRows(updatedRows);
  };

  const handleChange = (item, field, value) => {
    let updatedRows;

    if (field === "empname" || field === "empid") {
      const selectedMember = availableMembers.find((member) => {
        if (field === "empname") return member._id === value.empname;
        if (field === "empid") return member._id === value.empid;
      });

      if (selectedMember) {
        updatedRows = rows.map((row) =>
          row.id === item.id
            ? {
              ...row,
              empname: selectedMember._id,
              empid: selectedMember._id,
              empJobRole: selectedMember._id,
            }
            : row
        );
      } else {
        updatedRows = rows.map((row) =>
          row.id === item.id ? { ...row, [field]: value } : row
        );
      }
    } else if (field === "jobRole") {
      updatedRows = rows.map((row) =>
        row.id === item.id ? { ...row, jobRole: value, empname: "", empid: "" } : row
      );
      handleJobRoleChange(value);
    } else {
      updatedRows = rows.map((row) =>
        row.id === item.id ? { ...row, [field]: value } : row
      );
    }

    setRows(updatedRows);
  };

  const handleCreateProject = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("Please signup first to create the project");
      return;
    }

    const projectData = {
      name: projectName,
      status: status,
      hourlyRate: hourlyRate,
      budget: budget,
      team: rows
        .map((row) => ({
          jobRole: row.jobRole,
          empname: row.empname, // Assuming empJobRole contains the member's _id
          empid: row.empid, // Assuming empJobRole contains the member's _id
        }))
        .filter((row) => row.empid !== "" && row.empname !== ""),
      createdBy: userId,
    };

    try {
      const response = await axios.post(
        "https://ems-api.antiers.work/api/projects",
        projectData
      );
      console.log(response.data, 'response')

      toast.success("Project created successfully!");
      onProjectCreated();
      console.log("Project created successfully!", response);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };

  const handleUpdateProject = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("Please signup first to update the project");
      return;
    }

    const updatedProjectData = {
      name: projectName,
      status: status,
      hourlyRate: hourlyRate,
      budget: budget,
      team: rows
        .map((row) => ({
          jobRole: row.jobRole,
          empname: row.empname, // Assuming empname contains the member's _id
          empid: row.empid, // Assuming empid contains the member's _id
        }))
        .filter((row) => row.empid !== "" && row.empname !== ""),
      createdBy: userId,
    };

    // Check if there are changes compared to original projectData
    if (
      projectData.name === updatedProjectData.name &&
      projectData.status === updatedProjectData.status &&
      projectData.hourlyRate === updatedProjectData.hourlyRate &&
      projectData.budget === updatedProjectData.budget &&
      JSON.stringify(projectData.team) === JSON.stringify(updatedProjectData.team)
    ) {
      // No changes detected
      toast.info("No changes detected. Project not updated.");
      return;
    }

    try {
      const response = await axios.put(
        `https://ems-api.antiers.work/api/projectUpdate/${updatedData._id}`,
        updatedProjectData
      );
      toast.success("Project updated successfully!");
      onProjectCreated();
      console.log("Project updated successfully!", response);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  const handleJobRoleChange = (jobRoleId) => {
    const filtered = availableMembers.filter(
      (member) => member.jobRole === jobRoleId
    );
    setFilteredMembers(filtered);
  };

  return (
    <div className="createproject">
      <ToastContainer />
      <TextField
        className="name"
        id="outlined-basic"
        label="Project Name"
        variant="outlined"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <FormControl className="status">
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Deactive">Deactivate</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className="hourlyRate"
        id="outlined-basic"
        label="Hourly Rate"
        variant="outlined"
        type="number"
        value={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
      />
      <TextField
        className="budget"
        id="outlined-basic"
        label="Budget"
        variant="outlined"
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <hr />
      <InputLabel className="projectteam text-black">Project Team</InputLabel>
      {rows.map((item) => (
        <div key={item.id}>
          <FormControl sx={{ m: 1, ml: 4, mt: 2, minWidth: 186 }}>
            <InputLabel>Job Role</InputLabel>
            <Select
              label="Job Role"
              value={item.jobRole || ""}
              onChange={(e) =>
                handleChange(item, "jobRole", e.target.value)
              }
            >
              {jobRoles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 216 }}>
            <Autocomplete
              options={filteredMembers.map((member) => ({
                label: member.empname,
                id: member._id,
              }))}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Emp Name" variant="outlined" />
              )}
              value={availableMembers.find(member => member._id === item.empname) || null}
              onChange={(event, newValue) =>
                handleChange(item, "empname", { empname: newValue.id })
              }
            />


          </FormControl>
          <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 156 }}>
            <Autocomplete
              options={filteredMembers.map((member) => member.empid)}
              renderInput={(params) => (
                <TextField {...params} label="Emp ID" variant="outlined" />
              )}
              value={item.empid || ""}
              onChange={(e, newValue) =>
                handleChange(item, "empid", newValue)
              }
            />
          </FormControl>

          {item.id !== 1 && (
            <DeleteIcon
              className="deleteicon"
              onClick={() => handleDeleteRow(item.id)}
            />
          )}
        </div>
      ))}
      <Link
        className="addnewemp text-black text-decoration-none"
        onClick={handleAddRow}
      >
        + Add new Employee
      </Link>
      <hr />
      <Button
        className="createproject-btn float-end"
        variant="contained"
        onClick={isEditing ? handleUpdateProject : handleCreateProject}
      >
        {isEditing ? "Update" : "Create"}
      </Button>
    </div>
  );
}

