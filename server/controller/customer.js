import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import Customer from '../models/customer.js'

export const updateCustomer = async (req, res, next) => {
    try {
        let params = {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address
        }
        for (let prop in params) if (!params[prop]) delete params[prop]
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ success: false, msg: 'invalid id' })
        const oldPhone = await Customer.findById(req.params.id).phone
        const newData = await Customer.findByIdAndUpdate(req.params.id, params, { new: true }).select('-password')
        if(newData.phone !== oldPhone) return res.status(400).json({success: false, msg: 'Phone already use'})
         if (!newData)
            return res.json({
                success: false,
                msg:"No Customer found"
            }) 
        return res.status(200).json({
            success: true,
            msg: "Updated Successfully",
            data: newData
        })
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const allCustomer = async (req, res, next) => {
    try {
        const customers = await Customer.find().select('-password');
        return res.status(200).send(customers);
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
    
}

export const getCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.user._id).select('-password');
        if (!customer) return res.status(404).json({success:false, msg: "No customer found" });
        return res.status(200).json({success: true,data: customer})
    } catch (error) {
         return res.status(500).json(
             {
            success: false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const deleteCustomer = async (req, res, next) => {
    try {
        const _id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ success: false,message: 'invalid id' })
        const data = await Customer.findById(_id);
        if (data)
        {
            data.status = false
            await Customer.findByIdAndUpdate(_id,data,{new: true})                  
            return res.status(200).json({ success: true,msg: "Delete Succesfully"})}
        else
            return res.json({
                success: false,
                msg:"No user found"
            }) 
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const changePassword = async (req, res, next) => {
    try {
        const _id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({success: false, message: 'invalid id' })

        const { oldPassword, newPassword, confirmNewPassword } = req.body

        if (!oldPassword || !newPassword || !confirmNewPassword)
            return res.status(400).json({ success: false, msg: 'Please fill all the field' })
        if (newPassword !== confirmNewPassword)
            return res.status(400).json({ success: false, msg: "New password and confirm password do not match" })
        const customer = await Customer.findById(_id)
        if (! await customer.isValidPassword(oldPassword)) return res.status(400).json({success: false, msg: "Wrong old password"})
        const updatePassword = await bcrypt.hash(newPassword, 12)
        const updatedCustomer = await Customer.findByIdAndUpdate(_id, {password: updatePassword})
        return res.status(200).json({success: true,msg: 'Update new password successfully', data : updatedCustomer})
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}