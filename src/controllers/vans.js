const {
  getAllVansFromDb, 
  getVanByIdFromDb, 
  createVanInDb,
  updateVanInDb,
  deleteVanFromDb
} = require("../repositories/vans")
const {
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

const deleteVan = async (req,res,next)=>{
  try
  {const {id} = req.params
  await deleteAllBookingsFromDb(id)
  // await Booking.deleteMany({_van: id})
  await deleteVanFromDb(id)
  res.status(200).json({data: "Van deleted"})}
  catch {
    return next(setError(400, "Can't delete van"))
  }
  }

module.exports = {
  getAllVans, 
  getVanById, 
  createVan,
  updateVanById,
  deleteVan
}