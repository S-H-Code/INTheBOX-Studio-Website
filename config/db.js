import mongoose from 'mongoose';

let isDbConnected = false;

export const connectDB = async () => {
  if (isDbConnected && mongoose.connection.readyState === 1) {
    return true;
  }
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inthebox_studio';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500
    });
    isDbConnected = true;
    console.log(`[Database] MongoDB connection established: ${conn.connection.host}`);
    return true;
  } catch (err) {
    isDbConnected = false;
    console.warn(`[Database] MongoDB connection not active (${err.message}).`);
    console.warn(`[Database] Running in robust development mode with resilient memory fallback.`);
    console.warn(`[Database] Configure MONGO_URI in server/.env (e.g. MongoDB Atlas cluster) to persist permanently.`);
    return false;
  }
};

export const getDbStatus = () => isDbConnected;
