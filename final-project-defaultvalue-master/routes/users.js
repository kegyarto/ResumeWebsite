var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/set',(req,res,next)=>{
  let {username, sessionID} = req.body

  User.updateOne({username:username},{sessionID:sessionID},(err, user)=>{
    //console.log('given username, will set sessionID')
  })
  res.send("Hello World");
})

router.post('/create', async(req, res) =>{
  const{username, password, sessionID} = req.body; 
  let user = {}; 

  user.username = username; 
  user.password = password; 
  user.sessionID = sessionID; 

  let userModel = new User(user); 
  await userModel.save(); 
  res.json(userModel); 
}); 

router.get('/read', (req, res) =>{
  console.log("in /read");
  User.find({}, (err, users)=>{
      if(err){
          console.log("Read Error"); 
      }
      console.log("Successfully Read !! ")
      console.log(users);
      res.send(users)
  })
  
}); 

router.get('/read/:id', (req, res) =>{
  console.log("in /read/:id");
  console.log("------> id"+req.params.id );
  
  User.findById(req.params.id, (err, user)=>{
      if(err){
          res.send('Error in finding '+req.params.id); 
      }
      res.send(user);
  })
  
}); 

router.put('/update/:id', (req, res)=>{
  //console.log('in /update/:id'); 
  //console.log("------> id"+req.params.id );

  User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user)=>{
      if(err){
          console.log('Error !!! '); 
      }

      res.send('User Successfully Updated');

  });
});

router.get('/delete/:id', (req, res)=>{
  console.log('Delete')
  User.findByIdAndRemove(req.params.id, (err)=>{
      if(err){
          console.log('Error Deleting');
      }
      res.send('Deleted Successfully')
  })
});

module.exports = router;