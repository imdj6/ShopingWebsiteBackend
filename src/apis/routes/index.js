const express = require('express');
const authRoutes = require("./v1/auth/auth")
const productRoutes = require("./v1/product/Product");
const orderRoutes = require("./v1/order/order")
const ReviewRoutes=require("./v1/Review/index")
const router = express.Router();

router.use("/v1/auth", authRoutes)
router.use("/v1", productRoutes)
router.use("/v1/order", orderRoutes);
router.use("/v1/review",ReviewRoutes)
module.exports = router;