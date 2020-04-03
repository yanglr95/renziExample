// 判断当前字符串是否以str开始
if(typeof String.prototype.startsWith != 'function'){
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
}
// 判断当前字符串是否以str结束
if(typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function (str){
		return this.slice(-str.length) == str;
	};
}
//出生日期转年龄
function ageSwitch(year){
	if(typeof year == 'string'){
		return new Date().getFullYear()-year.split('-')[0]*1;
	}else if(typeof year == 'number'){
		if(year<0){
			return new Date().getFullYear()-new Date(-year).getFullYear();
		}else{
			return new Date().getFullYear()-new Date(year).getFullYear();
		}
	}
}
//时间格式转换
function timeType(time){
	if(typeof time!='number'){
		return time;
	}
	var timer = new Date(time);
	return timer.getFullYear()+'-'+(timer.getMonth()+1).toString().padStart(2,'0')+'-'+timer.getDate().toString().padStart(2,'0');
}
//loading
// function openLoading(){
// 	$('#loading').show();
// }
// function closeLoading(){
// 	$('#loading').hide();
// }
// ie6-8 indexOf兼容
if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function(ele){
		// 获取数组长度
		var len = this.length;
		// 检查值为数字的第二个参数是否存在，默认值为0
		var fromIndex = Number(arguments[1]) || 0;
		// 当第二个参数小于0时，为倒序查找，相当于查找索引值为该索引加上数组长度后的值
		if(fromIndex < 0){
			fromIndex += len;
		}
		// 从fromIndex起循环数组
		while(fromIndex < len){
			// 检查fromIndex是否存在且对应的数组元素是否等于ele
			if(fromIndex in this && this[fromIndex] === ele){
				return fromIndex;
			}
			fromIndex++;
		}
		// 当数组长度为0时返回不存在的信号：-1
		if(len === 0){
			return -1;
		}
	}
}
//去除左侧空格
function LTrim(str){
	return str.replace(/^\s*/g,"");
}
//去除右侧空格
function RTrim(str){
	return str.replace(/\s*$/g,"");
}
//去除两端空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}
// 组织树图标
function parTreeIcon(data){
	for( var i = 0; i < data.length; i++){
		switch(data[i].attributes.PAR_TYPE){
			case "3" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-dz tree-logo tree-indent'><div/>")
				tipbox("tree-dz", "党组")
				break;
			case "611" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-dw tree-logo tree-indent'><div/>")
				tipbox("tree-dw", "党委")
				break;
			case "911" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-lsdw tree-logo tree-indent'><div/>")
				tipbox("tree-lsdw", "临时党委")
				break;
			case "621" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-dzz tree-logo tree-indent'><div/>")
				tipbox("tree-dzz", "党总支部")
				break;
			case "921" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-lsdzz tree-logo tree-indent'><div/>")
				tipbox("tree-lsdzz", "临时党总支部")
				break;
			case "631" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-dzb tree-logo tree-indent'><div/>")
				tipbox("tree-dzb", "党支部")
				break;
			case "931" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-lsdzb tree-logo tree-indent'><div/>")
				tipbox("tree-lsdzb", "临时党支部")
				break;
			case "632" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-lhdzb tree-logo tree-indent'><div/>")
				tipbox("tree-lhdzb", "联合党支部")
				break;
			case "932" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-lslhdzb tree-logo tree-indent'><div/>")
				tipbox("tree-lslhdzb", "临时联合党支部")
				break;
			case "699" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-dxz tree-logo tree-indent'><div/>")
				tipbox("tree-dxz", "党小组")
				break;
		}
	}
}
//团组织树图标
function tuanTreeIcon(data){
	for( var i = 0; i < data.length; i++){
		switch(data[i].attributes.TUAN_TYPE){
			case "01" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-dw tree-logo tree-indent'><div/>")
				tipbox("tree-dw", "团委")
				break;
			case "02" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-dzz tree-logo tree-indent'><div/>")
				tipbox("tree-dzz", "团总支部")
				break;
			case "03" :
				$("#" + data[i].domId).find(".tree-title").before("<div class='tree-dzb tree-logo tree-indent'><div/>")
				tipbox("tree-dzb", "团支部")
				break;
		}
	}
}
// 分页
function grid_page(id, pageSize){
	$('#' + id).datagrid("getPager").pagination({
		pageSize : pageSize,// 每页显示的记录条数，默认为10
		pageList : [5, 10, 20, 50],// 每页显示几条记录
		beforePageText : '',// 页数文本框前显示的汉字
		layout:['prev','links','next','list','manual'],
		links:3,
		showRefresh : false,
		beforePageText:'跳至',
		afterPageText : '页 ',
		displayMsg : '共 {total} 条',
		onChangePageSize : function(pageSize){
			$('#' + id).datagrid("getPager").pagination('select', 1);
		}
	});
	// $('#' + id).find(".pagination table").append("<td class='pagination-textspan' >每页显示</td>");
	// $('#' + id).find(".pagination table").append("<span class='pagination-textspan' style='left: 116px;'>条记录</span>");
	// $('#' + id).find('.pagination table td:nth-child(2)').addClass("tdwidth-big");
	// $('#' + id).find('.pagination table td:nth-child(9)>span').addClass("ft-16");
}
// 表格树分页
function treegrid_page(id, pageSize){
	$('#' + id).treegrid("getPager").pagination({
		pageSize : pageSize,// 每页显示的记录条数，默认为10
		pageList : [5, 10, 20, 50],// 每页显示几条记录
		beforePageText : '',// 页数文本框前显示的汉字
		showRefresh : false,
		afterPageText : '/{pages} ',
		displayMsg : '当前显示{from}到{to}条，共{total}条记录'
	});
	$('.' + id).find(".pagination table").append("<td class='pagination-textspan' >每页显示</td>");
	$('.' + id).find(".pagination table").append("<span class='pagination-textspan' style='left: 116px;'>条记录</span>")
	$('.' + id).find(".datagrid .datagrid-pager").append("<div class='pag-arrowbox'></div>");
	$('.' + id).find('.pagination table td:nth-child(2)').addClass("tdwidth-big");
	$('.' + id).find('.pagination table td:nth-child(9)>span').addClass("ft-16");
}
// 弹窗
// 显示 宽，高，dom节点，标题，内容地址，加载信息
function showPanalAlert(width, height, alertEle, title, url, loadingMessage, constrain){
	if(!loadingMessage){
		loadingMessage = "";
	}
	$(alertEle).dialog({
		title : title,
		width : width,
		height : height<$(window).height()?height:"100%",
		closed : false,
		cache : false,
		href : url,
		modal : true,
		// resizable:true, //缩放
		loadingMessage : loadingMessage,
		constrain : constrain,
		onClose : function(){
			$(alertEle).dialog('destroy');
            $('<div id="'+alertEle.substring(1,alertEle.length)+'"></div>').appendTo('body');
		}
	});
	$(".window").css("position", "fixed");
	$(".window-shadow").css("position", "fixed");
}
//弹窗
//显示 宽，高，dom节点，标题，内容地址，加载信息
function showPanalAlert2(width, height, alertEle, title, url, loadingMessage, callback,callbackBefore){
	if(!loadingMessage){
		loadingMessage = "";
	}
	$(alertEle).dialog({
		title : title,
		width : width,
		height : height<$(window).height()?height:"100%",
		closed : false,
		cache : false,
		href : url,
		modal : true,
		// resizable:true, //缩放
		onClose : function(){
			$(alertEle).dialog('destroy');
         $('<div id="'+alertEle.substring(1,alertEle.length)+'"></div>').appendTo('body');
		},
		onDestroy : callback,
		onBeforeDestroy : callbackBefore,
		loadingMessage : loadingMessage
	});
}
// 关闭
function hideAlert(ele){
	var windowParent = $(ele).parents(".window").parent();
	var needId = $(ele).parents(".window-body").attr("id");
	$("#" + $(ele).parents(".window-body").attr("id")).dialog('destroy');
	windowParent.append('<div id="' + needId + '"></div>');
}

// 进度
function project_process(id, num){
	$("#" + id).find("li").eq(num - 1).addClass('current');
	$(this).addClass("current");
	for( var i = 0; i < num - 1; i++){
		$("#" + id).find("li").eq(i).removeClass("current").addClass("complete").find("span").html("");
	}
	if(num != 0){
		$("#" + id).find("li").eq(num - 2).find("i").addClass("current")
	}
}

// echarts-饼状图
/*
 * id 图表容器 color_list：颜色列表 data:数据 data_name:图表 data_name:图例列表 type:单位
 */
function setPie(id, color_list, data, data_name, legend_data, type){
	type = type || "";
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		color : color_list,
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
			x : 20,
			y : 30,
			data : legend_data,
			itemWidth : 12,
			itemHeight : 12,
			textStyle : {
				fontSize : 14,
				color : "#7d7d7d"
			}
		},
		series : [{
			name : data_name,
			type : 'pie',
			radius : ['25%', '85%'],
            minAngle:2,
			hoverAnimation : false,
			avoidLabelOverlap : false,
			label : {
				normal : {
					show : true,
					position : 'inside',
					color : "#fff",
					formatter : function(d){
						return d.value + type;
					}
				}
			},
			labelLine : {
				normal : {
					show : false
				}
			},
			data : data
		}]
	};
	myChart.setOption(option);
}

// 提示框
// state(状态值boolean)，message(提示信息string)
function messager_show(state, message){
	var timeout = 0;
	message=message.length>60?message.substring(0,60)+"...":message;
	if(message.length > 8){
		timeout = message.length / 10 * 1000;
	}else{
		timeout = 1000;
	}
	// 隐藏其他提示框
	$(".messager-body").parent().hide();
	// scrollTop浏览器兼容
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	var attr = state ? {
		"message" : "<i class='messager-success'></i><i class='close-show' onclick=\"hideShow(this)\"></i>" + message,
	// "messager_top":document.body.scrollTop + document.documentElement.scrollTop + 60,
	// "timeout":1000
	} : {
		"message" : "<i class='messager-error'></i><i class='close-show' onclick=\"hideShow(this)\"></i>" + message,
	// "messager_top":document.body.scrollTop + document.documentElement.scrollTop + windowHeight/2-35,
	// "timeout":1000
	};
	$.messager.show({
		title : '',
		msg : attr.message,
		showType : 'fade',
		timeout : timeout,
		style : {
			right : '',
			top : scrollTop + windowHeight / 2 - 35
		}
	});
	if(message.length > 10){
		$(".messager-body").parent().css({
			"width" : message.length * 18 + 70,
			"left" : "50%",
			"margin-left" : -(message.length * 18 + 70) / 2
		})
		$(".messager-body").css({
			"width" : message.length * 18 + 60
		})
	}
	$(".messager-body").css("height", 60);
}
// 关闭提示信息
function hideShow(ele){
	$(ele).parents(".window").remove();
}

// 选择人员弹窗
function commonXzry(id){
	showPanalAlert(1000, 660, "#" + id, "选择人员", "../../alert/xzry.jsp");
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt){ // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for( var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

var windowHeight = parseInt(window.innerHeight);
if(window.innerHeight == null){
	windowHeight = $(window).height();
}


// tooltip 按钮提示组件
function tipbox(className, content, x, y){
	/*
	 * className -> 类名 content -> 提示内容 x -> 定位x坐标 y -> 定位y坐标
	 */
	$('.' + className).tooltip({
		position : 'top',
		deltaX : x || 0,
		deltaY : y || 0,
		content : '<span style="color:#fff;">' + content + '</span>',
		onShow : function(){
			$(this).tooltip('tip').css({
				backgroundColor : '#666',
				borderColor : '#666'
			});
		}
	});
}

$.extend($.fn.validatebox.defaults.rules, {
	minLength : {
		validator : function(value, param){ // value 为需要校验的输入框的值 , param为使用此规则时存入的参数
			return value.length >= param[0];
		},
		message : '请输入最小{0}位字符.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	maxLength : {
		validator : function(value, param){
			return param[0] >= value.length;
		},
		message : '请输入最大{0}位字符.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	length : {
		validator : function(value, param){
			return value.length >= param[0] && param[1] >= value.length;
		},
		message : '请输入{0}-{1}位字符.'
	}
});

// extend the 'equals' rule
$.extend($.fn.validatebox.defaults.rules, {
	equals : {
		validator : function(value, param){
			return value == $(param[0]).val();
		},
		message : '字段不相同.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	web : {
		validator : function(value){
			return /^(http[s]{0,1}|ftp):\/\//i.test($.trim(value));
		},
		message : '网址格式错误.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	idcard : {
		validator : function(value){
			return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
		},
		message : '身份证号码格式不正确'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	mobile : {
		validator : function(value){
			return /^1[0-9]{10}$/i.test($.trim(value));
		},
		message : '手机号码格式错误.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	date : {
		validator : function(value){
			return /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/i.test($.trim(value));
		},
		message : '日期格式错误,如2012-09-11.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	email : {
		validator : function(value){
			return /^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/i.test($.trim(value));
		},
		message : '电子邮箱格式错误.'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	zhengshu : {
		validator : function(value){
			var zzs =/^(?:[1-9]\d*|0)(?:\.\d+)?$/;
			return zzs.test(value);
		},
		message : '只能输入正数.'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	zhengzhengshu : {
		validator : function(value){
			// /^[0-9]*[1-9][0-9]*$/
			var zzs = /^[0-9]\d*$/;
			return zzs.test(value);
		},
		message : '只能输入正整数.'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	xiaoshu : {
		validator : function(value){
			var zzs = /^[0-9]\d*(\.\d)?$/;
			return zzs.test(value);
		},
		message : '请输入整数或小数.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	rangew : {
		validator : function(value){
			var zzs = /^[0-7]$/;
			return zzs.test(value);
		},
		message : '请输入范围再0-7的整数.'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	zmshuzi : {
		validator : function(value){
			var zzs = /^[A-Za-z0-9]+$/;
			return zzs.test(value);
		},
		message : '只能输入字母和数字.'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	rangel : {
		validator : function(value){
			var zzs = /^[0-6]$/;
			return zzs.test(value);
		},
		message : '请输入范围再0-6的整数.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	rangeq : {
		validator : function(value){
			var zzs = /^[0-5]$/;
			return zzs.test(value);
		},
		message : '请输入范围再0-5的整数.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	rangeb : {
		validator : function(value){
			var zzs = /^[0-8]$/;
			return zzs.test(value);
		},
		message : '请输入范围再0-8的整数.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	rangej : {
		validator : function(value){
			var zzs = /^[0-9]$/;
			return zzs.test(value);
		},
		message : '请输入范围再0-9的整数.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	ranges : {
		validator : function(value){
			var zzs = /^(?:1[0]|[1-9])$/;
			return zzs.test(value);
		},
		message : '请输入范围再0-10的整数.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	rangese : {
		validator : function(value){
			var zzs = /^(?:1[0-2]|[1-9])$/;
			return zzs.test(value);
		},
		message : '请输入范围再0-12的整数.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	rangesw : {
		validator : function(value){
			var zzs = /^(?:1[0-5]|[1-9])$/;
			return zzs.test(value);
		},
		message : '请输入范围再0-15的整数.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	niandu : {
		validator : function(value){
			var zzs = /^\d{4}$/;
			return zzs.test(value);
		},
		message : '只能输入4位正整数表示年度.'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	hanzi : {
		validator : function(value){
			var hz = /^([\u4e00-\u9fa5]|[·])*$/;
			return hz.test(value);
		},
		message : '只能输入汉字.'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	cjnd : {
		validator : function(value){
			var cjnd = /^\d{4}[-]\d{4}$/;
			return cjnd.test(value);
		},
		message : '输入格式有误.'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	hanNumber : {
		validator : function(value){
			var hn = /^[0-9\u4e00-\u9fa5]+$/;
			return hn.test(value);
		},
		message : '只能输入汉字和数字.'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	hanNumberChar : {
		validator : function(value){
			var hn = /^[0-9\u4e00-\u9fa5-a-zA-Z]+$/;
			return hn.test(value);
		},
		message : '只能输入汉字、数字和英文字母.'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	equaldDate : {
		validator : function(value, param){
			var start = $(param[0]).datetimebox('getValue'); // 获取开始时间
			return value >= start; // 有效范围为当前时间大于等于开始时间
		},
		message : '结束日期应大于开始日期!' // 匹配失败消息
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	specialStr : {
		validator : function(value){
			var specialStr = new RegExp("[&+%]");
			return !specialStr.test(value);
		},
		message : '含有特殊字符'
	}
});
//$.extend($.fn.validatebox.defaults.rules, {
//	searchbox : {
//		validator : function(value){
//			var reg =/^[\u4E00-\u9FA5A-Za-z0-9,.()]+$/;
//			var reg2 =/(script)+/gi;
//			if(reg2.test(value)){//
//				return false;
//			}else{
//				return reg.test(value);
//			};	
//		},
//		message : '该输入框只能输入中文、英文、数字及英文逗号句号'
//	}
//});		
$.extend($.fn.validatebox.defaults.rules, {
	searchbox : {
		validator : function(value){
			var reg =/^[\u4E00-\u9FA5A-Za-z0-9,.，。()（）\s\n\r]+$/;
			var reg2 =/(select|script|update|delete|insert|prompt|%)+/gi;
			if(reg2.test(value)){//
				return false;
			}else if(trim(value) == ""){
				return false;
			}else{
				return reg.test(value);
			};	
		},
		message : '该输入框只能输入中文、英文、数字及中英文逗号句号括号'
	},
	fbtSearchbox : {
		validator : function(value){
			var reg =/^[\u4E00-\u9FA5A-Za-z0-9,.，。()（）\s\n\r]+$/;
			var reg2 =/(select|script|update|delete|insert|prompt)+/gi;
			if(reg2.test(value)){//
				return false;
			}else{
				return reg.test(value);
			};	
		},
		message : '该输入框只能输入中文、英文、数字及中英文逗号句号括号'
	},
	validateSpecialCharacter : {
		validator : function(value){
			var reg =/^[\u4E00-\u9FA5A-Za-z0-9,.，。()（）\s\n\r\+!！%：？\?@#$\*_-]+$/;
			var reg2 =/(select|script|update|delete|insert|prompt)+/gi;
			if(reg2.test(value)){//
				return false;
			}else{
				return reg.test(value);
			};	
		},
		message : '该输入框只能输入中文、英文、数字及中英文逗号句号括号感叹号百分号加减号问号'
	}
});
$.extend($.fn.validatebox.defaults.rules, {
	jtcyname : {
		validator : function(value){
			var reg =/^[\u4e00-\u9fa5]{0,}$/;
			return reg.test(value);
		},
		message : '只能输入汉字'
	}
});		
$.extend($.fn.validatebox.defaults.rules, {
	bequaldDate : {
		validator : function(value, param){
			var end = $(param[0]).datetimebox('getValue'); // 获取结束时间
			if(end == null || end == ""){
				return true;
			}
			return value <= end; // 有效范围为当前时间小于等于结束时间
		},
		message : '结束日期应大于开始日期!' // 匹配失败消息
	},
	number : {
		validator : function(value){
			var reg = /^[0-9]*$/;
			return reg.test(value);
		},
		message : '只能输入数字'
	},
	lxdh : {
		validator : function(value){
			var reg = /^(\(\d{3,4}\)|\d{3,4}[-]?)?\d{7,8}(\-\d{1,4})?$|(1[0-9]{10})$/;
			return reg.test(value);
		},
		message : '联系电话格式不正确,如:xxxxxxx、010-xxxxxxxx、010xxxxxxx、1xxxxxxxxxx'
	},
	bgdh : {
		validator : function(value){
			var reg = /^(\(\d{3,4}\)|\d{3,4}[-]?)?\d{7,8}(\-\d{1,4})?$|(1[0-9]{10})$/;
			return reg.test(value);
		},
		message : '办公电话格式不正确,如:xxxxxxx、010-xxxxxxxx、010xxxxxxx、1xxxxxxxxxx'
	},
	czdh : {
		validator : function(value){
			var reg = /^(\(\d{3,4}\)|\d{3,4}[-]?)?\d{7,8}(\-\d{1,4})?$/;
			return reg.test(value);
		},
		message : '传真电话格式不正确,如:xxxxxxx、010-xxxxxxxx、010-xxxxxxx-xxx'
	},
	yzbm : {
		validator : function(value){
			var reg = /^[0-9][0-9]{5}$/;
			return reg.test(value);
		},
		message : '邮政编码格式不正确'
	},
	parName : {
		validator : function(value){
			var zzs = /^[\u2E80-\uFE4F \(\)（）]+$/;
			return zzs.test(value);
		},
		message : '党组织名称必须为汉字且最多输入100个汉字'
	},
	numArea:{
		validator : function(value, param) {
			var len = $.trim(value);
			return len >= 0 && len <= param[0];
		},
		message : "输入值范围0到{0}."
	}
});
// 文件上传的类型对应关系
// *.3gpp audio/3gpp,video/3gpp 3GPPAudio/Video
// *.ac3 audio/ac3 AC3Audio
// *.asf allpication/vnd.ms-asf AdvancedStreamingFormat
// *.au audio/basic AUAudio
// *.css text/css CascadingStyleSheets
// *.csv text/csv CommaSeparatedValues
// *.doc application/msword MSWordDocument
// *.dot application/msword MSWordTemplate
// *.dtd application/xml-dtd DocumentTypeDefinition
// *.dwg image/vnd.dwg AutoCADDrawingDatabase
// *.dxf image/vnd.dxf AutoCADDrawingInterchangeFormat
// *.gif image/gif GraphicInterchangeFormat
// *.htm text/html HyperTextMarkupLanguage
// *.html text/html HyperTextMarkupLanguage
// *.jp2 image/jp2 JPEG-2000
// *.jpe image/jpeg JPEG
// *.jpeg image/jpeg JPEG
// *.jpg image/jpeg JPEG
// *.js text/javascript,application/javascript JavaScript
// *.json application/json JavaScriptObjectNotation
// *.mp2 audio/mpeg,video/mpeg MPEGAudio/VideoStream,LayerII
// *.mp3 audio/mpeg MPEGAudioStream,LayerIII
// *.mp4 audio/mp4,video/mp4 MPEG-4Audio/Video
// *.mpeg video/mpeg MPEGVideoStream,LayerII
// *.mpg video/mpeg MPEGVideoStream,LayerII
// *.mpp application/vnd.ms-project MSProjectProject
// *.ogg application/ogg,audio/ogg OggVorbis
// *.pdf application/pdf PortableDocumentFormat
// *.png image/png PortableNetworkGraphics
// *.pot application/vnd.ms-powerpoint MSPowerPointTemplate
// *.pps application/vnd.ms-powerpoint MSPowerPointSlideshow
// *.ppt application/vnd.ms-powerpoint MSPowerPointPresentation
// *.rtf application/rtf,text/rtf RichTextFormat
// *.svf image/vnd.svf SimpleVectorFormat
// *.tif image/tiff TaggedImageFormatFile
// *.tiff image/tiff TaggedImageFormatFile
// *.txt text/plain PlainText
// *.wdb application/vnd.ms-works MSWorksDatabase
// *.wps application/vnd.ms-works WorksTextDocument
// *.xhtml application/xhtml+xml ExtensibleHyperTextMarkupLanguage
// *.xlc application/vnd.ms-excel MSExcelChart
// *.xlm application/vnd.ms-excel MSExcelMacro
// *.xls application/vnd.ms-excel MSExcelSpreadsheet
// *.xlt application/vnd.ms-excel MSExcelTemplate
// *.xlw application/vnd.ms-excel MSExcelWorkspace
// *.xml text/xml,application/xml ExtensibleMarkupLanguage
// *.zip aplication/zip CompressedArchive

$.extend($.fn.validatebox.defaults.rules, {
	// filebox验证文件大小的规则函数
	// 如：validType : ['fileSize[1,"MB"]']
	fileSize : {
		validator : function(value, array){
			var size = array[0];
			var unit = array[1];
			if(!size || isNaN(size) || size == 0){
				$.error('验证文件大小的值不能为 "' + size + '"');
			}else if(!unit){
				$.error('请指定验证文件大小的单位');
			}
			var index = -1;
			var unitArr = new Array("bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb");
			for( var i = 0; i < unitArr.length; i++){
				if(unitArr[i] == unit.toLowerCase()){
					index = i;
					break;
				}
			}
			if(index == -1){
				$.error('请指定正确的验证文件大小的单位：["bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"]');
			}
			// 转换为bytes公式
			var formula = 1;
			while(index > 0){
				formula = formula * 1024;
				index--;
			}
			// this为页面上能看到文件名称的文本框，而非真实的file
			// $(this).next()是file元素
			var Sys = {};
			if(navigator.userAgent.indexOf("MSIE") > 0){
				Sys.ie = true;
			}
			var fileRealSize = 0;
			if(Sys.ie){
				/*
				 * var filePath=($(this).next().get(0).value+"").split("\\") var fileobject = new ActiveXObject("Scripting.FileSystemObject");//获取上传文件的对象 var file =
				 * fileobject.GetFile(filePath[filePath.length-1]);//获取上传的文件 fileRealSize = file.Size;//检测 上传文件大小
				 */
				return true;
			}else{
				fileRealSize = $(this).next().get(0).files[0].size;
			}
			if(fileRealSize == 0){
				return false;
			}
			return fileRealSize < parseFloat(size) * formula;
		},
		message : '文件大小必须大于 0 且小于 {0}{1}'
	}
});

/**
 * 是否安装了adobe reader插件
 */
function isAcrobatPluginInstall(){
	var mb = myBrowser();
	var flag = false;
	// 如果是firefox浏览器
	if("FF" == mb){
		for(x = 0; x < navigator.plugins.length; x++){

			if(navigator.plugins[x].name == 'Adobe Acrobat')
				flag = true;
		}
	}
	// 下面代码都是处理IE浏览器的情况
	else if("IE" == mb || "IE11" == mb){
		for(x = 2; x < 10; x++){
			try{
				oAcro = eval("new ActiveXObject('PDF.PdfCtrl." + x + "');");
				if(oAcro){
					flag = true;
				}
			}catch(e){
				flag = false;
			}
		}
		try{
			oAcro4 = new ActiveXObject('PDF.PdfCtrl.1');
			if(oAcro4)
				flag = true;
		}catch(e){
			flag = false;
		}
		try{
			oAcro7 = new ActiveXObject('AcroPDF.PDF.1');
			if(oAcro7)
				flag = true;
		}catch(e){
			flag = false;
		}
	}else if("Chrome" == mb){
		flag = true;
	}else{
		flag = false;
		alert("本功能只支持谷歌、IE和火狐浏览器");
		return flag;
	}
	if(flag){
		return true;
	}else{
		alert("对不起,您还没有安装Adobe PDF Reader,或者未启用Adobe PDF Reader插件。");
		// if(confirm(("对不起,您还没有安装Adobe PDF Reader,或者未启用Adobe PDF Reader插件,为了正确使用此功能,是否选择下载？"))){
		// var baseUrl = zrsgl2.mappath("~/rest/application/downLoadPlug?fileName=AdbeRdr1010_zh_CN_x32.exe");
		// window.location.href = baseUrl;
		// }
		// location = 'http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.3/chs/AdbeRdr930_zh_CN.exe';
	}
	return flag;
}
function myBrowser(){
	var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1;
	if(isOpera){
		return "Opera"
	}
	; // 判断是否Opera浏览器
	if(userAgent.indexOf("Firefox") > -1){
		return "FF";
	} // 判断是否Firefox浏览器
	if(userAgent.indexOf("Chrome") > -1){
		return "Chrome";
	}
	if(userAgent.indexOf("Safari") > -1){
		return "Safari";
	}
	// 判断是否IE浏览器
	if(/(msie|internet explorer)/i.test(navigator.userAgent)){
		return "IE";
	}else{
		var u = window.navigator.userAgent.toLowerCase();
		var ie11 = /(trident)\/([\d.]+)/;
		var b = u.match(ie11);
		if(b){
			return "IE11";
		}else{

		}
	}
}

// 判断浏览器
jQuery.browser = {};
jQuery.browser.msie = false;
jQuery.browser.version = 0;
if(navigator.userAgent.match(/MSIE ([0-9]+)./)){
	jQuery.browser.msie = true;
	jQuery.browser.version = RegExp.$1;
}
// //时间插件清空
// var df_buttons=$.fn.datetimebox.defaults.buttons + "";
// df_buttons.splice(2, 1, {
//     text: '清空',
//     handler: function(target){
//         $(target).datetimebox('setValue','');
//     }
// });

//liangbj 检修前测试放开 ycym
// $.fn.form.defaults = $.extend({},$.fn.form.defaults,{
// 	iframe:false,
// 	contentType:'application/x-www-form-urlencoded'
// });
// $.fn.datagrid.defaults = $.extend({},$.fn.datagrid.defaults,{
// 	contentType:'application/x-www-form-urlencoded'
// });
// // $.fn.datalist.defaults = $.extend({},$.fn.datalist.defaults,{
// // 	contentType:'application/x-www-form-urlencoded'
// // });
// $.fn.tree.defaults = $.extend({},$.fn.tree.defaults,{
// 	contentType:'application/x-www-form-urlencoded'
// });
// $.fn.treegrid.defaults = $.extend({},$.fn.treegrid.defaults,{
// 	contentType:'application/x-www-form-urlencoded'
// });
// $.fn.combotree.defaults = $.extend({},$.fn.combotree.defaults,{
// 	contentType:'application/x-www-form-urlencoded'
// });
// $.fn.combotreegrid.defaults = $.extend({},$.fn.combotreegrid.defaults,{
// 	contentType:'application/x-www-form-urlencoded'
// });
// $.fn.combogrid.defaults = $.extend({},$.fn.combogrid.defaults,{
// 	contentType:'application/x-www-form-urlencoded'
// });
//liangbj 检修前测试放开 ycym
$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
  'combo','combobox','combogrid','combotree',
  'datebox','datetimebox','numberbox',
  'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
 if ($.fn[plugin]){
  $.fn[plugin].defaults.missingMessage = '该输入项为必输项';
 }
});

//关闭当前被选中的tab标签
function closeTab(){
	var tab = $('#mainTabs').tabs('getSelected');
	var index = $('#mainTabs').tabs('getTabIndex',tab);
	$('#mainTabs').tabs('close',index);
}

// 格式化字符串，防止为空时输出undefined
function formatString(str,defaultValue) {
	var _returnValue = str;
	if(!str || _returnValue == "null") {
		if(defaultValue) {
			_returnValue = defaultValue;
		} else {
			_returnValue = "";	
		}		
	}
	return _returnValue;
}