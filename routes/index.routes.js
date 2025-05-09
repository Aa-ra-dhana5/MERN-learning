const express=require('express');
const router=express.Router();
const authMiddleware = require('../middlewares/authe');
const { reconstructFieldPath } = require('express-validator/lib/field-selection');

router.get('/home', authMiddleware,(req, res)=>{
     res.render('home');
})


router.get('/download/:path', authMiddleware , async (req,res) => {

  const loggedInUserId =req.user.userId;
  const path= req.params.path;
  
  
  const file =await fileModel.findOne({
    user:loggedInUserId,
    path:path
  })
  
  if(!file) {
    return res.status(401).json({
        message: 'Unauthorized'
    })
  }
     
  


})

module.exports =router;