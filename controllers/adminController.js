const User = require('../models/user')
const bcrypt = require('bcrypt');
const xlsx = require('node-xlsx')
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')

require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });   


exports.login = (req,res) => {
    res.render('signin',{err:''})
}

exports.welcome = (req,res) => {
    console.log(req.session.user);
    res.render('welcome',{email:req.session.user[0].email})
}

exports.postlogin = async (req,res) => {
    //res.status(404)
    // console.log(req.body);

    const email = req.body.username
    const password = req.body.password

    const user = await User.find({email:email})
    // console.log(user);
    if(user.length > 0)
    {
        if(!bcrypt.compare(password,user[0].password))
            {
                console.log("Password Incorrect");
                return res.render('signin',{err:'Password Incorrect'})
            }
        else {
                const accessToken = jwt.sign({user:user[0].email},'gr6f65rf66f5',{expiresIn: '5d'})
                console.log(accessToken);
                req.session.user = user;
                req.session.save();
                console.log(`Welcome ${user[0].name}`);
                return res.redirect('welcome')
            }
    }
    else {
        console.log("No Email Found");
        return res.render('signin',{err:'No Email Found'})
    }

    // const result = await User.find({email:email,password:password})
    // console.log(result[0]);

    // res.render('signin',{title:'Sign-In'})
}

exports.signup = (req,res) => {
    res.render('signup',{err:''})
}

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/')
}

exports.postsignup = async (req,res) => {
    // console.log(req.body);

    var hashedPass = await bcrypt.hash(req.body.password, 12);

    var data = {
        name:req.body.name,
        email:req.body.email,
        password:hashedPass,
        phone:req.body.phone,
        pin:req.body.pin,
        state:req.body.state,
        city:req.body.city
    }

    const AlreadyUser = await User.find({email:req.body.email})
    if(AlreadyUser.length >0) {
        return res.render('signup',{err:'Email Already Exists'})
    }
    const _user = new User(data)
    const result = await _user.save()

    if(result) {
       return res.render('signup',{err:'Saved Successfully'})
    }
    else {
        return res.render('signup',{err:'Try Again'})

    }
    // console.log(result);
}

exports.addpackage = async (req,res) => {

    const users = await User.countDocuments()
    res.json({data:users})

    // res.render('addpackage',{err:''})
}


exports.file = (req,res) => {
    res.render('file')
}

exports.fileUpload = (req,res) => {
//    console.log(req.file);

const filepath = req.file.path;
   const xls = xlsx.parse(filepath)
   console.log(xls[0].data);
}


exports.sendMail = async (req,res) => {
    console.log(process.env.EMAIL,process.env.PASSWORD);
    let result = await transporter.sendMail({
        from: process.env.EMAIL,
        to: "ynrdhruv@gmail.com",
        subject: "Hello ✔", 
        text: "Hello world?",
        html: "<h1>MAIL FROM RASA</h1><b>Hello world?</b>",
      });
      console.log(result);
}

exports.updatedata = async (req,res) => {
    // console.log(req.session.user[0].email);
    // const result = await User.findOneAndUpdate({email:req.session.user[0].email},{phone:'555555555'})
    // console.log(result);
}
