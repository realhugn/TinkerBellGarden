import mongoose from "mongoose";

const mailTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'customer',
        required: true
    },
    token: {
        type: String,
        required: true
    }
})

export const MailToken = mongoose.model('mailToken', mailTokenSchema)