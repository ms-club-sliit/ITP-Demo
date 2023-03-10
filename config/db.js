const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI);
    if (dbConnection) {
      console.log('MongoDB connected');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
