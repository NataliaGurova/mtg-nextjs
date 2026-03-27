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