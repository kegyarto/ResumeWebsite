const express = require('express');
const route = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination:'public/pdf/upload',
    filename: function(req,file,cb){
        cb(null,"resume.pdf")
    }
})
const upload = multer({storage})


route.post('/update',upload.single('resume'),async(req,res,next)=>{
    await console.log("update path reached: "+req.file.filename)
    res.render('resume',{resume:'resume.pdf'});
    //res.send("done")
    //next()
})

route.use('/',(req,res)=>{
    res.render('resume',{resume:'resume.pdf'});
})

module.exports = route;