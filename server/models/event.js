import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    image: [{ type: String, required: true }],
    name: { type: String, required: true },
    description: { type: String },
    timeStart: { type: Date },
    timeEnd: { type: Date },
    price: Number
})

export const Event = mongoose.model("event", eventSchema)