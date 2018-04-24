var express = require('express');

var router = express.Router();
var bodyParser = require('body-parser');
var bodyParserMid = bodyParser.urlencoded();

var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/cafeteria';

router.get('/login' , function(req,resp){

  resp.render('auth/login',{
    msg : req.flash("msg")
  });
});

router.post('/login' ,bodyParserMid, function(req,resp){

  var username =  req.body.username;
  var pass = req.body.password;
  var passw = pass.toString();
  mongodb.connect(url,function (err,db) {

    if (err) {
        throw err;
    }
    console.log("conected Db");

  var query = {Name:username,password:passw};
  //  console.log("array all Users age =24 \n" );
    db.collection("users").find(query).toArray(function (err,result) {
        if(err){
            throw err;
        }

        
        if(username == "admin" && pass=='admin')
        {
          req.session.username ="admin";
          req.session.password = 'admin';
          resp.redirect('/posts/list');
        }
        else if(result.length == 0){
          req.flash("msg","Invalid UserName or Password");
          resp.redirect('/auth/login');
      
        }  
      
        else{
          req.session.username =username;
          req.session.password = passw;
          resp.redirect('/user/list');
 
        }

               db.close();
    });
  });

/*
  if(username == "admin" && pass=='admin')
  {
    req.session.username ="admin";
    req.session.password = 'admin';
    resp.redirect('/posts/list');
  }
  else if(username == "Hossam" && pass=='123')
  {
    req.session.username ="Hossam";
    req.session.password = '123';
    resp.redirect('/user/list');
  }
  else if(username == "Ahmed" && pass=='123')
  {
    req.session.username ="Ahmed";
    req.session.password = '123';
    resp.redirect('/user/list');
  }
  else
  {
    req.flash("msg","Invalid UserName or Password");
    resp.redirect('/auth/login');

  }
*/
});

router.get('/register' , function(req,resp){

  resp.render('auth/register');


});

router.post('/register' ,bodyParserMid, function(req,resp){


});
router.get('/logout' , function(req,resp){
  req.session.destroy(function(){
    resp.redirect('auth/login');

  })
});
module.exports = router;
