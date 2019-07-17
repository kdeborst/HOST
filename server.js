//Required Dependencies
const express = require('express');
const connectDB = require('./config/database');
const app = express();

//Connect to MongoDB
connectDB();
app.get('/', (req, res) => res.send('API Running'));

//Initialise Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/authentication', require('./routes/api/authentication'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/user', require('./routes/api/user'));

//Define Port(s)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
