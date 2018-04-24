var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bodyParserMid = bodyParser.urlencoded;
var mongodb = require('mongodb').MongoClient;
var session = require('express-session');
var flash = require('connect-flash');
var url = 'mongodb://localhost:27017/cafeteria';

// table order name:orders
router.get('/lists',function(req,resp){
    console.log(req.query);
    var quer=req.query;
    // console.log(quer.Msg[0]);
    // console.log(quer.Msg[1]);
    // console.log(quer.Msg[2]);
    // console.log(quer.Msg[3]);
    console.log(quer.Msg[5].name);
    mongodb.connect(url,function (err,db) {

        if (err) {
            throw err;
        }
        console.log("conected Db");

        var query = {orderItem: quer.Msg[0],orderRoom:quer.Msg[1],orderTotal:quer.Msg[2],date:quer.Msg[3],status:0,process:0,Notes:quer.Msg[4],username:quer.Msg[5].name};
        db.collection('orders').insertOne(query,function (err,result) {
            if(err){
                throw err;
            }
            console.log('collection Created !');
        });
        db.close();


    });});

router.get('/myOrders',function(req,resp){
    mongodb.connect(url,function (err,db) {
        var userName = req.session.username;
        if (err) {
            throw err;
        }
        console.log("conected Db");
        var query = {username:userName};
         db.collection("orders").find(query).toArray(function (err,result) {
            if(err){
                throw err;
            }

            console.log(result);

                 resp.locals={
                 result:result
             }
             resp.render('users/order');
    });
        db.close();
    });
    });

router.get('/date',function(req,resp){
    console.log("inside date");
    mongodb.connect(url,function (err,db) {

        if (err) {
            throw err;
        }
        console.log("conected Db");
        console.log(req.query.from);
        console.log(req.query.to);
        db.collection("orders").find({}).toArray(function(err,result) {
            if(err){
                throw err;
            }
             var newResult=[];

            var splitfrom =  req.query.from.split('-');
            var arrfrom = [];
            arrfrom = arrfrom.concat(splitfrom);


            console.log(arrfrom[2]);


            for(var i=0;i<result.length;i++){

               var splitres =  result[i]['date'];
               var newSplit=splitres[0].split(',');
                var Splitslash=newSplit[0].split('/');
                console.log(Splitslash[1]);

                var arrres = [];
                arrres = arrfrom.concat(splitres);
                console.log(arrres );
                if( Splitslash[0] == arrfrom[1])
                {
                    console.log("inside if");
                    console.log(Splitslash[0]);
                    console.log(arrfrom[1]);
                    newResult.push(result[i]);

                }
            }
            console.log(newResult);

            resp.locals={
                result:newResult
            }
            resp.render('users/order');
        });
         db.close();
    });
});


router.get('/list',function(req,resp){
    var username = req.session.username;//req.body.username;


    mongodb.connect(url,function (err,db) {

        if (err) {
            throw err;
        }
        console.log("conected Db");

        var query = {name: -1};
        db.collection("products").find().sort(query).toArray(function (err, result) {
            if (err) {
                throw err;
            }

            console.log(result);
            resp.locals={
                user:username,
                resultsmeal:result
            }
            resp.render('users/list');

        });
        db.close();
    });


});



module.exports =router;





/*

    mongodb.connect(url,function (err,db) {
        if(err){
            throw err;
        }
        console.log('Database Created !');

        var query = {name:username,password:password};
        console.log("array all Users age =24 \n" );
        db.collection("user").find(query).toArray(function (err,result) {
            if(err){
                throw err;
            }

                console.log(result);



            if(result)
            {

                if( password=="123456"){

                    req.session.username="admin";
                    req.session.password="admin";

                    resp.redirect('/user/list/');
                    console.log( req.session.username);
                }      else{

                    req.flash("msg",'invalide username');
                    resp.redirect('/user/login');


                }
                resp.redirect('/user/list');


                return resp.status(200).send();
            }

            db.close();




        });
*/


/*
    user.findOne({name: username},function(err,user){
        console.log(user);
        if(err){
            console.log("404");
            return resp.status(404).send();
        }
        if(user)
        {

            if( password=="123456"){

                req.session.username="admin";
                req.session.password="admin";

                resp.redirect('/products/list/');
                console.log( req.session.username);
            }else{

                req.flash("msg",'invalide username');
                resp.redirect('/auth/login');


            }

            return resp.status(200).send();
        }

    });});









router.get('/login',function(req,resp){
    //msg: req.flash("msg")
//    resp.render('users/login',{msg: "Login"}) ;

});


router.post('/login',bodyParserMid,function(req,resp){
    var username=req.body.username;
 //   var password=req.body.password;

    if(username == "Alaa" )
    {
        resp.render('/users/list/');

    }
    });







//    var user=mongoose.model('user');
//  console.log(user);




router.get('/register',function(req,resp){
    resp.render('user/register') ;
});

*/

