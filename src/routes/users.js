const express = require("express")
const { 
  getAllUsers, 
  getUserById, 
  updateUserById,
deleteUser } = require("../controllers/users")
const { addVan, deleteVan } = require("../controllers/vans")
const {hasValidAuthJwt} = require("../middleware/auth")

const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", hasValidAuthJwt, updateUserById)
router.delete("/:id", hasValidAuthJwt, deleteUser)
router.put("/:id/vans", hasValidAuthJwt, addVan)
router.delete("/:id/vans/:vanid", hasValidAuthJwt, deleteVan)

module.exports = router