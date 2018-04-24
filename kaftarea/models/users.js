var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var users = new Schema({
    
    _id:Number,
    Name:String,
    Email:String,
    password:String,
    Room_No:Number,
    Ext:Number,
    image:String,

});

mongoose.model("users",users);
