const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  customerId: {type: Number, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  _van: {type: mongoose.Schema.Types.ObjectId, 
    ref: "Van"}
})

const vanSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
  photos: {type: [String], required: false},
  price: {type: Number, required: false},
  sleeps: {type: Number, required: false},
  attributes: {type: [String], required: false},
  drive: {type: String, required: false},
  bookings: [bookingSchema]
})

const userSchema = new mongoose.Schema({
  name: {type: String, required: false},
  email: {type: String, required: true},
  password: {type: String, required: true},
  vans: [vanSchema]
})

const User = mongoose.model("User", userSchema)
const Van = mongoose.model("Van", vanSchema)
const Booking = mongoose.model("Booking", bookingSchema)


module.exports = {
  User,
  Van,
  Booking
}