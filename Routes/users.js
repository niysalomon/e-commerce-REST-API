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
// UDATING USER
router.put('/users/:id',async(req,res)=>{
    const {id}=req.params;    
    const{firstname,lastname,email,telephone,username,password} = req.body;
    try {
         
    const UpdateUser= await db.query("UPDATE users SET firstname=$1, lastname=$2,email=$3, telephone=$4, username=$5,password=$6 WHERE user_id=$7",[firstname,lastname,email,telephone,username,password,id]);
    if(UpdateUser){
    res.json("user updated successful!");
     }
     else{
    res.json("user failed to be updated successful!");
     }   
} 
catch (error) {
    res.send(error.message); 
 }
})

//DELETE USERS

router.delete('/users/delete/:id',async(req,res)=>{
    const{id} = req.params;
    try {
        const deleteUser = await db.query("DELETE FROM users WHERE user_id=$1",[id]);
        if(deleteUser){
            res.send("User deleted successful!");
        }
        else{
            res.send("user failed to be deleted!");
        }
    } catch (error) {
        res.json(error.message);
    }
})


module.exports=router;
