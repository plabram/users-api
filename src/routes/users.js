const express = require("express")
const { 
  getAllUsers, 
  getUserById, 
  // createUser, 
  updateUserById,
deleteUser } = require("../controllers/users")

const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getUserById)
// router.post("/", createUser)
router.put("/:id", updateUserById)
router.delete("/:id", deleteUser)

module.exports = router