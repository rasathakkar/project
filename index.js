const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const PORT = process.env.PORT
require('dotenv').config()

const adminRoutes = require('./routes/adminroutes')
// mongoose.connect(process.env.MONGO_URL);

const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions'
});


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(
    session({
        secret: 'hvjsac7yhcay7',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use('/',adminRoutes)
// app.use('/signup',adminController.signup)


app.get('*',(req,res) => {
    res.send('<h1>Other routes</h1>')
   
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).
    then(result => {
      console.log("DB Connected!");
      app.listen(8500, () => {
        console.log("App Is Running On 8500.");
      })
    }).
    catch(err => {
      console.log(err);
    });

