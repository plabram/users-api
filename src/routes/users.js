const express = require("express")
const { 
  getAllUsers, 
  getUserById, 
  updateUserById,
deleteUser,
updateUserAvatar } = require("../controllers/users")
const { addVan, deleteVan } = require("../controllers/vans")
const {hasValidAuthJwt, checkUser} = require("../middleware/auth")
const uploadFile = require("../middleware/uploadFile")

const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", hasValidAuthJwt, checkUser, updateUserById)
router.delete("/:id", hasValidAuthJwt, checkUser, deleteUser)
router.put("/:id/vans", hasValidAuthJwt, checkUser, addVan)
router.delete("/:id/vans/:vanid", hasValidAuthJwt, checkUser, deleteVan)
router.post("/:id/upload-avatar", hasValidAuthJwt, checkUser, uploadFile.single("avatar"), updateUserAvatar)

module.exports = router