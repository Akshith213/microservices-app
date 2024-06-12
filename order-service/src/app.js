const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));

