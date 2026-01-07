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

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not set in environment variables");
}

export const connectDB = async () => {
  // если уже подключено, просто возвращаем
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
    });
    console.log("✅ MongoDB connected:", MONGODB_DB);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error; // выбрасываем ошибку, чтобы API не молчал
  }
};




