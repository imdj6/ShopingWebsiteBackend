const express = require('express');
const authController=require("../../../controller/auth/authController");
const authmiddleware=require("../../../middlewares/authMiddleware")
const upload=require("../../../middlewares/multer.middleware")
const router = express.Router();

router.post('/register',upload.single("profilePicture"),authController.register)
router.post('/login',authController.login);
router.get('/user/profile',authmiddleware.authenticate,authController.getuserProfile)


module.exports=router;