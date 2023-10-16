import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

mongoose.set('strictQuery', true);
//configure env,my .env folder is in root folder so we do not need to add path
dotenv.config();

//rest object
const app = express();

//database config
connectDB(); 

//middleware
app.use(express.json);
app.use(morgan('dev'));

//rest api
app.get('/',(req,res)=>{
res.send('<h1>Welcome to Ecommerce App</h1>');
})
//port
const port=process.env.port || 8080;
//run listen
app.listen(port,()=>{
    console.log(`Server running on ${process.env.mode} mode on http://localhost:${port}`);
})
