const {Router} =require('express')
const db = require('../connection');

const router=Router();
 
// new order
router.post('/order/neworder',async(req,res)=>{
    const {cart_id,total_price,user_id} = req.body; 
    try {       
const NewOrder= await db.query("INSERT INTO orders(cart_id,total_price,user_id) VALUES($1,$2,$3,$4) RETURNING*",[cart_id,total_price,user_id]);
res.send(NewOrder.rows[0]);
    } catch (error) {
        res.send(error.message);
    }
})


module.exports=router;
