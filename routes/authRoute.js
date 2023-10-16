import express, { Router } from 'express';
import {registerController,loginController} from '../controllers/authController.js'

//route object
const router=express.Router();
//routing
//1.register"POST"
router.post("/register",registerController);
//2.login"POST"
router.post("/login",loginController);

export default router;