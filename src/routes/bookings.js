const express = require("express")
const { 
  getAllBookings, 
  getBookingById, 
  // updateBookingById 
} = require("../controllers/bookings")
  // const {hasValidAuthJwt} = require("../middleware/auth")

const router = express.Router()
router.get("/", getAllBookings)
router.get("/:id", getBookingById)

module.exports = router