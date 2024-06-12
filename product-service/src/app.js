const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));

