import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import Staff from '../models/staff.js'

export const getAllStaffs = async (req, res, next) => {
    try {
        const staffs = Staff.find({role: 'staff'})
        return res.status(200).json({msg: "All staffs", data: staffs})
    } catch (error) {
        return res.json({
            message: "Interval Server Error",
            error,
        })
    }
}

export const getStaff = async (req, res, next) => {
    try {
        const staff = await Staff.findById(req.user._id).select('-password');
        if (!staff) return res.status(404).json({ msg: "No customer found" });
        return res.status(200).json({data: staff})
    } catch (error) {
        return res.json({
            message: "Interval Server Error",
            error,
        })
    }
}