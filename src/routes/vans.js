const express = require("express")
const { 
  getAllVans, 
  getVanById, 
  updateVanById,
deleteVan
} = require("../controllers/vans")
const { addBooking, deleteBooking, updateBookingById } = require("../controllers/bookings")
const {hasValidAuthJwt, checkUserByVan} = require("../middleware/auth")


const router = express.Router()
router.get("/", getAllVans)
router.get("/:id", getVanById)
router.put("/:id", hasValidAuthJwt, checkUserByVan, updateVanById)
router.delete("/:id", hasValidAuthJwt, checkUserByVan, deleteVan)
router.put("/:id/bookings", hasValidAuthJwt, checkUserByVan, addBooking)
router.put("/:id/bookings/:bookingid", hasValidAuthJwt, updateBookingById)
router.delete("/:id/bookings/:bookingid", hasValidAuthJwt, checkUserByVan, deleteBooking)

module.exports = router