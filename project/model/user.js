var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var user = new Schema({
	username : String,
	psw :String,
	time : {type:Date,default:Date.now}
})
var userData = mongoose.model("users",user)
module.exports = userData
