function sub(){
//	console.log("1111111111111111111111")
	var gn = $("#goodName").val();
	var gi =$("#goodNum").val();
	var gp =$("#goodPrice").val();
	var gs =$("#goodSales").val();
	var gt =$("#goodStock").val();
	var form = new FormData();
	form.append("g_id",gi);
	form.append("g_name",gn);
	form.append("g_number",gi);
	form.append("g_price",gp);
	form.append("g_stock",gt);
	form.append("g_sales",gs);
	form.append("g_img",document.getElementById("goodImg").files[0]);
	var xhr =new XMLHttpRequest();
	xhr.open("POST","/api/shop");
	xhr.onreadystatechange=function(res){
		if(xhr.readyState == 4 && xhr.status == 200){
			var res = JSON.parse(xhr.responseText);
			if(res.code == 1){
				alert("两秒后跳转页面")
				setTimeout(function(){
					$(".right2").css("display","none")
					$(".right").css("display","block")
					refresh();
				},2000)
			}else{
				alert("上传商品信息失败")
			}
		}
	}
	xhr.send(form);
};
function refresh(){
	console.log("123456")
	var yeCon=$(".right #ye").val()
	var ye = $(".right #page").html()
	$.ajax({
		type:"post",
		url:"/api/good",
		success:function(res){
			var ai = res.data
			$(".right #sum").html(res.total)
			console.log(ai)
			app(ai)							
		}
	});
}
//封装插入节点的函数~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	function app(v){
		var $tr=""
			$.each(v, function(key,value) {
				$(".right .lala").remove()
//				console.log(value)
				 $tr+=`<tr class="lala">
    			<td>
    				<input type="checkbox" name="" id="" value="" />
    				<span id="pd">${value.g_id}</span>
    			</td>
    			<td id="gn">${value.g_name}</td>
    			<td id="bh">${value.g_number}</td>
    			<td id="gp">${value.g_price}</td>
    			<td>1</td>
    			<td>2</td>
    			<td>3</td>
    			<td>4</td>
    			<td>100</td>
    			<td id="gt">${value.g_stock}</td>
    			<td id="gs">${value.g_sales}</td>
    			<td class="tupian" id="gm"><img src="images/${value.g_img}"/></td>
    			<td class="ic"><i  class="iconfont icon-qianbipencil86 update"></i><i class="iconfont icon-Trash del"></i></td>
    		</tr>`
    		$(".tab").append($tr)
			});	
	}