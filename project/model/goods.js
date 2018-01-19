var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var goods = new Schema({
	g_id : Number,
	g_name : String,
	g_number : String,
	g_price : String,
	g_stock : Number,
	g_sales : Number,
	g_img : String,
	time : {type:Date,default:Date.now}
})
var GoodsData  = mongoose.model("goods",goods)
module.exports = GoodsData