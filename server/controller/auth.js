import crypto from "crypto";

import Customer from "../models/customer.js";
import { sendToken } from "../utils/auth.js";
import Staff from "../models/staff.js";
import { MailToken } from "../models/token.js";
import { sendEmail } from "../services/index.js";

export const signUp = async (req, res, next) => {
  const { email, password, confirmPassword, name, phone, address } = req.body;
  try {
    const existUser = await Customer.findOne({ email });

    if (existUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match" });

    const newUser = await Customer.create({
      email,
      password,
      name,
      phone,
      address,
    });

    let token = await new MailToken({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const message = `${process.env.BASE_URL}:${process.env.PORT}/auth/verify/${newUser._id}/${token.token}`;

    const isMailed = await sendEmail(newUser.email, "Verify Account", message);
    console.log(isMailed);
    res.status(200).json({succes: true, msg: "An Email sent to your account please verify"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, msg: "something went wrong" });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existUser = await Customer.findOne({ email });
    if (!existUser)
        return res.status(400).json({ success: false, msg: "User not found" });
    if (!(await existUser.isValidPassword(password)))
        return res.status(400).json({ success: false, msg: "Wrong password" });
      if (!existUser.status) 
        return res.status(400).json({ success: false, msg: "Email not verified" });
    sendToken(existUser, 200, req, res);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createStaff = async (req, res, next) => {
  const { email, password, name, phone, address } = req.body;
  const existStaff = await Staff.findOne({ email });
  if (existStaff)
    return res.status(400).json({ message: "Email already exists" });
  const newStaff = await Staff.create({
    email,
    password: password ? password : 1,
    name,
    phone,
    address,
    role: "staff",
  });
  sendToken(newStaff, 200, req, res);
};

export const signInStaff = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existStaff = await Staff.findOne({ email });
    if (!existStaff)
      return res.status(400).json({ success: false, msg: "User not found" });
    if (!(await existStaff.isValidPassword(password)))
      return res.status(400).json({ success: false, msg: "Wrong password" });
    sendToken(existStaff, 200, req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mss: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const user = await Customer.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({msg: 'Invalid Link', success: false});

    const token = await MailToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
      
    if (!token) return res.status(400).json({msg: 'Invalid Link', success: false});

    await Customer.findByIdAndUpdate(user._id, {status: true });
    await MailToken.findByIdAndRemove(token._id);

    return res.status(200).json({success: true, msg: 'email verified sucessfully'})
  } catch (error) {
      console.log(error);
    return res.status(400).json({msg:"An error occured"});
  }
};
