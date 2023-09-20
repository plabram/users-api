const { now } = require("mongoose")
const {
  getAllUsersFromDb, 
  getUserByIdFromDb, 
  createUserInDb,
  updateUserInDb,
  deleteUserFromDb
} = require("../repositories/users")
const {setError} = require("../config/error")

const getAllUsers = async (req,res,next)=> {
try
  {const {filter} = req.query
  const users = await getAllUsersFromDb(filter)
  res.status(200).json({data: users})}
  catch {
    return next(setError(400, "Can't find users"))
  }
}

const getUserById = async (req,res,next) => {
  try
  {const {id} = req.params
      const user = await getUserByIdFromDb(id)
      res.status(200).json({data: user})}
      catch {
        return next(setError(400, "Can't find user"))
      }
}

const createUser = async (req, res,next) => {
try
  {
    console.log("hello")
    const userObject = {...req.body}
const newUser = await createUserInDb(userObject)
  res.status(201).json({data: newUser})}
  catch {
    return next(setError(400, "Can't create user"))
  }
}

const updateUserById = async (req, res,next) => {
  try {const {id} = req.params
const user = await updateUserInDb(id, req.body)
res.status(200).json({data: user})}
catch {
  return next(setError(400, "Can't update user"))
}
}

const deleteUser = async (req,res,next)=>{
  try
  {const {id} = req.params
  await deleteUserFromDb(id)
  res.status(200).json({data: "User deleted"})}
  catch {
    return next(setError(400, "Can't delete user"))
  }
  }

module.exports = {
  getAllUsers, 
  getUserById, 
  createUser,
  updateUserById,
  deleteUser
}