import express, { Router } from 'express';
import {registerController,loginController,testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from '../midleware/authMiddleware.js';

//route object
const router=express.Router();
//routing
//1.register"POST"
router.post("/register",registerController);
//2.login"POST"
router.post("/login",loginController);
//3. forgot-password/POST
router.post("/forgot-password",forgotPasswordController);
//test
router.get("/test",requireSignIn,isAdmin,testController);

//protected User route auth(authetication)
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth(authetication)
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get('/orders',requireSignIn,getOrdersController);

// All orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController);
//order status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController);

export default router;