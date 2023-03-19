import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";


mongoose.set('strictQuery', false);
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB is conected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
