const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Create a new project
router.post('/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
