
var express = require('express');
var server = express();
require('./models/users');
require('./models/products');
var path =require('path');
var serveStatic =require('serve-static');
//static midware
server.use(express.static("public"));


var authRoutes = require('./controllers/auth');
var postsRoutes = require('./controllers/posts');
var productsRout=require("./controllers/products");
var userRoutes=require('./controllers/user');


var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var mongodb = require('mongodb').MongoClient;
//mongoose.connect("mongodb://username:password@localhost:27017/cafeteria");
mongoose.connect("mongodb://localhost:27017/cafeteria");

//app.use(express.static(__dirname + '/public'));
//http://localhost:9090/auth/login
// Routes Mid

server.use(session({
    secret :"@#%#$^%",
    cookie:{maxAge:1000*60*60*24*7}

}));
server.use(flash());
server.use('/auth' , authRoutes);
//auth MID

server.use(function(req,resp,next){

    if(!(req.session.username && req.session.password)){

        resp.redirect('/auth/login');
    }
    else
    {
        resp.locals={
            name:req.session.username
        }
        next();
    }
})
server.use('/products',productsRout);
server.use('/posts' ,postsRoutes);
server.use('/user',userRoutes);

server.set('view engine' , 'ejs');
server.set('views','./views');

server.listen(9090, function(){
console.log("Starting ....");

});
