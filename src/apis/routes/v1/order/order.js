const express=require("express");
const { authenticate } = require("../../../../common/middlewares/authMiddleware");
const orderCntrl = require("../../../controller/order/orderCntrl");

const router=express.Router();

router.post('/createorder',authenticate,orderCntrl.createOrder);
router.put('/:orderid',authenticate,orderCntrl.updateStatus);

module.exports=router;