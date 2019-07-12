//Required Dependencies
const mongoose = require('mongoose');
const config = require('config');
const database = config.get('mongoURI');

//Connect Function
const connectDB = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('Database connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
