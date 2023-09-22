const express = require("express")
const userRouter = require("./users")
const authRouter = require("./auth")
const vanRouter = require("./vans")
const bookingRouter = require("./bookings")

const router = express.Router()

router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/vans", vanRouter)
router.use("/bookings", bookingRouter)

module.exports = router