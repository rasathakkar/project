
const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const Auth  = require('../middleware/Auth')

const multer  = require('multer')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `/${file.originalname}.${ext}`);
    },
  });

const upload = multer({
    storage: multerStorage,
  });

router.get('/',adminController.login)

router.get('/welcome',adminController.welcome)

router.post('/postlogin',adminController.postlogin)

router.get('/signup',adminController.signup)

router.get('/logout',adminController.logout)

router.post('/postsignup',adminController.postsignup)

router.get('/addpackage',Auth,adminController.addpackage)


router.get('/file',adminController.file)

router.post('/fileUpload',  upload.single('fufile') , adminController.fileUpload)

router.get('/sendmail',adminController.sendMail)

router.get('/updatedata',adminController.updatedata)




module.exports = router