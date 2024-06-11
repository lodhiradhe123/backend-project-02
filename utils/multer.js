const multer = require("multer");
const path = require("path") ;

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images");
    },

    filename:function(req,file,cb){
        cb(null, file.fieldname + "_" +Date.now()+ path.extname(file.originalname));
    }
});

const uploads = multer({storage:storage})

module.exports= uploads;