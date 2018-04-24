var mongoose = require("mongoose");
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var router = express.Router();
var bodyParser = require('body-parser');
var bodyParserMid = bodyParser.urlencoded();
var url = 'mongodb://localhost:27017/cafeteria';
var fs = require('fs');
//need to upload file
var multer = require('multer');

var usersMOdel = mongoose.model('users');
var prodMOdel = mongoose.model('products');


var uploadMid = multer({
//  var postModel= mongoose.model("users");

  dest:"./public/imgs"
});


router.get('/add' , function(req,resp){
  msg : req.flash("msg")
  

    resp.render('posts/add');

  



});
/////////////////////////order
router.get('/ViewOrder' , function(req,resp){
    mongodb.connect(url,function (err,db) {

        if (err) {
            throw err;
        }
        console.log("conected Db");

        db.collection("orders").find({}).toArray(function (err,result) {
            if(err){
                throw err;
            }

            console.log(result);

            resp.locals={
                result:result
            }
            resp.render('users/orderList');
        });
        db.close();
    });





});

router.post('/add',uploadMid.single('image'), function(req,resp){ 
 
  var usr=new usersMOdel({

  _id : req.body._id ,
  Name : req.body.Name,
  Email:req.body.Email,
  password:req.body.password,
  Room_No:req.body.Room_No,
  Ext:req.body.Ext,
  image:req.file.filename,

 });
 
 usr.save(function(err , doc){
   if(!err)
   {
    //resp.json(doc);
    resp.redirect("/posts/list");
   }
   else{
    req.flash("msg","Should data be complete and correct!! ");
    resp.redirect('posts/add');
    resp.json(err);
   }
 });


// mongoose.model('users').collection.insert({
//   _id : req.body._id,
//   Name : req.body.Name,
//   Email:req.body.Email,
//   Password:req.body.Password,
//   Room_No:req.body.Room_No,
//   Ext:req.body.Ext

// },function(err,doc){
//   resp.json(doc);
// });

  
  


});
router.get('/list' , function(req,resp){
  //first way (welcome lamiaa)
  //resp.render('posts/list',{name:"lamiaa"});
  usersMOdel.find({},function(err,result){
if(!err){
   resp.render('posts/list',{data:result,msg:req.flash('msg')});
  //resp.json(result);
}
else{
  resp.json(err);
  
}

  })
  
});

//dynamic routing
router.get('/edit/:id', function(req ,resp){
  usersMOdel.findOne({_id:Number(req.params.id)},function(err,doc){
    resp.render("posts/edit",{obj:doc});
  });
 
});

router.post('/edit/:id',bodyParserMid, function(req ,resp){
  usersMOdel.update({_id:parseInt(req.params.id)},{
    "$set":{
    Name : req.body.Name,
    Email:req.body.Email,
    Password:req.body.Password,
    Room_No:req.body.Room_No,
    Ext:req.body.Ext,
    //image:req.file.path
    }
  },function(err,doc){
    resp.redirect("/posts/list");
  });
 
});


//dynamic routing
router.get('/delete/:id' , function(req , resp){
  usersMOdel.remove({_id:req.params.id},function(err ,result ){
    if(!err){
      req.flash("msg" ,"Done");
      resp.redirect("/posts/list/");
    }
  });
});

router.get('/search',function(req,resp){
  usersMOdel.find({Name:{"$regex":req.query.keyword,"$options":"i"}}).sort({_id:-1}).populate({path:"users",select:"Name"}).then(function(result,err){
    if(result){
      resp.render('posts/list',{data:result,msg:req.flash('mesg')})
    }
    else
    {

    }
  })
})


module.exports = router;
