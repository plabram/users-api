const express = require("express")
const { 
  getAllBookings, 
  getBookingById, 
  updateBookingById } = require("../controllers/bookings")

const router = express.Router()
router.get("/", getAllBookings)
router.get("/:id", getBookingById)
router.put("/:id", updateBookingById)

module.exports = router