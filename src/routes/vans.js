const express = require("express")
const { 
  getAllVans, 
  getVanById, 
  updateVanById,
deleteVan
} = require("../controllers/vans")
const { addBooking, deleteBooking, updateBookingById } = require("../controllers/bookings")
const {hasValidAuthJwt, checkUserByVan} = require("../middleware/auth")
const { updateVanImages } = require("../controllers/vans")
const uploadVan = require("../middleware/uploadFile")


const router = express.Router()
router.get("/", getAllVans)
router.get("/:id", getVanById)
router.put("/:id", hasValidAuthJwt, checkUserByVan, updateVanById)
router.delete("/:id", hasValidAuthJwt, checkUserByVan, deleteVan)
router.put("/:id/bookings", hasValidAuthJwt, checkUserByVan, addBooking)
router.put("/:id/bookings/:bookingid", hasValidAuthJwt, checkUserByVan, updateBookingById)
router.delete("/:id/bookings/:bookingid", hasValidAuthJwt, checkUserByVan, deleteBooking)
router.post("/:id/upload-van-image", hasValidAuthJwt, checkUserByVan, uploadVan.single("images"), updateVanImages)



module.exports = router