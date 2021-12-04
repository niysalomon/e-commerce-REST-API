const express = require('express');
const app = express();
const cors = require('cors'); 
const UserRouter = require('./Routes/users');
const auth= require('./Routes/Credencial');
const Product = require('./Routes/Product');
const PORT = process.env.PORT || 4500;
app.use(cors());
app.use(express.json());

app.use(UserRouter);
app.use(Product);
app.use(auth);

app.listen(PORT,()=>{
    console.log("server is running!!");
});