import jwt from 'jsonwebtoken'

export const sendToken = (user, statusCode, req, res) => {
    const dataSign = user.role ? { _id: user._id ,role: user.role} : { _id: user._id }
    const token = jwt.sign(dataSign, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({
        success: true,
        data: user,
        token: token
    })
}