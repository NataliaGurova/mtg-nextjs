import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};



