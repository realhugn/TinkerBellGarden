import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const customerSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    name: {type:String, required: true},
    phone: { type: String ,required: true, unique: true},
    address: { type: String },
    status: {type: Boolean, default: false},
    isVip: { type: Boolean, default: false },
    timeVip: {
        type: Date,
        required: false
    },
    activeToken: String,
    activeExpires: Date,
}, { timestamps: true })

customerSchema.pre('save', async function (next) {
    const customer = this
    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 12)
    }
    next()
})

customerSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error()
    }
};

const Customer = mongoose.model("customer", customerSchema);

export default Customer;