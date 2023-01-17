import Customer from "../models/customer"
import { TicketCustomer } from "../models/customerTicket"
import { Ticket } from "../models/ticket"


export const createTicket = async (req, res, next) => {
    try {
        const { name, timeLimit, price } = req.body   
        const newTicket = new Ticket({ name, timeLimit, price })
        newTicket.save()
        return res.status(200).json({success: true, msg: 'Ticket created successfully', data: newTicket})
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const updateTicket = async (req, res, next) => {
    try {
        const data = await Ticket.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            timeLimit: req.body.timeLimit,
            price: req.body.price
        })
        if (!data) return res.status(404).json({ success: false, msg: 'Ticket not found' })
        return res.status(200).json({success:true, newTicket: data})
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const deleteTicket = async (req, res, next) => {
    try {
        const data = await Ticket.findByIdAndDelete(req.params.id)
        if (!data) return res.status(404).json({ success: false, msg: 'ticket not found' })
        return res.status(200).json({success:true, msg: 'ticket deleted successfully'})
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const getATicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        if (!ticket) return res.status(404).json({ success: false, msg: 'ticket not found' })
        return res.status(200).json({success: true, ticket: ticket})
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const getTickets = async (req, res, next) => {
    try {
        const data = await Ticket.find()
        return res.status(200).json({success: true, data: data})
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}


//Nhan vien soat ve tao ve

export const createCusTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.body.ticketId)
        const isCustomerExist = await Customer.findOne({ phone: req.body.phone })
        let customerId = isCustomerExist ? isCustomerExist._id : process.env.DEFAULT_CUS_ID
        let prePrice = isCustomerExist.isVip ? ticket.price * 0.8 : ticket.price
        const newCusTicket = {
            ticketId: req.body.ticketId,
            cusId: customerId,
            quantity: req.body.quantity,
            cusName: isCustomerExist ? isCustomerExist.name : req.body.name,
            cusPhone: req.body.cusPhone,
            isVip: isCustomerExist.isVip,
            loyalty: req.body.loyalty,
            price: prePrice * quantity,
            status: false
        }
        const  data = await TicketCustomer.create(newCusTicket)
        return res.status(200).json({success:true,data : data })
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}


//staff check in ve 
export const checkInTicket = async (req, res, next) => {
    try {
        const ticketCus = await TicketCustomer.findByIdAndUpdate(req.params.id, {checkIn: Date.now(), status: 1},{new: true})
        return res.status(200).json({success:true,ticketCus})
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const checkOutTicket = async (req, res, next) => {
    try {
        const ticketCus = await TicketCustomer.findById(req.params.id)
        const checkOutDate = Date.now
        const overPrice = ((Date.now - ticketCus.checkIn) - ticketCus.timeLimit) / 60 * 20000
        const updatedTicket = await TicketCustomer.findById(req.params.id, { checkOut: checkOutDate, overPrice: overPrice, status: -1 }, { new: true })
        return res.status(200).json({success:true,updatedTicket})
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const deleteCusTicket = async (req, res, next) => {
    try {
        await TicketCustomer.findByIdAndDelete(req.params.id)
    } catch (error) {
        
    }
}

export const preorderEventTicket = async (req, res, next) => {
    try {
        const cus = await Customer.findById(req.user)
        const data = {
            ticketId: req.body.ticketId,
            cusId: req.user,
            quantity: req.body.quantity,
            cusName: req.body.name,
            cusPhone: cus.phone,
            isPreOrder: true,
            isVip: cus.isVip,
            price: await Ticket.findById(req.body.ticketId).price*quantity*0.8,
            checkIn: req.body.checkIn,
            status: 0
        }
        const ticketEvent = await TicketCustomer.create(data)
        return res.status(200).json({success:true, ticketEvent})
    } catch (error) {
        return res.json({
            success:false,
            message: "Interval Server Error",
            error,
        })
    }   
}

const getAllCusTicket = async (req, res, next) => {
    try {
        const data = await TicketCustomer.find({})
    } catch (error) {
        
    }
}