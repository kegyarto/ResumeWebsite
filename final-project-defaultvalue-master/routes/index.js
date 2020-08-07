var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Greet = require('../models/greet')

/* GET home page. */
router.get('/', async(req, res, next)=>{
  var users = await Greet.find((err,users)=>{
    return users
  })

  var ranNum = Math.floor(Math.random() *((await users).length))

  userGreet = users[ranNum]
  
  userGreet._id=null
  userGreet.userID=null
  console.log(userGreet)
  res.send(userGreet)
  //res.render('index', { user: userGreet.name, title:userGreet.title ,description:userGreet.description, skills:userGreet.skills, image:userGreet.image});
  // res.render('index', { title: 'Express' });
});

// Login route GET to display the form
router.get('/login', (req, res) => {
  console.log('Login page');
  res.render('login');
})

// Login route POST for actual Authentication process
router.post('/login', async function(req, res, next) {
  let {username,password} = req.body;
  sessionID = req.sessionID

  if( (!username||username.length == 0) || (!password || password.length == 0) ){
    res.render('login', {message:"Username or Password has empty fields."});
  }else if (username.length <= 3) {
    res.render('login', {message:"Username lenght must be greater than 3 characters"});
  } else if (password.length <= 3) {
    res.render('login', {message:"Password lenght must be greater than 3 characters"});
  }else{
  
    //TODO: - validation allow only 5 failed attemps, etc
    //According to https://github.com/ckanich-classrooms/final-project-defaultvalue/blob/master/SECURITY.md

    /*
    when a user has been attempting to login for five times, the login page will show on screen 
    that the user should attempt to login after a determined lapse of time. 
    Furthermore, the system will send an email to verify if the user has been attempting many 
    times to login.
    */

    
    console.log("Login: User["+username+"] Password["+password+"] Session["+sessionID+"]");
    const filter = {username:username, password:password};
    const update = { sessionID:sessionID };
    User.findOneAndUpdate(filter, update, {new: true}, (err, user)=>{
      if(err) {
        //console.log("Login: Error - "+err);
        res.render('login', {message:err});
      }
      if(user){
        userGreet = Greet.findOne({userID:user.id},(err,userGreet)=>{
          //console.dir(userGreet)
          //console.log("Login: User Object found");
          //console.dir("Info"+user)
          res.render('index', { user: userGreet.name, title:userGreet.title ,description:userGreet.description, skills:userGreet.skills, image:userGreet.image});
        })
      }else{
        //console.log("Login: There no user with given data");
        res.render('login', {message:"The username or password you’ve entered doesn’t match any account"});
      }
    });
  }
});

router.post('/logout',(req,res,next)=>{
  console.log("logout reached")

  sessionID = req.sessionID;
  User.updateOne({sessionID:sessionID},{sessionID:''},(err, user)=>{
  })

  res.render('login')
})

router.get('/register',(req,res,next)=>{
  console.log("register page")
  res.render('register')
})

router.post('/register',(req,res,next)=>{
  let {username, password} = req.body;
  if (!username || username.length <= 0) {
    var errormsg = { "error:": "no username" };
    res.status(400);
    res.json(errormsg);
    return;
  }
  let sessionID = req.sessionID;
  username = username.toLowerCase();
  //console.log(sessionID)
  User.find({username:username},(err, users)=>{
    if(users.length==0){
      //there are no users that exist
      var user = new User({username,password, sessionID})
      console.dir(user)
      user.save((err,user)=>{
        Greet.create({userID:user.id, name:"-empty-", title:'-empty-',description:'-empty-',skills:'-empty-'},(err,userGreet)=>{
          res.render('index', { user: userGreet.name, title:userGreet.title ,description:userGreet.description, skills:userGreet.skills});
        })
      })
      //res.status(200).send({msg:"user has been created"})
    }
    else{
      //user already exist in the database
      res.render("register",{message:"username already exist"})
      //res.status(200).send({msg:"username already exist in database"})
    }
  })
})

module.exports = router;
