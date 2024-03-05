const express = require("express");
const router = express.Router();
const authMiddlware = require("../../../middlewares/authMiddleware")
const ProductCntrl = require("../../../controller/Products/ProductCntrl");
const authMiddleware = require("../../../middlewares/authMiddleware");
router.post("/createproduct", authMiddlware.authenticate, ProductCntrl.createProduct)
router.get('/getallproducts', authMiddleware.authenticate, ProductCntrl.getallProducts)
router.get('/product/:id', authMiddleware.authenticate, ProductCntrl.getproductbyId);
router.get('/product/category/:category', authMiddleware.authenticate, ProductCntrl.getproductByCategory)
router.put('/product/:id', authMiddlware.authenticate, ProductCntrl.updateProductById)
router.delete('/product/:id', authMiddlware.authenticate, ProductCntrl.deleteproductById);
module.exports = router;