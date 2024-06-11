var express = require('express');
var router = express.Router();
const app = require("../app");

const paymentSchema = require("../models/paymentSchema");
const productSchema = require("../models/productSchema");

// middlewares
const isLoggedin = require('../utils/auth');
const verifyuser = require("../utils/verify");


/* GET users listing. */

router.get('/:id',isLoggedin,async function(req, res, next) {
 try {
  const product = await productSchema.findById(req.params.id);
  res.render("payment",{product});
 } catch (error) {
  console.log(error);
 }
});

module.exports=router;