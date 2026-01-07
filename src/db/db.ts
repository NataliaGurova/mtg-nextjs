// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!;

// export const connectDB = async () => {
//   if (mongoose.connection.readyState === 1) return;

//   try {
//     await mongoose.connect(MONGODB_URI, {
//       dbName: process.env.MONGODB_DB,
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// };

import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_DB = process.env.MONGODB_DB;

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing");
    throw new Error("Database configuration error");
  }

  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
    });

    console.log("✅ MongoDB connected:", MONGODB_DB);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};





