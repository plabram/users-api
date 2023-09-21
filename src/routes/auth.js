const express = require("express")
const { hasValidAuthJwt } = require("../middleware/auth")
const {loginUser, registerUser, getUser, 
  // updateUserAvatar
 } = require("../controllers/users")
// const uploadFile = require("../middleware/uploadFile")

const router = express.Router()

router.get("/", hasValidAuthJwt, getUser)
router.post("/login", loginUser)
router.post("/register", registerUser )
// router.post("/upload-avatar", hasValidAuthJwt, uploadFile.single("avatar"), updateUserAvatar)

module.exports = router