var express = require('express');
var router = express.Router();

const User = require("../models/user");
const productSchema = require("../models/productSchema");

const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));

const isLoggedin = require("../utils/auth");

const sendmail = require('../utils/nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/main-page', function (req, res, next) {
  res.render('mainpage', { user: req.user });
});

router.get("/register", function (req, res, next) {
  res.render("register")
})

router.post("/register", async function (req, res) {
  try {
    const { name, username, email, role, password } = req.body;
    const userdata = await User.register({ name, username, email, role }, password);
    // await userdata.save();
    res.redirect("/login");

  } catch (error) {
    console.log(error);
  }
})

router.get("/login", function (req, res) {
  res.render("login")
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/main-page",
  failureRedirect: "/login"
}), function (req, res, next) { });



router.get("/profile", isLoggedin, async function (req, res, next) {
  const myproducts = await productSchema.find({ user: req.user._id });
  res.render("profile", { user: req.user, myproducts })
})

router.get("/logout", isLoggedin, function (req, res, next) {
  try {
    req.logOut(() => {
      res.redirect("/")
    })

  } catch (error) {
    console.log(error);
  }
})

router.get("/reset-password", isLoggedin, async function (req, res, next) {
  res.render("resetpassword")
})

router.post("/reset-password", isLoggedin, async function (req, res, next) {
  try {
    await req.user.changePassword(
      req.body.oldpassword,
      req.body.newpassword
    );
    await req.user.save();
    res.redirect("/login")

  } catch (error) {
    console.log(error);
  }

})

router.get("/forget-mail", function (req, res, next) {
  res.render("forget-mail");
})

router.post("/forget-mail", async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const url = `${req.protocol}://${req.get("host")}/forget-password/${user._id}`;

    if (user) {
      sendmail(res, user, url)
      // res.redirect(`/forget-password/${user._id}`);
    } else {
      res.redirect("/forget-mail");
    }
  } catch (error) {

  }
});

router.get("/forget-password/:id", function (req, res, next) {
  res.render("forget-password", { id: req.params.id })
})

router.post("/forget-password/:id", async function (req, res, next) {
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
