/**
 * Created by Administrator on 2017/4/27.
 */
//获取当前url地址
$.getUrlParam = function(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
};
// alert(window.location.href);
// alert($.getUrlParam('eId'));
// alert($.getUrlParam('eIdToken'));
var eId=$.getUrlParam('eId');   //loginId
var eIdToken=$.getUrlParam('eIdToken'); //token
var pId=$.getUrlParam('pId');
window.localStorage.setItem("loginId", eId);
window.localStorage.setItem("token", eIdToken);
//后台地址
var myUrl="http://192.168.3.31:8080/bim/";
var testUrl="http://192.168.3.70:8080/bim/";
//toastr消息提示全局配置
toastr.options = {
    "closeButton": true,//是否配置关闭按钮
    "debug": false,//是否开启debug模式
    "newestOnTop": false,//新消息是否排在最上层
    "progressBar": false,//是否显示进度条
    "positionClass": "toast-center-center",//消息框的显示位置
    "preventDuplicates": false,//是否阻止弹出多个消息框
    "onclick": null,//点击回调函数
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "1500",//1.5s后关闭消息框
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
//enter.html
$().ready(function(){
    //登录界面
    $('.aOneSubmitMess').click(function(){
        if($('#username').val() =="" || $('#password').val() ==""){
            toastr.error("用户名或密码不能为空")
        }else{
            $.ajax({
                type:"POST",
                url:myUrl+"account/base/login",
                cache:true,
                global:true,
                data:{loginName:$('#username').val(),loginPwd:$('#password').val()},
                success:function(enterSection){
                    console.log("enterSection",enterSection);
                    if(enterSection.code == 0){
                        $('.header').attr('resul',enterSection); 
                        localStorage.loginPassword = $('#password').val();
                        console.log(localStorage.loginPassword);
                        window.location.href ="home.html?eId="+enterSection.result.loginId+'&'+"eIdToken="+enterSection.result.token;
                    }
                    else {
                        var obj={
                            "20006":"登录名不存在",
                            "20002":"账户或密码错误",
                            // "20004":"数据处理失败",
                            // "20005":"暂无数据",
                            // "20014":"同名任务已存在",
                            // "20012":"配置参数名称已存在",
                            "20010":"账户未激活"
                        };
                        for(var i  in obj){
                            if(parseInt(i)==enterSection.code){
                                toastr.error(obj[i]);
                            }
                        }
                    }
                },
                error:function (enterSection) {
                    // alert("检查后端数据类型");
                    // console.log(str.code);
                }
            })
        }
    });
    /*function getUserByLoginId(wloginID,wtoken){
        if(undefined == localStorage.loginUserInfo){
            loginAjax(myUrl+'/user/getUserByLoginId','post',{loginId :wloginID,token :wtoken},function(data){
                console.log("根据登录编号获取用户",data.result);
                localStorage.loginUserInfo = JSON.stringify(data.result);
            });
        }
    }*/
    function loginAjax(url, method,parm,callback){       
        $.ajax({
            url:url,
            type:method,
            dataType:'json',
            data:parm,
            success:function(data){
                callback(data)
            },
            error:function(err){
                 alert(err); 
            }
        })
    };
    //找回账号密码
    $('#yzm').click(function(){
        var secret=$('.input1').val()
        if(secret.indexOf('@')>0){
            if(secret==""){
            }else{
                regUrl = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(secret);
                if(!regUrl){
                    layer.msg("邮箱有误，请重填");
                    $(this).focus();
                    return false;
                }
            };
        }else{
            if(secret==""){
            }else{
                regUrl = /^1\d{10}$/.test(secret);
                if(!regUrl){
                    layer.msg("号码有误，请重填");
                    $(this).focus();
                    return false;
                }
            }
        };
       $.ajax({
           type:'POST',
           url:myUrl+'account/base/resetPwd/sendCode',
           data:{loginName:$('.input1').val()},
           success:function (secret) {
               if(secret.code==0){
                   toastr.success('发送成功！');
                   $('.submit2').attr('code',secret.result)
               }
           }
       })
    });
    //重新设置密码
    $('.aThreeSubmit .submit3').click(function () {
        var code=$('.message1').attr('code');
        $.ajax({
            type:'POST',
            url:myUrl+'account/base/resetPwd/setPwd',
            data:{loginName:$('#a3User').val(),newPwd:$('#a3Pwd').val(),code:code},
            success:function(mes){
                if(mes.code==0){
                    toastr.success('密码设置成功！')
                }else{
                    toastr.error('密码设置失败！')
                }
            }
        })
    })
});
//index.html
$().ready(function(){
//home.html
    $(function () {
        $(document).on('click','.enterIndex',function(){
            console.log($(this).parents(".project").find(".project-name").text())
            var that =this;
            localStorage.setItem("titleText", $(that).parents(".project").find(".project-name").text());
            var pId=$(this).parent('div').parent('div').parent('div').attr('data-id'); //获取项目编号
            // alert(pId);
            // alert(pId)
            $.getUrlParam = function(name)
            {
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r!=null) return unescape(r[2]); return null;
            };
            window.location.href="index.html?eId="+$.getUrlParam('eId')+'&'+"eIdToken="+$.getUrlParam('eIdToken')+'&'+'pId='+pId;
            //进入页面自动加载index.html左侧创建进度
            window.onload=(function () {
                $.ajax({
                    type: "POST",
                    url: myUrl + "pace/projectPacelist",
                    data: {loginId:eId,token:eIdToken, pId: pId},
                    success: function (data) {
                        if (data.code == 0) {
                            $('.bThreeOneContentList').css('display', 'none');
                            if (!$.isEmptyObject(data)) {
                                var jasonTree = data.result;
                                /*添加无级树*/
                                if ($('.bThreeOneContentMessTitle1 ul').length > 0) {
                                    $('.bThreeOneContentMessTitle1 ul:gt(0)').css('background', 'red');
                                    $('.bThreeOneContentMessTitle1 ul').remove();
                                }
                                strf = "";
                                $('.bThreeOneContentMessTitle1').append(forTree(jasonTree, true));
                            }
                        }
                        else if(data.code == 20002){
                            toastr.error('账户或密码错误')
                        }else if(data.code == 20006){
                            toastr.error("用户名不存在")
                        }else if(data.code ==20004){
                            toastr.error('数据处理失败')
                        }else if(data.code==20005){
                            toastr.error('暂无数据')
                        }else if(data.code==20014){
                            toastr.error('同名任务已存在')
                        }else if(data.code==20012){
                            toastr.error('配置参数名称已存在')
                        }else if(data.code==20009){
                            toastr.error('过期操作')
                        }
                    }
                })
            });
        })
    });
    //url传参
    $(function () {
        $('.homePage').click(function () {
            $.getUrlParam = function(name)
            {
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r!=null) return unescape(r[2]); return null;
            };
            window.location.href='home.html?eId='+$.getUrlParam('eId')+'&'+"eIdToken="+$.getUrlParam('eIdToken');
        })
    });
    //进度显示-添加任务
    $(function () {
        //申明当前function变量函数
        var ulId;
        var nameId;
        var startTime;
        var endTime;
        //中间--添加任务
        $('.cSevenFiveSubmit').click(function(){
            if($("#paceName").val()==""){
                toastr.warning('内容不得为空');
                return false;
            }
            $.ajax({
                type:"POST",
                url:myUrl+"pace/projectPaceInsert",
                data:{loginId:eId,token:eIdToken,pId:pId,paceName:$("#paceName").val(),parentPaceId:0},
                success:function (cSevenFiveSubmitDate) {
                    $('#paceName').val('');
                    if(cSevenFiveSubmitDate.code==0){
                        if($('.bThreeOneContentMessTitle1').has('div').length>0){
                            $('.bThreeOneContentMessTitle1 div').remove();
                        }
                        $('.bThreeOneShow').trigger('click');
                    }
                    else if(cSevenFiveSubmitDate.code == 20002){
                        toastr.error('账户或密码错误')
                    }else if(cSevenFiveSubmitDate.code == 20006){
                        toastr.error("用户名不存在")
                    }else if(cSevenFiveSubmitDate.code ==20004){
                        toastr.error('数据处理失败')
                    }else if(cSevenFiveSubmitDate.code==20005){
                        toastr.error('暂无数据')
                    }else if(cSevenFiveSubmitDate.code==20014){
                        toastr.error('同名任务已存在')
                    }else if(cSevenFiveSubmitDate.code==20012){
                        toastr.error('配置参数名称已存在')
                    }else if(cSevenFiveSubmitDate.code==20009){
                        toastr.error('过期操作')
                    }
                },
                error:function () {
                }
            })
        });
        //左侧--创建进度
        // $('.bThreeOneShow').unbind("click");
        $('.bThreeOneShow').click(function(){
            $('.bThreeOneContent').css('display','block');
            $('.bThreeOneRight').css('display','block');
            $('.cSixOne').css('display','none');
            $('.cSixTwoOne').css('position','absolute').css('top','-9999px').css('left','-9999px');
            $('.cSixThree').css('display','none');
            $('.cThree').css('display','none');
            $('.cOne').css('display','none');
            $('.cFive').css('display','none');
            $('.cSix').css('display','none');
            $('.cFour').css('display','none');
            $('.bThreeThree').css('display','none');
            if($('.bThreeOneContentList').css('display')=='none'){
                $('.bThreeOneContentList').css('display','block');
                $('.bThreeOneContentPicture').css({'height':$('.bThreeOneContentPicture').height() - $('.bThreeOneContentList').height()});
                //$('.bThreeOneContentPicture canvas').css({'height': $('canvas').height()-$('.bThreeOneContentList').height()});
                // alert($('canvas').height());
                // parent.location.reload()
                // $('.bThreeOneContent').modelCSS({'height':$('.bThreeOneContent').height()- $('.bThreeOneContentList').height()});
                $('.shrinkDown').addClass('shrinkDowns');
            }else{
                $('.shrinkDown').removeClass('shrinkDowns');
            }
            $.ajax({
                type:"POST",
                url:myUrl+"pace/projectPacelist",
                data:{loginId:eId,token:eIdToken,pId:pId},
                success:function (data) {
                    if(data.code==0){
                        $('.bThreeOneContentList').css('display','block');
                        if(!$.isEmptyObject(data)){
                            var jasonTree=data.result;
                            /*添加无级树*/
                            // if($('.bThreeOneContentMessTitle1 div').length >0){
                            //     $('.bThreeOneContentMessTitle1 div:gt(0)').css('background','red');
                            //     $('.bThreeOneContentMessTitle1 div').remove();
                            // }
                            if($('.bThreeOneContentMessTitle1').has('div').length>0){
                                $('.bThreeOneContentMessTitle1 div').remove();
                            }
                            str="";
                            $('.bThreeOneContentMessTitle1').append(forTree(jasonTree));
                        }
                    }
                    else if(data.code == 20002){
                        toastr.error('账户或密码错误')
                    }else if(data.code == 20006){
                        toastr.error("用户名不存在")
                    }else if(data.code ==20004){
                        toastr.error('数据处理失败')
                    }else if(data.code==20005){
                        toastr.error('暂无数据')
                    }else if(data.code==20014){
                        toastr.error('同名任务已存在')
                    }else if(data.code==20012){
                        toastr.error('配置参数名称已存在')
                    }else if(data.code==20009){
                        toastr.error('过期操作')
                    };
                }
            })
        });
    });
    //进度管理-上下移动图标--向上
    $(document).on("click",".bThreeOneContentMessTitle1 div .bThreeOneList2 .upr",function () {
        var arr=$(this).parents("div").attr("pid");
        var arrUp=$(this).parents().prev("div").attr("pid");
        $('.bThreeOneContentList').css('display','block');
        //参数请求
        $.ajax({
            type:"POST",
            url:myUrl+"/pace/projectPaceMove",
            data:{loginId:eId,token:eIdToken,pId:pId,upPace:arr,downPace:arrUp},
            success:function (data) {
                if(data.code==0){
                    $('.bThreeOneShow').trigger('click');
                }
                else if(data.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(data.code == 20006){
                    toastr.error("用户名不存在")
                }else if(data.code ==20004){
                    toastr.error('数据处理失败')
                }else if(data.code==20005){
                    toastr.error('暂无数据')
                }else if(data.code==20014){
                    toastr.error('同名任务已存在')
                }else if(data.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(data.code==20009){
                    toastr.error('过期操作')
                };
            },
            error:function () {

            }
        });
    });
    //进度管理-上下移动图标--向下
    $(document).on("click",".bThreeOneContentMessTitle1 div .bThreeOneList2 .downg",function () {
        var arr=$(this).parents("div").attr("pid");
        var arrUp=$(this).parents().next("div").attr("pid");
        $('.bThreeOneContentList').css('display','block');
        //参数请求
        $.ajax({
            type:"POST",
            url:myUrl+"/pace/projectPaceMove",
            data:{loginId:eId,token:eIdToken,pId:pId,upPace:arr,downPace:arrUp},
            success:function (data) {
                if(data.code == 0){
                    $('.bThreeOneShow').trigger('click');
                }
                else if(data.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(data.code == 20006){
                    toastr.error("用户名不存在")
                }else if(data.code ==20004){
                    toastr.error('数据处理失败')
                }else if(data.code==20005){
                    toastr.error('暂无数据')
                }else if(data.code==20014){
                    toastr.error('同名任务已存在')
                }else if(data.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(data.code==20009){
                    toastr.error('过期操作')
                }

            },
            error:function () {
            }
        });
    });
    //进度管理-子级+展开
    $(document).on("click",".bThreeOneContentMessTitle1 div .bThreeOneList12 .bThreeOneImg",function (event) {
    //     // var target =event.target;
    //     // var parent=$(target).parents()[1];
    //     // var next=$(parent).next();
    //     // if($(next).modelCSS('display') =='none'){
    //     //     $(this).addClass('bThreeOneList111');
    //     //     $(next).modelCSS('display','block');
    //     //     $(this).removeClass('bThreeOneList11');
    //     // }else {
    //     //     $(next).modelCSS('display', 'none');
    //     //     $(this).removeClass('bThreeOneList111');
    //     //     $(this).addClass('bThreeOneList11');
    //     // }
    //     var target =event.target;
    //     var parent=$(target).parents()[1];
    //     var next=$(parent).next();     //兄弟级的下一级ul
    //     var aa=$(this).parents("ul").attr('class');  //当前所点击的class
    //     var bb=next.attr('class');                      //当前所点击的兄弟级下一级class
    //     var cc="bThreeOneChildren";
    //     if($(next).css('display') =='none'){          //有子级是隐藏状态
    //         $(this).addClass('bThreeOneList111');
    //         $(this).removeClass('bThreeOneList11');
    //         // $(next).modelCSS('display','block');
    //         if($(next).attr('class') == 'bThreeOneChildren'){
    //             $(next).css('display','block');
    //             // alert(11)
    //         }
    //     }else {                                         //有子级是展开状态
    //         $(next).css('display','none');
    //         $(this).removeClass('bThreeOneList111');
    //         $(this).addClass('bThreeOneList11');
    //         if($(next).attr('class') =='bThreeOneFather'){
    //             // alert(22);
    //             $(next).css('display', 'block');
    //         }
    //     }
        var ul = $(this).parent('li').siblings("ul");
        var spanStr = $(this).parent('li').html();
        var spanContent = spanStr.substr(3, spanStr.length);
        if (ul.find("div").html() != null) {
            if (ul.css("display") == "none") {
                ul.slideDown(300);
                $(this).addClass('bThreeOneList111');
                // $(this).parent('li').html(spanContent);
            } else {
                ul.slideUp(300);
                $(this).removeClass('bThreeOneList111');
                // $(this).parent('li').html(spanContent);
            }
        }
    });
    //进度管理-子级进度添加
    $(document).on("click",".bThreeOneContentMessTitle1 div .bThreeOneList6",function () {
        var ulId=$(this).parent("div").attr("pid");
        // alert(ulId)
        //子级进度添加弹窗显示
        $('.cSevenFiveOne').css('display','block');
        $('#popLayer').css('display','block');
        $('.bThreeOneContentList').css('display','block');
        //    点击X，弹窗消失
        $('.cSevenFiveBack').click(function(){
            $('.cSevenFiveOne').css('display','none');
            $('#popLayer').css('display','none');
            $('#paceName').val('');
            $('#paceNameOne').val('');
        });
        //提交-效果隐藏
        $('.cSevenFiveSubmitOne').unbind('click'); //解决重复提交问题
        $('.cSevenFiveSubmitOne').click(function () {
            $('.cSevenFiveOne').css('display','none');
            $('#popLayer').css('display','none');
            //数据请求接口
            $.ajax({
                type:"POST",
                url:myUrl+"pace/projectPaceInsert",
                data:{paceName:$('#paceNameOne').val(),parentPaceId :ulId,pId:pId,loginId:eId,token:eIdToken},
                success:function (data) {
                    $('#paceNameOne').val('');
                    if(data.code==0){
                        if($('.bThreeOneContentMessTitle1').has('div').length>0){
                            $('.bThreeOneContentMessTitle1 div').remove();
                        }
                        $('.bThreeOneShow').trigger('click');
                    }
                    else if(data.code == 20002){
                        toastr.error('账户或密码错误')
                    }else if(data.code == 20006){
                        toastr.error("用户名不存在")
                    }else if(data.code ==20004){
                        toastr.error('数据处理失败')
                    }else if(data.code==20005){
                        toastr.error('暂无数据')
                    }else if(data.code==20014){
                        toastr.error('同名任务已存在')
                    }else if(data.code==20012){
                        toastr.error('配置参数名称已存在')
                    }else if(data.code==20009){
                        toastr.error('过期操作')
                    }
                },
                error:function(){
                }
            });
        })
    });
    //进度管理-进度编辑弹窗
    $(document).on("click",".bThreeOneContentMessTitle1 div .bThreeOneList9",function(e){
        ulId=$(this).parents("div").attr("pid");      //取得所点击事件的父级ID
        nameId=$(this).parents("div").children("li").children(".bThreeOneList11").html(); //取得所点击事件的任务名称
        startTime=$(this).parents("div").children(".bThreeOneList4").html();         //开始时间
        endTime=$(this).parents("div").children(".bThreeOneList13").html();          //结束时间
        startActTime=$(this).parents("div").children(".bThreeOneList14").html();         //实际开始时间
        endActTime=$(this).parents("div").children(".bThreeOneList15").html();          //实际结束时间
        $('#GouJianPlans').val(startTime);
        $('#GouJianPlane').val(endTime);
        $('#GouJianActs').val(startActTime);
        $('#GouJianAct').val(endActTime);
        $('.cSevenFiveTwoTaskName').val(nameId);
        $('.bThreeOneContentList').css('display','block');
        $('.cSevenFiveTwo').css('display','block');
        $('#popLayer').css('display','block');
        //    点击取消，弹窗消失
        $('.cSevenFiveTwoReset').click(function(){
            $('.cSevenFiveTwo').css('display','none');
            $('#popLayer').css('display','none')
        });
    });
    // 进度管理-进度编辑弹窗-点击保存，弹窗消失
    $('.cSevenFiveTwoKeep').click(function () {
        // e.preventDefault();
        $('.cSevenFiveTwo').css('display','none');
        $('#popLayer').css('display','none');
        var str={"id":ulId,"name":$('.cSevenFiveTwoTaskName').val(),"planStart":$('.cSevenFiveTwoSelect .planStart').val(),"planEnd":$('.cSevenFiveTwoSelect .planEnd').val(),"actStart":$('#GouJianActs').val(),"actEnd":$('#GouJianAct').val()};
        // return false
        var ob=JSON.stringify(str);
        //数据请求接口
        $.ajax({
            type:"POST",
            url:myUrl+"pace//projectPaceModify",
            data:{proPaceJson:ob, pId:pId, loginId:eId,token:eIdToken},
            success:function (FF) {
                // alert("保存成功");
                if(FF.code==0){
                    toastr.success('保存成功');
                    //模拟点击加载
                    $('.bThreeOneShow').trigger('click');
                }
                else if(FF.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(FF.code == 20006){
                    toastr.error("用户名不存在")
                }else if(FF.code ==20004){
                    toastr.error('数据处理失败')
                }else if(FF.code==20005){
                    toastr.error('暂无数据')
                }else if(FF.code==20014){
                    toastr.error('同名任务已存在')
                }else if(FF.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(FF.code==20009){
                    toastr.error('过期操作')
                }

            },
            error:function () {
                return false;
            }
        });
    });
    //进度管理-进度删除
    $(document).on("click",".bThreeOneContentMessTitle1 div .bThreeOneList10",function (e) {
        e.preventDefault();
        // var ulId=$(this).parents("ul").attr("pid");      //取得所点击事件的父级ID
        var arr=new Array($(this).parents("div").attr("pid"));
        var abb=JSON.stringify(arr);         //数组转为json数组
        //参数请求
        $.ajax({
            type:"POST",
            url:myUrl+"pace/projectPaceDelete",
            data:{delPace:abb,loginId:eId,token:eIdToken,pId:pId},
            success:function (Md) {
                if(Md.code==0){
                    toastr.success('删除成功')
                    //模拟点击加载
                    $('.bThreeOneShow').trigger('click');
                }
                else if(Md.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(Md.code == 20006){
                    toastr.error("用户名不存在")
                }else if(Md.code ==20004){
                    toastr.error('数据处理失败')
                }else if(Md.code==20005){
                    toastr.error('暂无数据')
                }else if(Md.code==20014){
                    toastr.error('同名任务已存在')
                }else if(Md.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(Md.code==20009){
                    toastr.error('过期操作')
                }
            }
        })
    });
    //进度管理-添加构建
    $('.bThreeOneSearchGouJian').click(function(){
        //正向构建列表
        $('.zTreeDemoBackgrounds').css('display','block');
        $('.zTreeDemoBackgrounds img').click(function(){
            $('.zTreeDemoBackgrounds').css('display','none');
        });
        $.ajax({
            type:'POST',
            url:myUrl+'project/scene/scenepacelist',
            data:{loginId:eId,token:eIdToken,pId:pId},
            success:function(a){
                // console.log(a);
                var zNodes = a.result;
                var setting = {
                    data: {
                        key: {
                            children: "childs",
                            name: "nodeName",
                            title: "",
                            url: "url",
                            icon: "icon",
                            pathname:"nodePath"
                        },
                        simpleData: {
                            enable: true,
                            idKey: "nodeId",
                            pIdKey:"parentId" ,
                            rootPId: null
                        },
                        keep: {
                            parent: false,
                            leaf: false
                        }
                    },
                    check: {
                        enable: true,
                        autoCheckTrigger: false,
                        nocheckInherit: false,
                        chkDisabledInherit: false,
                        chkboxType: {
                            "Y": "p",
                            "N": "p"
                        }
                    },
                    callback: {
                        onCheck:onCheck,    // zTreeOnCheck
                        // onCheck:GetCheckedAll,
                    }
                };    //参数配置
                $(document).ready(function(){
                    $.fn.zTree.init($("#treeDemo1"), setting, zNodes);
                });

                var treeObj = $.fn.zTree.getZTreeObj("treeDemo1");
                var nodes2 = treeObj.transformToArray(treeObj.getNodes());
                for (var i=0, l=nodes2.length; i < l; i++) {
                    // if(nodes2[i].hasChose==1){  //判断返回数据是否勾选
                    //     treeObj.checkNode(nodes2[i], true, true);  //添加勾选状态
                    // onCheck();
                    // }
                }
            }
        })
    });
    //封装函数
    function onCheck(){
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo1");
        var nodes = treeObj.getCheckedNodes(true);      //获取勾选状态
        // var selectnodes=new Array();
        $('.index-structure').css('display','block');
        $('.index-structureHeader img').click(function(){
            $('.index-structure').css('display','none');
        });
        $('.index-structureCancel').click(function(){
            $('.index-structure').css('display','none');
        });
        var nodeI="";
        for(var i=0;i<nodes.length;i++){
            if(!nodes[i].isParent){
                // selectnodes.push(nodes[i]);
                nodeI=nodes[i];
                var pathname=nodes[i].nodePath;
                // console.log(nodes[i])
            }
        }
        var nodeIPath=nodeI.nodePath;
        console.log(nodeIPath)
        $.ajax({
            type:'POST',
            url:myUrl+'pace/isSelect',
            data:{loginId:eId,token:eIdToken,pId:pId,modelCode:nodeIPath},
            success:function(msgGouJ){
                console.log(msgGouJ);
                if(!$.isEmptyObject(msgGouJ)){
                    var jasonTree=msgGouJ.result;
                    // if($('.index-structureContent').has('div').length>0){
                    //     $('.index-structureContent div').remove();
                    // }
                    strf1="";
                    // $('.index-structureContent').append(forTree1(jasonTree,pathname));
                    $('.index-structureContent').append(forTree1(jasonTree,nodeIPath));
                }
            }
        })
    }
    // 左侧构建弹窗-提交
    $(document).on('click','.index-structureContent img',function(){
        // var inputId=$(this).parents('div').attr('pid');
        var inputName=$('.index-structureFooter').siblings('.index-structureContent').children('.bThreeOneFather').attr('pathname');
        var inputIdMes=[];
        // $('.index-structureContent .bThreeOneFather input').each(function(){
        //     if($(this).get(0).checked){
        //         inputIdMes.push($(this).parents('div').attr('pid'))
        //     }
        // });
        if($(this).hasClass('hasNoChoose')){
            $(this).removeClass('hasNoChoose');
            $(this).addClass('hasChoose');
            inputIdMes.push($(this).parents('div').attr('pid'));
            var inputIdMesJson=JSON.stringify(inputIdMes)
            $('.index-structureConform').click(function(){
                $('.index-structure').css('display','none');
                $.ajax({
                    type:'POST',
                    url:myUrl+'pace/addModelPace',
                    data:{loginId:eId,token:eIdToken,pId:pId,taskId:inputIdMesJson,modelCode:inputName},
                    success:function(sub){
                        console.log(sub);
                        if(sub.code == 0){
                            toastr.success('添加成功')
                        }
                        else if(sub.code == 20002){
                            toastr.error('账户或密码错误')
                        }else if(sub.code == 20006){
                            toastr.error("用户名不存在")
                        }else if(sub.code ==20004){
                            toastr.error('数据处理失败')
                        }else if(sub.code==20005){
                            toastr.error('暂无数据')
                        }else if(sub.code==20014){
                            toastr.error('同名任务已存在')
                        }else if(sub.code==20012){
                            toastr.error('配置参数名称已存在')
                        }else if(sub.code==20009){
                            toastr.error('过期操作')
                        }
                    }
                })
            });
        }else{
            // $(this).removeClass('hasChoose');
            // $(this).addClass('hasNoChoose');
            // inputIdMes.pop($(this).parents('div').attr('pid'));
        }
        // $('.index-structureContent .bThreeOneFather img').each(function(){
        //     if($(this).get(0).checked){
        //         inputIdMes.push($(this).parents('div').attr('pid'))
        //     }
        // });

        //弹窗关闭
        $('.index-structureCancel').click(function(){
            $('.index-structure').css('display','none');
        });
        $('.index-structureHeader img').click(function(){
            $('.index-structure').css('display','none');
        });
    });
    // 进度管理--构建
    $(document).on("click",".bThreeOneContentMessTitle1 div .bThreeOneList7",function(){
        //进度管理-构建--添加构建
        //构建任务表弹窗显示
        $('.bThreeThree').css('display','block');
        //构建任务表弹窗关闭
        $('.bThreeThreeBack').click(function(){
            $('.bThreeThree').css('display','none');
            $('.zTreeDemoBackground').css('display','none')
            // if($('.bThreeThreeContent').has('ul').length>0){
            //     $('.bThreeThreeContent ul').remove();
            // }
        });
        nowId=$(this).parents("div").attr("pid");      //取得所点击事件的ID
        var zTreeID=$('.bThreeThreeAdd').attr('zTreeID',nowId);
        //构建任务表数据获取
        $.ajax({
            type:'POST',
            url:myUrl+'pace/modelPacelist',
            data:{loginId:eId,token:eIdToken,pId:pId,parentId:nowId},
            success:function(list){
                // console.log(list)
                var stateCode="";
                // if(list.code == 0){
                    //判断页面是否有值
                    if($('.bThreeThreeContent').has('ul').length>0){
                        $('.bThreeThreeContent ul').remove();
                        if(list.code == 0) {
                            var addGou = "";
                            list.result.forEach(function (item, index) {
                                if (item.mStatu == 1) {
                                    stateCode = "施工中"
                                } else if (item.mStatu == 2) {
                                    stateCode = "提前完工"
                                } else if (item.mStatu == 3) {
                                    stateCode = "准时完工"
                                } else if (item.mStatu == 4) {
                                    stateCode = "延时完工"
                                }
                                else {
                                    stateCode = "未开始"
                                }
                                addGou +=
                                    '<ul nodeId=' + item.mtaskId + '>' +
                                    '<li title='+index+'>' + index + '</li>' +
                                    '<li title='+item.mName+'>' + item.mName + '</li>' +
                                    '<li title='+item.mpstime+'>' + item.mpstime + '</li>' +
                                    '<li title='+item.mpetime+'>' + item.mpetime + '</li>' +
                                    '<li title='+item.mastime+'>' + item.mastime + '</li>' +
                                    '<li title='+item.maetime+'>' + item.maetime + '</li>' +
                                    '<li title='+stateCode+'>' + stateCode + '</li>' +
                                    '<li class="bThreeThreeEditMes">编辑</li>' +
                                    '<li class="bThreeThreeDel">删除</li>' +
                                    '<div style="clear: both"></div>' +
                                    '</ul>';
                            });
                            $('.bThreeThreeContent').append(addGou);
                        }
                        else if(list.code == 20002){
                            toastr.error('账户或密码错误')
                        }else if(list.code == 20006){
                            toastr.error("用户名不存在")
                        }else if(list.code ==20004){
                            toastr.error('数据处理失败')
                        }else if(list.code==20005){
                            toastr.error('暂无数据')
                        }else if(list.code==20014){
                            toastr.error('同名任务已存在')
                        }else if(list.code==20012){
                            toastr.error('配置参数名称已存在')
                        }else if(list.code==20009){
                            toastr.error('过期操作')
                        }
                    }else{
                        if(list.code == 0) {
                            var addGou = "";
                            list.result.forEach(function (item, index) {
                                if (item.mStatu == 1) {
                                    stateCode = "施工中"
                                } else if (item.mStatu == 2) {
                                    stateCode = "提前完工"
                                } else if (item.mStatu == 3) {
                                    stateCode = "准时完工"
                                } else if (item.mStatu == 4) {
                                    stateCode = "延时完工"
                                }
                                else {
                                    stateCode = "未开始"
                                }
                                addGou +=
                                    '<ul nodeId=' + item.mtaskId + '>' +
                                    '<li>' + index + '</li>' +
                                    '<li>' + item.mName + '</li>' +
                                    '<li>' + item.mpstime + '</li>' +
                                    '<li>' + item.mpetime + '</li>' +
                                    '<li>' + item.mastime + '</li>' +
                                    '<li>' + item.maetime + '</li>' +
                                    '<li>' + stateCode + '</li>' +
                                    '<li class="bThreeThreeEditMes">编辑</li>' +
                                    '<li class="bThreeThreeDel">删除</li>' +
                                    '<div style="clear: both"></div>' +
                                    '</ul>';
                            });
                            $('.bThreeThreeContent').append(addGou);
                        }
                        else if(list.code == 20002){
                            toastr.error('账户或密码错误')
                        }else if(list.code == 20006){
                            toastr.error("用户名不存在")
                        }else if(list.code ==20004){
                            toastr.error('数据处理失败')
                        }else if(list.code==20005){
                            toastr.error('暂无数据')
                        }else if(list.code==20014){
                            toastr.error('同名任务已存在')
                        }else if(list.code==20012){
                            toastr.error('配置参数名称已存在')
                        }else if(list.code==20009){
                            toastr.error('过期操作')
                        }
                    }
                // }

            }
        })
    });
    // //右侧模型树展示
    // $(document).on('click','.bThreeThreeAdd',function(e){
    //     e.preventDefault()
    //     //构建模型树展示
    //     $('.zTreeDemoBackground').css('display','block');
    //     //构建模型树关闭
    //     $('.zTreeDemoBackground img').click(function(){
    //         $('.zTreeDemoBackground').css('display','none');
    //     });
    //     var nowId=$('.bThreeThreeAdd').attr('zTreeID');
    //     $.ajax({                     //右侧模型树数据请求
    //         type:'POST',
    //         url:myUrl+'project/scene/sceneChoselist',
    //         data:{loginId:eId,token:eIdToken,projectPace:nowId,pId:pId},
    //         success:function (a) {
    //             // console.log(a);
    //             if(a.code==0){
    //                 var zNodes = a.result;
    //                 var setting = {
    //                     data: {
    //                         key: {
    //                             children: "childs",
    //                             name: "nodeName",
    //                             title: "",
    //                             url: "url",
    //                             icon: "icon",
    //                             pathname:"nodePath"
    //                         },
    //                         simpleData: {
    //                             enable: true,
    //                             idKey: "nodeId",
    //                             pIdKey:"parentId" ,
    //                             rootPId: null
    //                         },
    //                         keep: {
    //                             parent: false,
    //                             leaf: false
    //                         }
    //                     },
    //                     check: {
    //                         enable: true,
    //                         autoCheckTrigger: false,
    //                         nocheckInherit: false,
    //                         chkDisabledInherit: false,
    //                         chkboxType: {
    //                             "Y": "p",
    //                             "N": "p"
    //                         }
    //                     },
    //                     callback: {
    //                         onCheck:onCheck,    // zTreeOnCheck
    //                         // onCheck:GetCheckedAll,
    //                     }
    //                 };    //参数配置
    //                 $(document).ready(function(){
    //                     $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    //                 });
    //                 var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    //                 var nodes2 = treeObj.transformToArray(treeObj.getNodes());
    //                 // console.log(nodes2);
    //                 for (var i=0, l=nodes2.length; i < l; i++) {
    //                     if(nodes2[i].hasChose==1){  //判断返回数据是否勾选
    //                         treeObj.checkNode(nodes2[i], true, true);  //添加勾选状态
    //                         // onCheck();
    //                     }
    //                 }
    //                 //封装函数
    //                 function onCheck() {
    //                     var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    //                     var nodes = treeObj.getCheckedNodes(true);      //获取
    //                     var selectnodes=new Array();
    //                     // console.log(nodes);
    //                     for(var i=0;i<nodes.length;i++){
    //                         if(!nodes[i].isParent){
    //                             selectnodes.push(nodes[i]);
    //                             // console.log(selectnodes)
    //                             var arr=[nodes[i].nodePath]
    //                             // var itArr={
    //                             //     'pId':pId,
    //                             //     'proTaskId':nodes[i].nodeId,
    //                             //     'modelCodeList':arr,
    //                             // };
    //                             // var itArrJson=JSON.stringify(itArr);
    //                             //勾选一个请求一次
    //                             $.ajax({
    //                                 type:'POST',
    //                                 url:myUrl+'pace/addModelPace',
    //                                 data:{loginId:eId,token:eIdToken,pId:pId,taskId:nowId,modelCode:nodes[i].nodePath},
    //                                 success:function(oncheck){
    //                                     console.log(oncheck);
    //                                     if(oncheck.code ==0){
    //                                         // toastr.success('添加成功')
    //                                         var  addGou="";
    //                                         // oncheck.result.forEach(function(item,index){
    //                                         addGou=
    //                                             '<ul nodeId='+oncheck.result.mtaskId+'>' +
    //                                             '<li></li>' +
    //                                             '<li>'+oncheck.result.mName+'</li>' +
    //                                             '<li>'+oncheck.result.mpstime+'</li>' +
    //                                             '<li>'+oncheck.result.mpetime+'</li>' +
    //                                             '<li>'+oncheck.result.mastime+'</li>' +
    //                                             '<li>'+oncheck.result.maetime+'</li>' +
    //                                             '<li>'+oncheck.result.mStatu+'</li>' +
    //                                             '<li class="bThreeThreeEditMes">编辑</li>' +
    //                                             '<li class="bThreeThreeDel">删除</li>' +
    //                                             '<div style="clear: both"></div>'+
    //                                             '</ul>';
    //                                         // });
    //                                         // $('.bThreeThreeContent ul').remove();
    //                                         $('.bThreeThreeContent').append(addGou);
    //                                     }else if(oncheck.code ==20005){
    //                                         toastr.warning('暂无数据')
    //                                     }else if(oncheck.code ==20014){
    //                                         // toastr.warning('同名任务已存在')
    //                                     }
    //                                 }
    //                             })
    //                         }
    //                     }
    //                     // var  addGou="";
    //                     // if(selectnodes.length>0){
    //                     //     for(var i=0;i<selectnodes.length;i++){
    //                     //         addGou+=
    //                     //             '<ul nodeId='+selectnodes[i].nodeId+'>' +
    //                     //             '<li>'+(i+1)+'</li>' +
    //                     //             '<li>'+selectnodes[i].nodePath+'</li>' +
    //                     //             '<li></li>' +
    //                     //             '<li></li>' +
    //                     //             '<li></li>' +
    //                     //             '<li></li>' +
    //                     //             '<li></li>' +
    //                     //             '<li class="bThreeThreeEditMes">编辑</li>' +
    //                     //             '<li class="bThreeThreeDel">删除</li>' +
    //                     //             '<div style="clear: both"></div>'+
    //                     //             '</ul>';
    //                     //     }
    //                     //     $('.bThreeThreeContent ul').remove();
    //                     //     $('.bThreeThreeContent').append(addGou);
    //                     // }
    //                 }
    //             }
    //             else if(a.code == 20002){
    //                 toastr.error('账户或密码错误')
    //             }else if(a.code == 20006){
    //                 toastr.error("用户名不存在")
    //             }else if(a.code ==20004){
    //                 toastr.error('数据处理失败')
    //             }else if(a.code==20005){
    //                 toastr.error('暂无数据')
    //             }else if(a.code==20014){
    //                 toastr.error('同名任务已存在')
    //             }else if(a.code==20012){
    //                 toastr.error('配置参数名称已存在')
    //             }else if(a.code==20009){
    //                 toastr.error('过期操作')
    //             }
    //         }
    //     });
    // });
    //右侧模型列表-编辑
    $(document).on('click','.bThreeThreeContent ul .bThreeThreeEditMes',function(){
        var editId=$(this).parent('ul').attr('nodeid');             //取当前的ID
        var startPTime=$(this).parent("ul").children("li:nth-child(3)");         //计划开始时间
        var endPTime=$(this).parent("ul").children("li:nth-child(4)");          //计划结束时间
        var startATime=$(this).parent("ul").children("li:nth-child(5)");         //计划开始时间
        var endATime=$(this).parent("ul").children("li:nth-child(6)");          //计划结束时间
        //页面取值
        $('.cSevenFiveTwoGTSelect .planStart').val(startPTime.html());    //计划开始时间
        $('.cSevenFiveTwoGTSelect .planEnd').val(endPTime.html());         //计划结束时间
        $('.cSevenFiveTwoGSelect .planStart').val(startATime.html());    //实际开始时间
        $('.cSevenFiveTwoGSelect .planEnd').val(endATime.html());         //实际结束时间
        $('.cSevenFiveTwoG').css('display','block');
        $('#popLayer').css('display','block');
        $('.cSevenFiveTwoGReset').click(function(){
            $('.cSevenFiveTwoG').css('display','none');
            $('#popLayer').css('display','none');
        });
        //    点击取消，弹窗消失
        $('.cSevenFiveTwoGReset').click(function(){
            $('.cSevenFiveTwoG').css('display','none');
            $('#popLayer').css('display','none')
        });
        //点击保存
        $('.cSevenFiveTwoGKeep').unbind('click');
        $('.cSevenFiveTwoGKeep').click(function(){
            $('.cSevenFiveTwoG').css('display','none');
            $('#popLayer').css('display','none');
            $.ajax({
                type:'POST',
                url:myUrl+'pace/updateModelPace/'+editId,
                data:{loginId:eId,token:eIdToken,planStartTime:$('.cSevenFiveTwoGTSelect .planStart').val(),planEndTime:$('.cSevenFiveTwoGTSelect .planEnd').val(),actStartTime:$('.cSevenFiveTwoGSelect .planStart').val(),actEndTime:$('.cSevenFiveTwoGSelect .planEnd').val()},
                success:function(edit){
                    // console.log(edit)
                    if(edit.code ==0){
                        toastr.success('修改成功');
                        startPTime.html($('.cSevenFiveTwoGTSelect .planStart').val());
                        endPTime.html($('.cSevenFiveTwoGTSelect .planEnd').val());
                        startATime.html($('.cSevenFiveTwoGSelect .planStart').val());
                        endATime.html($('.cSevenFiveTwoGSelect .planEnd').val());
                    }
                    else if(edit.code == 20002){
                        toastr.error('账户或密码错误')
                    }else if(edit.code == 20006){
                        toastr.error("用户名不存在")
                    }else if(edit.code ==20004){
                        toastr.error('数据处理失败')
                    }else if(edit.code==20005){
                        toastr.error('暂无数据')
                    }else if(edit.code==20014){
                        toastr.error('同名任务已存在')
                    }else if(edit.code==20012){
                        toastr.error('配置参数名称已存在')
                    }else if(edit.code==20009){
                        toastr.error('过期操作')
                    }
                }
            })
        })
    });
    //右侧模型列表-删除
    $(document).on('click','.bThreeThreeContent ul .bThreeThreeDel',function(){
        var nodeid=$(this).parent('ul').attr('nodeid');
        $(this).parent('ul').remove();
        $.ajax({
            type:'POST',
            url:myUrl+'pace/modelPacedelete',
            data:{loginId:eId,token:eIdToken,pId:pId,delModelTask:nodeid},
            success:function(del){
                console.log(del);
                if(del.code==0){
                    toastr.success('删除成功');
                }
                else if(del.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(del.code == 20006){
                    toastr.error("用户名不存在")
                }else if(del.code ==20004){
                    toastr.error('数据处理失败')
                }else if(del.code==20005){
                    toastr.error('暂无数据')
                }else if(del.code==20014){
                    toastr.error('同名任务已存在')
                }else if(del.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(del.code==20009){
                    toastr.error('过期操作')
                }
            }
        })
    });
    //构建弹窗下拉展开
    $(document).on("click",".index-structureContent div .bThreeOneImg",function (event) {
        var ul = $(this).parent('li').siblings("ul");
        var spanStr = $(this).parent('li').html();
        var spanContent = spanStr.substr(3, spanStr.length);
        if (ul.find("div").html() != null) {
            if (ul.css("display") == "none") {
                $(this).addClass('bThreeOneList111');
                // $(this).removeClass('bThreeOneImg');
                ul.slideDown(300);
                // $(this).parent('li').html(spanContent);
            } else {
                $(this).removeClass('bThreeOneList111');
                // $(this).addClass('bThreeOneImg');
                ul.slideUp(300);
                // $(this).parent('li').html(spanContent);
            }
        }
    });
    // //构建弹窗-搜索
    // $(document).on('click','.bThreeThreeSel span',function(){
    //     var parentId=$('.bThreeThreeAdd').attr('ztreeid');
    //     if($(this).hasClass('bThreeThreeSearchImgClick')){
    //         $(this).removeClass('bThreeThreeSearchImgClick');
    //         $(this).addClass('bThreeThreeSearchImgBack');
    //         $.ajax({
    //             type:'POST',
    //             url:myUrl+'pace/modelPaceSearch',
    //             data:{loginId:eId,token:eIdToken,pId:pId,parentId:parentId,searchData:$('.bThreeThreeSearch').val()},
    //             success:function(search){
    //                 // console.log(search);
    //                 if(search.code == 0){
    //                     $('.bThreeThreeContent ul').hide();
    //                     search.result.forEach(function(item,index){
    //                         var  addGou="";
    //                         addGou=
    //                             '<ul nodeId='+item.mtaskId+'>' +
    //                             '<li>'+index+'</li>' +
    //                             '<li>'+item.mName+'</li>' +
    //                             '<li>'+item.mpstime+'</li>' +
    //                             '<li>'+item.mpetime+'</li>' +
    //                             '<li>'+item.mastime+'</li>' +
    //                             '<li>'+item.maetime+'</li>' +
    //                             '<li>'+item.mStatu+'</li>' +
    //                             '<li class="bThreeThreeEditMes">编辑</li>' +
    //                             '<li class="bThreeThreeDel">删除</li>' +
    //                             '<div style="clear: both"></div>'+
    //                             '</ul>';
    //                         $('.bThreeThreeContent').append(addGou);
    //                     })
    //                 }
    //             }
    //         })
    //     }else{
    //         $(this).removeClass('bThreeThreeSearchImgBack');
    //         $(this).addClass('bThreeThreeSearchImgClick');
    //         $('.bThreeThreeSearch').val('');
    //         $('.bThreeThreeContent ul').each(function(index,item){
    //             if($(this).css('display')=='block'){
    //                 $(this).remove();
    //             };
    //             if($(this).css('display')=='none'){
    //                 $(this).css('display','block')
    //             }
    //         })
    //     }
    // });
    // ue4模型数据获取
    // $('#b_title').click(function(){
    //     $.ajax({
    //         type:'POST',
    //         url:myUrl+'/model/queryModelInfo',
    //         data:{loginId:eId,token:eIdToken,pId:pId,modelId:1},
    //         success:function(uE4m){
    //             if(uE4m.code==0){
    //                 if($('.cSixTwoOneTaskSecond1 div').length>0){
    //                     $('.cSixTwoOneTaskSecond1 div').remove()
    //                 };
    //                 if($('.cSixTwoOneTaskOne1 div').length>0){
    //                     $('.cSixTwoOneTaskOne1 div').remove()
    //                 }
    //                 // console.log(uE4m);
    //                 var tableUe4mm="";
    //                 var tableUe4mms="";
    //                 uE4m.result.commoninfo.forEach(function(item,index) {
    //                     // console.log(item);
    //                     // console.log(item.mCode);
    //                     tableUe4mm=
    //                         '<div class="taskNameDeta">几何属性</div>'+
    //                         '<div class="cSixTwoOneTaskLeft1" style="clear: both;">'+item.modelPropertyName+'</div>' +
    //                         '<div class="cSixTwoOneTaskRight1">'+item.modelPropertyValue+'</div>'+
    //                         '<div style="clear: both"></div>';
    //                     $('.cSixTwoOneTaskSecond1').append(tableUe4mm);
    //                 });
    //             }
    //             else if(uE4m.code == 20002){
    //                 toastr.error('账户或密码错误')
    //             }else if(uE4m.code == 20006){
    //                 toastr.error("用户名不存在")
    //             }else if(uE4m.code ==20004){
    //                 toastr.error('数据处理失败')
    //             }else if(uE4m.code==20005){
    //                 toastr.error('暂无数据')
    //             }else if(uE4m.code==20014){
    //                 toastr.error('同名任务已存在')
    //             }else if(uE4m.code==20012){
    //                 toastr.error('配置参数名称已存在')
    //             }else if(uE4m.code==20009){
    //                 toastr.error('过期操作')
    //             }
    //
    //         }
    //     })
    // });
});
//单位管理
$().ready(function(){
    var pageNum='';
    var pageSearch="";
    var pagecoung="";
    //单位管理首次加载
    function UnitWin(){
        var pageSelectNUM=$('.b7-tbody').attr('selectId');
        $.ajax({
            type:"POST",
            url:myUrl+"company/select",
            data:{pageNum:1,loginId:eId,token:eIdToken},
            success:function (str) {
                if(str.code == 0){
                    var data=str;
                    // console.log(str);
                    var tr="";
                    str.result.forEach(function (item,index) {
                        pageNumberList=
                            '<li class="b7list" id='+item.id+' companyT='+item.conpanyType+'>' +
                            '<span class="b7TbodyInput"><input type="checkbox" name="userName"></span>'+
                            '<span title='+item.name+'>'+item.name+'</span>'+
                            '<span title='+item.companyPhone+'>'+item.companyPhone+'</span>'+
                            '<span title='+item.companyAddress+'>'+item.companyAddress+'</span>'+
                            '<span title='+item.createTime+'>'+item.createTime+'</span>'+
                            '<span class="b7-tbodyEidit"><span class="exitb7">编辑</span><span class="deleteb7">删除</span></span>'+
                            '</li>';
                        $('ul.b7-tbody').append(pageNumberList);
                    });
                    //移除重复的
                    var lis=$("ul.b7-tbody li");
                    lis.each(function(index,item,input){
                        if(index>data.result.length-1){
                            lis[index].remove();
                        }
                    });
                }
            },
            error:function () {

            }
        })
    }
    $(function(){
        $('.Unit').click(function () {
                UnitWin();
                unitCount()
            });

        $(".UnitWin").click(function () {
            UnitWin();
            unitCount()
        });
    })
    //创建单位
    $('.b7-btn').click(function(){
        $('.b8').css('display','block');
        $('#popLayer').css('display','block');
        //关闭弹窗
        $('.del').click(function(){
            $('.b8').css('display','none');
            $('#popLayer').css('display','none');
            //输入框默认值
            $('#unitName').val('');
            $('#unitAddress').val('');
            $('#unitPhone').val('')
        });
        //添加创建单位的类型
        var unitItem=
            [{'id':'1','name':'业主单位'},
            {'id':'2','name':'勘察单位'},
            {'id':'3','name':'设计单位'},
            {'id':'4','name':'施工单位'},
            {'id':'5','name':'监理单位'}
        ];
        var unitType="";
        unitItem.forEach(function (item,index){
            unitType='<option uitId='+item.id+'>'+item.name+'</option>';
            $('.b8-select').append(unitType);
            //移除重复
            var unitList=$('.b8-select option');
            unitList.each(function(index,item){
                if(index>unitItem.length -1){
                    unitList[index].remove();
                }else{

                }
            })
        });
    });
    //添加保存
    $('#bEightSubmit').click(function(){
        var unitTypeId=$('.b8-select').children("option:selected").attr('uitId');
        var aa={
            'name':$('#unitName').val(),
            'address':$('#unitAddress').val(),
            'phone':$('#unitPhone').val(),
            'type':unitTypeId
        };
        var bb=JSON.stringify(aa);
        if($('#unitPhone').val()==""){
        }else{
            regUrl = /^1\d{10}$/.test($('#unitPhone').val());
            if(!regUrl){
                layer.msg("号码有误，请重填");
                $(this).focus();
                return false;
            }
        }
        if($('#unitName').val().length==0 || $('#unitAddress').val().length==0 || $('#unitPhone').val().length==0){
            toastr.warning('有星号的内容不得为空！');
            return false;
        }else if($('#unitName').val().length>50){
            toastr.warning('单位名称长度不能超过50！');
            return false;
        }else if($('#unitAddress').val().length>50){
            toastr.warning('单位地址长度不能超过50！');
            return false;
        }else if($('#unitPhone').val().length>11){
            toastr.warning('联系方式长度不能超过11！');
            return false;
        }
        else{
            $('.b8').css('display','none');
            $('#popLayer').css('display','none');
            $.ajax({
                type:"POST",
                url:myUrl+'company/createCompanyInfo',
                data:{loginId:eId,token:eIdToken,companyJson:bb},
                success:function(unit){
                    if(unit.code == 0){
                        //模拟点击
                        $.ajax({
                            type:"POST",
                            url:myUrl+"company/select",
                            data:{pageNum:1,loginId:eId,token:eIdToken},
                            success:function (pageNumList) {
                                // console.log(pageNumList);
                                var pageNumberList="";
                                if($('.b7-tbody').has('li').length>0){
                                    $('ul.b7-tbody li').remove();
                                    pageNumList.result.forEach(function (item,index) {
                                        pageNumberList=
                                            '<li class="b7list" id='+item.id+' companyT='+item.conpanyType+'>' +
                                            '<span class="b7TbodyInput"><input type="checkbox" name="userName"></span>'+
                                            '<span>'+item.name+'</span>'+
                                            '<span>'+item.companyPhone+'</span>'+
                                            '<span>'+item.companyAddress+'</span>'+
                                            '<span>'+item.createTime+'</span>'+
                                            '<span class="b7-tbodyEidit"><span class="exitb7">编辑</span><span class="deleteb7">删除</span></span>'+
                                            '</li>';
                                        $('ul.b7-tbody').append(pageNumberList);
                                    });
                                }else{
                                    pageNumList.result.forEach(function (item,index) {
                                        pageNumberList=
                                            '<li class="b7list" id='+item.id+' companyT='+item.conpanyType+'>' +
                                            '<span class="b7TbodyInput"><input type="checkbox" name="userName"></span>'+
                                            '<span>'+item.name+'</span>'+
                                            '<span>'+item.companyPhone+'</span>'+
                                            '<span>'+item.companyAddress+'</span>'+
                                            '<span>'+item.createTime+'</span>'+
                                            '<span class="b7-tbodyEidit"><span class="exitb7">编辑</span><span class="deleteb7">删除</span></span>'+
                                            '</li>';
                                        $('ul.b7-tbody').append(pageNumberList);
                                    });
                                }
                            },
                            error:function () {
                            }
                        });
                        //输入框默认值
                        $('#unitName').val('');
                        $('#unitAddress').val('');
                        $('#unitPhone').val('')
                    }
                    else if(unit.code == 20002){
                        toastr.error('账户或密码错误')
                    }else if(unit.code == 20006){
                        toastr.error("用户名不存在")
                    }else if(unit.code ==20004){
                        toastr.error('公司名称已存在')
                    }else if(unit.code==20005){
                        toastr.error('暂无数据')
                    }else if(unit.code==20014){
                        toastr.error('同名任务已存在')
                    }else if(unit.code==20012){
                        toastr.error('配置参数名称已存在')
                    }else if(unit.code==20009){
                        toastr.error('过期操作')
                    }
                }
            })   
        }
    });
    //全选删除
    $('#allSelectDelete').change(function(){
        if($(this).prop("checked")){
            $('.b7TbodyInput input').prop('checked','checked');
        }else{
            $('.b7TbodyInput input').removeAttr('checked');
        }
    });
    function checked() {
        var count = 0;
        var checkArry = document.getElementsByName("userName");
        for (var i = 0; i < checkArry.length; i++) {
            if(checkArry[i].checked == true){
                //选中的操作
                $(".b7-left").css("display","block");
                count++;
            }
        }
        if( count == 0 ){
            $(".b7-left").css("display","none");
        }
    }
    $('.b7-tbody').on('click','.b7TbodyInput input',function(){
        checked();
    });
    //选中删除
    $('.b7-left').click(function(){
        // alert(11)
        var userArr=[];
        $('.b7TbodyInput input').each(function(index,item){
            if($(this).get(0).checked){
                userArr.push($(this).parents("li").attr("id"));
                $(this).parents('li').remove();
            }
        });
        var dd=JSON.stringify(userArr);
        $.ajax({
            type:'POST',
            url:myUrl+'company/updateIsDelete',
            data:{companyIdjson:dd,loginId:eId,token:eIdToken},
            success:function(b7leftDelete){
                // console.log(b7leftDelete);
                if(b7leftDelete.code == 0){
                    toastr.success("删除成功")
                    //模拟点击
                    $('.Unit').trigger('click');
                }
                else if(b7leftDelete.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(b7leftDelete.code == 20006){
                    toastr.error("用户名不存在")
                }else if(b7leftDelete.code ==20004){
                    toastr.error('单位和人员存在关联信息，无法删除单位')
                }else if(b7leftDelete.code==20005){
                    toastr.error('暂无数据')
                }else if(b7leftDelete.code==20014){
                    toastr.error('同名任务已存在')
                }else if(b7leftDelete.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(b7leftDelete.code==20009){
                    toastr.error('过期操作')
                }
            },
            error:function () {

            }
        })
    });
    //编辑
    var thisId="";
    $(document).on('click',".b7-tbody span .exitb7",function(){
        var companyT=$(this).parents('li').attr('companyt');
        //添加创建单位的类型
        var unitItem= [
                {'id':'1','name':'业主单位'},
                {'id':'2','name':'勘察单位'},
                {'id':'3','name':'设计单位'},
                {'id':'4','name':'施工单位'},
                {'id':'5','name':'监理单位'}
            ];
        var unitType="";
        unitItem.forEach(function (item,index){
               unitType='<option uitId='+item.id+'>'+item.name+'</option>';
            //编辑
            $('.b7selType').append(unitType);
            //编辑移除重复
            var unitList=$('.b7selType option');
            unitList.each(function(index,item){
                if(index>unitItem.length -1){
                    unitList[index].remove();
                }
            });
        });
        thisId=$(this).parents("li").attr("id");
        $(".b7Exit").css("display","block");
        $('#popLayer').css('display','block');
        var val1=$(this).parents("li").children("span").eq(1);
        var val2=$(this).parents("li").children("span").eq(2);
        var val3=$(this).parents("li").children("span").eq(3);
        var val4=$(this).parents("li").children("span").eq(4);
        $("#cmpName").attr("value",val1.html());
        $("#cmpPhone").attr("value",val2.html());
        $("#cmpAddress").attr("value",val3.html());
        $("#cmpTime").attr("value",val4.html());
        //后台返回值默认选中状态
        if(companyT==1){
            $('.b7selType').val('业主单位')
        }else if(companyT==2){
            $('.b7selType').val('勘察单位')
        }else if(companyT==3){
            $('.b7selType').val('设计单位')
        }else if(companyT==4){
            $('.b7selType').val('施工单位')
        }else if(companyT==5){
            $('.b7selType').val('监理单位')
        }
        //保存
        $("#b71Save").unbind('click');
        $("#b71Save").on("click",function(){
            if($('#cmpName').val()=='' || $('#cmpAddress').val()=='' || $('#cmpPhone').val()==''){
                toastr.error('内容不得为空！');
                return false;
            }else if($('#cmpName').val().length>50){
                toastr.error('单位名称长度不能超过50！');
                return false;
            }else if($('#cmpAddress').val().length>50){
                toastr.error('单位地址长度不能超过50！');
                return false;
            }else if($('#cmpPhone').val().length>11){
                toastr.error('联系方式长度不能超过11！');
                return false;
            }
            //手机号码正则判断
            if($('#cmpPhone').val()==""){
            }else{
                regUrl = /^1\d{10}$/.test($('#cmpPhone').val());
                if(!regUrl){
                    layer.msg("号码有误，请重填");
                    $(this).focus();
                    return false;
                }
            }
            var unitTypeId=$('.b7selType').children("option:selected").attr('uitId');
            var afterVal1 = $("#cmpName").val();    //单位名称
            var afterVal2 = $("#cmpPhone").val();   //联系方式
            var afterVal3 = $("#cmpAddress").val(); //单位地址
            var afterVal4 = $("#cmpTime").val();    //创建时间
            //后台传值
            var formData = new FormData();
            formData.append("loginId", eId);
            formData.append("token", eIdToken);
            formData.append("companyName", afterVal1);
            formData.append("companyAddress",afterVal3);
            formData.append("companyType", unitTypeId);
            formData.append("companyPhone",afterVal2);
            $.ajax({
                data: formData,
                type: 'POST',
                dataType: 'json',
                processData: false,
                contentType: false,
                url: myUrl + "company/updateCompany/"+thisId,
                success: function (data) {
                    if (data.code == 0) {
                        //页面传值
                        // val1.html(afterVal1);
                        // val2.html(afterVal2);
                        // val3.html(afterVal3);
                        // val4.html(afterVal4);
                        if($('.b7-tbody').has('li').length>0) {
                            $('.b7-tbody li').remove();
                            UnitWin();
                        }
                        $(".b7Exit").css("display", "none");
                        $('#popLayer').css('display', 'none');
                    }
                    // else if (data.code == 10001 || data.code == 10002 || data.code == 10003) {
                    // 	toastr.error('身份过期，请重新登录！');
                    // } else if (data.code == 20014) {
                    // 	toastr.error('该名字公司已存在，请重新输入！');
                    // } else {
                    // 	toastr.error("请求错误！");
                    // }
                },
                error: function (data) {
                    toastr.error("修改失败！");
                }
            })
        });
        //close
        $(".b71Close").on("click",function(){
            $(".b7Exit").css("display","none");
            $('#popLayer').css('display','none');
        })
    });
    //单条数据删除
    $(document).on('click',".b7-tbody span .deleteb7",function(){
        $(this).parents("li").remove();
        var userId=JSON.stringify(new Array($(this).parents("li").attr("id")));
        $.ajax({
            type:"POST",
            data:{companyIdjson:userId,loginId:eId,token:eIdToken},
            url:myUrl+"company/updateIsDelete", //后台提供的删除接口
            dataType:'json',
            success:function(data){
                console.log(data);
                if(data.code == 0){
                    toastr.success('删除成功');
                }
            },
            error:function(data){
            }
        })
    })
    //获取总条数-分页
    function unitCount(curr){
        $.ajax({
            type:'POST',
            url:myUrl+'company/selectCount',
            data:{loginId:eId,token:eIdToken},
            success:function(selectCount){
                if(selectCount.code==0){
                     pagecoung =Math.ceil(selectCount.result/15);
                    pageNum= $('.zxfinput').val();
                    $('.b7-tbody').attr('selectId',pagecoung);
                    laypage({
                        cont: 'unitPage',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        pages:pagecoung,//通过后台拿到的总页数pages
                        curr: curr||1, //当前页
                        skip: true, //是否开启跳页
                        skin: '#00A63C',//皮肤
                        groups: 5, //连续显示分页数
                        jump: function(obj, first){ //触发分页后的回调
                            if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                //document.getElementById('cSixList').innerHTML =
                                pageNum=obj.curr;
                                console.log(obj.curr);
                                unitFenye(obj.curr);
                            }
                        }
                    })
                }
                else if(selectCount.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(selectCount.code == 20006){
                    toastr.error("用户名不存在")
                }else if(selectCount.code ==20004){
                    toastr.error('数据处理失败')
                }else if(selectCount.code==20005){
                    toastr.error('暂无数据')
                }else if(selectCount.code==20014){
                    toastr.error('同名任务已存在')
                }else if(selectCount.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(selectCount.code==20009){
                    toastr.error('过期操作')
                }
            }
        })
    }
    // 分页展示
    function unitFenye(){
        $.ajax({
            type:"POST",
            url:myUrl+"company/select",
            data:{pageNum:pageNum,loginId:eId,token:eIdToken},
            success:function (pageNumList) {
                // console.log(pageNumList);
                if(pageNumList.code==0){
                    var pageNumberList="";
                    if($('.b7-tbody').has('li').length>0){
                        $('ul.b7-tbody li').remove();
                        pageNumList.result.forEach(function (item,index) {
                            pageNumberList=
                                '<li class="b7list" id='+item.id+' companyT='+item.conpanyType+'>' +
                                '<span class="b7TbodyInput"><input type="checkbox" name="userName"></span>'+
                                '<span title='+item.name+'>'+item.name+'</span>'+
                                '<span title='+item.companyPhone+'>'+item.companyPhone+'</span>'+
                                '<span title='+item.companyAddress+'>'+item.companyAddress+'</span>'+
                                '<span title='+item.createTime+'>'+item.createTime+'</span>'+
                                '<span class="b7-tbodyEidit"><span class="exitb7">编辑</span><span class="deleteb7">删除</span></span>'+
                                '</li>';
                            $('ul.b7-tbody').append(pageNumberList);
                        });
                    }else{
                        pageNumList.result.forEach(function (item,index) {
                            pageNumberList=
                                '<li class="b7list" id='+item.id+' companyT='+item.conpanyType+'>' +
                                '<span class="b7TbodyInput"><input type="checkbox" name="userName"></span>'+
                                '<span title='+item.name+'>'+item.name+'</span>'+
                                '<span title='+item.companyPhone+'>'+item.companyPhone+'</span>'+
                                '<span title='+item.companyAddress+'>'+item.companyAddress+'</span>'+
                                '<span title='+item.createTime+'>'+item.createTime+'</span>'+
                                '<span class="b7-tbodyEidit"><span class="exitb7">编辑</span><span class="deleteb7">删除</span></span>'+
                                '</li>';
                            $('ul.b7-tbody').append(pageNumberList);
                        });
                    }
                }
                else if(pageNumList.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(pageNumList.code == 20006){
                    toastr.error("用户名不存在")
                }else if(pageNumList.code ==20004){
                    toastr.error('数据处理失败')
                }else if(pageNumList.code==20005){
                    toastr.error('暂无数据')
                }else if(pageNumList.code==20014){
                    toastr.error('同名任务已存在')
                }else if(pageNumList.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(pageNumList.code==20009){
                    toastr.error('过期操作')
                }
            },
            error:function () {
            }
        })
    }
    //搜索获取总条数-分页
    function unitSearchCount(curr){
        $.ajax({
            type:'POST',
            url:myUrl+'company/likeSelectCompanyCount',
            data:{loginId:eId,token:eIdToken,condition:$('.unitInputSearch').val()},
            success:function(selectCount){
                if(selectCount.code==0){
                    pagecoung =Math.ceil(selectCount.result/15);
                    // pageNum= $('.zxfinput').val();
                    $('.b7-tbody').attr('selectId',pagecoung);
                    laypage({
                        cont: 'unitPage',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        pages:pagecoung,//通过后台拿到的总页数pages
                        curr: curr||1, //当前页
                        skip: true, //是否开启跳页
                        skin: '#00A63C',//皮肤
                        groups: 5, //连续显示分页数
                        jump: function(obj, first){ //触发分页后的回调
                            if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                //document.getElementById('cSixList').innerHTML =
                                pageSearch=obj.curr;
                                console.log(obj.curr);
                                unitSearch(obj.curr);
                            }
                        }
                    })
                }
                else if(selectCount.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(selectCount.code == 20006){
                    toastr.error("用户名不存在")
                }else if(selectCount.code ==20004){
                    toastr.error('数据处理失败')
                }else if(selectCount.code==20005){
                    toastr.error('暂无数据')
                }else if(selectCount.code==20014){
                    toastr.error('同名任务已存在')
                }else if(selectCount.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(selectCount.code==20009){
                    toastr.error('过期操作')
                }
            }
        })
    }
    //搜索数据分页展示
    function unitSearch(){
        $.ajax({
            type:'POST',
            url:myUrl+'company/likeSelectCompany',
            data:{loginId:eId,token:eIdToken,pageNum:pageSearch ||1,condition:$('.unitInputSearch').val()},
            success:function(unitSearch){
                if(unitSearch.code == 0){
                    var pageNumberList="";
                    if($('.b7-tbody').has('li').length>0) {
                        $('.b7-tbody li').remove();
                        unitSearch.result.forEach(function(item,index){
                            console.log(item);
                            pageNumberList=
                                '<li class="b7list" id='+item.id+' companyT='+item.conpanyType+'>' +
                                '<span class="b7TbodyInput"><input type="checkbox" name="userName"></span>'+
                                '<span title='+item.name+'>'+item.name+'</span>'+
                                '<span title='+item.companyPhone+'>'+item.companyPhone+'</span>'+
                                '<span title='+item.companyAddress+'>'+item.companyAddress+'</span>'+
                                '<span title='+item.createTime+'>'+item.createTime+'</span>'+
                                '<span class="b7-tbodyEidit"><span class="exitb7">编辑</span><span class="deleteb7">删除</span></span>'+
                                '</li>';
                            $('ul.b7-tbody').append(pageNumberList);
                        })
                    }else{
                        unitSearch.result.forEach(function(item,index){
                            console.log(item);
                            pageNumberList=
                                '<li class="b7list" id='+item.id+' companyT='+item.conpanyType+'>' +
                                '<span class="b7TbodyInput"><input type="checkbox" name="userName"></span>'+
                                '<span title='+item.name+'>'+item.name+'</span>'+
                                '<span title='+item.companyPhone+'>'+item.companyPhone+'</span>'+
                                '<span title='+item.companyAddress+'>'+item.companyAddress+'</span>'+
                                '<span title='+item.createTime+'>'+item.createTime+'</span>'+
                                '<span class="b7-tbodyEidit"><span class="exitb7">编辑</span><span class="deleteb7">删除</span></span>'+
                                '</li>';
                            $('ul.b7-tbody').append(pageNumberList);
                        })
                    }
                }
                else if(unitSearch.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(unitSearch.code == 20006){
                    toastr.error("用户名不存在")
                }else if(unitSearch.code ==20004){
                    toastr.error('数据处理失败')
                }else if(unitSearch.code==20005){
                    $('.b7-tbody li').remove();
                    toastr.error('未搜索到该信息')
                }else if(unitSearch.code==20014){
                    toastr.error('同名任务已存在')
                }else if(unitSearch.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(unitSearch.code==20009){
                    toastr.error('过期操作')
                }
            }
        });
    }
    $('.b7-right').on('click','span',function(){
        if($('.unitInputSearch').val() !== ''){
            if($(this).hasClass('unitSearch')){
                $(this).removeClass('unitSearch');
                $(this).addClass('unitBack');
                $('.b7-tbody li').remove();
                unitSearchCount();
                unitSearch();
            }else{
                $(this).addClass('unitSearch');
                $(this).removeClass('unitBack');
                $('.unitInputSearch').val('');
                $('.b7-tbody li').remove();
                //模拟刷新
                $('.Unit').trigger('click');
            }
        }else{
            toastr.error('请输入搜索内容！')
        }

    });
});
//系统管理
$().ready(function(){
    var pageSearch='';
    var sysPage='';
    //获取总条数
    function systemCount(curr) {
        $.ajax({
            type:'POST',
            url:myUrl+'systemConfig/selectCount',
            data:{loginId:eId,token:eIdToken},
            success:function(count){
                // console.log(count);
                if(count.code==0){
                    var pageNum=Math.ceil(count.result/15);
                    laypage({
                        cont: 'systemPage',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        pages: pageNum,//通过后台拿到的总页数c61pages
                        curr: curr||1, //当前页
                        skip: true, //是否开启跳页
                        skin: '#00A63C',//皮肤
                        groups: 5, //连续显示分页数
                        jump: function(obj, first){ //触发分页后的回调
                            if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                sysPage=obj.curr;
                                // console.log(obj.curr)
                                cjDataDictionary(obj.curr);
                            }
                        }
                    })
                }
                else if(count.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(count.code == 20006){
                    toastr.error("用户名不存在")
                }else if(count.code ==20004){
                    toastr.error('数据处理失败')
                }else if(count.code==20005){
                    toastr.error('暂无数据')
                }else if(count.code==20014){
                    toastr.error('同名任务已存在')
                }else if(count.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(count.code==20009){
                    toastr.error('过期操作')
                }
            }
        })
    }
    function cjDataDictionary(){
        // $('.bNineContent').css('display','block');
        $.ajax({
            type:'POST',
            url:myUrl+'systemConfig/selectSysConfigByPage',
            data:{loginId:eId,token:eIdToken,pageNum:sysPage ||1},
            cache:false,
            success:function(system){
                // console.log(system);
                if(system.code == 0){
                    if($('.bNineContentMain').has('.bNineListColor').length >0) {
                        $('.bNineContentMain .bNineListColor').remove();
                        var list = "";
                        system.result.forEach(function (item, index) {
                            // console.log(item);
                            list =
                                '<div class="bNineListColor">' +
                                '<ul sysId=' + item.sysId + '>' +
                                '<li class="bNineListOne" title=' + item.sysName + '>' + item.sysName + '</li>' +
                                '<li class="bNineListTwo" title=' + item.sysCode + '>' + item.sysCode + '</li>' +
                                '<li class="bNineListThree" title=' + item.sysValue + '>' + item.sysValue + '</li>' +
                                '<li class="bNineListFour" title=' + item.sysRemake + '>' + item.sysRemake + '</li>' +
                                '<li class="bNineListEdit">修改</li>' +
                                '<li class="bNineListDel">删除</li>' +
                                '<div style="clear: both"></div>' +
                                '</ul>' +
                                '</div>';
                            $('.bNineContentMain').append(list);
                        });
                        var lists = $('.bNineContentMain .bNineListColor');
                        //移除重复
                        lists.each(function (index, item) {
                            if (index > system.result.length - 1) {
                                lists[index].remove();
                            }
                        });
                    }else{
                        var list = "";
                        system.result.forEach(function (item, index) {
                            // console.log(item);
                            list =
                                '<div class="bNineListColor">' +
                                '<ul sysId=' + item.sysId + '>' +
                                '<li class="bNineListOne" title=' + item.sysName + '>' + item.sysName + '</li>' +
                                '<li class="bNineListTwo" title=' + item.sysCode + '>' + item.sysCode + '</li>' +
                                '<li class="bNineListThree" title=' + item.sysValue + '>' + item.sysValue + '</li>' +
                                '<li class="bNineListFour" title=' + item.sysRemake + '>' + item.sysRemake + '</li>' +
                                '<li class="bNineListEdit">修改</li>' +
                                '<li class="bNineListDel">删除</li>' +
                                '<div style="clear: both"></div>' +
                                '</ul>' +
                                '</div>';
                            $('.bNineContentMain').append(list);
                        });
                        var lists = $('.bNineContentMain .bNineListColor');
                        //移除重复
                        lists.each(function (index, item) {
                            if (index > system.result.length - 1) {
                                lists[index].remove();
                            }
                        });
                    }
                }
                else if(system.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(system.code == 20006){
                    toastr.error("用户名不存在")
                }else if(system.code ==20004){
                    toastr.error('数据处理失败')
                }else if(system.code==20005){
                    toastr.error('暂无数据')
                }else if(system.code==20014){
                    toastr.error('同名任务已存在')
                }else if(system.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(system.code==20009){
                    toastr.error('过期操作')
                }
            },
            error:function () {
            }
        });
    }

    $('.system-configuration').click(function(){
        $(".bNineContent").show();
        $(this).addClass("adBackground");
        systemCount();
        cjDataDictionary();
    });
    //获取搜索总条数
    function systemSearchCount(curr){
        $.ajax({
            type:'POST',
            url:myUrl+'systemConfig/selectCount',
            data:{loginId:eId,token:eIdToken,condition:$('.systemInput').val()},
            success:function(count){
                if(count.code==0){
                    var pageNum=Math.ceil(count.result/15);
                    laypage({
                        cont: 'systemPage',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        pages: pageNum,//通过后台拿到的总页数c61pages
                        curr: curr||1, //当前页
                        skip: true, //是否开启跳页
                        skin: '#00A63C',//皮肤
                        groups: 5, //连续显示分页数
                        jump: function(obj, first){ //触发分页后的回调
                            if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                pageSearch=obj.curr;
                                systemSetting(obj.curr);
                            }
                        }
                    })
                }
                else if(count.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(count.code == 20006){
                    toastr.error("用户名不存在")
                }else if(count.code ==20004){
                    toastr.error('数据处理失败')
                }else if(count.code==20005){
                    toastr.error('暂无数据')
                }else if(count.code==20014){
                    toastr.error('同名任务已存在')
                }else if(count.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(count.code==20009){
                    toastr.error('过期操作')
                }
            }
        })
    }
    //搜索页面
    function systemSetting() {
        $.ajax({
            type:'POST',
            url:myUrl+'systemConfig/likeSelectSysConfig',
            data:{loginId:eId,token:eIdToken,pageNum:pageSearch ||1,condition:$('.systemInput').val()},
            success:function(system){
                $('.bNineContentMain .bNineListColor').remove();
                if(system.code == 0){
                    var list="";
                    system.result.forEach(function(item,index){
                        list=
                            '<div class="bNineListColor">'+
                            '<ul sysId='+item.sysId+'>' +
                            '<li class="bNineListOne" title='+item.sysName+'>'+item.sysName+'</li>'+
                            '<li class="bNineListTwo" title='+item.sysCode+'>'+item.sysCode+'</li>'+
                            '<li class="bNineListThree" title='+item.sysValue+'>'+item.sysValue+'</li>'+
                            '<li class="bNineListFour" title='+item.sysRemake+'>'+item.sysRemake+'</li>'+
                            '<li class="bNineListEdit">修改</li>'+
                            '<li class="bNineListDel">删除</li>'+
                            '<div style="clear: both"></div>'+
                            '</ul>'+
                            '</div>';
                        $('.bNineContentMain').append(list);
                    });
                }else if(system.code ==20005){
                    toastr.error('暂无数据')
                }
                else if(system.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(system.code == 20006){
                    toastr.error("用户名不存在")
                }else if(system.code ==20004){
                    toastr.error('数据处理失败')
                }else if(system.code==20014){
                    toastr.error('同名任务已存在')
                }else if(system.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(system.code==20009){
                    toastr.error('过期操作')
                }
            }
        });
    }
    $('.bNineContentHeader').on('click','span',function(){
        // var pageSearch=$('.systemPage').children('.current').html();
        if($('.systemInput').val() !== ''){
            if($(this).hasClass('systemSearch')){
                $(this).removeClass('systemSearch');
                $(this).addClass('systemBack');
                systemSearchCount();
                systemSetting();
            }else{
                $(this).addClass('systemSearch');
                $(this).removeClass('systemBack');
                $('.systemInput').val('');
                $('.bNineContentMain .bNineListColor').remove();
                $('.system-configuration a').trigger('click');
            }
        }else{
            toastr.error('请输入搜索内容！')
        }
    });
    //添加
    $('.systemBtn').click(function(){
        $('.systemAdd').css('display','block');
        $('#popLayer').css('display','block');
    });
    $('.systemAdd-back').click(function(){
        $('.systemAdd').css('display','none');
        $('#popLayer').css('display','none');
        $('.sysNameInput').val('');
        $('.sysCodeInput').val('');
        $('.sysValueInput').val('');
        $('.sysMarkInput').val('');
    });
    $('#systemAdd').click(function(){
        if($('.sysNameInput').val()=="" || $('.sysCodeInput').val()=="" || $('.sysValueInput').val()==""){
            toastr.error('内容不得为空');
            return false;
        }else if($('.sysNameInput').val().length>10 || $('.sysCodeInput').val().length>10 || $('.sysValueInput').length>10){
            toastr.error('输入内容长度不得超过10！');
            return false;
        }else if($('.sysMarkInput').length>50){
            toastr.error('描述输入内容长度不得超过50！');
            return false;
        }
        var bb={
            'systemConfigName':$('.sysNameInput').val(),
            'systemConfigCode':$('.sysCodeInput').val(),
            'systemConfigValue':$('.sysValueInput').val(),
            'remake':$('.sysMarkInput').val()
        };
        $('.sysNameInput').val('');
        $('.sysCodeInput').val('');
        $('.sysValueInput').val('');
        $('.sysMarkInput').val('');
        $('.systemAdd').css('display','none');
        $('#popLayer').css('display','none');
        var dd=JSON.stringify(bb);
        $.ajax({
            type:'POST',
            url:myUrl+'systemConfig/sysConfigInsert',
            data:{loginId:eId,token:eIdToken,strJson:dd},
            success:function(add){
                // console.log(add);
                if(add.code == 0){
                    cjDataDictionary();
                    systemCount();
                }
            }
        })
    });
    //删除
    $(document).on('click','.bNineContentMain .bNineListColor .bNineListDel',function(){
        var sysId=[];
        sysId.push($(this).parent('ul').attr('sysid'));
        var dd=JSON.stringify(sysId);
        var list=$(this).parents('.bNineListColor');
        $.ajax({
            type:'POST',
            url:myUrl+'systemConfig/delectSysConfig',
            data:{loginId:eId,token:eIdToken,deletelist:dd},
            success:function(del){
                // console.log(del);
                if(del.code == 0){
                    toastr.success('删除成功！');
                    list.remove();
                }
                else if(del.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(del.code == 20006){
                    toastr.error("用户名不存在")
                }else if(del.code ==20004){
                    toastr.error('数据处理失败')
                }else if(del.code==20005){
                    toastr.error('暂无数据')
                }else if(del.code==20014){
                    toastr.error('同名任务已存在')
                }else if(del.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(del.code==20009){
                    toastr.error('过期操作')
                }
            }
        })
    });
    //修改
    $(document).on('click','.bNineContentMain .bNineListColor .bNineListEdit',function(){
        //弹窗打开事件
        $('.systemEdi').css('display','block');
        $('#popLayer').css('display','block');
        //弹窗关闭
        $('.systemEdi-back').click(function(){
            $('.systemEdi').css('display','none');
            $('#popLayer').css('display','none');
        });
        //取当前事件的父级与兄弟级
        var systemConfigId=$(this).parent('ul').attr('sysid'); //取ID
        var systemEdiNameInput=$(this).siblings('.bNineListOne');
        var systemConfigCode=$(this).siblings('.bNineListTwo');
        var systemConfigValue=$(this).siblings('.bNineListThree');
        var remake=$(this).siblings('.bNineListFour');
        //弹窗页面取值
        $('.systemEdiNameInput').val(systemEdiNameInput.html());
        $('.systemEdiCodeInput').val(systemConfigCode.html());
        $('.systemEdiValueInput').val(systemConfigValue.html());
        $('.systemEdiMarkInput').val(remake.html());
        //提交
        $('#systemEdi').unbind('click');
        $('#systemEdi').click(function(){
            if($('.sysNameInput').val()=="" || $('.sysCodeInput').val()=="" || $('.sysValueInput').val()==""){
                toastr.error('内容不得为空');
                return false;
            }else if($('.sysNameInput').val().length>10 || $('.sysCodeInput').val().length>10 || $('.sysValueInput').length>10){
                toastr.error('输入内容长度不得超过10！');
                return false;
            }else if($('.sysMarkInput').length>50){
                toastr.error('描述输入内容长度不得超过50！');
                return false;
            }
            var bb={
                'systemConfigName':$('.systemEdiNameInput').val(),
                'systemConfigCode':$('.systemEdiCodeInput').val(),
                'systemConfigValue':$('.systemEdiValueInput').val(),
                'remake':$('.systemEdiMarkInput').val()
            };
            $('.systemEdi').css('display','none');
            $('#popLayer').css('display','none');
            // alert(bb);
            var dd=JSON.stringify(bb);
            // alert(dd);
            $.ajax({
                type:'POST',
                url:myUrl+'systemConfig/updateSysConfig',
                data:{loginId:eId,token:eIdToken,strJson:dd,systemConfigId:systemConfigId},
                cache:false,
                success:function(eidit){
                    // console.log(eidit);
                    if(eidit.code == 0){
                        // $('.System').trigger('click');
                        toastr.success('修改成功');
                        //页面传值
                        systemEdiNameInput.html($('.systemEdiNameInput').val());
                        systemConfigCode.html($('.systemEdiCodeInput').val());
                        systemConfigValue.html($('.systemEdiValueInput').val());
                        remake.html($('.systemEdiMarkInput').val());
                    }
                    else if(eidit.code == 20002){
                        toastr.error('账户或密码错误')
                    }else if(eidit.code == 20006){
                        toastr.error("用户名不存在")
                    }else if(eidit.code ==20004){
                        toastr.error('数据处理失败')
                    }else if(eidit.code==20005){
                        toastr.error('暂无数据')
                    }else if(eidit.code==20014){
                        toastr.error('同名任务已存在')
                    }else if(eidit.code==20012){
                        toastr.error('配置参数名称已存在')
                    }else if(eidit.code==20009){
                        toastr.error('过期操作')
                    }
                }
            })
        })
    })
});
//用户管理
$().ready(function(){
    var pageNum='';
    var pageSearch='';
    var pagecoung='';
    function mangerWin(){
        $.ajax({
            type:"POST",
            url:myUrl+"user/select",
            data:{loginId:eId,pageNum:1,token:eIdToken},
            cache:false,
            success:function(data){
                // var data1=JSON.parse(data);//字符串转为对象
                // console.log(data);
                // toastr.success(11)
                if(data.code == 0){
                    // var tr="";
                    // data.result.forEach(function(item,index){
                    // 	// console.log(item);
                    // 	tr=$("ul.b5-tbody li:hidden").clone();
                    // 	tr.removeAttr("hidden");
                    // 	tr.attr("id",item.uId);
                    // 	tr.children("span").eq(0).attr("loginId");
                    // 	tr.children("span").eq(1).html(item.loginName.loginName);
                    // 	tr.children("span").eq(2).html(item.uName);
                    // 	tr.children("span").eq(3).html(item.uPhone);
                    // 	tr.children("span").eq(4).html(item.companyName.name);
                    // 	tr.children("span").eq(5).html(item.uCreateTime);
                    // 	$("ul.b5-tbody").append(tr);
                    // });
                    var pageNumberList="";
                    data.result.forEach(function (item,index) {
                        // console.log(item);
                        pageNumberList=
                            '<li class="b5list" id='+item.uId+' lId='+item.lId+'>' +
                            '<span class="selected-delete"><input type="checkbox" name="userName"></span>'+
                            '<span id="beforeId" title='+item.loginName.loginName+'>'+item.loginName.loginName+'</span>'+
                            '<span id="beforeName" title='+item.uName+'>'+item.uName+'</span>'+
                            '<span id="beforePhone" title='+item.uPhone+'>'+item.uPhone+'</span>'+
                            '<span id="beforeAddress" title='+(item.companyName==null?'':item.companyName.name)+'>'+(item.companyName==null?'':item.companyName.name)+'</span>'+
                            '<span id="beforeTime" title='+item.uCreateTime+'>'+item.uCreateTime+'</span>'+
                            '<span class="b5-tbodyEidit"><span class="exit">编辑</span><span class="mangerLimit">设置角色</span><span class="b5delete">删除</span></span>'+
                            '</li>';
                        $('ul.b5-tbody').append(pageNumberList);
                        //移除重复的
                        var lis=$("ul.b5-tbody li");
                        lis.each(function(index,item,input){
                            if(index>data.result.length-1){
                                lis[index].remove();
                            }
                        });
                    });
                }
                // else if(data.code == 10001|| data.code == 10002 || data.code == 10003){
                // 	toastr.error('身份过期，请重新登录')
                // }
            },
            error:function(data){

            }
        })
    }
    //用户列表
    $(".Manger").click(function(){
    	mangerWin();
        mangerCount();
    });
    $('.mangerWin').click(function(){
    	mangerWin();
    });
    //关联单位
    $('.b5-btn').on("click",function () {
        // 打开弹窗
        $(".b6").css("display","block");
        $('#popLayer').css('display','block');
        //关闭弹窗
        $('.del').click(function(){
            $(".b6").css("display","none");
            $('#popLayer').css('display','none');
            //输入框默认值
            $('.bSixName').val('');
            $('.bSixOneName').val('');
            $('.bSixOneMail').val('');
        });
        $.ajax({
            type:"POST",
            url:myUrl+"company/selectName",
            data:{pageNum:1,loginId:eId,token:eIdToken},
            success:function(b6Select){
                console.log(b6Select);
                if(b6Select.code == 0){
                    $('.bSixName').val('');
                    var selectedList="";
                    b6Select.result.forEach(function (item,index) {
                        // console.log(item);
                        // console.log(item.name);
                        selectedList=
                            '<li opId='+item.id+'>'+item.name+'</li>';
                        $('.b6Select').append(selectedList);
                        // localStorage.itemNmame = item.id;
                        // console.log(localStorage.itemNmame);
                        //移除重复
                        var selectList=$('.b6Select li');
                        selectList.each(function(index,item){
                            if(index>b6Select.result.length-1){
                                selectList[index].remove();
                            }
                        })
                    })
                }
                else if(b6Select.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(b6Select.code == 20006){
                    toastr.error("用户名不存在")
                }else if(b6Select.code ==20004){
                    toastr.error('数据处理失败')
                }else if(b6Select.code==20005){
                    toastr.error('暂无数据')
                }else if(b6Select.code==20014){
                    toastr.error('同名任务已存在')
                }else if(b6Select.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(b6Select.code==20009){
                    toastr.error('过期操作')
                }
            },
            error:function(){
            }
        })
    });
    $('.b6SelectEd .b6SelectValue').click(function () {
        if($('.b6Select').css("display")=="none"){
            $('.b6Select').slideDown("fast");
        }else{
            $('.b6Select').slideUp("fast");
        }
    });
    $(document).on('click','.b6SelectEd li',function(){
        var txt = $(this).text();
        var opid=$(this).attr('opid');
        $('.b6SelectValue').html(txt);
        $('.b6SelectValue').attr('opid',opid);
        $('.b6Select').hide()
    });
    //创建用户
    $('.bSixSubmit').click(function(){
        // alert(mangerType)
        if($('.bSixName').val().length==0){
            toastr.error('内容不得为空！');
            return false;
        }else if($('.bSixName').val().length>10){
            toastr.error('账户姓名长度不能超过10！');
            return false;
        }else if($('.b6SelectValue').html()=='请选择'){
            toastr.error('请选择关联单位!');
            return false;
        }
        else{
        //提交之后关闭弹窗
        $(".b6").css("display","none");
        $('#popLayer').css('display','none');
        var mangerType=$('.b6SelectValue').attr('opid');
           $.ajax({
                type:"POST",
                url:myUrl+"user/createUserInfo",
                data:{userName:$('.bSixName').val(),companyId:mangerType,loginId:eId,token:eIdToken},
                success:function(bSixSubmit){
                    console.log(bSixSubmit);
                    // 模拟刷新
                    $('.Manger').trigger("click");
                    if(bSixSubmit.code == 0){
                        $('.bSixName').val("");
                        //创建成功账号 密码 提示弹窗
                        $('.manger-log').css('display','block');
                        $('#popLayer').css('display','block');
                        //关闭
                        $('.manger-log-close img').click(function(){
                            $('.manger-log').css('display','none');
                            $('#popLayer').css('display','none');
                        });
                        //确定
                        $('.manger-log-submit').one('click',function(){
                            $('.manger-log').css('display','none');
                            $('#popLayer').css('display','none');
                            //分页刷新
                            $.ajax({
                                type:"POST",
                                url:myUrl+"user/select",
                                data:{pageNum:1,loginId:eId,token:eIdToken},
                                success:function (pageNumList) {
                                    console.log(pageNumList);
                                    var pageNumberList="";
                                    if($('.b5-tbody').has('li').length>0){
                                        $('ul.b5-tbody li').remove();
                                        pageNumList.result.forEach(function (item,index) {
                                            // console.log(item);
                                            pageNumberList=
                                                '<li class="b5list" id='+item.uId+'>' +
                                                '<span class="selected-delete"><input type="checkbox" name="userName"></span>'+
                                                '<span id="beforeId" title='+item.loginName.loginName+'>'+item.loginName.loginName+'</span>'+
                                                '<span id="beforeName" title='+item.uName+'>'+item.uName+'</span>'+
                                                '<span id="beforePhone" title='+item.uPhone+'>'+item.uPhone+'</span>'+
                                                '<span id="beforeAddress" title='+(item.companyName==null?'':(item.companyName.name))+'>'+(item.companyName==null?'':(item.companyName.name))+'</span>'+
                                                '<span id="beforeTime" title='+item.uCreateTime+'>'+item.uCreateTime+'</span>'+
                                                '<span class="b5-tbodyEidit"><span class="exit">编辑</span><span class="mangerLimit">设置角色</span><span class="b5delete">删除</span></span>'+
                                                '</li>';
                                            $('ul.b5-tbody').append(pageNumberList);
                                        });
                                        // alert(11)
                                    }else{
                                        pageNumList.result.forEach(function (item,index) {
                                            console.log(item);
                                            pageNumberList=
                                                '<li id='+item.uId+'>' +
                                                '<span class="selected-delete"><input type="checkbox" name="userName"></span>'+
                                                '<span id="beforeId" title='+item.loginName.loginName+'>'+item.loginName.loginName+'</span>'+
                                                '<span id="beforeName" title='+item.uName+'>'+item.uName+'</span>'+
                                                '<span id="beforePhone" title='+item.uPhone+'>'+item.uPhone+'</span>'+
                                                '<span id="beforeAddress" title='+(item.companyName==null?'':(item.companyName.name))+'>'+(item.companyName==null?'':(item.companyName.name))+'</span>'+
                                                '<span id="beforeTime" title='+item.uCreateTime+'>'+item.uCreateTime+'</span>'+
                                                '<span class="b5-tbodyEidit"><span class="exit">编辑</span><span class="b5delete">删除</span></span>'+
                                                '</li>';
                                            $('ul.b5-tbody').append(pageNumberList);
                                        });
                                    }
                                },
                                error:function () {
                                }
                            })
                        });
                        if($('.manger-log-content').has('div').length>0){
                            $('.manger-log-content div').remove();
                            //添加数据
                            var mangerList="";
                            mangerList=
                                '<div class="manger-log-contentList">' +
                                '<div>用户ID:</div>'+
                                '<div>'+bSixSubmit.result.id+'</div>'+
                                '</div>'+
                                '<div style="clear: both"></div>'+
                                '<div class="manger-log-contentList">' +
                                '<div>初始密码:</div>'+
                                '<div>'+bSixSubmit.result.pwd+'</div>'+
                                '</div>'+
                                '<div style="clear: both"></div>';
                            $('.manger-log-content').append(mangerList);
                        }else{
                            //添加数据
                            var mangerList="";
                            // bSixSubmit.result.forEach(function(index,item){
                            mangerList=
                                '<div class="manger-log-contentList">' +
                                '<div>用户ID:</div>'+
                                '<div>'+bSixSubmit.result.id+'</div>'+
                                '</div>'+
                                '<div style="clear: both"></div>'+
                                '<div class="manger-log-contentList">' +
                                '<div>初始密码:</div>'+
                                '<div>'+bSixSubmit.result.pwd+'</div>'+
                                '</div>'+
                                '<div style="clear: both"></div>';
                            $('.manger-log-content').append(mangerList);
                        }
                        //移除重复
                        // $('.manger-log-contentList').each(function (index,item) {
                        //     if(index>1){
                        //         $('.manger-log-contentList').get(2).remove();
                        //     }
                        // })
                    }
                    else if(bSixSubmit.code == 20002){
                        toastr.error('账户或密码错误')
                    }else if(bSixSubmit.code == 20006){
                        toastr.error("用户名不存在")
                    }else if(bSixSubmit.code ==20004){
                        toastr.error('数据处理失败')
                    }else if(bSixSubmit.code==20005){
                        toastr.error('暂无数据')
                    }else if(bSixSubmit.code==20014){
                        toastr.error('同名任务已存在')
                    }else if(bSixSubmit.code==20012){
                        toastr.error('配置参数名称已存在')
                    }else if(bSixSubmit.code==20009){
                        toastr.error('过期操作')
                    }
                },
                error:function(){

                }
            }) 
        }
        
    });
    //邀请注册
    $('.bSixOneSubmit').click(function(){
        if($('.bSixOneName').val()==""|| $('.bSixOneMail').val()==""){
            toastr.error('内容不得为空');
            return false;
        }
        var email=$(".bSixOneMail").val();
            // var str = $(this).val();
        if(email.indexOf('@')>0){
            if(email==""){
            }else{
                regUrl = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
                if(!regUrl){
                    layer.msg("邮箱有误，请重填");
                    $(this).focus();
                    return false;
                }
            };
        }else{
            // if(email==""){
            // }else{
            //     regUrl = /^1\d{10}$/.test(email);
            //     if(!regUrl){
            //         layer.msg("号码有误，请重填");
            //         $(this).focus();
            //         return false;
            //     }
            // }
        }
        //提交之后关闭弹窗
        $(".b6").css("display","none");
        $('#popLayer').css('display','none');
        $.ajax({
            type:"POST",
            url:myUrl+"user/inviteRegistration",
            data:{inviteName:$('.bSixOneName').val(),inviteWay:$('.bSixOneMail').val(),loginId:eId,token:eIdToken},
            success:function(bSix){
                //输入框默认值
                $('.bSixOneName').val('');
                if(bSix.code==0){
                    toastr.success("邀请成功");
                    //模拟刷新
                    $('.Manger').trigger("click");
                }
                else if(bSix.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(bSix.code == 20006){
                    toastr.error("用户名不存在")
                }else if(bSix.code ==20004){
                    toastr.error('数据处理失败')
                }else if(bSix.code==20005){
                    toastr.error('暂无数据')
                }else if(bSix.code==20015){
                    toastr.error('邮箱已注册')
                }else if(bSix.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(bSix.code==20009){
                    toastr.error('过期操作')
                }
            },
            error:function(){

            }
        })
    });
    //全选删除
    $('#allSelect').change(function () {
        if($(this).prop("checked")){
            $('.selected-delete input').prop('checked','checked')
        }else{
            $('.selected-delete input').removeAttr('checked')
        }
    });
    function checked() {
        var count=0;
        var checkArry=document.getElementsByName('userName');
        for(var i=0;i<checkArry.length;i++){
            if(checkArry[i].checked==true){
                $(".b5-left").css("display","block");
                count++;
            }
        }
        if(count ==0){
            $(".b5-left").css("display","none");
        }
    }
    $(".b5-tbody").on("click",".selected-delete input",function(){
        checked();
    })
    //选中删除
    $('.b5-left').click(function(){
        var userArr=[];
        $('.selected-delete input').each(function (index,item) {
            if($(this).get(0).checked){
                userArr.push($(this).parents('li').attr('id'));
                $(this).parents('li').remove();
            }
        });
        // console.log(userArr)
        var dd=JSON.stringify(userArr);
        $.ajax({
            type:'POST',
            url:myUrl+'user/updateUserDeleteInfo',
            data:{loginId:eId,userIdJson:dd,token:eIdToken},
            dataType:'json',
            success:function(userArrDelete){
                // console.log(userArrDelete);
                if(userArrDelete.code==0){
                    //alert('删除成功')
                    $(".b5-left").css("display","none");
                }
                else if(userArrDelete.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(userArrDelete.code == 20006){
                    toastr.error("用户名不存在")
                }else if(userArrDelete.code ==20004){
                    toastr.error('数据处理失败')
                }else if(userArrDelete.code==20005){
                    toastr.error('暂无数据')
                }else if(userArrDelete.code==20014){
                    toastr.error('该信息已存在')
                }else if(userArrDelete.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(userArrDelete.code==20009){
                    toastr.error('过期操作')
                }
                //模拟点击
                $('.Manger').trigger('click');
            }
        })
    });
    //获取总条数-分页
    $('.Manger').click(function(){
        mangerCount();
    });
    //分页总数
    function mangerCount(curr){
        $.ajax({
            type:'POST',
            url:myUrl+'user/selectCount',
            data:{loginId:eId,token:eIdToken},
            success:function(selectCount){
                // console.log(selectCount);
                if(selectCount.code==0){
                    pagecoung =Math.ceil(selectCount.result/15);
                    $('.b5-tbody').attr('selectId',pagecoung);
                    // $(".zxf_pagediv2").createPage({
                    //     pageNum: pagecoung,
                    //     current: 1,
                    //     backfun: function(e) {
                    //         //console.log(e);//回调
                    //     }
                    // });
                    laypage({
                        cont: 'mangerPage',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        pages:pagecoung,//通过后台拿到的总页数pages
                        curr: curr||1, //当前页
                        skip: true, //是否开启跳页
                        skin: '#00A63C',//皮肤
                        groups: 5, //连续显示分页数
                        jump: function(obj, first){ //触发分页后的回调
                            if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                pageNum=obj.curr;
                                console.log(obj.curr);
                                mangerFenye(obj.curr);
                            }
                        }
                    })
                }
                else if(selectCount.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(selectCount.code == 20006){
                    toastr.error("用户名不存在")
                }else if(selectCount.code ==20004){
                    toastr.error('数据处理失败')
                }else if(selectCount.code==20005){
                    toastr.error('暂无数据')
                }else if(selectCount.code==20014){
                    toastr.error('该信息已存在')
                }else if(selectCount.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(selectCount.code==20009){
                    toastr.error('过期操作')
                }
            }
        })
    }
    //分页展示
    function mangerFenye(){
        $.ajax({
            type:"POST",
            url:myUrl+"user/select",
            data:{pageNum:pageNum,loginId:eId,token:eIdToken},
            success:function (pageNumList) {
                // console.log(pageNumList);
                if(pageNumList.code==0){
                    var pageNumberList="";
                    if($('.b5-tbody').has('li').length>0){
                        $('ul.b5-tbody li').remove();
                        pageNumList.result.forEach(function (item,index) {
                            // console.log(item);
                            pageNumberList=
                                '<li id='+item.uId+' lId='+item.lId+'>' +
                                '<span class="selected-delete"><input type="checkbox" name="userName"></span>'+
                                '<span id="beforeId" title='+item.loginName.loginName+'>'+item.loginName.loginName+'</span>'+
                                '<span id="beforeName" title='+item.uName+'>'+item.uName+'</span>'+
                                '<span id="beforePhone" title='+item.uPhone+'>'+item.uPhone+'</span>'+
                                '<span id="beforeAddress" title='+(item.companyName==null?'':(item.companyName.name))+'>'+(item.companyName==null?'':(item.companyName.name))+'</span>'+
                                '<span id="beforeTime" title='+item.uCreateTime+'>'+item.uCreateTime+'</span>'+
                                '<span class="b5-tbodyEidit"><span class="exit">编辑</span><span class="mangerLimit">设置角色</span><span class="b5delete">删除</span></span>'+
                                '</li>';
                            $('ul.b5-tbody').append(pageNumberList);
                        });
                    }else{
                        pageNumList.result.forEach(function (item,index) {
                            console.log(item);
                            pageNumberList=
                                '<li id='+item.uId+' lId='+item.lId+'>' +
                                '<span class="selected-delete"><input type="checkbox" name="userName"></span>'+
                                '<span id="beforeId" title='+item.loginName.loginName+'>'+item.loginName.loginName+'</span>'+
                                '<span id="beforeName" title='+item.uName+'>'+item.uName+'</span>'+
                                '<span id="beforePhone" title='+item.uPhone+'>'+item.uPhone+'</span>'+
                                '<span id="beforeAddress" title='+(item.companyName==null?'':(item.companyName.name))+'>'+(item.companyName==null?'':(item.companyName.name))+'</span>'+
                                '<span id="beforeTime" title='+item.uCreateTime+'>'+item.uCreateTime+'</span>'+
                                '<span class="b5-tbodyEidit"><span class="exit">编辑</span><span class="mangerLimit">设置角色</span><span class="b5delete">删除</span></span>'+
                                '</li>';
                            $('ul.b5-tbody').append(pageNumberList);
                        });
                    }
                }
                else if(pageNumList.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(pageNumList.code == 20006){
                    toastr.error("用户名不存在")
                }else if(pageNumList.code ==20004){
                    toastr.error('数据处理失败')
                }else if(pageNumList.code==20005){
                    $('ul.b5-tbody li').remove();
                    toastr.error('暂无数据')
                }else if(pageNumList.code==20014){
                    toastr.error('该信息已存在')
                }else if(pageNumList.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(pageNumList.code==20009){
                    toastr.error('过期操作')
                }
            },
            error:function () {
            }
        })
    }
    //搜索总数
    function mangerSearchCount(curr){
        $.ajax({
            type:'POST',
            url:myUrl+'user/selectCount',
            data:{loginId:eId,token:eIdToken,condition:$('#mangerSearch').val()},
            success:function(selectCount){
                // console.log(selectCount);
                if(selectCount.code==0){
                    pagecoung =Math.ceil(selectCount.result/15);
                    $('.b5-tbody').attr('selectId',pagecoung);
                    laypage({
                        cont: 'mangerPage',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        pages:pagecoung,//通过后台拿到的总页数pages
                        curr: curr||1, //当前页
                        skip: true, //是否开启跳页
                        skin: '#00A63C',//皮肤
                        groups: 5, //连续显示分页数
                        jump: function(obj, first){ //触发分页后的回调
                            if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                pageSearch=obj.curr;
                                // console.log(obj.curr);
                                mangerSearch(obj.curr);
                            }
                        }
                    })
                }
                else if(selectCount.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(selectCount.code == 20006){
                    toastr.error("用户名不存在")
                }else if(selectCount.code ==20004){
                    toastr.error('数据处理失败')
                }else if(selectCount.code==20005){
                    toastr.error('暂无数据')
                }else if(selectCount.code==20014){
                    toastr.error('该信息已存在')
                }else if(selectCount.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(selectCount.code==20009){
                    toastr.error('过期操作')
                }
            }
        })
    }
    //用户搜索func
    function mangerSearch(){
        $.ajax({
            type:'POST',
            url:myUrl+'user/likeSelectUser',
            data:{loginId:eId,token:eIdToken,pageNum:pageSearch ||1,condition:$('#mangerSearch').val()},
            success:function(mangerSeach){
                $('.b5-tbody li').remove();
                if(mangerSeach.code == 0){
                    var pageNumberList="";
                    mangerSeach.result.forEach(function(item,index){
                        // console.log(item);
                        pageNumberList=
                            '<li id='+item.uId+' lId='+item.lId+'>' +
                            '<span class="selected-delete"><input type="checkbox" name="userName"></span>'+
                            '<span id="beforeId" title='+item.loginName.loginName+'>'+item.loginName.loginName+'</span>'+
                            '<span id="beforeName" title='+item.uName+'>'+item.uName+'</span>'+
                            '<span id="beforePhone" title='+item.uPhone+'>'+item.uPhone+'</span>'+
                            '<span id="beforeAddress" title='+(item.companyName==null?'':(item.companyName.name))+'>'+(item.companyName==null?'':(item.companyName.name))+'</span>'+
                            '<span id="beforeTime" title='+item.uCreateTime+'>'+item.uCreateTime+'</span>'+
                            '<span class="b5-tbodyEidit"><span class="exit">编辑</span><span class="mangerLimit">设置角色</span><span class="b5delete">删除</span></span>'+
                            '</li>';
                        $('ul.b5-tbody').append(pageNumberList);
                    });
                }
                else if(mangerSeach.code == 20002){
                    toastr.error('账户或密码错误')
                }else if(mangerSeach.code == 20006){
                    toastr.error("用户名不存在")
                }else if(mangerSeach.code ==20004){
                    toastr.error('数据处理失败')
                }else if(mangerSeach.code==20005){
                    toastr.error('暂无数据')
                }else if(mangerSeach.code==20014){
                    toastr.error('该信息已存在')
                }else if(mangerSeach.code==20012){
                    toastr.error('配置参数名称已存在')
                }else if(mangerSeach.code==20009){
                    toastr.error('过期操作')
                }
            }
        });
    }
    // // 分页展示
    // $('.zxf_pagediv2').on('click','a',function(){
    //     pageNum= $(this).html();
    //     if($('.b5-right span').hasClass('unitSearch')){
    //         mangerFenye();
    //     }else{
    //         $('.b5-tbody li').remove();
    //         pageSearch=$('.zxf_pagediv2').children('.nextpage').html();
    //         mangerSearch()
    //     }
    // });
    // //分页确定按钮
    // $('.zxf_pagediv2').on('click','.zxfokbtn',function(){
    //     pageNum=$('.zxf_pagediv2 .zxfinput').val();
    //     if(pageNum>pagecoung){
    //         $('.zxf_pagediv2 .zxfinput').val(1);
    //         return;
    //     }
    //     if($('.b5-right span').hasClass('unitSearch')){
    //         mangerFenye();
    //     }else{
    //         $('.b5-tbody li').remove();
    //         pageSearch=$('.zxf_pagediv2').children('.nextpage').html();
    //         mangerSearch();
    //     }
    // });
    //搜索用户
    $('.b5-right').on('click','span',function(){
        var inputVal=$('#mangerSearch').val();
        if($('#mangerSearch').val() !== ''){
            if($(this).hasClass('unitSearch')){
                $(this).removeClass('unitSearch');
                $(this).addClass('unitBack');
                mangerSearchCount();
                mangerSearch();
            }else{
                $(this).addClass('unitSearch');
                $(this).removeClass('unitBack');
                $('#mangerSearch').val('');
                $('.b5-tbody li').remove();
                $('.Manger').trigger('click');
            }
        }else{
            toastr.error('请输入搜索内容!')
        }
    });
    //用户权限设置
    $(document).on('click','.b5-tbody span .mangerLimit',function(){
        var activeId=$(this).parents('li').attr('lId');
        $('.mangerRoleSubmit').attr('lId',activeId);
        $('.mangerRole').css('display','block');
        $('#popLayer').css('display','block');
        $('.mangerRole-header span img').click(function(){
            $('.mangerRole').css('display','none');
            $('#popLayer').css('display','none');
            $('.mangerRole-content ul li').remove();
        });
        $('#mangerUser').text($(this).parent('span').siblings('#beforeId').html()); //页面动态取值
        $.ajax({
            type:'POST',
            url:myUrl+'user/getRoleUseInfo',
            data:{loginId:eId,token:eIdToken,activeId:activeId},
            success:function(limit){
                // console.log(limit)
                if(limit.code==0){
                    var list='';
                    var allId=[];
                    var useId=[];
                    for(var i=0;i<limit.result.allrole.length;i++){
                        allId.push(limit.result.allrole[i]);
                    }
                    // for(var i in limit.result.userole){
                    //     useId.push(limit.result.userole[i]);
                    // }
                    for(var i=0;i<limit.result.userole.length;i++){
                        useId.push(limit.result.userole[i]);
                    }
                    // console.log(useId);
                    Array.prototype.indexOf = function(val) {
                        for (var i = 0; i < this.length; i++) {
                            if (this[i] == val) return i;
                        }
                        return -1;
                    };
                    Array.prototype.remove = function(val) {
                        var index = this.indexOf(val);
                        if (index > -1) {
                            this.splice(index, 1);
                        }
                    };
                for(var i=0;i<useId.length; i++){
                for(var j=0;j<allId.length;j++){
                if(allId[j].id==useId[i].id){
                                // console.log(allId[j]);  //重复
                                allId.remove(allId[j]);
               }
            }
                    }
                    if($('.mangerRole-content ul').length>0){
                        $('.mangerRole-content ul li').remove();
                        //勾选数据
                        useId.forEach(function(item,index){
                            list='<li id='+item.id+'><img class="hasChoose">'+item.name+'</li>';
                            $('.mangerRole-content ul').append(list);
                        });
                        //未勾选数据
                        allId.forEach(function(item,index){
                            list='<li id='+item.id+'><img class="hasNoChoose">'+item.name+'</li>';
                            $('.mangerRole-content ul').append(list);
                            //移除重复
                        });
                    }else{
                        //勾选数据
                        useId.forEach(function(item,index){
                            list='<li id='+item.id+'><img class="hasChoose">'+item.name+'</li>';
                            $('.mangerRole-content ul').append(list);
                        });
                        //未勾选数据
                        allId.forEach(function(item,index){
                            list='<li id='+item.id+'><img class="hasNoChoose">'+item.name+'</li>';
                            $('.mangerRole-content ul').append(list);
                            //移除重复
                        });
                    }
                    // for(var j=0;j<limit.result.allrole.length;j++){
                    //     for(var i=0;i<limit.result.userole.length;i++){
                    //         str=limit.result.userole[i].id;
                    //         if(limit.result.allrole[j].id==str){
                    //             console.log(111)
                    //             list='<li id='+limit.result.allrole[j].id+'><img src="images/choose.png">'+limit.result.allrole[j].name+'</li>';
                    //             // $('.mangerRole-content ul').append(list)
                    //             // console.log(limit.result.allrole[i].id)
                    //         }
                    //         else{
                    //             console.log(222)
                    //             list='<li id='+limit.result.allrole[j].id+'><img src="images/unchoose.png">'+limit.result.allrole[j].name+'</li>';
                    //             // $('.mangerRole-content ul').append(list)
                    //             //console.log(limit.result.allrole[i].id)
                    //         }
                    //     }
                    //     $('.mangerRole-content ul').append(list)
                    // }
                    // var list='';
                    // limit.result.userole.forEach(function(item,index){
                    //     str.push(item)
                    // });
                    // limit.result.allrole.forEach(function(item,index){
                    //     listArr.push(item)
                    //     // $('.mangerRole-content ul').append(list)
                    //     if(listArr.indexOf(str)){
                    //         list='<li id='+item.id+'><img src="images/choose.png">'+item.name+'</li>';
                    //         $('.mangerRole-content ul').append(list)
                    //     }else{
                    //         list='<li id='+item.id+'><img src="images/unchoose.png">'+item.name+'</li>';
                    //         $('.mangerRole-content ul').append(list)
                    //     }
                    // })
                    // limit.result.allrole.forEach(function(item1,index){
                    //     listArr=item1.id;
                    //     var list='';
                    //     limit.result.userole.forEach(function(item,index){
                    //         if(item.id==listArr){
                    //             list='<li id='+item.id+'><img src="images/choose.png">'+item.name+'</li>';
                    //             // $('.mangerRole-content ul').append(list)
                    //         }else{
                    //             list='<li id='+item.id+'><img src="images/unchoose.png">'+item.name+'</li>';
                    //             // $('.mangerRole-content ul').append(list)
                    //         }
                    //         $('.mangerRole-content ul').append(list)
                    //     })
                    // });

                }else if(limit.code==20005){
                    toastr.error('暂无数据')
                }else if(limit.code==20004){
                    toastr.err('请求数据失败')
                }
            }
        })
    });
    //用户权限设置
    $(document).on('click','.mangerRole-content ul li img',function(){
        var chooseId=$(this).parent('li').attr('id');
        if($(this).hasClass('hasNoChoose')){
            $(this).removeClass('hasNoChoose');
            $(this).addClass('hasChoose');
        }else{
            $(this).removeClass('hasChoose');
            $(this).addClass('hasNoChoose');
        }
    });
    $('.mangerRoleSubmit').click(function(){
        $('.mangerRole').css('display','none');
        $('#popLayer').css('display','none');
        var chooseArr=[];
        $('.mangerRole-content ul li').each(function(index,item){
            if($(this).children('img').hasClass('hasChoose')){
                chooseArr.push($(this).attr('id'));
            }
        });
        var activeId=$('.mangerRoleSubmit').attr('lId');
        var chooseArrJson=JSON.stringify(chooseArr);
        $.ajax({
            type:'POST',
            url:myUrl+'user/realtionUserAndRole',
            data:{loginId:eId,token:eIdToken,actionLoginId:activeId,roleIdJons:chooseArrJson},
            success:function(user){
                if(user.code==0){
                    toastr.success('设置成功')
                }else{
                    toastr.error('设置失败')
                }
            }
        })
    })
    //编辑请求
    var thisId;
    $(document).on('click','.b5-tbody span .exit',function(){
        $(".b5Exit").css("display","block");
        $('#popLayer').css('display','block');
        thisId=$(this).parents("li").attr("id");
        // console.log(thisId);
        var val1=$(this).parents("li").children("span").eq(1);
        var val2=$(this).parents("li").children("span").eq(2);
        var val3=$(this).parents("li").children("span").eq(3);
        var val4=$(this).parents("li").children("span").eq(4);
        // console.log(val4.html());
        $("#userId").attr("value",val1.html());
        $("#userName").attr("value",val2.html());
        $("#userPhone").attr("value",val3.html());
        $(".b51SelectValue").text(val4.html());
        $.ajax({
            type:"POST",
            url:myUrl+"company/selectName",
            data:{pageNum:1,loginId:eId,token:eIdToken},
            success:function(b6Select){
                console.log(b6Select);
                if(b6Select.code == 0){
                    $('.bSixName').val('');
                    var selectedList=[];
                    b6Select.result.forEach(function (item,index) {
                        selectedList=
                            '<li opId='+item.id+'>'+item.name+'</li>';
                        $(".b51selBox").append(selectedList);
                        $(".b51selBox").val(val4.html());
                        $('.b51SelectValue').attr('opId',item.id)
                        //移除重复
                        //编辑框
                        var adds=$(".b51selBox li");
                        adds.each(function(index,item){
                            if(index>b6Select.result.length-1){
                                adds[index].remove();
                            }
                        })
                    })
                }
            },
            error:function(){
            }
        })
    });
    $('.b51SelectEd .b51SelectValue').click(function () {
        if($('.b51selBox').css("display")=="none"){
            $('.b51selBox').slideDown("fast");
        }else{
            $('.b51selBox').slideUp("fast");
        }
    });
    $(document).on('click','.b51SelectEd li',function(){
        var txt = $(this).text();
        var opid=$(this).attr('opid');
        $('.b51SelectValue').html(txt);
        $('.b51SelectValue').attr('opid',opid);
        $('.b51selBox').hide()
    });
    //保存
    $("#b51Save").on("click",function(){
        var afterVal2=$("#userName").val();
        var afterVal3=$("#userPhone").val();
        var afterVal4=$(".b51selBox").val();
        var addId=$(".b51SelectValue").attr("opid");
        // console.log(afterVal2);
        // console.log(afterVal3);
        //后台传值
        var formData = new FormData();
        formData.append("loginId",eId);
        formData.append("token",eIdToken);
        formData.append("userId",thisId);
        formData.append("companyId",addId);
        var userJson={
            "realName":afterVal2,
            "phone":afterVal3
        }
        userJson=JSON.stringify(userJson);
        formData.append("userJson",userJson);
        //!(/^1[34578]\d{9}$/.test(phone)
        //var testPhone=/^1[3|4|5|7|8][0-9]{9}$/.test(afterVal3);
        var testPhone=/^1[0-9]{10}$/.test(afterVal3);
        if($('#userName').val().length==0){
            toastr.error('内容不得为空！');
            return false;
        }else if($('#userName').val().length>10){
            toastr.error('账户姓名长度不能超过10！');
            return false;
        }else if($('#userPhone').val().length>11){
            toastr.error('联系方式长度不能超过11！');
            return false;
        }else if(!testPhone){
            toastr.error('联系方式格式不对，请重新输入！');
            return false;
        }else if($('.b51SelectValue').html()=='请选择'){
            toastr.error('请选择关联单位!');
            return false;
        }
        else{
            $(".b5Exit").css("display","none");
            $('#popLayer').css('display','none');
            $.ajax({
                url:myUrl+"user/updateByUserId",
                data:formData,
                type:'POST',
                dataType:'json',
                processData: false,
                contentType: false,
                success:function (data) {
                    console.log(data);
                    if(data.code==0){
                        $(".b5list").remove();
                        mangerWin();
                    }
                    // else if(data.code==10001||data.code==10002||data.code==10003){
                    // 	toastr.error('身份过期，请重新登录！');
                    // }else{
                    // 	toastr.error("请求错误！");
                    // }
                },
                error:function(data){
                    toastr.error("修改失败！");
                }
            })
        }
    })
    //close
    $(".b51Close").on("click",function(){
        $(".b5Exit").css("display","none");
        $('#popLayer').css('display','none');
    });
    //删除
    $(document).on('click','.b5-tbody span .b5delete',function(){
        $(this).parents("li").remove();
        var userId=JSON.stringify(new Array($(this).parents("li").attr("id")));
        $.ajax({
            type:"POST",
            // data:$.param({userId:userId}),
            data:{userIdJson:userId,loginId:eId,token:eIdToken},
            url:myUrl+"user/updateUserDeleteInfo", //后台提供的删除接口
            dataType:'json',
            success:function(data){
                // console.log(data);
                if(data.code == 0){
                    toastr.success('删除成功！');
                }
                // else {
                // 	toastr.error('删除失败，请稍后重试！');
                // 	return false;
                // }
            },
            error:function(data){

            }
        })
    });
});
//*递归实现获取无级树数据并生成DOM结构*/
var str = "";
var forTree = function (o) {
    var urlstr = "";
    var urlst = "";
    var urlstrt = "";
    var urlstt = "";
    for(var j=0;j< o.length;j++){
        urlst=
            '<div class="bThreeOneFather"  pid='+o[j].id+' father='+o[j].father+'>';  //父级
        urlstt=
            '<div class="bThreeOneChildren"  pid='+o[j].id+' father='+o[j].father+'>';  //子级
        urlstr=
            '<li class="bThreeOneList1">' +(o[j].father==0?(j+1):"")+ '</li>' +
            '<li class="bThreeOneList2">' +
            '<span class="downg"><img src="images/downr.png"></span>'+
            '<span class="upr"><img src="images/upr.png"></span> </li>' +
            '<li class="bThreeOneList12">' +
            '<span class="bThreeOneImg"></span>' +
            '<span class="bThreeOneList11" title='+o[j].pname+'>' + o[j].pname + '</span>' +
            '</li>' +
            '<li class="bThreeOneList4" title='+o[j].pstime+'>' + o[j].pstime + '</li>' +
            '<li class="bThreeOneList13" title='+o[j].petime+'>' + o[j].petime + '</li>' +
            '<li class="bThreeOneList14" title='+ o[j].astime+'>' + o[j].astime + '</li>' +
            '<li class="bThreeOneList15" title='+o[j].aetime+'>' + o[j].aetime + '</li>' +
            '<li class="bThreeOneList5">'  + '</li>' +
            "<li class='bThreeOneList6'>添加</li>" ;
            // '<li class="bThreeOneList9">编辑</li>' +
            // '<li class="bThreeOneList10">删除</li>';
        if(!$.isEmptyObject(o[j].childs)){    //父级
            urlstrt=
                '<li class="bThreeOneList9" style="display: none">编辑</li>' +
                '<li class="bThreeOneList10">删除</li>'+
                '<div style="clear: both"></div><ul>';   //子级携带，父级不携带
        }else{
            urlstrt=
                '<li class="bThreeOneList9">编辑</li>' +
                '<li class="bThreeOneList10">删除</li>'+
                '<li class="bThreeOneList7">构建</li><div style="clear: both"></div><ul>';   //子级携带，父级不携带
        }
        str+=urlst+urlstr+urlstrt;
        if(!$.isEmptyObject(o[j].childs)){
            forTree(o[j].childs);
        }
        str += "</ul></div>";
    }
    return str;
}
// var strf = "";
// var forTree = function (o,isTop1) {
//     // strf="";
//     var isTop=isTop1;
//     var urlstr = "";
//     //  var aetimestr="";
//     for(var j=0;j< o.length;j++){
//         urlstr=getbTree(j+1,o[j],isTop);
//         // urlstr=getTreeList(j+1,o[j],isTop);
//         strf+=urlstr;
//         if(!$.isEmptyObject(o[j].childs)){
//             forTree(o[j].childs,false);
//         }
//         // console.log(str);
//     }
//     return strf;
// };
//
// function getbTree(i,obj,isTop1) {
//     var str = "";
//     var commonstr =
//         '<li class="bThreeOneList2">' +
//         '<span class="downg"><img src="images/downr.png"></span>'+
//         '<span class="upr"><img src="images/upr.png"></span> ' +
//         '<li class="bThreeOneList12">' +
//         '<span class="bThreeOneImg"></span>' +
//         '<span class="bThreeOneList11">' + obj.pname + '</span>' +
//         '</li>' +
//         '<li class="bThreeOneList4">' + obj.pstime + '</li>' +
//         '<li class="bThreeOneList13">' + obj.petime + '</li>' +
//         '<li class="bThreeOneList14">' + obj.astime + '</li>' +
//         '<li class="bThreeOneList15">' + obj.aetime + '</li>' +
//         '<li class="bThreeOneList5">'  + '</li>' +
//         "<li class='bThreeOneList6'>添加</li>" +
//         '<li class="bThreeOneList9">编辑</li>' +
//         '<li class="bThreeOneList10">删除</li>';
//     if (isTop1) {
//         if (!$.isEmptyObject(obj.childs)) {
//             str = '<ul class="bThreeOneFather"  pid='+obj.id+'>'+
//                 '<li class="bThreeOneList1">' + i + '</li>' +
//                 '</li>' +commonstr + '<div style="clear: both"></div></ul>';
//         } else {
//             str = '<ul class="bThreeOneFather" pid='+obj.id+'>' +
//                 '<li class="bThreeOneList1">' + i + '</li>' +
//                 '</li>' + commonstr + '<li class="bThreeOneList7">构建</li><div style="clear: both"></div></ul>'
//         }
//     } else {
//         if (!$.isEmptyObject(obj.childs)) {
//             str = '<ul class="bThreeOneFather"  pid='+obj.id+'>' +
//                 '<li class="bThreeOneList1">' + i + '</li>' +
//                 '</li>' +
//                 commonstr + '<div style="clear: both"></div></ul>';
//         } else {
//             str = '<ul class="bThreeOneChildren"  pid='+obj.id+'>' +
//                 '<li class="bThreeOneList1">' + i + '</li>' +
//                 '</li>' + commonstr + '<li class="bThreeOneList7">构建</li><div style="clear: both"></div></ul>'
//         }
//     }
//     return str;
// };
//递归-构建弹窗
var strf1 = "";
var forTree1 = function (o,nodeIPath) {
    var urlst = "";
    var urlstrt = "";
    var urlsttr='';
    // console.log(o);
    // console.log(pathname)
    for(var j=0;j< o.length;j++){
        urlst=
            '<div class="bThreeOneFather"  pid='+o[j].id+' pathname='+nodeIPath+'>' + //父级
            '<li>' +
            '<span class="bThreeOneImg"></span>';

        if(!$.isEmptyObject(o[j].childs)){   //父级
            urlstrt='<img class="hasNull">'
            urlsttr=
                '<span class="bThreeOneList11-father">' + o[j].pname + '</span></li><div style="clear: both"></div><ul>';
        }else {              //子级
            if(o[j].selectStatu==1){
                // urlstrt='<input type="radio" name="name">' ;   //换成背景为勾选状态的图片
                urlstrt='<img class="hasChoose">'
                urlsttr=
                    '<span class="bThreeOneList11">' + o[j].pname + '</span></li><div style="clear: both"></div><ul>';
            }else{
                // urlstrt='<input type="checkbox" name="name">' ;
                urlstrt='<img class="hasNoChoose">' ;
                urlsttr=
                    '<span class="bThreeOneList11">' + o[j].pname + '</span></li><div style="clear: both"></div><ul>';
            }
        }
        strf1+=urlst+urlstrt+urlsttr;
        if(!$.isEmptyObject(o[j].childs)){  //父级
            forTree1(o[j].childs);
        }
        strf1 += "</ul></div>";
    }
    return strf1;
};
//
// function getTreeList(i,obj,isTop1) {
//     var str1 = "";
//     if (isTop1) {
//         if (!$.isEmptyObject(obj.child)) {
//             str1 = '<ul class="bThreeOneFather"  pid='+obj.id+'>'+
//                 '</li>' +
//                 '<span class="bThreeOneImg"></span>'+
//                 '<span class="bThreeOneList11">' + obj.pname + '</span>' + '<div style="clear: both"></div></ul>';
//         } else {
//             str1 = '<ul class="bThreeOneFather" pid='+obj.id+'>' +
//                 '</li>' +
//                 '<span class="bThreeOneImg"></span>'+
//                 '<span class="bThreeOneList11">' + obj.pname + '</span>' + '<div style="clear: both"></div></ul>'
//         }
//     } else {
//         if (!$.isEmptyObject(obj.child)) {
//             str1 = '<ul class="bThreeOneFather"  pid='+obj.id+'>' +
//                 '</li>' +
//                 '<span class="bThreeOneImg"></span>'+
//                 '<span class="bThreeOneList11">' + obj.pname + '</span>' + '<div style="clear: both"></div></ul>';
//         } else {
//             str1 = '<ul class="bThreeOneChildren"  pid='+obj.id+'>' +
//                 '</li>' +
//                 '<span class="bThreeOneImg"></span>'+
//                 '<input type="radio" name="name">'+
//                 '<span class="bThreeOneList11">' + obj.pname + '</span>' + '<div style="clear: both"></div></ul>'
//         }
//     }
//     return str1;
// };
//UE4模型数据展示--进度展示
function mm(s){
    $.ajax({
        type:'POST',
        url:myUrl+'/model/queryModelInfo',
        data:{loginId:eId,token:eIdToken,pId:pId,modelId:s},
        success:function(uE4m){
            if($('.cSixTwoOneTaskSecond1 div').length>0){
                $('.cSixTwoOneTaskSecond1 div').remove()
            };
            if($('.cSixTwoOneTaskOne1 div').length>0){
                $('.cSixTwoOneTaskOne1 div').remove()
            }
            console.log(uE4m);
            var tableUe4mm="";
            var tableUe4mms="";
            uE4m.result.commoninfo.forEach(function(item,index) {
                console.log(item);
                console.log(item.mCode);
                tableUe4mm=
                    '<div class="taskNameDeta">几何属性</div>'+
                    '<div class="cSixTwoOneTaskLeft1" style="clear: both;">'+item.modelPropertyName+'</div>' +
                    '<div class="cSixTwoOneTaskRight1">'+item.modelPropertyValue+'</div>'+
                    '<div style="clear: both"></div>';
                $('.cSixTwoOneTaskSecond1').append(tableUe4mm);
            });
            uE4m.result.otherinfo.forEach(function(item,index) {
                var state=""
                if(item.mStatu==1){
                    state="施工中"
                }else if(item.mStatu==2){
                    state="准时完工"
                }else if(item.mStatu==3){
                    state="临时完工"
                }else{
                    state="未开工"
                }
                console.log(item);
                tableUe4mms=
                    '<div class="taskNameDeta">非几何属性</div>'+
                    '<div class="cSixTwoOneTaskLeft1" style="clear: both;">构建名称2</div>' +
                    '<div class="cSixTwoOneTaskRight1">'+item.mCode+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft1" style="clear: both;">计划开始时间</div>' +
                    '<div class="cSixTwoOneTaskRight1">'+item.mpetime+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft1" style="clear: both;">计划结束时间</div>' +
                    '<div class="cSixTwoOneTaskRight1">'+item.mpstime+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft1" style="clear: both;">实际开始时间</div>' +
                    '<div class="cSixTwoOneTaskRight1">'+item.maetime+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft1" style="clear: both;">实际结束时间</div>' +
                    '<div class="cSixTwoOneTaskRight1">'+item.mastime+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft1" style="clear: both;">施工状态</div>' +
                    '<div class="cSixTwoOneTaskRight1">'+state+'</div>'+
                    '<div style="clear: both"></div>';
                $('.cSixTwoOneTaskOne1').append(tableUe4mms);
            });
            if($('.cSixTwoOneTaskSecond1 div').length>0){
                $('.cSixTwoOneTaskOne div:eq(17)').remove()
            }
        }
    })
};
//UE4模型数据展示--物料使用
function modelUe4(c){
    // alert(c);
    //调用src/modelJS/index.js里的meshcode
    $.ajax({
        type:'POST',
        url:myUrl+'/material/lookuseMaterialInfo',
        data:{loginId:eId,token:eIdToken,pId:pId,modelId:c},
        success:function (Ue4) {
            console.log(Ue4);
            console.log(Ue4.mBrand);
            var tableUe4="";
            Ue4.result.forEach(function( item,index){
                console.log(item);
                console.log(item.mumaterial.mBrand);
                console.log(item.muunit.uName);
                // tableUe4=$(".cSixTwoOneContentMessS ul").clone();
                // tableUe4.removeAttr('hidden');
                // tableUe4.attr('muid',item.muid);
                // tableUe4.children('li').eq(0).html(item.mumaterial.mBrand);
                tableUe4=
                    '<ul muId='+item.muid+' mid='+item.mumaterial.mId+'>'+
                    '<li>'+item.mumaterial.mclass+'</li>'+
                    '<li>'+item.mumaterial.mType+'</li>'+
                    '<li>'+item.mumaterial.mBrand+'</li>'+
                    '<li>'+item.mumaterial.mSeries+'</li>'+
                    '<li uid='+item.muunit.uid+'>'+item.muuse+item.muunit.uName+'</li>'+
                    '<li style="color: blue;cursor: pointer">删除</li>'+
                    '</ul>'+
                    '<div style="clear: both"></div>';
                $(".cSixTwoOneContentMess").append(tableUe4);


            });
            if($('.cSixTwoOneContentMess ul').length>0){
                $('.cSixTwoOneContentMess ul:gt(2)').remove();
            }
        },
        error:function () {

        }
    });
    $.ajax({
        type:'POST',
        url:myUrl+'/model/queryModelInfo',
        data:{loginId:eId,token:eIdToken,pId:pId,modelId:c},
        success:function(uE4m){
            if($('.cSixTwoOneTaskSecond div').length>0){
                $('.cSixTwoOneTaskSecond div').remove()
            }
            if($('.cSixTwoOneTaskOne div').length>0){
                $('.cSixTwoOneTaskOne div').remove()
            }
            console.log(uE4m);
            var tableUe4mm="";
            var tableUe4mms="";
            uE4m.result.commoninfo.forEach(function(item,index) {
                console.log(item);
                console.log(item.mCode);
                tableUe4mm=
                    '<div class="taskNameDeta">几何属性</div>'+
                    '<div class="cSixTwoOneTaskLeft" style="clear: both;">'+item.modelPropertyName+'</div>' +
                    '<div class="cSixTwoOneTaskRight">'+item.modelPropertyValue+'</div>'+
                    '<div style="clear: both"></div>';
                $('.cSixTwoOneTaskSecond').append(tableUe4mm);
            });
            uE4m.result.otherinfo.forEach(function(item,index) {
                var state="";
                if(item.mStatu==1){
                    state="施工中"
                }else if(item.mStatu==2){
                    state="准时完工"
                }else if(item.mStatu==3){
                    state="临时完工"
                }else{
                    state="未开工"
                }
                console.log(item);
                tableUe4mms=
                    '<div class="taskNameDeta">非几何属性</div>'+
                    '<div class="cSixTwoOneTaskLeft" style="clear: both;">构建名称2</div>' +
                    '<div class="cSixTwoOneTaskRight">'+item.mCode+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft" style="clear: both;">计划开始时间</div>' +
                    '<div class="cSixTwoOneTaskRight">'+item.mpetime+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft" style="clear: both;">计划结束时间</div>' +
                    '<div class="cSixTwoOneTaskRight">'+item.mpstime+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft" style="clear: both;">实际开始时间</div>' +
                    '<div class="cSixTwoOneTaskRight">'+item.maetime+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft" style="clear: both;">实际结束时间</div>' +
                    '<div class="cSixTwoOneTaskRight">'+item.mastime+'</div>'+
                    '<div style="clear: both"></div>'+
                    '<div class="cSixTwoOneTaskLeft" style="clear: both;">施工状态</div>' +
                    '<div class="cSixTwoOneTaskRight">'+state+'</div>'+
                    '<div style="clear: both"></div>';
                $('.cSixTwoOneTaskOne').append(tableUe4mms);
            });

        }
    })
};
//退出
$(function(){
    $("#navLoginOut").on("click",function(){
        $.ajax({
            type:'POST',
            url:myUrl+'account/userlogout',
            data:{loginId:eId,token:eIdToken},
            success:function(data){
                console.log(data);
                if(data.code==0){
                    window.location.href='enter.html';
                    //清除
                    localStorage.removeItem("loginId");
                    localStorage.removeItem("token");
                }else if(data.code==10001||data.code==10002||data.code==10003){
                    toastr.warning('身份过期，请重新登录!');
                    window.location.href='enter.html';
                    //清除
                    localStorage.removeItem("loginId");
                    localStorage.removeItem("token");
                }else{
                    toastr.error("请求错误！");
                }
            },
            error:function () {

            }
        })
    })
})

