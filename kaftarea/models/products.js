
var mongoose=require("mongoose");
var mongoosePaginate=require("mongoose-paginate");
var schema=mongoose.schema;
var products=new mongoose.Schema({
  _id:Number,
  name:String,
  category:{
    type:String,
    ref:"category"
},
  price:Number,
  picture:String,
  //foriegn key
  user:{
    type:Number,
    ref:"users"
  }
});
products.plugin(mongoosePaginate);
//register---mapping----
mongoose.model("products",products);

