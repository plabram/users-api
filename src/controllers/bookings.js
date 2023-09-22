const { now } = require("mongoose")
const {setError} = require("../config/error")

const {
  getAllBookingsFromDb, 
  getBookingByIdFromDb, 
  updateBookingInDb,
} = require("../repositories/bookings")

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

const updateBookingById = async (req, res,next) => {
  try
  {const {id} = req.params
  let dateUpdate = req.body
  dateUpdate.lastUpdated = new Date
  console.log(dateUpdate)
const booking = await updateBookingInDb(id, req.body)
res.status(200).json({data: booking})}
catch {
  return next(setError(400, "Can't update booking"))
}
}

module.exports = {
  getAllBookings, 
  getBookingById, 
  updateBookingById,
}