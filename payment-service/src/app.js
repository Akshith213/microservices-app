const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/payments', require('./routes/paymentRoutes'));

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Payment service running on port ${PORT}`));
