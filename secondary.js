var secondary = $('.secondary_two_box');
var secondaryone = $('.secondary_one');
// 获取目录配置
function secondaryFun(i){
    secondary.html("")
   
        $.getJSON('/api/navsnew'+i, function (data) {
            $.each(data.list, function (j, c) {
                var temp = '<div class="secondary_two">';
                if(c.secondary){
                    temp += '<div style="color:#00A09F" class="secondary_title" data-url='+c.link+' data-secondary='+c.secondary+'>' + c.menuText + '</div>'
                }else{
                    temp += '<div class="secondary_title" data-url='+c.link+' data-secondary='+c.secondary+'>' + c.menuText + '</div>'
                }
                
                if(c.list&&c.list.length>0){
                    for(var i = 0 ;i<c.list.length;i++){
                        if(c.list[i].list&&c.list[i].list.length>0){
                            temp += '<div data-url='+c.list[i].link+' data-secondary='+c.list[i].secondary+'><strong>' + c.list[i].menuText + '</strong></div>'
                            for(var m = 0;m< c.list[i].list.length; m++){
                            temp += '<div data-url='+c.list[i].list[m].link+' data-secondary='+c.list[i].list[m].secondary+'>' + c.list[i].list[m].menuText + '</div>'
                            }
                        }else{
                            temp += '<div data-url='+c.list[i].link+' data-secondary='+c.list[i].secondary+'>' + c.list[i].menuText + '</div>'
                        }
                    }
                }
                temp += "</div>"
                secondary.append(temp);
                //console.log(temp)
            });
        });
  
    
}
function secondaryFun1(i){
    $.getJSON('/api/navs'+i, function (data) {
        secondaryone.html("");
        console.log(i,data)
        if(i==300||i==20){
            secondary.html('');
        }else if(i==2){
            secondaryFun(data[1].id)
        }else{
            secondaryFun(data[0].id)
        }
       
        $.each(data, function (j, c) {
            var temp = '';
            var css=""
            if(i==3){
                css=j==0?"secondary_act":""
            }else if(i==300){

            }else{
                css=j==1?"secondary_act":""
            }
            if((j==0&&i ==2)||(j==0&&i==20)||c.id==301||c.id==302||c.id==303||c.id==304){
                temp += '<div class="'+css+'" data-index="'+(c.id)+'" data-url='+c.link+' data-secondary='+c.secondary+'>' + c.menuText + '</div>'
            } else  if(css){
                temp += '<div class="'+css+'" data-index="'+(c.id)+'" data-url='+c.link+' data-secondary='+c.secondary+'>' + c.menuText + ' <img src="/assets/home/icon_right_active.png" alt=""></div>'
            }else{
                temp += '<div class="'+css+'" data-index="'+(c.id)+'" data-url='+c.link+' data-secondary='+c.secondary+'>' + c.menuText + ' <img src="/assets/home/icon_right.png" alt=""></div>'
            }
            secondaryone.append(temp);
        });
    });
}
$("body").on("click", ".secondary_two div",function () {
    var url = $(this).data("url")
    var secondary = $(this).data("secondary")
    var title = $(this).html()
    if(!secondary){
        opentab(url, title, secondary);
    }
   
})
$("body").on("click", ".secondary_one div",function () {
    $(".secondary_one div").removeClass("secondary_act")
    $(".secondary_one div img").attr("src","/assets/home/icon_right.png")
    $(this).find("img").attr("src","/assets/home/icon_right_active.png")
    $(this).addClass("secondary_act")
    var url = $(this).data("url")
    var secondary = $(this).data("secondary")
    var index = $(this).data("index")
    var title = $(this).html()
    if(index==0||index==304){
        opentab(url, title, secondary,0,index);
    }else if(!secondary){
        secondaryFun(index)
    }else{
        opentab(url, title, secondary);
    }
})
$("#mainTabs").on("click", function () {
    $(".secondary").hide()
})


$.fn.datebox.defaults.parser = function (s) {
    myparser(s)
}
$.fn.datebox.defaults.formatter = function (date) {
    myformatter(date)
}

function myformatter(date) {
    if (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    } else {
        return ""
    }

}
function myparser(s) {
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}
// (function ($, h, c) {
//     var a = $([]),
//         e = $.resize = $.extend($.resize, {}),
//         i,
//         k = "setTimeout",
//         j = "resize",
//         d = j + "-special-event",
//         b = "delay",
//         f = "throttleWindow";
//     e[b] = 250;
//     e[f] = true;
//     $.event.special[j] = {
//         setup: function () {
//             if (!e[f] && this[k]) {
//                 return false;
//             }
//             var l = $(this);
//             a = a.add(l);
//             $.data(this, d, {
//                 w: l.width(),
//                 h: l.height()
//             });
//             if (a.length === 1) {
//                 g();
//             }
//         },
//         teardown: function () {
//             if (!e[f] && this[k]) {
//                 return false;
//             }
//             var l = $(this);
//             a = a.not(l);
//             l.removeData(d);
//             if (!a.length) {
//                 clearTimeout(i);
//             }
//         },
//         add: function (l) {
//             if (!e[f] && this[k]) {
//                 return false;
//             }
//             var n;
//             function m(s, o, p) {
//                 var q = $(this),
//                     r = $.data(this, d);
//                     console.log(r)
//                 r.w = o !== c ? o : q.width();
//                 r.h = p !== c ? p : q.height();
//                 n.apply(this, arguments);
//             }
//             if ($.isFunction(l)) {
//                 n = l;
//                 return m;
//             } else {
//                 n = l.handler;
//                 l.handler = m;
//             }
//         }
//     };
//     function g() {
//         i = h[k](function () {
//             a.each(function () {
//                 var n = $(this),
//                     m = n.width(),
//                     l = n.height(),
//                     o = $.data(this, d);
//                 if (m !== o.w || l !== o.h) {
//                     n.trigger(j, [o.w = m, o.h = l]);
//                 }
//             });
//             g();
//         },
//             e[b]);
//     }
// })(jQuery, this);

