/**
 * Created by Administrator on 2017/4/21.
 */
// $(document).ready(function () {
//     //模拟
//     $(".bThreeOneLeft>ul>li").children('a.inactive.actives').trigger("click");
// });
 // proMenu
 $(function(){
    //菜单操作
    $(".navImg img").click(function(){
        if($(".bThreeOneLeft").css('display')=='none'){
            $(".bThreeOneLeft").css("display","block");
            $(".proMenu").css("margin-left","13.8%");
            $(".oneMainContent").css("margin-left","13.8%").css("width","86%");
        }else{
            $(".proMenu").css("margin-left","0px");
            $(".bThreeOneLeft").css("display","none");
            $(".oneMainContent").css("margin-left","0px").css("width","100%");
        }
    });
    //导航切换
    $(".bThreeOneLeft>ul").on("click","a.inactive",function(){
        //$(this).addClass("actives").siblings().removeClass("actives");
        $(".bThreeOneLeft>ul>li>a").removeClass("actives");
        $(this).addClass("actives");
        var thisVal=$(this).html();
        $(".nav2").remove();
        $(".nav3").remove();
        var $innav=$('<span class="nav2"><span class="iconl"><img src="images/ioc_l.png"></span>'+
                '<span class="nav2Val">'+thisVal+'</span></span>');
        $(".menuCenter").append($innav);
        //其他的隐藏
        //$(".bThreeOneLeft>ul>li>a>ul").slideUp();
       //展示点击的
        //$(this).children("ul").stop().slideDown();
    });
    $(".bThreeOneLeft>ul").on("click",".ina",function(){
        $(".ina").removeClass("active");
        $(this).addClass("active");
        var thisVal=$(this).html();
        $(".nav3").remove();
        var $innav=$('<span class="nav3"><span class="iconl"><img src="images/ioc_l.png"></span>'+
                '<span>'+thisVal+'</span></span>');
        $(".menuCenter").append($innav);
    })
 });
// header头部导航栏
$(function(){
    $('.borderbottomOne').click(function(){
        $('.project-manage').css('display','none');
        $('.bFour').css('display','block');
        $('.borderbottom').css('display','none');
        $('.bNine').css('display','none');
        $('.b6').css('display','none');
        $('.b7').css('display','none');
        $('.b8').css('display','none');
        /*wwh加账户设置隐藏*/
        $(".container-myAccount-new").css('display','none');
    });
});
//返回按钮
$(function () {
    $('.bThreeOneBacker').click(function () {
        $('.bThreeOneContent').css('display','block');
        $('.bThreeOneRight').css('display','block');
        $('.bThreeOneLeft').css('display','block');
        $('.cSixTwoOne').css('position','absolute').css('top','-9999px').css('left','-9999px');
        $('.cThree').css('display','none');
        $('.cOne').css('display','none');
        // $('.cThreeShow').modelCSS('display','none');
        // $('.cOneShow').modelCSS('display','none');
        $('.cFive').css('display','none');
        // $('.cSixShow').css('display','none');
        $('.cSixOne').css('display','none');
        $('.cSixThree').css('display','none');
        $('.cSix').css('display','none');
        $(".container-myAccount-new").css('display','none');

    })
});
//index左侧导航栏
$(function() {
    $('.bThreeOneLeft .inactive').click(function(){
        $('.inactive').parents("li").removeClass("adBackground");
        $(this).parents("li").addClass("adBackground");
        //$(this).css("background-color","red");
        if($(this).siblings('ul').css('display')=='none'){
            $(this).parent('li').siblings('li').removeClass('inactives');
            $(this).addClass('inactives');
            $(this).siblings('ul').slideDown(100).children('li');
            $(this).parent('li').siblings('li').children('ul').slideUp(100);
            $(this).parent('li').siblings('li').children('a').removeClass('inactives');
        }else{
            //控制自身变成+号
            $(this).removeClass('inactives');
            //控制自身菜单下子菜单隐藏
            $(this).siblings('ul').slideUp(100);
            //控制自身子菜单变成+号
            $(this).siblings('ul').children('li').children('ul').parent('li').children('a').addClass('inactives');
            //控制自身菜单下子菜单隐藏
            $(this).siblings('ul').children('li').children('ul').slideUp(100);
            //控制同级菜单只保持一个是展开的（-号显示）
            $(this).siblings('ul').children('li').children('a').removeClass('inactives');
            //控制同级只展示一个，其他收缩上去
            // $(this).parent('li').siblings('li').children('ul').slideDown(100);
        }
        
    })
    //数据管理
    $(".cThreeShow").click(function(){
        $(this).parent('li').siblings('li').children('ul').slideUp(100);
        $(".ina").removeClass("active");
    })
});
//系统管理左侧导航栏
$(function() {
    $('.bNineLeft .inactive').click(function(){
        $('.inactive').parents("li").removeClass("adBackground");
        // $(this).parents("li").addClass("adBackground");
        // $(this).siblings("ul").children('li').addClass("adBackground");   //cj enter.js1970
        //$(this).css("background-color","red");
        var wwhindex = $(this).index('.inactive');
        if(wwhindex==0){
            // $(".bNineContent").show();
            $("#wlimitsRight").hide();
            $(".quanxianpeizhi a").removeClass("clickColor");
            // cjDataDictionary();
        }else if(wwhindex==1){
            // $(".bNineContent").hide();
            $("#wlimitsRight").show();
            $(".quanxianpeizhi a").addClass("clickColor");
        }
        if($(this).siblings('ul').css('display')=='none'){
            $(this).parent('li').siblings('li').removeClass('inactives');
            $(this).addClass('inactives');
            $(this).siblings('ul').slideDown(100).children('li');
            $(this).parent('li').siblings('li').children('ul').slideUp(100);
            $(this).parent('li').siblings('li').children('a').removeClass('inactives');
        }else{
            //控制自身变成+号
            $(this).removeClass('inactives');
            //控制自身菜单下子菜单隐藏
            $(this).siblings('ul').slideUp(100);
            //控制自身子菜单变成+号
            $(this).siblings('ul').children('li').children('ul').parent('li').children('a').addClass('inactives');
            //控制自身菜单下子菜单隐藏
            $(this).siblings('ul').children('li').children('ul').slideUp(100);
            //控制同级菜单只保持一个是展开的（-号显示）
            $(this).siblings('ul').children('li').children('a').removeClass('inactives');
            //控制同级只展示一个，其他收缩上去
            // $(this).parent('li').siblings('li').children('ul').slideDown(100);
        }
    })
});
// 头部右侧--编辑
// $(function(){
//     $('.bThreeOneEidit').click(function(){
//         $('.bTwoHeader').modelCSS('display','block');
//         $('#popLayer').modelCSS('display','block');
//     })
// });
// page32
// $(function(){
//     //		获取'创建进度'元素
//     var oBtn=$('.bThreeOneList6');
//     var oShow=$('.bThreeTwo');
//     var oBack=$('.bThreeTwoBack');
//     var popLayer=$('#popLayer');
//     oBtn.click(function(){
//         oShow.modelCSS('display','block');
//         $('.bThreeThree').modelCSS('display','none');
//         $('.cSixOne').modelCSS('display','none');
//         $('.bThreeOneContent').modelCSS('display','block');
//         $('.bThreeOneRight').modelCSS('display','block');
//         $('.cSixThree').modelCSS('display','none');
//         popLayer.modelCSS('display','block');
//     });
// //    点击发送，弹窗消失
//     oBack.click(function(){
//         oShow.modelCSS('display','none');
//         popLayer.modelCSS('display','none')
//     });
// });

//page 33
$(function () {
//    获取'显示进度'元素
    var oBt=$('.bThreeOneList7');
    var oSho=$('.bThreeThree');
    var popLayer=$('#popLayer');
    oBt.click(function(){
        oSho.css('display','block');
        $('.bThreeTwo').css('display','none');
        $('.cSixOne').css('display','none');
        $('.cSixThree').css('display','none');
        $('.bThreeOneContent').css('display','block');
        $('.bThreeOneRight').css('display','block');
        popLayer.css('display','block');
    });
    $('.bThreeThreeBack').click(function(){
        oSho.css('display','none');
        popLayer.css('display','none')
    });
});

// //page34
// $(function () {
// //    获取'二级弹窗'元素
//     var oBt=$('.bThreeThreeAdd');
//     var oSho=$('.zTreeDemoBackground');
//     var popLayer=$('#popLayer');
//     oBt.click(function(){
//         // oSho.css('display','block').css('position','absolute').css('left','1%').css('top','1%');
//         // popLayer.css('display','block');
//         // console.log(11)
//         oSho.css('display','block')
//     });
//     $('.zTreeDemoBackground img').click(function(){
//         oSho.css('display','none');
//         // popLayer.css('display','block');
//     });
// });

//二级弹窗下拉菜单,点击空白消失
// $(function(){
//     $(".bThreeFourPlus").click(function(event){
//         var e=window.event || event;
//         if(e.stopPropagation){
//             e.stopPropagation();
//         }else{
//             e.cancelBubble = true;
//         }
//         $(".bThreeFourList").show();
//     });
//     $(".bThreeFourList").click(function(event){
//         var e=window.event || event;
//         if(e.stopPropagation){
//             e.stopPropagation();
//         }else{
//             e.cancelBubble = true;
//         }
//     });
//     document.onclick = function(){
//         $(".bThreeFourList").hide();
//     };
// });
$(function () {
    $('.bThreeFourPlus').click(function () {
        if($('.bThreeFourList').css('display')=='none'){
            $('.bThreeFourList').css('display','block');
        }else{
            $('.bThreeFourList').css('display','none');
        }
    })
});

//page-1-c611
$(function () {
//    获取'二级弹窗'元素
    var oBt=$('.cSixOneNavFir');
    var oSho=$('.c611addBox');
    var oBack=$('.bac');
    var popLayer=$('#popLayer');
    oBt.click(function(){
        oSho.css('display','block').css('position','absolute').css('left','15%').css('top','0%');
        popLayer.css('display','block');
        // console.log(11)
    });
    oBack.click(function(){
        oSho.css('display','none');
        popLayer.css('display','none')
    });
});
//page-1-c61
$(function () {
//    获取'物料管理'元素
    var oBt=$('.bSixOneClick');
    var oSho=$('.cSixOne');
    oBt.click(function(){
        oSho.css('display','block');
        $('.cSixOneHeaderOne').css('background-color','#E6E6E6');
        $('.bThreeOneContent').css('display','none');
        $('.bThreeOneRight').css('display','none');
        $('.cSixThree').css('display','none');
        $('.cFive').css('display','none');
        $('.cSix').css('display','none');
        $('.cOne').css('display','none');
        $('.cThree').css('display','none');
        $('.cFour').css('display','none');
        // $('.cSixTwoOne').modelCSS('position','absolute').modelCSS('top','5%').modelCSS('left','0');
        $('.cSixOneHeaderTwo').css('background-color','white');
        //$(".cSixOneHeaderOne").trigger("click");
        
    });
});

//page-1-c621
$(function () {
//    获取'物料管理'元素
    var oBt=$('.cSixOneHeaderOne');
    var oSho=$('.cSixOne');
    oBt.click(function(){
        oSho.css('display','block');
        $('.cSixOneHeaderTwo').css('background-color','white');
        $('.cSixOneHeaderOne').css('background-color','#E6E6E6');
        $('.bThreeOneContent').css('display','none');
        $('.bThreeOneRight').css('display','none');
        $('.cSixTwoOne').css('position','absolute').css('top','-9999px').css('left','-9999px');
        $('.cSixThree').css('display','none');
        $('.cOne').css('display','none');
        $('.cThree').css('display','none');
        $('.cFive').css('display','none');
        $('.cSix').css('display','none');
        // console.log(11)
    });
});
$(function () {
//    获取'物料入库'元素
    var oBt=$('.cSixOneHeaderTwo');
    var oSho=$('.cSixTwoOne');
    oBt.click(function(){
        oSho.css('position','absolute').css('margin-top','0.1%').css('left','0').css('top','14%');
        $('.cSixOneHeaderOne').css('background-color','white');
        $('.cSixOneHeaderTwo').css('background-color','#E6E6E6');
        $('.bThreeOneContent').css('display','none');
        $('.bThreeOneRight').css('display','none');
        $('.cSixOne').css('display','none');
        $('.cSixThree').css('display','none');
        $('.cOne').css('display','none');
        $('.cThree').css('display','none');
        $('.cFive').css('display','none');
        $('.cSix').css('display','none');
    });
});

//page-1-c63
$(function () {
//获取'物料管理'元素
    var oBt=$('.bSixThreeClick');
    var oSho=$('.cSixThree');
    oBt.click(function(){
        oSho.css('display','block');
        $('.bThreeOneContent').css('display','none');
        $('.bThreeOneRight').css('display','none');
        $('.cSixTwoOne').css('position','absolute').css('top','-9999px').css('left','-9999px');
        $('.cSixOne').css('display','none');
        $('.cFive').css('display','none');
        $('.cSix').css('display','none');
        $('.cFour').css('display','none');
        $('.cThree').css('display','none');
        // console.log(11)
    });
});

//page-1-c631
$(function(){
    $(".cSixThreeOnePlus").click(function(event){
        var e=window.event || event;
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
        $(".cSixThreeOneList").show();
    });
    $(".cSixThreeOneList").click(function(event){
        var e=window.event || event;
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    });
    // document.onclick = function(){
    //     $(".cSixThreeOneList").hide();
    // };
});

$(function () {
//    获取'二级弹窗'元素
    var oBt=$('.cSixThreeHeaderSecond');
    var oSho=$('.cSixThreeOne');
    var oBack=$('.cSixThreeOneBack');
    var popLayer=$('#popLayer');
    oBt.click(function(){
        oSho.css('display','block').css('position','absolute').css('left','0%').css('top','-14%');
        popLayer.css('display','block');
        // console.log(11)
    });
    oBack.click(function(){
        oSho.css('display','none');
        popLayer.css('display','none')
    });
});

//page-1-b1
// $(function(){
//     $('.bOneContent').click(function(){
//         window.location.href="index.html";
//     })
// });
$(function () {
//    获取'二级弹窗'元素
    var oBt=$('.bOneLast');
    var oSho=$('.bTwoHeader');
    var oBack=$('.bTwoBack');
    var popLayer=$('#popLayer');
    oBt.click(function(){
        oSho.css('display','block').css('position','absolute').css('left','0%').css('top','8%');
        popLayer.css('display','block');
        // console.log(11)
    });
    oBack.click(function(){
        oSho.css('display','none');
        popLayer.css('display','none')
    });
});

//对话框
$(function () {
    $('.User').on("click",".Function",function () {
        if($('.borderbottom').css('display')=='none'){
            $('.borderbottom').css('display','block');
        }else{
            $('.borderbottom').css('display','none');
        }
    });
});

//page-1-b4
$(function(){
    $('.bFourOneContentFirst').click(function(){
        // console.log(11)
        $('.bFourOneContentFirst').css('color','#32CD64');
        $('.bFourOneContentFirstF').css('border-bottom','1px solid #32CD64');
        $('.bFourContentMain').css('display','block');
        $('.bFourOneInformation').css('display','none');
        $('.bFourOneContentSecond').css('color','#666');
        $('.bFourOneContentSecondS').css('border-bottom','none');
        $('.bFourOneContentThird').css('color','#666');
        $('.bFourOneContentThirdT').css('border-bottom','none');
        $('.bFourThreeList').css('display','none');
    })
});
$(function(){
    $('.bFourOneContentSecond').click(function(){
        $('.bFourOneContentSecond').css('color','#32CD64');
        $('.bFourOneContentSecondS').css('border-bottom','1px solid #32CD64');
        $('.bFourOneInformation').css('display','block');
        $('.bFourContentMain').css('display','none');
        $('.bFourOneContentFirst').css('color','#666');
        $('.bFourOneContentFirstF').css('border-bottom','none');
        $('.bFourOneContentThird').css('color','#666');
        $('.bFourOneContentThirdT').css('border-bottom','none');
        $('.bFourThreeList').css('display','none');
    })
});
$(function(){
    $('.bFourOneContentThird').click(function(){
        $('.bFourOneContentThird').css('color','#32CD64');
        $('.bFourOneContentThirdT').css('border-bottom','1px solid #32CD64');
        $('.bFourOneContentFirst').css('color','#666');
        $('.bFourOneContentFirstF').css('border-bottom','none');
        $('.bFourOneContentSecond').css('color','#666');
        $('.bFourOneContentSecondS').css('border-bottom','none');
        $('.bFourThreeList').css('display','block');
        $('.bFourContentMain').css('display','none');
        $('.bFourOneInformation').css('display','none');
        // $('.bFourContentMain').modelCSS('display','block')
    })
});
//page-1-b42
$(function(){
    /*$('.bFourOneListBlind').click(function(){
        $('.bFourTwo').css('display','block');
        $('#popLayer').css('display','block');
    });*/
    $('.bFourTwoBack').click(function(){
        $('.bFourTwo').css('display','none');
        $('#popLayer').css('display','none');
    })
});
//page-1-c1
$(function(){
    $('.cOneShow').click(function(){
        $('.cOne').css('display','block');
        $('.cThree').css('display','none');
        $('.bThreeOneContent').css('display','none');
        $('.bThreeOneRight').css('display','none');
        $('.cSixOne').css('display','none');
        $('.cSixThree').css('display','none');
        $('.cFive').css('display','none');
        $('.cSix').css('display','none');
        $('.cFour').css('display','none');
        $('.cSixTwoOne').css('position','absolute').css('top','-9999px').css('left','-9999px');
    })
});
//page-1-c2
$(function () {
   $('.cOneHeaderTwo').click(function(){
       $('.cTwo').css('display','block');
       $('#popLayer').css('display','block');
   });
    $('.cTwoBack').click(function(){
        $('.cTwo').css('display','none');
        $('#popLayer').css('display','none');
    });
    $('.cTwoSubmit').click(function(){
        $('.cTwo').css('display','none');
        $('#popLayer').css('display','none');
    })
});
$(function () {
    $('.cThreeHeaderTwo').click(function(){
        // $('.cTwo').css('display','block');
        // $('#popLayer').css('display','block');
    });
    $('.cTwoBack').click(function(){
        $('.cTwo').css('display','none');
        $('#popLayer').css('display','none');
    });
    $('.cTwoSubmit').click(function(){
        $('.cTwo').css('display','none');
        $('#popLayer').css('display','none');
    })
});
//page-1-c3
$(function(){
    $('.cThreeShow').click(function(){
        $('.cThree').css('display','block');
        $('.cOne').css('display','none');
        $('.cFive').css('display','none');
        $('.cSix').css('display','none');
        $('.bThreeOneContent').css('display','none');
        $('.bThreeOneRight').css('display','none');
        $('.cSixOne').css('display','none');
        $('.cSixThree').css('display','none');
        $('.cFour').css('display','none');
        $('.cSixTwoOne').css('position','absolute').css('top','-9999px').css('left','-9999px');
    })
});
//page-1-c5
$(function(){
    $('.cFiveShow').click(function(){
        $('.cFive').css('display','block');
        $('.cSix').css('display','none');
        $('.cOne').css('display','none');
        $('.bThreeOneContent').css('display','none');
        $('.bThreeOneRight').css('display','none');
        $('.cSixOne').css('display','none');
        $('.cSixThree').css('display','none');
        $('.cThree').css('display','none');
        $('.cFour').css('display','none');
        $('.cSixTwoOne').css('position','absolute').css('top','-9999px').css('left','-9999px');
    })
});
//jingna
//page-1-c6
$(function(){
    $('.cSixShow').click(function(){
        $('.cFive').css('display','none');
        $('.cSix').css('display','block');
        $('.cOne').css('display','none');
        $('.bThreeOneContent').css('display','none');
        $('.bThreeOneRight').css('display','none');
        $('.cSixOne').css('display','none');
        $('.cSixThree').css('display','none');
        $('.cThree').css('display','none');
        $('.cFour').css('display','none');
        $('.cSixTwoOne').css('position','absolute').css('top','-9999px').css('left','-9999px');
    })
});
//page-1-b5
$(function(){
    $(".yeshu ul").on("click","li",function(){
        $(".yeshu>ul>li").removeClass("active");
        $(this).addClass("active");
    });
    $(".b6-left").on("click",function(){
        $(".b6-content").css("display","block");
        $(".b61-center").css("display","none");
    });
    // $(".b6-right").on("click",function(){
    //     $(".b6-content").css("display","none");
    //     $(".b61-center").css("display","block");
    // });
//page-1-b6
    $(".b6-center .title").on("click","span",function(){
        $(".title>span").removeClass("active");
        $(this).addClass("active");
    });
});

//page-1-b61
// $(".b61-center .title").on("click","span",function(){
//     $(".title>span").removeClass("active");
//     $(this).addClass("active");
// });

//page-1-b8
$(".b8-center .title").on("click","span",function(){
    $(".title>span").removeClass("active");
    $(this).addClass("active");
});
$(function(){
       $(".yeshu ul").on("click","li",function(){
        $(".yeshu>ul>li").removeClass("active");
        $(this).addClass("active");
    });
    // $(".b5-btn").on("click",function(){
    //     $(".b5").css("display","none");
    //     $(".b6").css("display","block");
    // });
    $("#create1").on("click",function(){
        $(".b6-content").css("display","block");
        $(".b61-center").css("display","none");
    });
    $("#create2").on("click",function(){
        $(".b6-content").css("display","none");
        $(".b61-center").css("display","block");
    });
    //page-1-b6
    $(".b6-center .title").on("click","span",function(){
        $(".title>span").removeClass("active");
        $(this).addClass("active");
    });
    //b51编辑用户弹出框
    // $(".b51Close").on("click",function(){
    //     $(".b5Exit").css("display","none");
    // })
});
//page-1-b8
$(function(){
    $(".b8-center .title").on("click","span",function(){
        $(".title>span").removeClass("active");
        $(this).addClass("active");
    });
});
//page-1-b7
// $(function(){
//     $('.b7-btn').click(function(){
//         $('.b8').css('display','block');
//         $('.b7').css('display','none');
//     })
// });
//忘记密码
$(function(){
    $('.log1').click(function(){
        $('.login').css('display','none');
        $('.aTwo').css('display','block');
    });
    $(".aTwoSubmit .submit2").on("click",function(){
        if($('.input1').val()==''){
            toastr.error('请输入登录名！');
            return false;
        }else if($('.aTwoInput').val()==''){
            toastr.error('请输入验证码！');
            return false;
        }
        else{
            var code=$('.submit2').attr('code');
            $.ajax({
                type:'POST',
                url:myUrl+'account/base/validateCode',
                data:{code:$('.aTwoInput').val(),md5Code:code},
                success:function(judge){
                    if(judge.result==true){
                        $(".aTwoSubmit  .submit2").css("background-color","#32CD64");
                        $(".act2").css("color","#32CD64");
                        $(".a2-part").css("display","none");
                        $(".a3-part").css("display","block");
                        $('.message1').attr('code',$('.aTwoInput').val());
                        $("#a3User").attr("value",$('.input1').val());
                    }else{
                        toastr.error('验证码输入不正确！')
                    }
                }
            })
        }
    });
    $(".aThreeSubmit .submit3").on("click",function(){
        $(".aThreeSubmit .submit3").css("background-color","#21e27e");
        // $(".cicrl3").css("background-color","#32CD64");
        $(".act3").css("color","#32CD64");
        $(".a3-part").css("display","none");
        $(".a4-part").css("display","block");
        // $('.login4').css('display','none')
    });
    $('.aTwoInput').click(function(){
        if($('.input1').val().length>0){
            $('.submit2').css('background','#21e27e')
        }else{
            $('.submit2').css('background','#eeeeee')
        }
    });
    $('#a3Pwd').click(function(){
        if($('#a3User').val().length>0){
            $('.submit3').css('background','#21e27e')
        }else{
            $('.submit3').css('background','#eeeeee')
        }
    });
    $(".aFourSubmit .submit1").on("click",function(){
        $(".aFourSubmit .submit1").css("background-color","#21e27e");
        window.location.href="enter.html";
    });
});

//添加任务
$(function(){
    $('.bThreeOneSearchButton').click(function(){
        $('.cSevenFive').css('display','block');
        $('#popLayer').css('display','block');
    });
    $('.cSevenFiveBack').click(function(){
        $('.cSevenFive').css('display','none');
        $('#popLayer').css('display','none');
        $('#paceName').val('');
    });
    $('.cSevenFiveSubmit').click(function () {
        $('.cSevenFive').css('display','none');
        $('#popLayer').css('display','none');
    })
});
//enter.html
$(function () {
    $('#home-img').click(function () {
        $('.login1').css('display','block');
        window.location.href='enter.html';
    });
    $('.submit').click(function () {
        $('.login1').css('display','none')
    })
});
//page-1-c4
$(function(){
    $('.cFourShow').click(function () {
        $('.cSixTwoOne').css('position','absolute').css('top','-9999px').css('left','-9999px');
        $('.cThree').css('display','none');
        $('.cOne').css('display','none');
        $('.cSixOne').css('display','none');
        $('.cSixThree').css('display','none');
        $('.bThreeOneContent').css('display','none');
        $('.bThreeOneRight').css('display','none');
        $('.cFour').css('display','block');
        $('.cFive').css('display','none');
        $('.cSix').css('display','none');
    })
});
//
//c751
// function bThreeOneList6click() {
//     $('.bThreeOneList6').click(function () {
//         var oBtn=$('.bThreeOneList6');
//         var oShow=$('.cSevenFiveOne');
//         var oBack=$('.cSevenFiveBack');
//         var popLayer=$('#popLayer');
//         oBtn.click(function(){
//             oShow.modelCSS('display','block');
//             $('.bThreeThree').modelCSS('display','none');
//             $('.cSixOne').modelCSS('display','none');
//             $('.bThreeOneContent').modelCSS('display','block');
//             $('.bThreeOneRight').modelCSS('display','block');
//             $('.cSixThree').modelCSS('display','none');
//             popLayer.modelCSS('display','block');
//         });
//         //    点击X，弹窗消失
//         oBack.click(function(){
//             oShow.modelCSS('display','none');
//             popLayer.modelCSS('display','none')
//         });
//         $('.cSevenFiveSubmitOne').click(function () {
//             $('.cSevenFiveOne').modelCSS('display','none');
//             $('#popLayer').modelCSS('display','none');
//         })
//     });
// }

// function bThreeOneImg() {
//     $('.bThreeOneImg').click(function (event) {
//         var target =event.target;
//         var parent=$(target).parents()[1];
//         var next=$(parent).next();
//         if($(next).modelCSS('display') =='none'){
//             $(this).addClass('bThreeOneList111');
//             $(next).modelCSS('display','block');
//             $(this).removeClass('bThreeOneList11');
//         }else{
//             $(next).modelCSS('display','none');
//             $(this).removeClass('bThreeOneList111');
//             $(this).addClass('bThreeOneList11');
//         }
//     })
// }
//page-1-c2

//page-1-index--页面收缩,展示UE4模型
$(function () {
   // $('.shrinkRight').click(function () {
   //      // $(".bThreeOneLeft").addClass("cjProject");
   //     if($('.bThreeOneLeft').css('display')=='block'){
   //         $('.bThreeOneContent').css({'width':$('.bThreeOneLeft').width()+ $('.bThreeOneContent').width()});
   //         // $('.bThreeOneContentPicture canvas').css({'width': $('canvas').width()+$('.bThreeOneLeft').width()});
   //         $('.shrinkRight').addClass('shrinkRights');
   //         $('.bThreeOneLeft').css('display','none');
   //     }else{
   //         $('.bThreeOneLeft').css('display','block');
   //         $('.shrinkRight').removeClass('shrinkRights');
   //         $('.bThreeOneContent').css({'width':$('.bThreeOneContent').width()- $('.bThreeOneLeft').width()});
   //         // $('.bThreeOneContentPicture canvas').css({'width': $('canvas').width()-$('.bThreeOneLeft').width()});
   //     }
   //  });
    // $('.shrinkLeft').click(function () {
    //     $(".bThreeOneLeft").removeClass("cjProject");
    //     if($('.bThreeOneRight').css('display')=='block'){
    //         $('.bThreeOneContent').css({'width':$('.bThreeOneRight').width()+ $('.bThreeOneContent').width()});
    //         $('.bThreeOneContentPicture canvas').css({'width': $('canvas').width()+$('.bThreeOneRight').width()});
    //         $('.shrinkLeft').addClass('shrinkLefts');
    //         $('.bThreeOneRight').css('display','none');
    //     }else{
    //         $('.bThreeOneRight').css('display','block');
    //         $('.shrinkLeft').removeClass('shrinkLefts');
    //         $('.bThreeOneContent').css({'width':$('.bThreeOneContent').width() - $('.bThreeOneRight').width()});
    //         $('.bThreeOneContentPicture canvas').css({'width': $('canvas').width()-$('.bThreeOneRight').width()});
    //     }
    // });
    $('.shrinkDown').click(function () {
        if($('.bThreeOneContentList').css('display')=='none'){
            $('.bThreeOneContentList').css('display','block');
            // $('.bThreeOneContent').modelCSS({'height':$('.bThreeOneContent').height()+ $('.bThreeOneContentList').height()});
            $('.bThreeOneContentPicture').css({'height':$('.bThreeOneContentPicture').height()- $('.bThreeOneContentList').height()});
            //$('.bThreeOneContentPicture canvas').css({'height': $('canvas').height()-$('.bThreeOneContentList').height()})
            $('.shrinkDown').addClass('shrinkDowns');

        }else{
           
            $('.bThreeOneContentPicture').css({'height':$('.bThreeOneContentPicture').height() + $('.bThreeOneContentList').height()});
           // $('.bThreeOneContentPicture canvas').css({'height': $('canvas').height()+$('.bThreeOneContentList').height()});
            // $('.bThreeOneContent').modelCSS({'height':$('.bThreeOneContent').height()- $('.bThreeOneContentList').height()});
            $('.shrinkDown').removeClass('shrinkDowns');
            $('.bThreeOneContentList').css('display','none');

        }
    })
});
$(function(){
    $('.index-structureContent ul').on("click","span",function () {
        if($(this).siblings('li').css('display')=='none'){
            $(this).removeClass('index-structurePlus');
            $(this).addClass('index-structureMinus');
            $(this).siblings('li').css('display','block')
        }else{
            $(this).removeClass('index-structureMinus');
            $(this).addClass('index-structurePlus');
            $(this).siblings('li').css('display','none')
        }
    })
})

//打开exe弹窗
$(function(){
    $('.HrefClickH5').click(function () {
        // window.open("");
    })
});
//home.html编辑弹窗
$(function () {
    $('.bTwoBack').click(function(){
        $('.bTwoHeader').css('display','none');
        $('#popLayer').css('display','none');
    });
    $(".planStart").focus(function(event){
        WdatePicker({skin:'whyGreen'});
        event.stopPropagation();
    });
    $(".planEnd").focus(function(){
        WdatePicker({skin:'whyGreen'});
        event.stopPropagation();
    })
});
//窗口的拖动
// $(document).ready(function(){
//     var bool=false;
//     var offsetX=0;
//     var offsetY=0;
//     var targetMove=document.getElementsByName('targetMove');
//     $(targetMove).mousedown(function(){
//         bool=true;
//         offsetX = event.offsetX;
//         offsetY = event.offsetY;
//         $(targetMove).css('cursor','move');
//     })
//         .mouseup(function(){
//             bool=false;
//         })
//     $(document).mousemove(function(e){
//         if(!bool)
//             return;
//         var x = event.clientX-offsetX;
//         var y = event.clientY-offsetY;
//         $(targetMove).css("left", x);
//         $(targetMove).css("top", y);
//     })
// });
var targetMove=document.getElementsByName('targetMove');
var targetMoveCur=document.getElementsByName('targetMoveCur');
jQuery(document).ready(
    function () {
        // var offsetX=50%;
        // var offsetY=0;
        $(targetMoveCur).mousedown(
            function (event) {
                var offsetX = event.clientX;
                var offsetY = event.clientY;
                var isMove = true;
                var abs_x = offsetX - $(targetMove).offset().left;
                var abs_y = offsetY - $(targetMove).offset().top;
                $(document).mousemove(function (event) {
                        if (isMove) {
                            var obj = $(targetMove);
                            obj.css({'left':event.pageX - abs_x, 'top':event.pageY - abs_y});
                        }
                    }
                ).mouseup(
                    function () {
                        isMove = false;
                    }
                );
            }
        );
    }
);



  