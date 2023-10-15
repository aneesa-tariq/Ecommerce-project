const express = require('express');

//rest object
const app = express();
//rest api
app.get('/',(req,res)=>{
res.send({
    message:"Welcome To My Ecommerce App"
})
})
//posrt
const port=8080;
//run listen
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})
