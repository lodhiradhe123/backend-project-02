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

router.get('/main-page', function(req, res, next) {
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
  successRedirect:"/profile",
  failureRedirect:"/login"
}), function(req,res,next){});

function isLoggedin(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect("/login")
  }
}

router.get("/profile", function(req,res,next){
  res.render("profile")
})


module.exports = router;
