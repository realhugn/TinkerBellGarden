import mongoose from 'mongoose'

const feedbackSchema = mongoose.Schema({
    problem: { type: String },
    idea: {type: String},
    star: { type: Number },
    from: {type: mongoose.Schema.Types.ObjectId , ref: 'customer',require: true}
}, { timestamps: true })


export const FeedBack = mongoose.model('feedback', feedbackSchema)