const express = require('express');
const route = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination:'public/images/upload',
    filename: function(req,file,cb){
        cb(null,"profile.jpg")
    }
})
const upload = multer({storage})

const Greet = require('../models/greet');
const User = require('../models/users')


route.post('/update',async(req,res)=>{
    sessionID = req.sessionID
    var user = await User.findOne({sessionID},(err,user)=>{
        // console.log(user)
        return user;
    })

    if(user){
        Greet.findOneAndUpdate({userID:user._id},{$set:req.body},{new:true},(err,userGreet)=>{ 
            console.log(userGreet)
            res.render('index', { user: userGreet.name, title:userGreet.title ,description:userGreet.description, skills:userGreet.skills,image:userGreet.image});
        })
    }
    else{
        res.render('login',{message:"user could not update"})
    }
})

route.post('/profileimage',upload.single('image'),async (req,res,next)=>{
    sessionID = req.sessionID
    var user = await User.findOne({sessionID},(err,user)=>{
        // console.log(user)
        return user;
    })

    if(user){
        // console.log(req.file)
        Greet.findOneAndUpdate({userID:user._id},{$set:{image:req.file.filename}},{new:true},(err,userGreet)=>{ 
            console.log(userGreet)
            res.render('index', { user: userGreet.name, title:userGreet.title ,description:userGreet.description, skills:userGreet.skills,image:userGreet.image});
        })
    }
    else{
        res.render('login',{message:"user could not update"})
    }
})

route.get('/profileimage',async (req,res)=>{
    userID = req.sessionID

    var user = await User.findOne({sessionID},(err,user)=>{
        // console.log(user)
        return user;
    })

    console.log("image: "+user)

    if(user){
        Greet.findOne({userID:user._id},(err,userGreet)=>{ 
            console.log(userGreet.name)
            res.redirect('/images/upload/'+userGreet.image);
        })
    }
    else{
        res.send("no image")
    }
})

route.get('/read', (req, res) =>{
    console.log("in /read");
    //res.send("/greet/read"); 
    Greet.find({}, (err, greets)=>{
        if(err){
            console.log("Read Error"); 
        }
       
        console.log("Successfully Read !! ")
        console.log(greets);
        res.send(greets)
        
    })
    
}); 

route.get('/read/:id', (req, res) =>{
    console.log("in /read/:id");
    console.log("------> id"+req.params.id );
    //res.send("id -> "+req.params.id);
    Greet.findById(req.params.id, (err, greet)=>{
        if(err){
            res.send('Error in finding '+req.params.id); 
        }
        res.send(greet);
    })
    
});

route.get('/delete/:id', (req, res)=>{
    console.log('Delete')
    Greet.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log('Error Deleting');
        }
        res.send('Deleted Successfully')
    })
});

module.exports = route;
