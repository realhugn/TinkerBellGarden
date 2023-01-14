import Customer from "../models/customer.js";
import Staff from "../models/staff.js";

export const createDefault = async () => {
  try {
    const defaultCus = { email: "default@gmail.com", password: "1", name: "default" }
    const manager = {email: "manager@manager.com",password: 'manager', name: 'manager', role: 'manager'}
    let existDefaultCus = await Customer.findOne({ email: "default@gmail.com" })  
    let existManager = await Staff.findOne({ email: 'manager@manager.com' })
    if (!existDefaultCus) {
        existDefaultCus = await Customer.create(defaultCus)
    }
    if (!existManager) {
      existManager = await Staff.create(manager)
    }
    console.log(existDefaultCus._id, existManager._id);
  } catch (error) {
    console.log(error)
  }
}