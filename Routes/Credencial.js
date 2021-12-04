const {Router} =require('express')
const db = require('../connection');

const router=Router(); 
// LOGIN ROUTES
router.get('/login',async(req,res)=>{
const{username,password} = req.body;
try {
    const auth= await db.query("SELECT * FROM users WHERE username=$1 AND password=$2",[username,password]);
if(auth){
    res.status(200).send(auth.rows[0]);   
}
else {
    res.status(200).json('username or password is incorrect!! please try again!');
}
} catch (error) {
    res.status(401).send(error.message);
    
}
})

module.exports=router;
