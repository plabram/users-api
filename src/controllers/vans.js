const {
  getAllVansFromDb, 
  getVanByIdFromDb, 
  createVanInDb,
  updateVanInDb,
  deleteVanFromDb
} = require("../repositories/vans")
 const { deleteAllBookingsFromDb } = require("../repositories/bookings")
const {getUserByIdFromDb, updateUserInDb} = require("../repositories/users")
const {setError} = require("../config/error")
const { Van, ReducedVan } = require("../models/mongo")

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

const updateVanById = async (req, res,next) => {
  try {const {id} = req.params
const van = await updateVanInDb(id, req.body)
res.status(200).json({data: van})}
catch {
  return next(setError(400, "Can't update van"))
}
}

const addVan = async (req, res,next) => {

    try
    {const id = req.params.id
      
    const newVan = new Van({
      title: req.body.title,
      description: req.body.description,
      photos: req.body.photos,
      price: req.body.price,
      sleeps: req.body.sleeps,
      attributes: req.body.attributes,
      drive: req.body.drive,
      bookings: req.body.bookings,
      _user: id
    })
    // await newVan.save()
    await createVanInDb(newVan)

    const newReducedVan = new ReducedVan({
      title: req.body.title,
      _id: newVan._id
    })
    let user = await getUserByIdFromDb(id)
  user.vans.push(newReducedVan)
  const updatedUser = await updateUserInDb(id, user)
    res.status(201).json(newVan)
    console.log(`New van ${newVan._id} added to user ${updatedUser._id}`)}
    catch {
      return next(setError(400, "Can't add van"))
    }
  }
  
  const deleteVan = async (req,res,next)=>{
    try
    {const {id} = req.params
    const {vanid} = req.params
    console.log(id, vanid)
    // remove van from user
    let user = await getUserByIdFromDb(id)
    user.vans.pull(vanid)
    await updateUserInDb(id, user)
    // remove associated bookings from bookings table
    await deleteAllBookingsFromDb(vanid)
    // remove van from db
    await deleteVanFromDb(vanid)
    res.status(200).json({data: "Van deleted from user and vans table. Associated bookings deleted from bookings table."})}
  catch {
  return next(setError(400, "Can't delete van"))
  }
  }

module.exports = {
  getAllVans, 
  getVanById, 
  addVan,
  updateVanById,
  deleteVan
}