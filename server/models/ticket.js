import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    ticketType: { type: String, enum: ['Event', 'Casual'], required: true },
    name: { type: String, required: true },
    timeLimit :{type: Number, default: 0},
    price: { type: Number, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'event' },
    status: {type: Boolean, default: 0},
}, { timestamps: true })

export const Ticket =  mongoose.model('ticket', ticketSchema)