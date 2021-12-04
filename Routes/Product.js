const {Router} =require('express')
const db = require('../connection');

const router=Router();
 
// get All products
router.get('/AllProduct',async(req,res)=>{
    try {
      const SelectedProduct= await db.query("SELECT * FROM products")
      res.json(SelectedProduct.rows);
        
    } catch (error) {
        res.send(error.message);
    }  
  });   

  // get one product
router.get('/Product/:id',async(req,res)=>{
    const{id}= req.params;
    try {
      const SelectedProduct= await db.query("SELECT * FROM products WHERE product_id=$1",[id]);
      res.json(SelectedProduct.rows);
        
    } catch (error) {
        res.send(error.message);
    }  
  });  

// register new PRODUCT
router.post('/product/AddProduct',async(req,res)=>{
    const {productname,size,color,price} = req.body; 
    try {       
const addProduct= await db.query("INSERT INTO products(productname,size,color,price) VALUES($1,$2,$3,$4) RETURNING*",[productname,size,color,price]);
res.send(addProduct.rows[0]);
    } catch (error) {
        res.send(error.message);
    }
})
// UDATING PRODUCT
router.put('/product/:id',async(req,res)=>{
    const {id}=req.params;    
    const{productname,size,color,price} = req.body;
    try {
         
    const UpdateProduct= await db.query("UPDATE products SET productname=$1, size=$2,color=$3, price=$4  WHERE product_id=$5",[productname,size,color,price,id]);
    if(UpdateProduct){
    res.json("product updated successful!");
     }
     else{
    res.json("product failed to be updated successful!");
     }   
} 
catch (error) {
    res.send(error.message); 
 }
})

//DELETE PRODUCT

router.delete('/product/delete/:id',async(req,res)=>{
    const{id} = req.params;
    try {
        const deleteProduct = await db.query("DELETE FROM products WHERE product_id=$1",[id]);
        if(deleteProduct){
            res.send("Product deleted successful!");
        }
        else{
            res.send("Product failed to be deleted!");
        }
    } catch (error) {
        res.json(error.message);
    }
})


module.exports=router;
