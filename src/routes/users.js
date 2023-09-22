const express = require("express")
const { 
  getAllUsers, 
  getUserById, 
  updateUserById,
deleteUser } = require("../controllers/users")
const { addVan, deleteVan } = require("../controllers/vans")

const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", updateUserById)
router.delete("/:id", deleteUser)
router.put("/:id/vans", addVan)
router.delete("/:id/vans/:vanid", deleteVan)

module.exports = router