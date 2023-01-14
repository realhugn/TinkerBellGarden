import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    ticketType: { type: String, enum: ['Event', 'Unlimited', 'Casual'], required: true },
    name: { type: String, required: true },
    cusId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer', default: process.env.DEFAULT_CUS_ID },
    quantity: { type: Number, default: 1 },
    cusName: { type: String},
    cusPhone: { type: String, required: true},
    isPreOrder: { type: Boolean, required: true },
    isVip: {type: Boolean,required: true},
    loyalty: { type: Boolean, default: false},
    price: { type: Number, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'event' },
    game: [{type: mongoose.Schema.Types.ObjectId, ref: 'gameTicket'}],
    overPrice: {type: Number, default: 0}
}, { timestamps: true })

export const Ticket =  mongoose.model('ticket', ticketSchema)