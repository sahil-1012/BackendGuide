// index.js
const express = require('express');
const connectDB = require('./connectDB');  // Import the connectDB function
const app = express();
const PORT = 3000;

const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const loginRoutes = require('./routes/loginRoutes'); // Import userRoutes
app.use(express.json()); // To ensure we are passing json body

// Connect to the database
connectDB();

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running. Welcome!');
});

// Define userRoutes
app.use('/api', userRoutes);
// Define loginRoutes
app.use('/', loginRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});