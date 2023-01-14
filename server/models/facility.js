import mongoose from "mongoose";

const facilitySchema = mongoose.Schema({
    facilityCode: { type: String, required: true , unique: true},
    name: { type: String, default: "Naming" },
    max: {type: Number},
    status: {type: String}
})

export const Facility = mongoose.model('facility', facilitySchema);