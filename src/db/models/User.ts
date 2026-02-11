
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

import { Schema, model, models } from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
