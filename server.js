const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const leaderboardRoutes = require('./routes/leaderboard');
const farmRoutes = require('./routes/farmRoutes');
const inviteRoutes = require('./routes/invite');

require('./telegramBot'); // Adjust the path if necessary


dotenv.config();
console.log('MongoDB URI:', process.env.MONGODB_URI); // Log the URI


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allows requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
}));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {  // Change MONGO_URI to MONGODB_URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Routes
app.use('/tasks', taskRoutes); // Task routes
app.use('/users', userRoutes); // User routes
app.use('/leaderboard', leaderboardRoutes); // Leaderboard routes
app.use('/farm', farmRoutes);
app.use('/invite', inviteRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
