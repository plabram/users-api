const express = require("express")
const { 
  getAllUsers, 
  getUserById, 
  updateUserById,
deleteUser,
updateUserAvatar } = require("../controllers/users")
const { addVan, deleteVan } = require("../controllers/vans")
const {hasValidAuthJwt} = require("../middleware/auth")
const uploadFile = require("../middleware/uploadFile")

const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", hasValidAuthJwt, updateUserById)
router.delete("/:id", hasValidAuthJwt, deleteUser)
router.put("/:id/vans", hasValidAuthJwt, addVan)
router.delete("/:id/vans/:vanid", hasValidAuthJwt, deleteVan)
router.post("/upload-avatar", hasValidAuthJwt, uploadFile.single("avatar"), updateUserAvatar)

module.exports = router