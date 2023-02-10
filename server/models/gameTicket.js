import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    code: String,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    location: String,
    type: ['Casual', 'Other']
})

export const Game = mongoose.model("game", gameSchema);