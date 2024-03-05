const express=require("express");
const { authenticate } = require("../../../../common/middlewares/authMiddleware");
const ReviewCntrl = require("../../../controller/ReviewCntrl");
const router=express.Router();


router.post("/createreview",authenticate,ReviewCntrl.createreview);

module.exports=router;