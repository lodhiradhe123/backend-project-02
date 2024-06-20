var express = require("express");
var router = express.Router();

const productSchema = require("../models/productSchema");
const uploads = require("../utils/multer");
const isLoggedin = require("../utils/auth");
const verifyuser = require("../utils/verify");

const fs = require("fs");
const path = require("path");

/* GET users listing. */

router.get("/", isLoggedin, verifyuser, function (req, res, next) {
  res.render("product");
});

router.post(
  "/productdata",
  isLoggedin,
  uploads.single("image"),
  async function (req, res, next) {
    try {
      const product = await productSchema({
        ...req.body,
        image: req.file.filename,
        user: req.user._id,
      });
      await product.save();
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/allproducts", isLoggedin, async function (req, res, next) {
  try {
    const allproduct = await productSchema.find();
    res.render("allproducts", { allproduct });
  } catch (error) {
    console.log(error);
  }
});

router.get("/myproducts", isLoggedin, async function (req, res, next) {
  try {
    const myproducts = await productSchema.find({ user: req.user._id });
    // res.send(myproducts)
    res.render("myproducts", { myproducts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/:id", async function (req, res, next) {
  try {
    const deleteproduct = await productSchema.findByIdAndDelete(req.params.id);

    fs.unlinkSync(
      path.join(__dirname, "../", "public", "images", deleteproduct.image)
    );

    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});
router.get("/edit/:id", isLoggedin, async function (req, res, next) {
  try {
    const product = await productSchema.findById(req.params.id);
    res.render("editpage", { product });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/editdata/:id",
  isLoggedin,
  uploads.single("image"),
  async function (req, res, next) {
    try {
      // const post = await productSchema.findById(req.params.id);
      // await post.save();
      const editdata = await productSchema.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (req.file.filename) {
        fs.unlinkSync(
          path.join(__dirname, "../", "public", "images", editdata.image)
        );
      }
      editdata.image = req.file.filename;
      await editdata.save();
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
