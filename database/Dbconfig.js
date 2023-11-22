import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const mongoURL = process.env.MONGODBCONNECTIONSTRING;
  const connection = await mongoose.connect(mongoURL);
  console.log("connected to mongoDB");

  return connection;
};

export default connectDB