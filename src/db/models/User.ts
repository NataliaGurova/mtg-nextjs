

// import { Schema, model, models, Types } from "mongoose";

// export interface IUser {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   // 🔹 1. Добавляем wishlist в интерфейс.
//   // Это может быть массив строк (ID) или полных объектов (если использовать .populate())
//   wishlist: Types.ObjectId[] | string[];
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

//     // 🔹 2. ДОБАВЛЯЕМ WISHLIST В СХЕМУ
//     wishlist: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Card", // Указываем, что ID ссылаются на модель Card
//       },
//     ],

//     // role: { type: String, default: "user" }, // "user" или "admin"

//     resetPasswordToken: {
//       type: String,
//     },
    
//     resetPasswordExpire: {
//       type: Date,
//     },

//     emailVerified: {
//       type: Boolean,
//       default: false,
//     },
//     emailVerificationToken: {
//       type: String,
//       select: false, // 🔐 не отдаём токен в ответах
//     },
//     emailVerificationTokenExpire: {
//       type: Date,
//       select: false, // 🔐 не отдаём дату истечения токена
//     },
    
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// export default models.User || model<IUser>("User", UserSchema);


// variant B
import { Schema, model, models, Types } from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailVerified: boolean;
  wishlist: string[];
  createdAt: Date;
  updatedAt: Date;
}

const capitalize = (value: string) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const UserSchema = new Schema<IUser>(
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
      select: false, // 🔐 не отдаём пароль в ответах
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    wishlist: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model<IUser>("User", UserSchema);