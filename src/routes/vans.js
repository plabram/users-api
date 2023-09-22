const express = require("express")
const { 
  getAllVans, 
  getVanById, 
  createVan, 
  updateVanById,
  addBooking,
deleteVan,
deleteBooking 
} = require("../controllers/vans")

const router = express.Router()
router.get("/", getAllVans)
router.get("/:id", getVanById)
router.post("/", createVan)
router.put("/:id", updateVanById)
router.put("/:id/bookings", addBooking)
router.delete("/:id", deleteVan)
router.delete("/:id/bookings/:bookingid", deleteBooking)

module.exports = router