const express = require("express")
const { hasValidAuthJwt } = require("../middleware/auth")
const {loginUser, registerUser, getUser, 
 } = require("../controllers/users")

const router = express.Router()

router.get("/", hasValidAuthJwt, getUser)
router.post("/login", loginUser)
router.post("/register", registerUser )

module.exports = router