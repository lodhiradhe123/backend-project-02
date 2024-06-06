var express = require('express');
var router = express.Router();

const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/main-page',isLoggedin, function(req, res, next) {
  res.render('mainpage');
});

router.get("/register", function(req,res,next){
  res.render("register")
})

router.post("/register",async function(req,res){
  try {
    const {name,username , email, password}=req.body;
    const userdata = await User.register({name,username,email},password);
    // await userdata.save();
    res.redirect("/login");
    
  } catch (error) {
    console.log(error);
  }
} )

router.get("/login", function(req,res){
  res.render("login")
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/main-page",
  failureRedirect:"/login"
}), function(req,res,next){});

function isLoggedin(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect("/login")
  }
}

router.get("/profile",isLoggedin, function(req,res,next){
  res.render("profile")
})

router.get("/logout",isLoggedin,function(req,res,next){
  try {
    req.logOut(()=>{
      res.redirect("/login")
    })
    
  } catch (error) {
    console.log(error);
  }
})

router.get("/reset-password",isLoggedin,async function(req,res,next){
  res.render("resetpassword")
})

router.post("/reset-password",isLoggedin, async function(req,res,next){
 try {
  await req.user.changePassword(
    req.body.oldpassword,
    req.body.newpassword
  );
   await req.user.save();
   res.redirect("/profile")
  
 } catch (error) {
  console.log(error);
 }

} )

router.get("/forget-mail",function(req,res,next){
  res.render("forget-mail");
})

router.post("/forget-mail",async function(req,res,next){
try {
  const user = await User.findOne({email:req.body.email});
  if(user){
    res.redirect(`/forget-password/${user._id}`);
  }else{
    res.redirect("/forget-mail");
  }
} catch (error) {
  
}  
});

router.get("/forget-password/:id",function(req,res,next){
  res.render("forget-password",{id:req.params.id})
})

router.post("/forget-password/:id",async function(req,res,next){
 try {
  const user = await User.findById(req.params.id);
  console.log(user);
  await user.setPassword(req.body.password);
  await user.save();
  res.redirect("/login");
 } catch (error) {
  console.log(error);
  
 }
})



module.exports = router;
