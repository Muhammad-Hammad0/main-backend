import multer from 'multer'

let stroge =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

let upload = multer({stroge})

export default upload