// // models/Cart.ts
// import mongoose, { Schema } from 'mongoose'

// const CartItemSchema = new Schema({
//   productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantity: { type: Number, default: 1 },
// })

// const CartSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [CartItemSchema],
//   reservedAt: { type: Date, default: Date.now },
//   expireAt: { type: Date, default: () => new Date(Date.now() + 5 * 60 * 60 * 1000) },
// })

// // ← Это и есть магия: MongoDB сам чистит документы после expireAt
// CartSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

// export default mongoose.models.Cart || mongoose.model('Cart', CartSchema)

// src/db/models/Cart.ts
import mongoose, { Schema, models } from "mongoose";

const CartItemSchema = new Schema(
  {
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card", // Ссылка на вашу модель карточки MTG
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Количество не может быть меньше 1"],
      default: 1,
    },
  },
  { _id: false } // Отключаем генерацию отдельного _id для каждого элемента массива, нам хватит cardId
);

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // У одного пользователя может быть только одна активная корзина
    },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

const Cart = models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;