import { Schema, model, models } from "mongoose";

export type TokenType = "email_verification" | "password_reset";

export interface IToken {
  _id: string;
  email: string;
  token: string;
  type: TokenType;
  expires: Date;
  createdAt: Date;
}

const TokenSchema = new Schema<IToken>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["email_verification", "password_reset"],
      required: true,
    },

    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// TTL-индекс — MongoDB сам удалит документ когда expires наступит
TokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

// Быстрый поиск по email + type (нужен в каждом роуте)
TokenSchema.index({ email: 1, type: 1 });

export default models.Token || model<IToken>("Token", TokenSchema);