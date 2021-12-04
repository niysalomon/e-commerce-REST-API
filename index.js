const express = require('express');
const app = express();
const cors = require('cors'); 
const UserRouter = require('./Routes/users')

app.use(cors());
app.use(express.json());

app.use(UserRouter);

app.listen(4500,()=>{
    console.log("server is running!!");
});