import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import Customer from "../models/customer.js";

export const verifyToken = async(req, res, next) => {
    try {
        const authHeader = req.headers?.authorization
        const token = authHeader && authHeader.split(" ")[1]; 
        if (!token) {
            return res.status(403).send({message: "missing token"})
        } 
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) return res.status(403).send({ message: error })
            req.user = user
            next()
        })

    } catch (error) {
        console.log(error)
    }
}

export const isAuth = async (req, res, next) => {
    try {
        let loggedInUserId = req.params.id;
        //manager always auth
        if(req.user.role != "manager")
            if (!loggedInUserId || !req.user._id || loggedInUserId !== req.user._id) 
                return res.status(403).json({ msg: "You are not authenticate" });
        next()
    } catch (error) {
        return res.status(404).json({msg: error});
    }
}

export const isManager = async (req, res, next) => {
    try {
        if (!req.user.role) return res.status(400).json({ msg: "missing role" })
        if (req.user.role !== 'manager') //only manager can create staff
            return res.status(403).json({ msg: 'you are not the manager' })
        next()
    } catch (error) {
        return res.status(404).json({msg: error});
    }
}

