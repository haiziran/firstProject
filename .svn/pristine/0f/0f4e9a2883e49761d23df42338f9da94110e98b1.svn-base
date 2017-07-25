/**
 * Created by Administrator on 2017/7/5.
 */
$(function () {
    $.ajaxSetup({
        complete:function (xhr) {
            // var that=$(this).parents('.header').attr('resul');
            // console.log(xhr.responseText.length)
            if(xhr.responseText.length>0){
                var respone=JSON.parse(xhr.responseText).code;
                if(respone==10001||respone==10002||respone==10003){
                    layer.alert('身份过期，请重新登录',{
                        // skin: 'layui-layer-molv' //样式类名
                            closeBtn: 0
                    });
                    $('.layui-layer-btn0').click(function(){
                        window.location.href='enter.html'
                    })
                }
            }
        },
    });
});