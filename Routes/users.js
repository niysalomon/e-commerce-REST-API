const {Router} =require('express')
const db = require('../connection');

const router=Router();

router.get("/",(req,res) =>{
    res.send("helloo");
});

router.get('/users',async(req,res)=>{
    try {
      const SelectedUsers= await db.query("SELECT * FROM users")
      res.json(SelectedUsers.rows);
        
    } catch (error) {
        res.send(error.message);
    }  
  });   

// register new user
router.post('/register',async(req,res)=>{
    const {username,password,firstname,lastname,email,telephone} = req.body; 
    try {       
const addUser= await db.query("INSERT INTO users(username,password,firstname,lastname,email,telephone) VALUES($1,$2,$3,$4,$5,$6) RETURNING*",[username,password,firstname,lastname,email,telephone]);
res.send(addUser.rows[0]);
    } catch (error) {
        res.send(error.message);
    }
})

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
