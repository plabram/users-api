const express = require("express")
const { 
  getAllUsers, 
  getUserById, 
  updateUserById,
deleteUser,
updateUserAvatar } = require("../controllers/users")
const { addVan, deleteVan } = require("../controllers/vans")
const {hasValidAuthJwt, checkId} = require("../middleware/auth")
const uploadFile = require("../middleware/uploadFile")

const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", hasValidAuthJwt, checkId, updateUserById)
router.delete("/:id", hasValidAuthJwt, checkId, deleteUser)
router.put("/:id/vans", hasValidAuthJwt, checkId, addVan)
router.delete("/:id/vans/:vanid", hasValidAuthJwt, checkId, deleteVan)
router.post("/:id/upload-avatar", hasValidAuthJwt, checkId, uploadFile.single("avatar"), updateUserAvatar)

module.exports = router