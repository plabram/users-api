const express = require("express")
const { 
  getAllVans, 
  getVanById, 
  createVan, 
  updateVanById,
  // addReview,
deleteVan,
// deleteReview 
} = require("../controllers/vans")

const router = express.Router()
router.get("/", getAllVans)
router.get("/:id", getVanById)
router.post("/", createVan)
router.put("/:id", updateVanById)
// router.put("/:id/reviews", addReview)
router.delete("/:id", deleteVan)
// router.delete("/:id/reviews/:reviewid", deleteReview)

module.exports = router