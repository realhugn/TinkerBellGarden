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
        if (!staff) return res.status(404).json({ msg: "No Staff found" });
        return res.status(200).json({data: staff})
    } catch (error) {
        return res.json({
            message: "Interval Server Error",
            error,
        })
    }
}

export const changePassword = async (req, res, next) => {
    try {
        const _id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message: 'invalid id' })

        const { oldPassword, newPassword, confirmNewPassword } = req.body

        if (!oldPassword || !newPassword || !confirmNewPassword)
            return res.status(400).json({ success: false, msg: 'Please fill all the field' })
        if (newPassword !== confirmNewPassword)
            return res.status(400).json({ success: false, msg: "New password and confirm password do not match" })
        const staff = await Staff.findById(_id)
        if (! await staff.isValidPassword(oldPassword)) return res.status(400).json({success: false, msg: "Wrong old password"})
        const updatePassword = await bcrypt.hash(newPassword, 12)
        const updatedStaff = await Staff.findByIdAndUpdate(_id, {password: updatePassword})
        return res.status(200).json({success: true,msg: 'Update new password successfully', data : updatedStaff})
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Interval Server Error",
            error,
        })
    }
}

export const updateStaff = async (req, res, next) => {
    try {
        let params = {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address
        }
        for (let prop in params) if (!params[prop]) delete params[prop]
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({success:false, msg: 'invalid id'})
        const newData = await Staff.findByIdAndUpdate(req.params.id, params, { new: true }).select('-password')
         if (!newData)
            return res.json({
                success: false,
                msg:"No Staff found"
            }) 
        return res.status(200).json({
            success: true,
            msg: "Updated Successfully",
            data: newData
        })
    } catch (error) {
        return res.json({
            message: "Interval Server Error",
            error,
        })
    }
}

export const deleteStaff = async (req, res, next) => {
    try {
        const _id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message: 'invalid id' })
        const data = await Staff.findById(_id);
        if (data)
        {
            await Staff.findByIdAndUpdate(_id,{status: false},{new: true})                  
            return res.status(200).json({ msg: "Delete Succesfully"})}
        else
            return res.json({
                success: false,
                msg:"No user found"
            }) 
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Interval Server Error",
            error,
        })
    }
}