const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file
const cors = require("cors")
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const auth = require('./routers/routes'); // Adjust the path as necessary
const projects = require('./routers/project')

app.use('/api', auth);
app.use('/api', projects)

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
