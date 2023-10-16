 import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import  JWT from "jsonwebtoken";
   //Register Controller
 export const registerController=async (req,res)=>{
    try {
       const {name,email,password,phone,address} = req.body;
       //validation
       if(!name){
        return res.send({error:'Name is required'})
       }
       if(!email){
        return res.send({error:'Email is required'})
       }
       if(!password){
        return res.send({error:'Password is required'})
       }
       if(!phone){
        return res.send({error:'Phone Number is required'})
       }
       if(!address){
        return res.send({error:'Address is required'})
       }
      //check user
       const existingUser=await userModel.findOne({email})
        //check existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                messaage:'Already registerd, Please login'
            })
        }

        //registerr User
        const hashedPassword=await hashPassword(password);

        //save user
        const user=await new userModel({name,email,password:hashedPassword,phone,address}).save();
        res.status(201).send({
            success:true,
            messaage:'User Registered Successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            messaage:'Error in Registration',
            error
        })
    }
 };

 //POST LOGIN/Login controller
 export const loginController=async(req,res)=>{
    try {
        const{email,password}=req.body;
        //validation
        if(!email || !password){
          return res.status(404).send({
            success:false,
            messaage:'Invalid Username and Password'
          })
        }
        //check user
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                messaage:'Email is not registered'
            })
        }
        
        const match=await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                messaage:'Invalid password'
            })
        }
        //Token/JWT 
        const token =await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
          //send response
          res.status(200).send({
            success:true,
            messaage:'Login Successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
          })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            messaage:'Error in login'
        })
    }

 }
