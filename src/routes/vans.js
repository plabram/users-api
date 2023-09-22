const express = require("express")
const { 
  getAllVans, 
  getVanById, 
  createVan, 
  updateVanById,
deleteVan
} = require("../controllers/vans")
const { addBooking, deleteBooking } = require("../controllers/bookings")


const router = express.Router()
router.get("/", getAllVans)
router.get("/:id", getVanById)
router.post("/", createVan)
router.put("/:id", updateVanById)
router.delete("/:id", deleteVan)
router.put("/:id/bookings", addBooking)
router.delete("/:id/bookings/:bookingid", deleteBooking)

module.exports = router