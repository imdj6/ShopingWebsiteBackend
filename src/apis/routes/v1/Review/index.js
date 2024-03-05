const express=require("express");
const { authenticate } = require("../../../middlewares/authMiddleware");
const ReviewCntrl = require("../../../controller/ReviewCntrl");
const router=express.Router();


router.post("/createreview",authenticate,ReviewCntrl.createreview);
router.delete("/:id",authenticate,ReviewCntrl.deleteReviewById);

module.exports=router;