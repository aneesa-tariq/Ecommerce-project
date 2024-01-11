import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
mongoose.set('strictQuery', true);
//configure env,my .env folder is in root folder so we do not need to add path
dotenv.config();
//database config
connectDB().then(() => {
    // Your application logic here, which relies on the database connection
  }).catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
//rest object
const app = express();
//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
//rest api
app.get('/',(req,res)=>{
res.send("<h1>Welcome to Ecommerce App</h1>");
})
//port
const PORT=process.env.port || 3000;
//run listen
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.mode} mode on http://localhost:${PORT}`.bgBlue.white);
})
