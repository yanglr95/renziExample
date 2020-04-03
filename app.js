$.ajaxPrefilter(function (options) {
    // alert(0)
    if (options.url.indexOf('.cshtml') > 0) {
        var paras = '';
        var viewUrl = options.url;
        if (viewUrl.indexOf('?') > 0) {
            paras = '&' + viewUrl.substr(viewUrl.indexOf('?') + 1, viewUrl.length);
            viewUrl = viewUrl.substr(0, viewUrl.indexOf('?'));
        }
        options.url = '/LoadView/?viewUrl=' + viewUrl + paras;
    }
    if (options.url.indexOf('/api/') == 0) {
        var apiUrl = options.url;

        options.url = apiUrl.substring(1, apiUrl.length) + '.json';
    }
});
function endsWith(str, suffix) {
    if (suffix.length > str.length) {
        return false;
    }

    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isIE() { //ie?  
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}

//定义全局变量
var app = {
    "config": {
        "system.appname": "国家电网人力资源管理信息系统",
        "system.pagesize": "20",
        "user.defaultrole": "User"
    },
    "user": {
        "UserName": "优一",
        "Email": "84383822@qq.com",
        "Mobile": "18386630369",
        "Count": 17
    },
    "dictionarys": {
        "OrderStatus": {
            "0": "处理中",
            "1": "已发货",
            "2": "取消"
        }
    }
}
    ;

//全局格式化
var globalFormatters = {
    //用户
    user: function (value) {

        return '';
    },
    orderStatus: function (value) {
        return app.dictionarys['OrderStatus'][value];
    }
};
//全局筛选
var globalFilters = {
    user: function (field) {
        return {
            field: field,
            type: 'combobox',
            valueType: 'GUID',
            options: { data: app.users, valueField: 'UserId', textField: 'UserName' },
            op: 'equal'
        }
    },
    date: function (field) {
        return {
            field: field,
            type: 'datebox',
            valueType: 'datebox',
            op: ['equal', 'notequal', 'less', 'greater']
        }
    },
    numeric: function (field) {
        return {
            field: field,
            type: 'numberspinner',
            valueType: 'numeric',
            op: ['equal', 'notequal', 'less', 'greater']
        }
    },
    combo: function (field, dg, dictionaryCategory) {
        var dictionarys = app.dictionarys[dictionaryCategory || field];
        var data = [{ value: '', text: 'All' }];
        for (var value in dictionarys) {
            data.push({ value: value, text: dictionarys[value] });
        }

        return {
            field: field,
            type: 'combobox',
            options: {
                panelHeight: 'auto',
                data: data,
                onChange: function (value) {
                    if (value == '') {
                        dg.datagrid('removeFilterRule', field);
                    } else {
                        dg.datagrid('addFilterRule', {
                            field: field,
                            op: 'equal',
                            type: 'numeric',
                            value: value
                        });
                    }
                    dg.datagrid('doFilter');
                }
            }
        }
    }
};
//全局列
var globalColumns = [
    { field: 'CreatorUserId', title: '创建人', hidden: true, width: 120, sortable: true },
    { field: 'CreationTime', title: '创建时间', hidden: true, width: 130, sortable: true },
    { field: 'LastModifierUserId', title: '修改人', hidden: true, width: 120, sortable: true, formatter: globalFormatters.user },
    { field: 'LastModificationTime', title: '修改时间', hidden: true, width: 130, sortable: true }
];
//全局列筛选
var globalColumnsFilter = [
    globalFilters.user('CreatorUserId'),
    globalFilters.user('LastModifierUserId'),
    globalFilters.date('CreationTime'),
    globalFilters.date('LastModificationTime')
];

$(document).ajaxSend(function (event, jqxhr, settings) {
    if (settings.url.indexOf('.cshtml') > 0) {
        showLoadding();
    }
});
$(document).ajaxStop(hideLoadding);
$(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
    hideLoadding();
    if (jqXHR.status > 0) {
        // showToast("抱歉，系统出现了错误，请联系管理员解决！");
    }
});
window.onerror = function () {
    hideLoadding();
}

//打开一个tab
function opentab(plugin, title, secondary, id, index) {
    if (index == 304) {
        $(".secondary").hide()
        if ($('#mainTabs').tabs('exists', title)) {
            $('#mainTabs').tabs('select', title);
        } else {
            if (id) {
                $('#mainTabs').tabs({ id: id });
            }
            $('#mainTabs').tabs('add', {
                title: title,
                href: 'html/' + plugin + '.html',
                closable: true
            });
        }
    } else if (plugin.indexOf("http://") != -1 || plugin.indexOf("https://") != -1) {
        location.href = plugin;
    } else {
        if (secondary == "true" || secondary == true) {
            $(".secondary").show();
            secondaryFun1(index)
        } else {
            $(".secondary").hide()
            if ($('#mainTabs').tabs('exists', title)) {
                $('#mainTabs').tabs('select', title);
            } else {
                if (id) {
                    $('#mainTabs').tabs({ id: id });
                }
                $('#mainTabs').tabs('add', {
                    title: title,
                    href: 'html/' + plugin + '.html',
                    closable: true
                });
            }
        }
    }

}

//关闭当前打开的tab
function closetab() {
    var curTab = $('#mainTabs').tabs("getSelected");
    var index = $('#mainTabs').tabs('getTabIndex', curTab);
    $('#mainTabs').tabs('close', index);
}
$("body").on("click", ".ray_back", function () {
    //销毁dialog，此操作是为了避免id重复引起dialog无法关闭的情况
    $(".testDialog").each(function () {
        $(this).dialog("destroy", false);
    });
    closetab()
})
//关闭指定打开的tab
function closetabTitle(title) {
    $('#mainTabs').tabs('close', title);
}

//批量关闭指定tab
function closeTabTitles(titles) {
    var titleArr = arguments;
    for (x in titleArr) {
        (function (x) {
            $('#mainTabs').tabs('close', titleArr[x]);
        })(x)
    }
}

//显示loadding
function showLoadding() {
    $('.ajax-loadding').show();
}

//隐藏loadding
function hideLoadding() {
    $('.ajax-loadding').hide();
}

//提示
function showToast(msg) {
    hideLoadding();
    $.messager.show({
        msg: msg,
        showType: 'slide',
        id: 'toast',
        height: 'auto',
        style: {
            top: 10
        }
    });
    $('#app-status').html('<label style="color:#f60;font-weight:bold;">' + msg + '</label>');
    setTimeout(function () {
        $('#app-status').text('Ready');
    }, 10000);
}

//引用css和js，存在则不重复引用
function loadResources() {
    var head = $('head:eq(0)');
    $.each(arguments, function (i, n) {
        if (head.find('#' + n.id).size() === 0) {
            if (n.src.indexOf('.js') > 0) {
                head.append('<script id="' + n.id + '" type="text/javascript" src="' + n.src + '" />');
            }
            else {
                head.append('<link id="' + n.id + '" rel="stylesheet" type="text/css" href="' + n.src + '" />');
            }
        }
    });
}

//渲染/api/init里的json对象
function renderInit() {
    $.each($('[data-init]'), function (i, n) {
        $(n).text(eval('app.' + $(n).attr('data-init') + ''));
    });

    if (isIE()) {
        $('#fullscreen').hide();
    }
    else {
        $('#fullscreen').show();
    }
}

//显示icon选择dialog
function chooseIcons() {
    var textbox = $(this),
        dlg = $('#dlg-main');

    if ($('#icons>a').size() <= 0) {
        dlg.dialog({
            title: 'Icon选择',
            modal: true,
            href: 'icons.html',
            cache: true,
            width: 600,
            height: 400,
            top: 120,
            onLoad: function () {
                var box = $('#icons').empty();

                $.getJSON('/api/get-icons', function (data) {
                    $.each(data, function (i, n) {
                        box.append('<a href="#" class="fa ' + n + '"></a>');
                    });

                    dlg.find('a').bind('click', function () {
                        var iconClass = $(this).attr('class').replace('fa ', '');
                        textbox.textbox('setValue', iconClass);

                        dlg.dialog('close');
                    });
                });
            }
        });
    }
    else {
        dlg.dialog('open');
    }
}

//生成toolbar
function createToolbar(me, dg) {
    // todo
}

//生成表头的右键菜单
function createColumnMenu(dg) {
    var cmenu = $('<div />').appendTo(dg);
    cmenu.menu({
        onClick: function (item, field) {
            if (item.iconCls === 'icon-ok') {
                dg.datagrid('hideColumn', item.name);
                cmenu.menu('setIcon', {
                    target: item.target,
                    iconCls: 'icon-empty'
                });
            } else {
                dg.datagrid('showColumn', item.name);
                dg.datagrid('setColumnSize', item.name);
                cmenu.menu('setIcon', {
                    target: item.target,
                    iconCls: 'icon-ok'
                });
            }
        }
    });
    var fields = dg.datagrid('getColumnFields');
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var col = dg.datagrid('getColumnOption', field);
        if (col.title) {
            cmenu.menu('appendItem', {
                text: col.title,
                name: field,
                iconCls: col.hidden ? 'icon-empty' : 'icon-ok'
            });
        }
    }

    return cmenu;
}

//显示图片选择dialog
function chooseImage() {
    var textbox = $(this);

    BrowseServer(textbox);
}

//上传或选择文件
function BrowseServer(inputId, resourceType) {
    resourceType = resourceType || 'Images';
    loadResources({
        id: 'js-ckfinder',
        src: '/libs/ckfinder/ckfinder.js'
    })

    CKFinder.popup({
        basePath: '/libs/ckfinder/',
        resourceType: resourceType,
        selectActionFunction: function (fileUrl, data) {
            if (inputId.constructor == String)
                $(inputId).val(fileUrl);
            else
                inputId.textbox('setValue', fileUrl);
        }
    });
}

//提示框
/**
 * 
 * title:弹框标题，content为提示信息，type为弹框类型（success,error,warning）,
 * 如果为warning类型，则允许传入url执行接口。url为接口路径，action为执行的操作比如：“删除”、“提交”，
 * params为接口需要的参数
*/
function showMessageWin(title, content, type, url, action, params, methodType) {
    if (!methodType) {
        methodType = 'post'
    }
    if (type == 'success' || type == 'error') {
        swal({
            title: title,
            type: type,
            text: content,
            confirmButtonText: "确定",
            allowOutsideClick: false,
            confirmButtonColor: '#00A09F',
            closeOnConfirm: false
        });
    }
    // if (type == 'error') {
    //     swal({
    //         title: title,
    //         type: type,
    //         text: content,
    //         confirmButtonText: "确定",
    //         allowOutsideClick: false,
    //         confirmButtonColor: '#00A09F',
    //         closeOnConfirm: false
    //     });
    // }
    if (type == 'warning') {
        swal({
            title: '警告',
            text: '您确定要' + action + '本条数据吗？',
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00A09F",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            customClass: "custom_swal"
        }).then(
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        url: url,
                        type: methodType,
                        contentType: 'application/json',
                        async:false, 
                        data: params,
                        success: function (data) {
                            if (data.resultCode == "200") {
                                showMessageWin('成功', action + '成功', 'success');
                            } else {
                                showMessageWin('失败', action + '失败', 'error');
                            }
                        }
                    })
                } else {
                }
            });
    }
    $('body').removeClass('layout')
}

//页面加载完成执行
$(function () {
    var mainTabs = $('#mainTabs'),
        mainTabMenus = $('#mainTabMenus');

    document.title = app.config['system.appname'] + ' by webplus.org.cn';
    window.onhashchange = function () {
        mainTabs.tabs('select', location.hash.substring(1, location.hash.length));
    }

    renderInit();

    $('body').layout({ applyDemoStyles: true });

    //tabs右键响应
    mainTabs.tabs({
        tools: [{
            text: '<a href="javascript:void(0);" class="fa fa-refresh" title="点击刷新当前标签"></a>',
            handler: function () {
                var tab = mainTabs.tabs('getSelected');
                tab.panel('refresh');
            }
        }],
        onContextMenu: function (e, title, index) {
            e.preventDefault();
            mainTabMenus.menu('show', {
                left: e.pageX,
                top: e.pageY
            }).data("curTabTitle", title);
        },
        onSelect: function (title, index) {
            window.location.hash = title;
        },
        onLoad: function (panel) {
            var title = panel.panel('options').title;
            window.location.hash = title;
        }
    });

    //tabs右键菜单响应
    mainTabMenus.menu({
        onClick: function (item) {
            var curTabTitle = $(this).data("curTabTitle");
            switch (item.name) {
                case 'close':
                    mainTabs.tabs('close', curTabTitle);
                    break;
                case 'Other':
                    $('.tabs-inner span').each(function (i, n) {
                        var t = $(n).text();
                        if (i > 0 && curTabTitle !== t) {
                            mainTabs.tabs('close', t);
                        }
                        if (t === curTabTitle) {
                            mainTabs.tabs('select', t);
                        }
                    });
                    break;
                default:
                    $('.tabs-inner span').each(function (i, n) {
                        if (i > 2) {
                            var t = $(n).text();
                            mainTabs.tabs('close', t);
                        }
                    });
                    break;
            }
        }
    });

    $('#clearCache').click(function () {
        $.post('/api/common-clear-cache', function () {
            showToast('缓存已经成功更新。');
        });
    });
});