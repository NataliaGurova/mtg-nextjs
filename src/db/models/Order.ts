import { Schema, model, models } from "mongoose";

export interface IOrder {
  _id: string;
  userId: Schema.Types.ObjectId;
  items: {
    productId: Schema.Types.ObjectId;
    title: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  createdAt: Date;
}

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Order || model<IOrder>("Order", OrderSchema);
