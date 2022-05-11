const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const axios = require('axios');
const moment = require('moment');
const Request = require('request');
const { pipeline } = require('stream');

app.locals.moment = moment;
const math = require('math');

//import routes and validation


const services = require('./render/render');
const controller = require('./controller/controller');
const usersRoutes = require("./routes/users");
const indexRoutes = require("./routes/index");

// middleware defitions
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//passport config:
require('./config/passport')(passport)

//mongoose
mongoose.connect('mongodb+srv://nehakazi:test@cluster0.ozbcu.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('Database is connected! Hooray!!'))
.catch((err)=> console.log(err));

//EJS
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })

    // Setting
/**
 *  @description 
 *  @method GET 
 */
 app.get('/setting', services.setting)


 // API
 app.get('/api/Users', controller.find);
 app.put('/api/Users/:id', controller.update);


//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


app.get("/news/:id", async (req, res) => {
  var userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  try{
      if (!user) {
        res.status(401).json({ message: "Error retrieving user with id " });
      }
          else {
            console.log("User exists");
      console.log(userId)
      const response = await axios({
      url: "http://newsapi.org/v2/top-headlines?category=general&apiKey=48ea7dd1fa8c4d3582a208c6f8b6ddc6",
      method: "get",
        });
      res.status(200).json(response.data)
          }
      }
  catch (err){
      res.status(500).json({ message: "Error retrieving user with id " });
  }
});



app.listen(3000); 

module.exports = app;
