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

const createUserInDb = async (payload) => {
  const newUser = new User(payload)
  await newUser.save()
  return newUser
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
  createUserInDb,
  updateUserInDb,
  deleteUserFromDb
}