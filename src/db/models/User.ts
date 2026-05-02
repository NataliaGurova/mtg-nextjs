
// import { Schema, model, models } from "mongoose";

// export interface IUser {
//     _id: string;
//     email: string;
//     password: string;
//     name?: string;
//     createdAt: Date;
//   }

// const UserSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       select: false, // 🔐 важно
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// export default models.User || model("User", UserSchema);







// // src/db/models/User.ts

// import { Schema, model, models } from "mongoose";

// export interface IUser {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   createdAt: Date;
// }

// const capitalize = (value: string) => {
//   if (!value) return value;
//   return value.charAt(0).toUpperCase() + value.slice(1);
// };

// const UserSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       trim: true,
//       set: capitalize,
//     },

//     lastName: {
//       type: String,
//       required: true,
//       trim: true,
//       set: capitalize,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       select: false, // 🔐 не отдаём пароль
//     },

//     // role: { type: String, default: "user" }, // "user" или "admin"

//     resetPasswordToken: {
//       type: String,
//     },
    
//     resetPasswordExpire: {
//       type: Date,
//     },
    
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// export default models.User || model<IUser>("User", UserSchema);

import { Schema, model, models, Types } from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // 🔹 1. Добавляем wishlist в интерфейс. 
  // Это может быть массив строк (ID) или полных объектов (если использовать .populate())
  wishlist: Types.ObjectId[] | string[]; 
  createdAt: Date;
}

const capitalize = (value: string) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      set: capitalize,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      set: capitalize,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 не отдаём пароль
    },

    // 🔹 2. ДОБАВЛЯЕМ WISHLIST В СХЕМУ
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card", // Указываем, что ID ссылаются на модель Card
      },
    ],

    // role: { type: String, default: "user" }, // "user" или "admin"

    resetPasswordToken: {
      type: String,
    },
    
    resetPasswordExpire: {
      type: Date,
    },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model<IUser>("User", UserSchema);

