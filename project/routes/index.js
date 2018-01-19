var express = require('express');
var router = express.Router();
var userData = require("../model/user");
var GoodsData = require("../model/goods");
var multiparty = require("multiparty");
var mongodb = require("mongodb");
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.get("/login", function(req, res, next) {
	res.render("login", {})
})
router.post("/api/login", function(req, res) {
	var username = req.body.username;
	var psw = req.body.psw;
	var result = {
		code: 1,
		message: "登录成功"
	}
	userData.find({
		username: username,
		psw: psw
	}, function(err, arr) {
		if(arr.length == 0) {
			result.code = -100;
			result.message = "用户名或密码错误";
			res.send(result)
		} else {
			req.session.username = username;
			res.send(result)
		}
	})
});
router.get("/shop", function(req, res) {
	if(req.session == null || req.session.username == null) {
		res.redirect("/login")
	} else {
		res.render("shop", {})
	}
});
//添加商品信息！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
router.post("/api/shop", (req, res) => {
	var form = new multiparty.Form({
		uploadDir: "public/images"
	})
	var result = {
		code: 1,
		message: "添加商品成功"
	}
	form.parse(req, (err, body, files) => {
		//		console.log(body)
		//		console.log(files)
		var gd = body.g_id[0];
		var gm = body.g_name[0];
		var gn = body.g_number[0];
		var gp = body.g_price[0];
		var gs = body.g_stock[0];
		var gl = body.g_sales[0];
		var gi = files.g_img[0].path.replace("public\\images\\", "")
		var goodData = new GoodsData();

		goodData.g_id = gd;
		goodData.g_name = gm;
		goodData.g_number = gn;
		goodData.g_price = gp;
		goodData.g_stock = gs;
		goodData.g_sales = gl;
		goodData.g_img = gi;
		goodData.save((err) => {
			if(err) {
				result.code = -100;
				result.message = "添加商品失败，请重新添加";
				res.send(result)
			} else {
				res.send(result)
			}
		})
	})
});
//编辑一条数据~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.post("/good/yitiao", function(req, res) {
	var pid = req.body.proId;
	var result = {
		code: 1,
		message: "编辑成功"
	}
	GoodsData.find({
		g_number: pid
	}, function(err, data) {
		if(err) {
			console.log("啊啊啊")
			result.code = -110;
			result.message = "编辑失败"
			res.send(result)
		} else {
			res.send(data)
			console.log("好好好")
		}
	});
})
//修改一条数据~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.post("/good/update", function(req, res) {
	console.log(req.body.gd_n)
	var gd_n = req.body.gd_n;
	var gd_m = req.body.gd_m;
	var gd_p = req.body.gd_p;
	var gd_s = req.body.gd_s;
	var gd_t = req.body.gd_t;
	var result = {
		code: 1,
		message: "修改数据成功"
	}
	//console.log(result.message)
	var goodid = {
		g_id: gd_m
	}
	var updates = {
		$set: {
			g_name: gd_n,
			g_price: gd_p,
			g_number: gd_m,
			g_sales: gd_s,
			g_stock: gd_t
		}
	}
	GoodsData.update(goodid, updates, function(err) {
		if(err) {
			console.log(err)
		} else {
			res.send(result)

		}
	})
});
//删除数据~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.post("/good/del", function(req, res) {
	var pid = req.body.goodId;
	var result = {
		code: 1,
		message: "删除成功"
	}
	GoodsData.remove({
		g_number: pid
	}, function(err, data) {
		if(err) {
			result.code = -110;
			result.message = "删除失败"
			res.send(result)
		} else {
			res.send(result)

		}
	});
});
//取数据
//查询数据库表从数据库中把数据取出来渲染到前端页面~~~~~~~~~~~~~~~~~~~~~~~~++++分页
router.post("/api/good", (req, res) => {
	console.log("页码：" + req.body.page)
	console.log("每页数：" + req.body.pageCon)
	var pageCon1 = req.body.pageCon || 10;
	var pageCon = parseInt(pageCon1);
	var page1 = req.body.page || 1;
	var page = parseInt(page1);
	GoodsData.count(function(err, count) {
		var query = GoodsData.find({}).skip((page - 1) * pageCon).limit(pageCon);
		query.exec(function(err, desc) {
			var result = {
				total: count,
				data: desc,
				page: page
			}
			res.send(result)
		})
	})
})
//搜索    +++ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~模糊查询
router.get("/good/search", (req, res) => {
	var search_data = req.query.searchData
	GoodsData.count(function(err, count) {
		var query = GoodsData.find({
			g_name: {
				$regex: search_data
			}
		})
		query.exec(function(err, dosc) {
			var result = {
				data: dosc,
				count: count
			}
			res.send(result)
		})
	})
})
module.exports = router;