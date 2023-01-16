import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const staffSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    name: {type:String, required: true},
    phone: { type: String },
    address: { type: String },
    role: { type: String, enum: ["staff", "manager"] },
    status: {type: Boolean, default: true}
}, { timestamps: true })

staffSchema.pre('save', async function (next) {
    const staff = this
    if (staff.isModified('password')) {
        staff.password = await bcrypt.hash(staff.password, 12)
    }
    next()
})

staffSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error()
    }
};

const Staff = mongoose.model("staff", staffSchema);

export default Staff;