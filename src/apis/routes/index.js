const express = require('express');
const authRoutes = require("./v1/auth/auth")
const productRoutes=require("./v1/product/Product")
const router = express.Router();

router.use("/v1/auth", authRoutes)
router.use("/v1",productRoutes)

module.exports = router;