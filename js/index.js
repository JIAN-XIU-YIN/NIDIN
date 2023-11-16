// JavaScript Document
$("ul.list").toggleClass("ha");

$(".add").each(function(i){
	$(this).click(function(){
		var t=$(".num").eq(i).val();
		t++;
		$(".num").eq(i).val(t);
	});
});
$(".min").each(function(index){
	$(this).click(function(){
		var t=$(".num").eq(index).val();
		var n=parseInt(t)-1;
		if(n>=1){
			$(".num").eq(index).val(n);
		}else{
			$(".num").eq(index).val(0);
		}
	});
});

const datan=[0,0,0,0];
var allnum=0;
var allnum2=0;

$(".shop-btn,#si2").click(function(){
	$(".car").css("margin-left","0");
	allnum=0;
	for(n=0;n<=3;n++){
		var t=$(".num").eq(n).val();
		$(".disnum").eq(n).html(t);
		allnum+=parseInt(t);
		datan[n]=parseInt(t);
	}
	$("#topcar").html(allnum);
});

$("#car-close").click(function(){
	$(".car").css("margin-left","-400px");
});

$("#car-btn").click(function(){
	$("#car-box").modal();
	allnum2=datan[0]*115+datan[1]*99+datan[2]*99+datan[3]*139+30;
	$("#carnum").html(allnum);
	$("#carnum2").html(allnum2);
	
	Cookie2();
	sb=[0,0,0,0];
	report();
	$("ul.list").toggleClass("ha");
});

$("#send").click(function(){
	$(".car").css("margin-left","-400px");
	$(".num").val(0);
	$(".disnum").html(0);
	$("#topcar").html(0);
	report();
	$("ul.list").toggleClass("ha");
	report();
	var r=$("div.report").offset().top-80;
	$("html,body").animate({
		scrollTop:r
	},500);
});
//==================================================
function Cookie2(){
	data=datan[0]+"&&"+datan[1]+"&&"+datan[2]+"&&"+datan[3];
	ndata=localStorage.ndata;
	if(ndata==null || ndata==""){
		ndata=data;
	}else{
		ndata=ndata+"||"+data;
	}
	localStorage.ndata=ndata;
}

var sb=[0,0,0,0];
var rate=[0,0,0,0];

function report(){
	sb=[0,0,0,0];
	rate=[0,0,0,0];
	$("#show-report").html("");
	ck=localStorage.ndata;
	if(ck==null){
		localStorage.ndata="0&&0&&0&&0";
	}
	ck=localStorage.ndata;
	sb=ck.split('||')[0].split('&&').map((x,i)=>{
		return ck.split('||').map(y=>+y.split('&&')[i]).reduce((a,b)=>a+b);
	});
	
	var items=["匈牙利嫩烤松阪豬","香蒜黑椒巴沙魚","蒜香椒鹽牛五花","舒肥熟成菲力牛"];
	for(var i=0;i<items.length;i++){
		$("#show-report").append(`<p class="car-p">商品${i+1}${items[i]}<span class="disnum fred fw">${sb[i]}</span>份</p>`);
	}
	
	var sbs=(sb[0]+sb[1]+sb[2]+sb[3]);
	for(var i=0;i<4;i++){
		rate[i]=Math.floor(sb[i]/sbs*100);
		$(`#show-list ul.list>li:nth-child(${i+1})`).css("height",`${rate[i]}%`);
		$("ul.list>li:nth-child("+(i+1)+")").css("left",3+(i)*25+"%");
		$("span.list-rate").eq(i).html(rate[i]+"%");
	}
	
	ck=localStorage.userdata;
	if(ck!=null){
		a=ck.split("||");
		$("#show-report2").html("");
		$("#p").html(a.length);
		for(i=0;i<a.length;i++){
			if(a[i]!=""){
				b=a[i].split("&&");
				$("#show-report2").append('<hr><p class="car-p">訪客:<span class="fred fw">'+b[0].substr(0,1)+'***'+'</span></p>');
				$("#show-report2").append('<p class="car-p">信箱:<span class="fred fw">'+b[1].substr(0,5)+'*********'+'</span></p>');
				$("#show-report2").append('<p class="car-p">留言:<span class="fred fw">'+b[2]+'</span></p>');
			}
		}
	}
	var e=document.getElementById("show-report2");
	e.scrollTop=e.scrollHeight;
	e.scrollLeft=e.scrollWidth;
}
report();
//==================================================
var r=true;
$(".mess").delay(1000).fadeOut("slow");
$(".robot,#si3").click(function(){
	sleep();
});
function sleep(){
	$(".mess").toggle(function(){
		if(r){
			$(".robot").css("background-image","url('images/robotx.png')");
			r=!r;
		}else{
			$(".robot").css("background-image","url('images/robot0.png')");
			r=!r;
		}
	});
}
function keyin(event){
	var keyCode=event.which;
	if(keyCode==13){
		$("#rsayto").append('<li class="mess-r"><div class="mess-text">'+document.getElementById("rsay").value+'</div><div class="mess-ava"><span class="glyphicon glyphicon-user"></span></div></li>');
		$("#rsay").val("");
		answer();
	}
}
function answer(){
	setTimeout(function(){
		$("#rsayto").append(QA());
		var e=document.getElementById("rsayto");
		e.scrollTop=e.scrollHeight;
		e.scrollLeft=e.scrollWidth;
	},500);
}
function Cookie(id){
	cname=$("#cname"+id).val();
	cemail=$("#cemail"+id).val();
	ctext=$("#ctext"+id).val();
	
	if(cemail.indexOf("@")>0){
		data=cname+"&&"+cemail+"&&"+ctext;
		userdata=localStorage.userdata;
		if(cname!="" && cemail!=""){
			if(userdata==null){
				userdata=data;
			}else{
				userdata=userdata+"||"+data;
			}
			localStorage.userdata=userdata;
			$("#rsayto").append('<li><div class="mess-ava"><img src="images/robot.png" alt=""></div><div class="mess-text">資料已送入後台及客戶服務紀錄。</div></li>');
			var e=document.getElementById("rsayto");
			e.scrollTop=e.scrollHeight;
			e.scrollLeft=e.scrollWidth;
			report();
			var r=$("div.report").offset().top-80;
			$("html,body").animate({
				scrollTop:r
			},500);
		}
	}
}
var c=0;
var d=1;
function QA(){
	d++;
	c=d%2;
	if(c==0){
		return '<li><div class="mess-ava"><img src="images/robot.png" alt=""></div><div class="mess-text">更多資訊可至<a href="#page5">服務中心</a>，疫情時期請多注意身邊的親朋好友及自己的健康。</div></li>';
	}
	if(c==1){
		return '<li><div class="mess-ava"><img src="images/robot.png" alt=""></div><div class="mess-text">您好，我是你訂機器人，您可以留下有關你訂的問題或意見，稍後會由專人為您服務。<form action="javascript:void(0);" id="form2">姓名: <input type="text" id="cname'+d+'" name="cname" required="required"><br>信箱: <input type="email" id="cemail'+d+'" name="cemail" required="required"><br>留言: <textarea name="ctext" id="ctext'+d+'"></textarea><button id="btn_form" onClick="javascript:Cookie('+d+');">送出</button><button type="reset">重設</button></form></div></li>';
	}
}
//==================================================
$("#user-si").click(function(){
	$("#si").html('<span class="glyphicon glyphicon-user"></span>B040會員於<span class="fred fw">豐原區</span>登入');
});
$(".nav-link,#top,.phone,.aw").click(function(){
	var t=$(this).attr("href");
	var st=$(t).offset().top-0;
	$("#carouselExampleControls").carousel(0);
	$("html,body").animate({
		scrollTop:st
	},500);
});
//==================================================
var p2=$("#page2").offset().top-100;
var p3=$("#page3").offset().top-100;
var p4=$("#page4").offset().top-100;
var p5=$("#page5").offset().top-100;

$(window).scroll(function(){
	wt=$(window).scrollTop();
	if(wt>p2 && wt<p2+150 || wt>p3 && wt<p3+150 || wt>p4 && wt<p4+150 || wt>p5 && wt<p5+150){
		$(".title-c").addClass("x");
		$(".title-e").addClass("xx");
	}else{
		$(".title-c").removeClass("x");
		$(".title-e").removeClass("xx");
	}
});
//==================================================

//==================================================

//==================================================