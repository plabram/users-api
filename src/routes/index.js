const express = require("express")
const userRouter = require("./users")
const authRouter = require("./auth")
const vanRouter = require("./vans")

const router = express.Router()

router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/vans", vanRouter)

module.exports = router