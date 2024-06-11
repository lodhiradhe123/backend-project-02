function verifyuser(req,res,next){
    if(req.user.role=="seller"){
      next();
    }
  }

  module.exports=verifyuser;