import mongoose from "mongoose";

const ticketCustomerSchema = mongoose.Schema({
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'ticket' },
    cusId: {type: mongoose.Schema.Types.ObjectId,ref: 'customer', default: process.env.DEFAULT_CUS_ID},
    quantity: { type: Number, default: 1 },
    cusName: { type: String},
    cusPhone: { type: String, required: true},
    isPreOrder: { type: Boolean, default: false},
    isVip: { type: Boolean, required: true },
    loyalty: {type:Boolean ,required :true},
    price: { type: Number, required: true },
    game: [{
        gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'gameTicket' },
        quantity: Number
        }
    ],
    overPrice: { type: Number, default: 0 },
    status: {type: Number, enum: [-1,0,1], default: 0}
}, {timestamps: true})

export const TicketCustomer =  mongoose.model('ticketCustomer', ticketCustomerSchema)