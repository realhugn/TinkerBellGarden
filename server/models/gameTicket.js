import mongoose from "mongoose";

const gameTicketSchema = mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: {type: Number, required: true}
})

export const GameTicket = mongoose.model("gameTicket", gameTicketSchema);