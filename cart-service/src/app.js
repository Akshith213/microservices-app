const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/cart', require('./routes/cartRoutes'));

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => console.log(`Cart service running on port ${PORT}`));
