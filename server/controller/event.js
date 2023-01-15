import { Event } from "../models/event"
import { Ticket } from "../models/ticket"

export const createEvent = async (req, res, next) => {
    try {
        const data = new Event(req.body)
        await Event.save()
        const eventTicket = {
            ticketType: 'Event',
            name: `Ticket for ${req.body.name}`,
            price: req.body.price,
            event: data._id
        }
        await Ticket.create(eventTicket)
        return res.status(200).json({ success: true, data })
    } catch (error) {
         return res.status(500).json({
            message: "Interval Server Error",
            error,
        })
    }
}

export const updateEvent = async (req, res, next) => {
    try {
        let params = {
            image: [req.body.image],
            name: req.body.name,
            description: req.body.name,
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,
            price: req.body.price
        }
        for (let prop in params) if (!params[prop]) delete params[prop]
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ success: false, msg: 'invalid id' })
        const newData = await Customer.findByIdAndUpdate(req.params.id, params, { new: true })
        if (!newData) return res.status(400).json({ success: false, msg: 'Can not find event' })
        await Ticket.findOneAndUpdate({ event: req.params.id }, { name: newData.name, price: newData.price }, { new: true })
        return res.status(200).json({success: true, updEvent: newData, msg: 'update successfully'})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const deleteEvent = async (req, res, next) => {
    try {
        await Ticket.findOneAndDelete({ event: req.params.id })
        await Event.findByIdAndDelete(req.params.id)
        return res.status(200).json({success: true, msg: 'Deleted Successfully'})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const getEvents = async (req, res, next) => {
    try {
        const data = await Event.find()
        return res.status(200).json({success: true, data})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Interval Server Error",
            error,
        })
    }
}

export const getAEvent = async (req, res, next) => {
    try {
        const data = await Event.findById(req.params.id)
        if(!data) return res.status(400).json({success: false, msg: 'No Event Found'})
        return res.status(200).json({success: true, data})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Interval Server Error",
            error,
        })
    }
}

