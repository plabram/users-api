const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
  name: {type: String, required: false},
  email: {type: String, required: true},
  password: {type: String, required: true},
})

const vanSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
  photos: {type: [String], required: false},
  price: {type: Number, required: false},
  sleeps: {type: Number, required: false},
  attributes: {type: [String], required: false},
  drive: {type: String, required: false},
})

const bookingSchema = new mongoose.Schema({
  customerId: {type: Number, required: true},
  customerName: {type: String, required: true},
  date: {type: Date, required: true},
})

const User = mongoose.model("User", userSchema)
const Van = mongoose.model("Van", vanSchema)
const Booking = mongoose.model("Booking", bookingSchema)


module.exports = {
  User,
  Van,
  Booking
}