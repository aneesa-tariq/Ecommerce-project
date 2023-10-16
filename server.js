import express from "express";
import dotenv from "dotenv";
//configure env,my .env folder is in root folder so we do not need to add path
dotenv.config();

//rest object
const app = express();
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
