const express = require("express")
const { 
  getAllVans, 
  getVanById, 
  updateVanById,
deleteVan
} = require("../controllers/vans")
const { addBooking, deleteBooking } = require("../controllers/bookings")
const {hasValidAuthJwt} = require("../middleware/auth")


const router = express.Router()
router.get("/", getAllVans)
router.get("/:id", getVanById)
router.put("/:id", hasValidAuthJwt, updateVanById)
router.delete("/:id", hasValidAuthJwt, deleteVan)
router.put("/:id/bookings", hasValidAuthJwt, addBooking)
router.delete("/:id/bookings/:bookingid", hasValidAuthJwt, deleteBooking)

module.exports = router