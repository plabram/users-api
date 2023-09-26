const {User, Van} = require("../models/mongo")
const ObjectId = require("mongodb").ObjectId

const getAllUsersFromDb = async (filter) => {
  const nameFilterOptions = {
    name: {$regex: new RegExp(filter, "i")} 
  }
  const users = await User.find(filter ? nameFilterOptions : {})
  return users
}

const getUserByIdFromDb = async (id) => {
  const user = await User.findById(id)
      return user
}

const getUserByVanIdFromDb = async (vanId) => {
    try {
const idToObject = new ObjectId(vanId)

  const user = await User.find({
    "vans._id": idToObject
  });
  if (!user) {
    return null;
  }
  const userId = user[0]._id.toString();
  return userId;
 } catch (error) {
  console.error('Error fetching User ID by Van ID:', error);
  throw error;
 }
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

const updateUserAvatarInDb = async (id, path) => {
  await User.updateOne({_id:id}, {avatar: path})
 }

module.exports = {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getUserByEmailFromDb,
  createUserInDb,
  updateUserInDb,
  deleteUserFromDb,
  updateUserAvatarInDb,
  getUserByVanIdFromDb
}