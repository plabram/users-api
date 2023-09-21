const {User} = require("../models/mongo")

const getAllUsersFromDb = async (filter) => {
  const titleFilterOptions = {
    name: {$regex: new RegExp(filter, "i")} 
  }
  const users = await User.find(filter ? nameFilterOptions : {})
  return users
}

const getUserByIdFromDb = async (id) => {
  const user = await User.findById(id)
      return user
}

const getUserByEmailFromDb = async (email) => {
  const user = await User.findOne({email}).lean()
  return user
}

const createUserInDb = async (payload) => {
  const user = await User.findOne({email: payload.email})
  
  if (user) {
    throw new Error("User already exists with the same email")
  }
  
  const newUser = new User(payload)
  await newUser.save()

  const {password, ...rest} = newUser.toObject()
  return rest
}

const updateUserInDb = async (id, payload) => {
  const user = await User.findByIdAndUpdate(id, payload, {new:true})
  return user
}

const deleteUserFromDb = async (id) => {
  await User.deleteOne({_id: id})
}

module.exports = {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getUserByEmailFromDb,
  createUserInDb,
  updateUserInDb,
  deleteUserFromDb
}