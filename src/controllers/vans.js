const { now } = require("mongoose")
const {
  getAllVansFromDb, 
  getVanByIdFromDb, 
  createVanInDb,
  updateVanInDb,
  deleteVanFromDb
} = require("../repositories/vans")
const {
  deleteBookingFromDb,
  deleteAllBookingsFromDb
} = require("../repositories/bookings")
const { Booking } = require("../models/mongo")
const {setError} = require("../config/error")

const getAllVans = async (req,res,next)=> {
try
  {const {filter} = req.query
  const vans = await getAllVansFromDb(filter)
  res.status(200).json({data: vans})}
  catch {
    return next(setError(400, "Can't find vans"))
  }
}

const getVanById = async (req,res,next) => {
  try
  {const {id} = req.params
      const van = await getVanByIdFromDb(id)
      res.status(200).json({data: van})}
      catch {
        return next(setError(400, "Can't find van"))
      }
}

const createVan = async (req, res,next) => {
try
  {const vanObject = {...req.body}
const newVan = await createVanInDb(vanObject)
  res.status(201).json({data: newVan})}
  catch {
    return next(setError(400, "Can't create van"))
  }
}

const updateVanById = async (req, res,next) => {
  try {const {id} = req.params
const van = await updateVanInDb(id, req.body)
res.status(200).json({data: van})}
catch {
  return next(setError(400, "Can't update van"))
}
}

const addBooking = async (req, res,next) => {

  try
  {const id = req.params.id
  const newBooking = new Booking({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    _van: id
  })
  await newBooking.save()
  let van = await getVanByIdFromDb(id)
van.bookings.push(newBooking)
const updatedVan = await updateVanInDb(id, van)
  res.status(201).json(newBooking)
  console.log(`New booking ${newBooking._id} added to van ${updatedVan._id}`)}
  catch {
    return next(setError(400, "Can't add booking"))
  }
}

const deleteVan = async (req,res,next)=>{
  try
  {const {id} = req.params
  await Booking.deleteMany({_van: id}) // alt method
  // await deleteAllBookingsFromDb(id)
  await deleteVanFromDb(id)
  res.status(200).json({data: "Van deleted"})}
  catch {
    return next(setError(400, "Can't delete van"))
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

module.exports = {
  getAllVans, 
  getVanById, 
  createVan,
  updateVanById,
  addBooking,
  deleteVan,
  deleteBooking
}