import express, { Router } from 'express';
import {registerController,loginController,testController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from '../midleware/authMiddleware.js';

//route object
const router=express.Router();
//routing
//1.register"POST"
router.post("/register",registerController);
//2.login"POST"
router.post("/login",loginController);
//test
router.get("/test",requireSignIn,isAdmin,testController);

export default router;