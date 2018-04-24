var express=require("express");
var bodyParser=require('body-parser');
var fs =require("fs");
var router=express.Router();
var multer=require("multer");
var mongoose=require("mongoose");

var uploadMid=multer({

  dest:"./public/imgs"
});

//to get data from request body
var bodyParserMid=bodyParser.urlencoded();

//var catModel=mongoose.model("category");
var usersMOdel = mongoose.model('users');
var productModel=mongoose.model("products");

router.get('/add',function(req,resp){

  usersMOdel.find({},function(err,users){

resp.render('products/add',{users:users});


});




//resp.render('products/add',{data:resp, msg:req.flash('msg')});


});


router.post('/add',uploadMid.single('avatar'),function(req,resp){
//resp.send(req.file);
//resp.render('products/add');

//fs.renameSync(req.file.path,req.file.destination+"/"+req.file.originalname);
//resp.send(req.file);
//resp.json(req.file);
//fixed schema
//resp.json(req.file);
//fs.renameSync(req.file.path,req.file.destination+"/"+req.file.originalname);
var image_name=req.file.path;
var product=new productModel({
  _id:req.body._id,
  name:req.body.title,
  category:req.body.category,
  price:req.body.price,
  picture:req.file.filename,
  user:req.body.user

});
product.save(function(err,doc){
  //resp.json(doc);
if(!err){
  resp.redirect("/products/list");

}else{

  resp.json(err);
}

});
//dynamic schema
/*mongoose.model('products').collection.insert({

  title:req.body.title,
  _id:req.body._id
},function(err,doc){
resp.json(req.body);

})*/


});




router.get('/list/:page?',function(req,resp){

var pagenumber=1;
if(req.params.page)
  pagenumber=req.params.page;
  console.log(pagenumber);
  //resp.locals={name:"yasmeen"}
mongoose.model("products").paginate({},{page: pagenumber , limit: 5},function(err,result){
  //populate foreign key
  productModel.find({},function(err,result){
    usersMOdel.populate(result,{path:"user",select:"Name"},function(err,result){
      if (!err)
      //resp.json(result);
      resp.render('products/list',{data:result, msg:req.flash('msg')});
      else
      resp.json(err);


    });
  
})

})
//resp.render('products/list');


});
router.post('/list',bodyParserMid,function(req,resp){

resp.render('products/list');


});
router.get('/edit/:id',function(req,resp){
  mongoose.model("products").findOne({_id:Number(req.params.id)},function(err,doc){

    //resp.json(doc);
 resp.render("products/edit",{obj:doc});


  });



});

router.post('/edit/:id',bodyParserMid,function(req,resp){

  mongoose.model("products").update({_id:Number(req.params.id)},
{"$set":{price:req.body.price}},function(err,doc){
    if(!err)
    resp.redirect("/products/list");
    else
    resp.json(err);


  });
  

  



});


router.get('/delete/:id',function(req,resp){

  mongoose.model('products').remove({_id:req.params.id},function(err,result){
    if(!err){
      req.flash("msg","done");
      resp.redirect('/products/list');
    }



  })
});
module.exports=router;
