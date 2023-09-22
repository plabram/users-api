const { now } = require("mongoose")
const {
  getAllUsersFromDb, 
  getUserByIdFromDb, 
  createUserInDb,
  updateUserInDb,
  deleteUserFromDb,
  getUserByEmailFromDb
} = require("../repositories/users")
const {setError} = require("../config/error")
const { hashPassword, verifyPassword } = require("../config/password")
const { signToken } = require("../config/jwt")

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

  const registerUser = async (req,res)=>{
    try {
    const {email,password} = req.body

    if (password.length >= 6) 
  {const hash = await hashPassword(password)
  
  
  const newUser = await createUserInDb({email, password: hash})
  res.status(201).json({data: newUser})} else {
    res.status(400).json({data: "Password must be at least 6 characters"})
  }
  
    } catch (err) {
      console.log("Error creating user", err)
      res.status(400).json({data: "Error registering user"})
    }
  }
  
  const loginUser = async (req, res)=>{
    const {email, password} = req.body
      const user = await getUserByEmailFromDb(email)
      console.log(user)
      if (!user) {
        res.status(401).json({data: "user doesn't exist"})
      return
      }
      const isValidPassword = await verifyPassword(password, user.password)
      if (!isValidPassword) {
        res.status(401).json({data: "Incorrect email or password"})
        return
      }
      const token = signToken({id: user._id })
      const {password: unusedPassword, ...restUser} = user
      console.log("signed in!")
      res.status(200).json({data: {
        token, 
        user: restUser
      }})
    
    }
  
  const getUser = async (req, res) => {
    const {id } = req.user
  const user = await getUserByIdFromDb(id)
  res.status(200).json({data: user})
    
  }


module.exports = {
  getAllUsers, 
  getUserById, 
  updateUserById,
  deleteUser,
  registerUser,
  loginUser,
  getUser
}