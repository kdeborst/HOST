//Required Dependencies
const express = require('express');
const connectDB = require('./config/database');
const app = express();

//Connect to MongoDB Database
connectDB();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
