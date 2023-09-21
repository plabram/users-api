const { now } = require("mongoose")
const {
  getAllVansFromDb, 
  getVanByIdFromDb, 
  createVanInDb,
  updateVanInDb,
  deleteVanFromDb
} = require("../repositories/vans")
// const {
//   deleteReviewFromDb,
//   deleteAllReviewsFromDb
// } = require("../repositories/reviews")
// const { Review } = require("../models/mongo")
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

// const addReview = async (req, res,next) => {
//   try
//   {const id = req.params.id
//   const newReview = new Review({
//     stars: req.body.stars,
//     title: req.body.title,
//     text: req.body.text,
//     _van: id
//   })
//   await newReview.save()
//   let van = await getVanByIdFromDb(id)
// van.reviews.push(newReview)
// const updatedVan = await updateVanInDb(id, van)
//   res.status(201).json(newReview)
//   console.log(`New review ${newReview._id} added to van ${updatedVan._id}`)}
//   catch {
//     return next(setError(400, "Can't add review"))
//   }
// }

const deleteVan = async (req,res,next)=>{
  try
  {const {id} = req.params
  // const deletedReviews = await Review.deleteMany({_van: id}) // alt method
  // await deleteAllReviewsFromDb(id)
  await deleteVanFromDb(id)
  res.status(200).json({data: "Van deleted"})}
  catch {
    return next(setError(400, "Can't delete van"))
  }
  }

//   const deleteReview = async (req,res,next)=>{
//     try
//     {const {id} = req.params
//     const {reviewid} = req.params
//     let van = await getVanByIdFromDb(id)
//     van.reviews.pull(reviewid)
//     await updateVanInDb(id, van)
//     await deleteReviewFromDb(reviewid)
//     res.status(200).json({data: "Review deleted from van and reviews table"})}
//  catch {
//   return next(setError(400, "Can't delete review"))
//  }
//   }

module.exports = {
  getAllVans, 
  getVanById, 
  createVan,
  updateVanById,
  // addReview,
  deleteVan,
  // deleteReview
}