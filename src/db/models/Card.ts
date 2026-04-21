// db/models/Card.ts

// import { Schema, model, models } from "mongoose";

// const FaceSchema = new Schema(
//   {
//     side: {
//       type: String,
//       required: true,
//       enum: ["front", "back"],
//     },

//     images: {
//       small: {
//         type: String,
//         required: true,
//       },

//       normal: {
//         type: String,
//         required: true,
//       },
//     },
//   },
//   { _id: false }
// );


// const CardSchema = new Schema(
//   {
//     scryfall_id: { type: String, required: true, unique: true },
//     name: String,
//     set: String,
//     set_name: String,
//     rarity: String,
//     artist: String,
//     type_line: String,
//     colors: [String],
//     legalities: {
//       type: Map,
//       of: {
//         type: String,
//         enum: ["legal", "not_legal", "banned", "restricted"],
//       },
//       default: {},
//     },
//     faces: [FaceSchema],
//     variant: String,
//     foilType: String,
//     collector_number: String,
//     prices: { type: Number, default: 0 },
//     quantity: { type: Number, default: 0 },

//     lang: { type: String, default: "en" },
//     isFoil: { type: Boolean, default: false },
//      // 🔹 поле состояния карты
//     condition: {
//       type: String,
//       enum: ["NM", "LP", "HP"],
//       default: "NM",
//       required: true,
//     },
//   },
//   {
//     collection: "cards",
//     timestamps: true,
//   }
// );

// CardSchema.index({ name: 1 });
// CardSchema.index({ set: 1 });
// CardSchema.index({ rarity: 1 });
// CardSchema.index({ artist: 1 });
// CardSchema.index({ type_line: 1 });
// CardSchema.index({ colors: 1 });
// CardSchema.index({ createdAt: -1 });

// CardSchema.index({ name: "text", set_name: "text" });

// CardSchema.index({ name: 1, set: 1 });
// CardSchema.index({ scryfall_id: 1, isFoil: 1 });
// CardSchema.index({ rarity: 1, set: 1 });

// const Card = models.Card || model("Card", CardSchema);

// export default Card;





import { Schema, model, models } from "mongoose";

const FaceSchema = new Schema(
  {
    side: {
      type: String,
      required: true,
      enum: ["front", "back"],
    },

    images: {
      small: {
        type: String,
        required: true,
      },

      normal: {
        type: String,
        required: true,
      },
    },
  },
  { _id: false }
);

const CardSchema = new Schema(
  {
    scryfall_id: { type: String, required: true, unique: true },
    name: String,
    set: String,
    set_name: String,
    rarity: String,
    artist: String,
    type_line: String,
    colors: [String],
    legalities: {
      type: Map,
      of: {
        type: String,
        enum: ["legal", "not_legal", "banned", "restricted"],
      },
      default: {},
    },
    faces: [FaceSchema],
    variant: String,
    foilType: String,
    collector_number: String,
    prices: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },

    lang: { type: String, default: "en" },
    isFoil: { type: Boolean, default: false },
     // 🔹 поле состояния карты
    condition: {
      type: String,
      enum: ["NM", "LP", "HP"],
      default: "NM",
      required: true,
    },
    
    // 🔹 Добавляем массив для отслеживания резервов корзины
    reservations: [{
      _id: false, // чтобы Mongo не создавала лишние ID для поддокументов
      userId: { type: String, required: true },
      qty: { type: Number, required: true },
      expiresAt: { type: Date, required: true }
    }]
  },
  {
    collection: "cards",
    timestamps: true,
  }
);

// Оптимизированные индексы
CardSchema.index({ name: 1, set: 1 });
CardSchema.index({ set: 1 });
CardSchema.index({ scryfall_id: 1, isFoil: 1 });
CardSchema.index({ rarity: 1, set: 1 });
CardSchema.index({ name: "text", set_name: "text" });

CardSchema.index({ isFoil: 1 });
// Текстовый индекс для поиска по имени, чтобы поиск работал еще быстрее
CardSchema.index({ name: 'text' });

const Card = models.Card || model("Card", CardSchema);

export default Card;