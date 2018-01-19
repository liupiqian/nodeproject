$(function() {
	$(".shop .t p").click(function() {
		var $sss = $(this).next();
		var $b = $(this).find("b");
		if($sss.css("display") == "none") {
			$sss.css("display", "block")
			$b.html("-")
		} else {
			$sss.css("display", "none")
			$b.html("+")
		}
	});
	$(".shop li .sg1 li").click(function() {
		$(this).addClass("ren").siblings().removeClass("ren")
	})
	$(".shop .t .sg1 li").click(function() {
		var index = $(this).index()
		console.log(index)
		$("#right").css("display", "block")
		$(".bian").css("display", "none")
		$("#right .ri").eq(index).show().siblings().hide();
	});
	//right t头部切换~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$(".right2 .content_top .con_top li").click(function() {
		$(this).addClass('one').siblings().removeClass('one');
		var index = $(this).index();
		console.log(index)
		$(".boss > div").eq(index).css("display", "block").siblings().css("display", "none");
	});
	//点击编辑效果~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$(".bian .content_top .con_top li").click(function() {
		$(this).addClass('one').siblings().removeClass('one');
		var index = $(this).index();
		console.log(index)
		$(".bian .boss > div").eq(index).css("display", "block").siblings().css("display", "none");
	});
	//点击编辑~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$(".tab").on("click", ".update", function() {
		var aaaa = $(this).parent().siblings("#bh").html()
		console.log(aaaa)
		$("#right").css("display", "none")
		$(".bian").css("display", "block")
		$.ajax({
			type: "post",
			url: "/good/yitiao",
			data: {
				proId: aaaa
			},
			success: function(res) {
				console.log(res[0])
				var data = res[0]
				$(".bian #goodName").val(data.g_name);
				$(".bian #goodPrice").val(data.g_price);
				$(".bian #goodNum").val(data.g_number);
				$(".bian #goodSales").val(data.g_sales);
				$(".bian #goodStock").val(data.g_stock);
			}
		});

	})
	//点击编辑按钮提交改的ajax~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$(".bian #bianji").click(function() {
		console.log("000000000000000")
		var gn = $(".bian #goodName").val();
		var gm = $(".bian #goodNum").val();
		var gp = $(".bian #goodPrice").val();
		var gs = $(".bian #goodSales").val();
		var gt = $(".bian #goodStock").val();
		$.ajax({
			type: "post",
			url: "/good/update",
			data: {
				gd_n: gn,
				gd_m: gm,
				gd_p: gp,
				gd_s: gs,
				gd_t: gt
			},
			success: function(res) {
				console.log(res.message)
				if(res.code == 1) {
					alert("两秒后跳转页面")
					setTimeout(function() {
						$("#right").css("display", "block")
						$(".bian").css("display", "none")
						refresh();
					}, 2000)
				}
			}
		});
	})
	//点击下一页    分页~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$(".right #xia").click(function() {
		var ye = $(".right #page").html()
		ye++;
		paging(ye);
	})
	//点击上一页~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$(".right #shang").click(function() {
		var ye = $(".right #page").html()
		ye--
		if(ye <= 0) {
			ye = 1;
		}
		paging(ye);
	})
	//封装点击分页的ajax请求~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	function paging(a) {
		var yeCon = $(".right #ye").val()

		$.ajax({
			type: "post",
			url: "/api/good",
			data: {
				pageCon: yeCon,
				page: a
			},
			success: function(res) {
				if(res.data.length != 0) {
					$(".right #page").html(res.page)
				} else {
					alert("没有下一页了")
				}
				var ai = res.data;
				app(ai);
			}
		});
	}
	//搜索~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$(".right .search").click(function() {
		var search = $(".right #search").val()
		$.ajax({
			type: "get",
			url: "/good/search",
			data: {
				searchData: search
			},
			success: function(res) {
				console.log(res)
				var ai = res.data
				app(ai);
				//			console.log(ai)

			}
		});
	})
	//点击删除~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$(".tab").on("click", ".del", function() {
		var dddd = $(this).parent().siblings("#bh").html()
		console.log(dddd)
		$.ajax({
			type: "post",
			url: "/good/del",
			data: {
				goodId: dddd
			},
			success: function(res) {

				if(res.code == 1) {
					refresh()
					alert(res.message)
				} else {
					alert("出错了")
				}
			}
		});
	})
})