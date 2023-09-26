const {setError} = require("../config/error")
const { Booking } = require("../models/mongo")
const {
  getAllBookingsFromDb, 
  getBookingByIdFromDb, 
  updateBookingInDb,
  deleteBookingFromDb
} = require("../repositories/bookings")
const {getVanByIdFromDb, updateVanInDb} = require("../repositories/vans")

const getAllBookings = async (req,res,next)=> {
try
  {const {filter} = req.query
  const bookings = await getAllBookingsFromDb(filter)
  res.status(200).json({data: bookings})}
  catch {
    return next(setError(400, "Can't find bookings"))
  }

}

const getBookingById = async (req,res,next) => {
  try
  {const {id} = req.params
      const booking = await getBookingByIdFromDb(id)
      res.status(200).json({data: booking})}
      catch {
        return next(setError(400, "Can't find booking"))
      }
}

const addBooking = async (req, res,next) => {

  try
  {const id = req.params.id
    console.log(id)
  const newBooking = new Booking({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    _van: id
  })
  console.log(newBooking)
  await newBooking.save()
  let van = await getVanByIdFromDb(id)
  console.log(van.bookings)
van.bookings.push(newBooking)
const updatedVan = await updateVanInDb(id, van)
  res.status(201).json(newBooking)
  console.log(`New booking ${newBooking._id} added to van ${updatedVan._id}`)}
  catch {
    return next(setError(400, "Can't add booking"))
  }
}

const deleteBooking = async (req,res,next)=>{
  try
  {const {id} = req.params
  const {bookingid} = req.params
  let van = await getVanByIdFromDb(id)
  van.bookings.pull(bookingid)
  await updateVanInDb(id, van)
  await deleteBookingFromDb(bookingid)
  res.status(200).json({data: "Booking deleted from van and bookings table"})}
catch {
return next(setError(400, "Can't delete booking"))
}
}

const updateBookingById = async (req, res,next) => {
  try
  {const {bookingid} = req.params
const booking = await updateBookingInDb(bookingid, req.body)
res.status(200).json({data: booking})}
catch {
  return next(setError(400, "Can't update booking"))
}
}

module.exports = {
  getAllBookings, 
  getBookingById, 
  addBooking,
  deleteBooking,
  updateBookingById
}