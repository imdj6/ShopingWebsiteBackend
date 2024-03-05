const express = require('express');
const authController=require("../../../controller/auth/authController");
const authmiddleware=require("../../../../common/middlewares/authMiddleware")
const router = express.Router();

router.post('/register',authController.register)
router.post('/login',authController.login);
router.get('/user/profile',authmiddleware.authenticate,authController.getuserProfile)


module.exports=router;