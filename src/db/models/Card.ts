
import { Schema, model, models } from "mongoose";

const FaceSchema = new Schema(
  {
    side: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { _id: false } // 🔥 КРИТИЧНО
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
  },
  {
    collection: "cards",
    timestamps: true,
  }
);

const Card = models.Card || model("Card", CardSchema);

export default Card;