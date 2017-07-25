localStorage.getItem("loginId");//获取存储的变量key的值
localStorage.getItem("token");
//ajax全局配置
var complete=function(opt) {
    var url = opt.url;
    var href = location.href;
    // 判断是否跨域请求
    var requestType = 'jsonp';
    if (url.indexOf(location.host) > -1)
        requestType = 'json';
    requestType = opt.dataType || requestType;
    // 是否异步请求
    var async = (opt.async === undefined ? true : opt.async);
    return {
        url: url,
        async: async,
        type: opt.type || 'get',
        dataType: requestType,
        cache: false,
        data: opt.data,
        success: function(data, textStatus, xhr) {
            /*
            *如果dataType是json，怎判断返回数据是否为json格式，如果不是进行转换
            * 成功数据通用格式
            *   {
            *       "code": 200,
            *       "data": [], 
            *       "success": true // 成功
            *   }
            *   失败返回的数据
            *   {
            *       "code": 200, 
            *       "info": 'error', 
            *       "success": false // 失败
            *   }
             */
            if((requestType === 'json' || requestType === "jsonp") && typeof(data) === "string") {
                data = JSON.parse(data);
            }
            if(data.success) {
                opt.success(data);
            }

            if(opt.error) {
                opt.error(data);
            }

        },
        error: function(xhr, status, handler) {
            if (opt.error)
                opt.error();
        }
    };
};
function unescapeEntity(str) {
    var reg = /&(?:nbsp|#160|lt|#60|gt|62|amp|#38|quot|#34|cent|#162|pound|#163|yen|#165|euro|#8364|sect|#167|copy|#169|reg|#174|trade|#8482|times|#215|divide|#247);/g,
        entity = {
        '&nbsp;'   : ' ',
        '&#160;'   : ' ',
        '&lt;'     : '<',
        '&#60;'    : '<',
        '&gt;'     : '>',
        '&62;'     : '>',
        '&amp;'    : '&',
        '&#38;'    : '&',
        '&quot;'   : '"',
        '&#34;'    : '"',
        '&cent;'   : '￠',
        '&#162;'   : '￠',
        '&pound;'  : '£',
        '&#163;'   : '£',
        '&yen;'    : '¥',
        '&#165;'   : '¥',
        '&euro;'   : '€',
        '&#8364;'  : '€',
        '&sect;'   : '§',
        '&#167;'   : '§',
        '&copy;'   : '©',
        '&#169;'   : '©',
        '&reg;'    : '®',
        '&#174;'   : '®',
        '&trade;'  : '™',
        '&#8482;'  : '™',
        '&times;'  : '×',
        '&#215;'   : '×',
        '&divide;' : '÷',
        '&#247;'   : '÷'
    };
    if (str === null) {
        return '';
    }
    str = str.toString();
    return str.indexOf(';') < 0 ? str : str.replace(reg, function(chars) {
        return entity[chars];
    });
}
// 转换html的实体
$.ajaxSetup({
    global     : true,
    cache      : false,
    converters : {
        'text json' : function(response){
            return jQuery.parseJSON(unescapeEntity(response));
        }
    }
});
/*
*Ajax 请求权限异常
*   用户权限错误跳转登陆页
*   404错误跳转404页面
 */
$(document).ajaxComplete(function(evt, req, settings){
    if(req && req.responseJSON){
        var json = req.responseJSON;
        if(json.code === 403 && json.info === 'perm error' && !json.success){
            window.location.href = location.protocol + '//' + location.hostname;
            return;
        }
        if(json.code === 404 && !json.success) {
            window.location.href = location.protocol + '//' + location.hostname + '/404.html';
        }
  //       if(json.code === 10001||json.code === 10003) {
		//     window.location.href='enter.html';
		//     //清除
		//     localStorage.removeItem("loginId");
		//     localStorage.removeItem("token");
		// }
    }
});

/*
*Ajax 请求错误提示
*例如：500错误
*返回错误信息格式
*{
*   code: 500,
*   info: 系统发生异常
*}
 */
$(document).ajaxError(function(evt, req, settings){
    if(req && (req.status === 200||req.status === 0)){ return false; }
    var msg = '错误：';
    if(req && req.responseJSON){
        var json = req.responseJSON;
        msg += json.code||'';
        msg += json.info||'系统异常，请重试';
    }else{
        msg = '系统异常，请重试';
    }
    alert(msg);
});
//
// $.ajax(complete({
//     url: '',
//     data: ''
// }))