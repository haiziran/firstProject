$(function(){ 
    console.log("localStorage.loginUserInfo",localStorage.loginUserInfo);
    var eIdToken = localStorage.getItem("token"),
        eId = localStorage.getItem("loginId");
    /*获取用户信息*/
    getUserByLoginId(eId,eIdToken);

    var editSec = false;
    var G_URL_WEB = getHttpHead(window.location.href);   
    $(".management").on("click",function(){
        changeTabStyle(this);
    });
    /*$("#nav-birth").focus(function(){
        console.log('----------')
        $(this).datetimepicker({
           format: "yyyy-mm",
           language: "zh-CN",
           startView: "year",
           minView: "year",
           maxView: "year",
           autoclose: true 
        }); 
    });   */
    //$("#time-picker-container").datetimepicker();
    var navThatIndex;
    function changeTabStyle(obj){
        $('.management').removeClass("nav-active");
        $('.management').removeClass('has');
        $(obj).addClass("has");
        $(obj).addClass("nav-active");
        navThatIndex= $('.management').index(obj);
        if(navThatIndex==0){
            itemsManageShow();
            getData(myUrl+'user/relationProject','post',{loginId :eId,token :eIdToken},function(data){
                console.log("let it go",data);
            });
        }
        else if(navThatIndex==1){
            unitManageShow();
        }
        else if(navThatIndex==2){
            systemManageShow();
        }
        else if(navThatIndex==3){
            userManageShow();
        }    
    }
    //处理ajax
    function getData(url, method,parm,callback){
        $.ajax({
            url:url,
            type:method,
            dataType:'json',
            data:parm,
            success:function(data){
                callback(data);
            },
            error:function(err){
                alert(err);
            }
        })
    }
    //当加载页面时的数据全部展示
    getData(myUrl+'user/relationProject','post',{loginId :eId,token :eIdToken},function(data){
        console.log("data",data);
        var allProjectData = data.result;
        console.log("第一次加载时页面数据",allProjectData);
        var obj ={};
        for(var i=0;i<allProjectData.length;i++){
            allProjectData[i].token = eIdToken;
            allProjectData[i].loginId =eId;
        }
        obj =allProjectData;
        var allProjectHtml = template("project-manage-template", obj);
        $("#project-content").append(allProjectHtml);
    });
    //模拟弹出框的关闭
    $('#box-close').click(function() {
        $('#creatNewItemBoxCover').hide();
        $('#creatNewItemBoxCover #creatNewItemPopupsBox').hide();
        refresh();
    })
    $("#createNewProject").on("click",function(){
        $(".sub-input").val("");
        $(".item-describe").val("");
        $('#creatNewItemBoxCover').show();
        $('#creatNewItemBoxCover #creatNewItemPopupsBox').show();
        //funwenjianUploader();
    });
    //pjn
    funwenjianUploader();
    //创建新项目提交的时候
    $(".projectSubmit").on("click",function(){
        var itemTitle = $(".item-title").val();
        var itemDescribe = $(".item-describe").val();
        var imgsrc =$(".show_item_img").attr("src");
        var fileIdImg;
        if(typeof($("#getfileId").attr("data-fileId"))==undefined){
            fileIdImg == "";
            $(".show_item_img").attr("src","../images/gardenTwo.png");
        }
        else{
            fileIdImg = $("#getfileId").attr("data-fileId");
        }
        var projectInfoData = {
            name:itemTitle,
            parentId:0,
            remake:itemDescribe,
            fileId: fileIdImg
        };
        /*if(imgsrc ==""){
            $(".show_item_img").attr("src","../images/gardenTwo.png");
        }*/
        if(itemTitle==""){
            alertResult("请填写项目名称", "error");
            return;
        }else if(itemDescribe ==""){
            alertResult("请填写项目描述","error");
            return;
        }else{
            getData(myUrl+'/project/projectInsert','post',{loginId :eId,token :eIdToken,projectInfo :JSON.stringify(projectInfoData)},
            function(data){
                if(data.code == 0){
                    var createItemPid = data.result.pId ;
                    var createItempIntrouction = data.result.pIntrouction;
                    var newCreactItem = {
                        loginId : eId,
                        pId : createItemPid ,
                        pIntrouction : createItempIntrouction,
                        pName : data.result.pName,
                        paftime :"",
                        pastime :"",
                        ppftime :"",
                        ppicture :data.result.ppicture,
                        ppstime :"",
                        pstatu :"",
                        token : eIdToken,                    
                    };
                    var allProjectHtml = template("project-manage-template", [newCreactItem]);
                    $("#project-content").append(allProjectHtml);
                    $('#creatNewItemBoxCover').hide();
                    $('#creatNewItemBoxCover #creatNewItemPopupsBox').hide();
                }
           })
        }        
    })
    $(document).on("click",".remove ",function(){
        var that = this;
        layer.confirm('确定删除该项目？', {
            btn: ['取消','删除'] ,//按钮
            title:'删除项目'
        }, function(){
            layer.closeAll();
        }, function(){
            var getId = $(".item-template").attr("data-id");
            var getIdArr =[];
            getIdArr.push(getId);
            getData(myUrl+'project/projectDelete','post',{loginId :eId,token :eIdToken,deletelist :JSON.stringify(getIdArr)},
            function(data){
                $(that).parents(".item-template").remove();
           })
        });
    });
    //项目-项目信息修改
    $(document).on("click",".send",function(){
        var getId = $(".item-template").attr("data-id");
        var itemModificationData = {
            pname : 'kkkkk',//项目名称
            pIntrouction :'k歌之王' ,//项目描述
            pPlanStartTime : "2017-09-09",  //计划开始时间
            pPlanFinishTime : "2017-09-09",  //计划结束时间
            pActiveStartTime : "2017-09-09",  //实际开始时间
            pActiveFinishTime : "2017-09-09"  //实际完成时间
        }
        getData(myUrl+'project/projectDelete','post',{proId :getId,loginId :eId,token :eIdToken,projectJson : JSON.stringify(itemModificationData)},
        function(data){
            console.log(data);
       })
    });
    // $(document).on("click",".enterIndex",function(){
    //      var getId = $(".item-template").attr("data-id");
    //     location.href = G_URL_WEB + "index.html" +"?eId=" + eId + "&eIdToken=" + eIdToken +"&getId=" + getId;
    // });
    $("#projectManage").click(function(){
        itemsManageShow();
        $(".navitemsManage").parent("span").addClass("nav-active has").siblings().removeClass("nav-active has");
    });
    $("#unitManage").click(function(){
        unitManageShow();
        $(".Unit").parent("span").addClass("nav-active has").siblings().removeClass("nav-active has");;
    });
    $("#systemManage").click(function(){
        systemManageShow();
        $(".System").parent("span").addClass("nav-active has").siblings().removeClass("nav-active has");;
    });
    $("#userManage").click(function(){
        userManageShow();
        $(".Manger").parent("span").addClass("nav-active has").siblings().removeClass("nav-active has");;
    });
    /*导航栏*/
    $("#navAcountSetting").on("click",function(){
        navAcountSetShow();
        //$(".myaccount-box-cover").show();
        getData(myUrl+'/user/getUserByLoginId','post',{loginId :eId,token :eIdToken},function(data){
            console.log("根据登录编号获取用户",data.result);
            var userSetData = data.result;
            $("#nav-name").val(userSetData.pName);
            $("#nav-birth").val(userSetData.uBirthday);
            $("#nav-address").val(userSetData.uAddress);
            $("#nav-truename").val(userSetData.uName);
            $("#nav-age").val(userSetData.uAge);
            $("#certificate").val(userSetData.uIdNumber);           
            $("#accountID").text(userSetData.uId);
            /*if(typeof($(".myAccount-new-headerImg").val("data-fileId") == undefined)){
                //
            }else{
                $(".myAccountImgFault").attr("src","http://192.168.3.31:8080/bim/getPic?token=" + eIdToken + "&loginId=" + eId + "&fileId=" +data.result.headPic)
            }*/
            if(userSetData.headPic==""){
                //
            }else{
                $(".myAccountImgFault").attr("src","http://192.168.3.31:8080/bim/getPic?token=" + eIdToken + "&loginId=" + eId + "&fileId=" +data.result.headPic)
            }
            if(userSetData.uSex =="2"){
                $('#sexBoy').attr('checked',true);
            }else if(userSetData.uSex =="1"){
                $('#sexGirl').attr('checked',true);
            }else if(userSetData.uSex =="0"){
                $('#sexBoy').attr('checked',false);
                $('#sexGirl').attr('checked',false);
            }
            if(userSetData.uPhone !=undefined){
                $("#nav-tellphone").val(userSetData.uPhone);
                $("#bindphone").val(userSetData.uPhone);
            }
            if(userSetData.uEmail !=undefined){
                $("#nav-email").val(userSetData.uEmail);
                $("#bindEmail").val(userSetData.uEmail);
            }
        });   
    });
    headPortrait('headImgFileList','clickHeadImg');
    $("#myAccount-newid").on("click",function(){
        /*刚进来不进行导航菜单切换*/
        if($(".management").hasClass("nav-active")){
            //var khj = $(".management").index('.management');
            itemsManageShow();
            getData(myUrl+'user/relationProject','post',{loginId :eId,token :eIdToken},function(data){
                console.log("let it go",data);
            });
        }
        /*导航菜单切换*/
        if(navThatIndex==0){
            itemsManageShow();
            getData(myUrl+'user/relationProject','post',{loginId :eId,token :eIdToken},function(data){
                console.log("let it go",data);
            });
        }
        else if(navThatIndex==1){
            unitManageShow();
        }
        else if(navThatIndex==2){
            systemManageShow();
        }
        else if(navThatIndex==3){
            userManageShow();
        } 
    });    
    $("#bindEmail").blur(function(){
        var str = $(this).val();
        if(str==""){
        }else{
            regUrl = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(str); 
            if(!regUrl){
                layer.msg("邮箱有误，请重填");
                $(this).focus();  
                return false;
            }
        }
    });
    $("#bindphone").blur(function(){
        var str = $(this).val();
        if(str==""){
        }else{
            regUrl = /^1[3|4|5|7|8][0-9]{9}$/.test(str); 
            if(!regUrl){
                layer.msg("号码有误，请重填");
                $(this).focus();  
                return false;
            }
        }
    });
    $("#certificate").blur(function(){
        var str = $(this).val();
        if(str==""){
        }else{
            regUrl = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(str); 
            if(!regUrl){
                layer.msg("证件号码有误，请重填");
                $(this).focus();  
                return false;
            }
        }
    });
    $("#oldPwd").blur(function(){
        if(localStorage.loginPassword != $(this).val()){
            layer.msg("原密码和新密码输入不一致，请重新填写");
            $(this).focus();
            return;
        }
    });
    $("#nav-submit").on("click",function(){
        var accountName = $("#nav-name").val();
        var birth = $("#nav-birth").val();
        var phoneNum = $("#nav-tellphone").val();
        var address = $("#nav-address").val();
        var tureName = $("#nav-truename").val();
        var age = $("#nav-age").val();
        var certificate = $("#certificate").val();
        var email = $("#nav-email").val();
        var sex = $('input[name="sex"]:checked').attr("value");
        var fileId = $(".myAccount-new-headerImg").attr("data-fileId");
        var userIdex ={
            "pName":accountName,
            "rName":tureName,
            "sex":sex,
            "age":age,
            "birthday":birth,
            "idNumber":certificate,
            "phone":phoneNum,
            "email":email,
            "address":address, 
        };
        getData(myUrl+'/user/UpdatePersonalData','post',{loginId :eId,token :eIdToken,fileId :fileId, strJson :JSON.stringify(userIdex)},
        function(data){
            if(data.code == 0){
                console.log("success",data);
                var src = $(".myAccountImgFault").attr("src");
                $("#user_header_img").attr("src",src);
                layer.msg("保存个人资料成功");
            }
        });
    });  
    /*修改密码模块*/
    $("#ModifyPwdSave").on("click",function(){
        var oldPwd = $("#oldPwd").val();
        var newId = $("#newId").val();
        var reNewPwd = $("#reNewPwd").val();
        if(oldPwd =="" || newId=="" || reNewPwd==""){
            layer.msg("请输入完整的信息");
        }
        if(newId ==reNewPwd){
            getData(myUrl+'/account/modifyPwd','post',{loginId :eId,token :eIdToken,currentPwd:oldPwd,
            newPwd:newId},
            function(data){
                if(data.code == 0){
                    layer.msg("修改密码成功");
                    localStorage.removeItem("loginPassword");
                }               
           })
        }
        else if(newId !=reNewPwd){
            layer.msg("新密码和再次输入密码不一致，请重新填写");
        }
    }); 
    /*账户绑定*/
    $("#immediateBind").on("click",function(){
        var thatNoBindTell = this; 
        var str = $(this).siblings("#bindphone").val();
        if($(this).hasClass("funReduction")){
            layer.confirm('确定解除绑定吗？', {
                btn: ['取消','确定'], //按钮
                title: false,
                closeBtn:0,
                shadeClose:true,
            }, function() {
                layer.closeAll();
            },function(){
                getData(myUrl+'/user/accountNoBinding','post',{loginId :eId,token :eIdToken,loginName:str},
                function(data){
                   if(data.code == 0){
                        layer.msg("解除绑定成功！");
                        $(thatNoBindTell).removeClass("funReduction").text("绑定");
                   }
               }) 
            });  
        }else{
            if(str==""){
                layer.msg("请输电话号码");
                return;
            }else{
                regUrl = /^1[3|4|5|7|8][0-9]{9}$/.test(str); 
                if(!regUrl){
                    layer.msg("号码有误，请重填");
                    $(this).siblings("#bindphone").focus();  
                    return false;
                }
                $("#getTelBindNum").text($("#bindphone").val());
                $('.alertAccountBindboxcover').show();
                $('.alertAccountBindboxcover .alertAccountBindpopupsbox').show();
            }
        }
    });
    $("#btnEmailBind").on("click",function(){
        var thatEmail = this; 
        var str = $(this).siblings("#bindEmail").val();
        if($(this).hasClass("funReductionEmail")){
            layer.confirm('确定解除绑定吗？', {
                btn: ['取消','确定'], //按钮
                title: false,
                closeBtn:0,
                shadeClose:true,
            }, function() {
                layer.closeAll();
            },function(){
                getData(myUrl+'/user/accountNoBinding','post',{loginId :eId,token :eIdToken,loginName:str},
                function(data){
                   if(data.code == 0){
                        layer.msg("解除绑定成功！");
                        $(thatEmail).removeClass("funReductionEmail").text("绑定");
                   }
               }) 
            });  
        }else{
            if(str==""){
                layer.msg("请输入邮箱");
                return;
            }else{
                regUrl = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(str); 
                if(!regUrl){
                    layer.msg("邮箱有误，请重填");
                   $(this).siblings("#bindEmail").focus();   
                    return false;
                }
                $("#getEmailShow").text($("#bindEmail").val());
                $('.emailboxcover,.emailboxcover .emailpopupsbox').show();
            }
        }
    });
    $(".alertAccountBindboxclose").on("click",function(){
        $('.alertAccountBindboxcover').hide();
        $('.alertAccountBindboxcover .alertAccountBindpopupsbox').hide();
    });
    $(".emailboxclose").on("click",function(){
        $('.emailboxcover,.emailboxcover .emailpopupsbox').hide();
    });
    //发送验证码
    $("#send_verification_phone").click(function() {
        var phoneNumber = $("#bindphone")[0].value;
        if(null != phoneNumber && 0 != phoneNumber.length) {
            getData(myUrl+'/user/accountBindingSendCode','post',{loginId :eId,token :eIdToken,loginName: phoneNumber},
            function(data){
                console.log("手机绑定验证码",data);
                if( 0 == data.code) {
                    var t1 = window.setInterval(showLeftTime, 1000);
                    var i = 59;
                    function showLeftTime() {
                        if(i > 1) {
                            $("#send_verification_phone").attr("disabled", "true");
                            $("#send_verification_phone").text(i + 's');
                            $("#send_verification_phone").addClass("clickSendCode");
                            i--;
                        } else {
                            window.clearInterval(t1);
                            $("#send_verification_phone").text("重发验证码");
                            $("#send_verification_phone").removeAttr("disabled");
                            $("#send_verification_phone").removeClass("clickSendCode");
                        }

                    }
                }
           })
        }
    });
    $("#send_verification_email").click(function() {
        var emailNumber = $("#bindEmail")[0].value;
        if(null != emailNumber && 0 != emailNumber.length) {
            getData(testUrl+'/user/accountBindingSendCode','post',{loginId :eId,token :eIdToken,loginName: emailNumber},
            function(data){
                console.log("手机绑定验证码",data);
                if( 0 == data.code) {
                    var t1 = window.setInterval(showLeftTime, 1000);
                    var i = 59;
                    function showLeftTime() {
                        if(i > 1) {
                            $("#send_verification_email").attr("disabled", "true");
                            $("#send_verification_email").text(i + 's')
                            $("#send_verification_email").addClass("clickSendCode");
                            i--;
                        } else {
                            window.clearInterval(t1);
                            $("#send_verification_email").text("重发验证码");
                            $("#send_verification_email").removeAttr("disabled");
                            $("#send_verification_email").removeClass("clickSendCode");
                        }

                    }
                }
           })
        }
    });
    //手机验证码确认
    $("#alertAccountBindbtnok").on("click",function(){
        var telphone = $("#bindphone").val();
        var code = $("#alertbind").val();
        getData(myUrl+'/user/accountBinding','post',{loginId :eId,token :eIdToken,loginName:telphone,code:code},
        function(data){
            if(data.code==0){
                layer.msg("验证码发送成功！");
                $('.alertAccountBindboxcover').hide();
                $('.alertAccountBindboxcover .alertAccountBindpopupsbox').hide();
                $("#immediateBind").text("解绑").addClass("funReduction");
            }
       })
    });
    $("#emailbtnok").on("click",function(){
        var email = $("#bindEmail").val();
        var code = $("#inputEmailVerification").val();
        getData(testUrl+'/user/accountBinding','post',{loginId :eId,token :eIdToken,loginName:email,code:code},
        function(data){
            if(data.code==0){
                layer.msg("邮箱验证码发送成功！");
                $('.emailboxcover,.emailboxcover .emailpopupsbox').hide();
                $("#btnEmailBind").text("解绑").addClass("funReductionEmail");
            }
       })
    });
    /*文件上传*/
    function funwenjianUploader(){
        var $list = $('#fileList');
        var ratio = window.devicePixelRatio || 1; 
        var thumbnailWidth = 100 * ratio;
        var thumbnailHeight = 100 * ratio; 
        var uploader = WebUploader.create({ 
            auto: true,
            formData:{
                uid: 123
            },
            swf:'Uploader.swf',
            chunked : true,
            chunkSize: 1024 * 1024,
            threads:1,
            server: 'http://192.168.3.31:8080/bim/upload?token=' +eIdToken +"&loginId=" +eId,
            fileVal:'test',
            pick: '#filePicker',
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/jpg,image/jpeg,image/png'
            },
            compress : false        
        });

        uploader.on( 'fileQueued', function( file ) {
            console.log("file",file);
            var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail">' +
                        '<img>' +
                    '</div>'
                    ),
                $img = $li.find('img');
     
            //$list.append( $li );
            //$("#defaultImg").hide();

            //$(".webuploader-pick").css("top","-50px");
     
            // 创建缩略图
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                } 
                //$img.attr( 'src', src );
                //$(".neIMg").attr("src",src);
                $("#defaultImg").attr("src",src);
            }, thumbnailWidth, thumbnailHeight );
        });

        uploader.on( 'uploadSuccess', function( file,data ) {
            $( '#'+file.id ).addClass('upload-state-done');
            console.log("data",data);
            $("#getfileId").attr("data-fileId",data.result.fileId);
            console.log("路径",data.result.tempFileDir + data.result.fileId);
        });

        uploader.on( 'uploadError', function( file ) {
            var $li = $( '#'+file.id ),
                $error = $li.find('div.error');
     
            // 避免重复创建
            if ( !$error.length ) {
                $error = $('<div class="error"></div>').appendTo( $li );
            }
     
            $error.text('上传失败!!!');
        });
     
        uploader.on( 'uploadComplete', function( file ) {
            $( '#'+file.id ).find('.progress').remove();
        });
    }
    /*编辑弹出框*/
    //调用文件上传函数
    editwenjianuploader();
    var index;
    $(document).on("click",".project-manageEidit",function(){
        $('#editboxcover').css('display','block');
        $('#editpopupsbox').css('display','block');
        var name = $(this).parents(".project").find(".project-name").text().trim();
        var detail = $(this).parents(".project").find(".detail").text().trim();
        $(".re-item-title").val(name);
        $(".re-item-describe").val(detail);
        $(".added-material").val("");
        var that = this;
        index = $(this).parents('.item-template').index('.item-template');
        var dataId = $(this).parents(".item-template").attr("data-id");
        var editdefaultsrc = $(this).parents(".item-template").find(".show_item_img").attr("src");        
        $(".editdefaultImg").attr("src",editdefaultsrc);
        var partentfileid = editdefaultsrc.split("&fileId=")[1];  
        
        sessionStorage.setItem("edit", false); 
        var pId = $(".item-template").eq(index).attr("data-id");
        //loadCompany(eId,eIdToken,pId);
        $(".appendDiv div").remove();
        getData(myUrl+'/project/projectRealitionInfo','post',{loginId :eId,token :eIdToken,pId :pId},
        function(data){
            console.log("ajax获取项目设置信息",data);           
            $(".second-chosen-firm div").remove();
            //页面开始加载时获取的项目设置的数据
            var  firstItemSetShow = data.result;
            var firstSetMaterialType = data.result.materialType;
            var firstSetCompanyUser = data.result.companyUser;
            if(undefined != firstSetMaterialType && firstSetMaterialType.length>0){
                var html = template("message-list-temp",firstSetMaterialType);
                $(".appendDiv").append(html);
                //$(".input-material-sort").hide();
                $(".add-material-sort").show();  
                $(".all-added-material").show();     
            }
            if(undefined != firstSetCompanyUser && firstSetCompanyUser.length>0){
                var htmlCompanyUser = template("second-get-companyMessage",firstSetCompanyUser);
                $(".second-chosen-firm").prepend(htmlCompanyUser);
                //$(".chosen-firm").show();
            }

       });
    });

/*function loadCompany(loginId,token,pId){
  getData(myUrl+'/project/projectRealitionInfo','post',{loginId :loginId,token :token,pId :pId},
   function (data){
        console.log("ajax获取项目设置信息",data);
        $(".appendDiv div").remove();
        $(".second-chosen-firm div").remove();
        //页面开始加载时获取的项目设置的数据
        var  firstItemSetShow = data.result;
        var firstSetMaterialType = data.result.materialType;
        var firstSetCompanyUser = data.result.companyUser;
        if(undefined != firstSetMaterialType && firstSetMaterialType.length>0){
            var html = template("message-list-temp",firstSetMaterialType);
            $(".appendDiv").append(html);
            //$(".input-material-sort").hide();
            $(".add-material-sort").show();  
            $(".all-added-material").show();     
        }
        if(undefined != firstSetCompanyUser && firstSetCompanyUser.length>0){
            var htmlCompanyUser = template("second-get-companyMessage",firstSetCompanyUser);
            $(".second-chosen-firm").prepend(htmlCompanyUser);
            //$(".chosen-firm").show();
        }
    })
}*/
    /*编辑后项目资料的提交操作*/
    $(".re-projectSubmit").on("click",function(){
        var reItemTitle = $(".re-item-title").val();
        var reItemDescribe = $(".re-item-describe").val();
        var dom = $(".item-template").eq(index);
        var dataId = $(".item-template").eq(index).attr("data-id");
        var ggfileId = $("#editItemCover").attr("data-fileid");
        if (ggfileId == undefined) {
            ggfileId =="";
        }
        var data ={
            pname:reItemTitle,
            pIntrouction:reItemDescribe,
            pPlanStartTime:"",
            pPlanFinishTime:"",
            pActiveStartTime:"",
            pActiveFinishTime:"",
            fileId:ggfileId
        };
        getData(myUrl+'/project/updateProject','post',{loginId :eId,token :eIdToken,proId :dataId,projectJson :JSON.stringify(data)},
        function(data){
            if(data.code==0){
                $('#editboxcover').css('display','none');
                $('#editpopupsbox').css('display','none');
                $(".item-template").eq(index).find(".project-name").text(reItemTitle);
                $(".item-template").eq(index).find(".detail").text(reItemDescribe);
                if(ggfileId==undefined){
                }else{
                    $(".item-template").eq(index).find(".show_item_img").attr("src","http://192.168.3.31:8080/bim/getPic?token=" + eIdToken + "&loginId=" + eId + "&fileId=" + ggfileId);
                }                
            }
        });
    });
    
    $(".add-material-sort").on("click",function(){
        $(".input-material-sort").show();
        $(".material-sort-textarea").val("");
        $(this).hide();
    });
    /*项目设置物料配置保存操作*/ 
    $(".save-edit").on("click",function(){
        var mTypeName = $(".material-sort-textarea").val();
        var dataId = $(".item-template").eq(index).attr("data-id");         
        getData(myUrl+'/materialType/materialTypeCreate','post',{loginId :eId,token :eIdToken,pId :dataId,materialTypeParentId :0,materialTypeName :mTypeName},
        function(data){
            console.log("类别编号",data.result);
            var dataThree ={
                "typeId" :data.result,
                "typeName" : mTypeName
            };
            //$(".appendDiv div").remove();           
            var html = template("message-list-temp",[dataThree]);
            $(".appendDiv").append(html);
            $(".input-material-sort").hide();
            $(".add-material-sort").show();  
            $(".all-added-material").show();          
        });        
    });
    //物料类别名称修改
    /*$(document).on("click",".added-material",function(){
        var that = this;
        $(this).parent(".all-added-material").remove();
        $(".input-material-sort").show();
        $(".material-sort-textarea").val($(this).text()).addClass("gra-color").show();
        var sortid = $(".all-added-material").attr("data-value");
        var mTypeName = $(".material-sort-textarea").val();
        if(mTypeName == $(this).text()){
            //
        }else{
            getData(myUrl+'/materialType/modifyMaterialTypeName','post',{loginId :eId,token :eIdToken,materialId :sortid,materialName :mTypeName},
            function(data){
                console.log("ajax物料类别名称修改");
                $(that).parent(".all-added-material").remove();
           }); 
        }
    });*/
    $(document).on("click",".added-material",function(){
        var that = this;
        $(this).parent(".all-added-material").remove();
        $(".input-material-sort").hide();
        $(".second-input-material-sort").show();
        $(".second-material-sort-textarea").val($(this).text()).addClass("gra-color").show();  
        var sortid = $(this).parents(".all-added-material").attr("data-value");
        $(".second-save-edit").on("click",function(){
            var secondThat = this;
            var mTypeName = $(".second-material-sort-textarea").val();
            getData(myUrl+'/materialType/modifyMaterialTypeName','post',{loginId :eId,token :eIdToken,materialId :sortid,materialName :mTypeName},
            function(data){
                $(secondThat).parents(".second-input-material-sort").hide();
                 var seconddataThree ={
                "typeId" :sortid,
                "typeName" : mTypeName 
            };           
            var html = template("message-list-temp",[seconddataThree]);
            $(".appendDiv").append(html);
            $(".all-added-material").show();  
           }); 
        });     
    });
    
    //物料类别删除
    $(document).on("click",".delete-added-material",function(){
        var that =this;
        var sortid = $(".all-added-material").attr("data-value");
        layer.confirm('确定删除该物料类别吗？', {
            btn: ['取消','确定'], //按钮
            title: false,
            closeBtn:0,
            shadeClose:true,
        }, function() {
            layer.closeAll();
        },function(){
            getData(myUrl+'/materialType/deleteMaterialType','post',{loginId :eId,token :eIdToken,materialTypeId :sortid},
            function(data){
               console.log("ajax物料类别删除");
               $(that).parent(".all-added-material").remove();
           });
        });        
    });
    $("#editboxclose").on("click",function(){
        $('#editboxcover').css('display','none');
        $('#editpopupsbox').css('display','none');
        refresh();
        //uploader.reset()
    });
    $(".item-edit").on("click",function(){
       edittabChange(this);
    });
    /*参与单位*/
    $("#detail-participate-unit").on("click",function(){
        $(this).hide();
        var pId = $(".item-template").eq(index).attr("data-id");   
        getData(myUrl+'/company/getUnRealicationCompany','post',{loginId :eId,token :eIdToken,pId :pId},
        function(data){
            $("#unRealicationCompany").show();
            console.log("获取未和项目关联的单位和员工列表",data.result);
            var unRealication = data.result;
            var html = template("company-message-list",unRealication);
            $("#unRealicationCompany").prepend(html);
        }) 
    });
    $("#cancel-unRealicationCompany").on("click",function(){
         $(this).parents("#unRealicationCompany").hide();
         $("#detail-participate-unit").show();
    })
    $(document).on("click",".firm-employee input",function(){
        $(this).parents(".company-message").siblings().find(".firm-employee input").removeAttr('checked');
        $(this).parents(".company-message").find('.firm-radio').attr("checked","checked");
    });
    $(document).on("click",".firm input",function(){
        $(this).parents(".company-message").siblings().find(".firm-employee input").removeAttr('checked');
    });
    $("#add-firm").on("click",function(){        
        if(!$(".firm input:checked").is(":checked") || !$(".firm-employee input:checked").is(":checked")){
            layer.msg("请选择公司和员工信息 ");
            return;
        }else{

            $(this).parents("#unRealicationCompany").hide();
            var companyId = $(".firm input:checked").attr("data-firmId");
            var companyName = $(".firm input:checked").prev(".company-name").text();
            var pId = $(".item-template").eq(index).attr("data-id");
            var userIdArr = [];                         
            $(".firm-employee input:checked").each(function() {
                userIdArr.push($(this).attr("data-loginId"));
            });        
            getData(myUrl+'/project/addCompanyAndPersonIntoProject','post',{loginId :eId,token :eIdToken,companyId :companyId,pId :pId,userIdJson :JSON.stringify(userIdArr)},
            function(data){
                console.log("ajax添加单位和人员信息");
                var realtionUser =[];
                $(".firm-employee input:checked").each(function(){
                    var obj = {
                        lId: $(this).attr("data-loginId"),
                        uId : $(this).attr("data-userid"),
                        uName: $(this).next(".employee-name").text()
                    };
                    realtionUser.push(obj)
                })
                var secondData ={
                    id :companyId,
                    name :companyName,
                    realtionUser: realtionUser
                };
               var secondhtmlCompanyUser = template("second-get-companyMessage",[secondData]);
                $(".second-chosen-firm").prepend(secondhtmlCompanyUser);
                $(".chosen-firm").show();
                $("#detail-participate-unit").show();

           });   
        }
    });
    var secondAgoArr =[];
    var meindex;
    $(document).on("click",".second-company-name",function(){
        console.log("editSec",editSec) ;
        var jjThat =this;
        //var value = sessionStorage.getItem("edit");
        if(!editSec){ 
            editSec = true;
            $(".all-edit-chosen-employee div").remove();
            if($(".all-edit-chosen-employee div").length == 0){     
                meindex = $(this).parents('.secondsecond-chosen-firm').index('.secondsecond-chosen-firm');
                //console.log("me",meindex);             
                var pId = $(".item-template").eq(index).attr("data-id");
                $(".edit-chosen-firmName span").text($(this).text());
                $(".edit-chosen-firmName span").attr("data-firmid",$(this).attr("data-firmid"));   
                var chosenCompanyId = $(this).attr("data-firmid");
                $(this).parents(".secondsecond-company-message").find(".second-employee-name").each(function(){
                    secondAgoArr.push($(this).attr("data-loginid"));
                });
                getData(myUrl+'/company/lookProjectCompanyUserInfo','post',{loginId :eId,token :eIdToken,pId :pId,companyId : chosenCompanyId},
                function(data){
                    //$(".all-edit-chosen-employee div").remove();
                    $(jjThat).parents(".secondsecond-chosen-firm").remove();
                    console.log("ajax编辑时获取公司人员信息");
                    var editChosenEmployee = data.result;
                    var html = template("chosen-firm-staff",editChosenEmployee);
                    $(".all-edit-chosen-employee").append(html);
                    $(".edit-chosen-firm").show();
                }); 
            }
        }         
    });
    $(document).on("click",".edit-chosen-employee input",function(){
        if($(this).attr("data-loginid") == eId){
            $(this).prop("checked", true);
        } 
    })
    /*$(".edit-chosen-added").on("click",function(){
        var chosenthat =this;
        var chosenCompanyId = $(this).parents(".edit-chosen-firm").find(".edit-chosen-firmName span").attr("data-firmid");
        var chosenCompanyName =$(this).parents(".edit-chosen-firm").find(".edit-chosen-firmName span").text();
        var pId = $(".item-template").eq(index).attr("data-id");        
        var agoArr = [];
        var newCheckedArr = [];
        var unChangeCheckedArr = [];
        var AddNewCheckedArr = [];
        var deleteCheckedArr = [];       
        agoArr = secondAgoArr;
        console.log("agoArr",agoArr);
        $('input[name="chosencheckbox"]:checked').each(function() {
            newCheckedArr.push($(this).attr("data-loginId"));
        });      
        unChangeCheckedArr = FilterData(agoArr,newCheckedArr);
        
        AddNewCheckedArr = unitArr(newCheckedArr,unChangeCheckedArr);
        
        deleteCheckedArr = noExistArr(agoArr,unChangeCheckedArr);
        console.log("deleteCheckedArr",deleteCheckedArr);
        console.log("newCheckedArr",newCheckedArr);
        console.log("unChangeCheckedArr",unChangeCheckedArr);
        console.log("AddNewCheckedArr",AddNewCheckedArr);
        getData(myUrl+'/project/modifyactiveProjectUser','post',{loginId :eId,token :eIdToken,pId :pId,companyId :chosenCompanyId,addlist :JSON.stringify(AddNewCheckedArr),dellist :JSON.stringify(deleteCheckedArr)},
        function(data){          
            var mmrealtionUser =[];
            $(".edit-chosen-employee input:checked").each(function(){
                var obj = {
                    lId: $(this).attr("data-loginId"),
                    uId : $(this).attr("data-userid"),
                    uName: $(this).next("span").text()
                };
                mmrealtionUser.push(obj)
            })
            var mmsecondData ={
                id :chosenCompanyId,
                name :chosenCompanyName,
                realtionUser: mmrealtionUser
            };
           var mmsecondhtmlCompanyUser = template("second-get-companyMessage",[mmsecondData]);
            $(".second-chosen-firm").prepend(mmsecondhtmlCompanyUser);
            $(".chosen-firm").show();
            $(".edit-chosen-firm").hide();
            
            if($(chosenthat).parents(".edit-chosen-firmName span").attr("data-firmid")== $(".firm .second-company-name").attr(".data-firmid")){
                //
            }
        });         
    });*/
    $(".edit-chosen-added").on("click",function(){        
        if(editSec){
            editSec = false;
        var pId = $(".item-template").eq(index).attr("data-id"); 
        var chosenCompanyId = $(this).parents(".edit-chosen-firm").find(".edit-chosen-firmName span").attr("data-firmid"); 
        var chosenCompanyName =$(this).parents(".edit-chosen-firm").find(".edit-chosen-firmName span").text();
        var newCheckedArr =[];
        $('.edit-chosen-employee input:checked').each(function() {
            newCheckedArr.push($(this).attr("data-loginId"));
        });
        getData(myUrl+'/project/modifyactiveProjectUser','post',{loginId :eId,token :eIdToken,pId :pId,companyId :chosenCompanyId,userlist  :JSON.stringify(newCheckedArr)},
            function(data){            
           //loadCompany(eId,eIdToken,pId);
            var mmrealtionUser =[];
            $(".edit-chosen-employee input:checked").each(function(){
                var obj = {
                    lId: $(this).attr("data-loginId"),
                    uId : $(this).attr("data-userid"),
                    uName: $(this).next("span").text()
                };
                mmrealtionUser.push(obj)
            });
            var mmsecondData ={
                id :chosenCompanyId,
                name :chosenCompanyName,
                realtionUser: mmrealtionUser
            };
           var mmsecondhtmlCompanyUser = template("second-get-companyMessage",[mmsecondData]);
            $(".second-chosen-firm").prepend(mmsecondhtmlCompanyUser);
            $(".chosen-firm").show();
            $(".edit-chosen-firm").hide();
        });
        } 
    });
    function edittabChange(obj){
        $(".item-edit").removeClass("has");
        $(obj).addClass("has");
        var thatIndex = $(".item-edit").index(obj);
        if(thatIndex ==0){
            $(".edit-popups-content").show();
            $(".second-item-popups-content").hide();
        }
        else if(thatIndex ==1){
            $(".second-item-popups-content").show();
            $(".edit-popups-content").hide();
        }
        $(".editbottom-line").removeClass("has-line");
        $(".editbottom-line").eq(thatIndex).addClass("has-line");
    }
    /*$(document).on("click",".cancel-chosen-firm",function(){
        var that = this;
        var pId = $(".item-template").eq(index).attr("data-id");
        var chosenCompanyId = $(this).parents(".secondsecond-company-message").find(".second-company-name").attr("data-firmid");
        layer.confirm('公司整体取消关联吗？', {
            btn: ['取消','确定'], //按钮
            title: false,
            closeBtn:0,
            shadeClose:true,
        }, function() {
            layer.closeAll();
        },function(){
            getData(myUrl+'project/delProjectandCompany','post',{loginId :eId,token :eIdToken,pId :pId,companyId :chosenCompanyId},
            function(data){                
                console.log("ajax公司整体取消关联");
                if($(that).parents(".secondsecond-chosen-firm").find(".second-employee-name").attr("data-loginid") == eId){
                    layer.msg("当前公司的下的账户不能取消关联");
                }else{
                    $(that).parents(".secondsecond-chosen-firm").remove();
                }
                
           }); 
        });        
    });*/
    $(document).on("click",".cancel-chosen-firm",function(){
        var that = this;
        var pId = $(".item-template").eq(index).attr("data-id");
        var chosenCompanyId = $(this).parents(".secondsecond-company-message").find(".second-company-name").attr("data-firmid");
        getData(myUrl+'project/delProjectandCompany','post',{loginId :eId,token :eIdToken,pId :pId,companyId :chosenCompanyId},
        function(data){                
            console.log("ajax公司整体取消关联");
            if($(that).parents(".secondsecond-chosen-firm").find(".second-employee-name").attr("data-loginid") == eId){
                layer.msg("当前公司的下的账户不能取消关联");
                return;
            }else{                    
                layer.confirm('公司整体取消关联吗？', {
                    btn: ['取消','确定'], //按钮
                    title: false,
                    closeBtn:0,
                    shadeClose:true,
                }, function() {
                    layer.closeAll();
                },function(){
                   $(that).parents(".secondsecond-chosen-firm").remove();  
                }); 
            }                
       });
    });

    $(".cancel-edit").on("click",function(){
        $(this).parents(".input-material-sort").hide();
        $(".add-material-sort").show();
    });
   
   /*账户设置重写*/
    $(".myAccount-manage").on("click",function(){
        myAccountChangeTabStyle(this);
    });
    function myAccountChangeTabStyle(obj){
        $('.myAccount-manage').removeClass("nav-active has");
        $(obj).addClass("has nav-active");
        var thisMyaccountIndex= $('.myAccount-manage').index(obj);
        console.log(thisMyaccountIndex);
        if(thisMyaccountIndex==0){
            $("#personal-data").show();
            $("#account-bind").hide();
            $("#account-password").hide();
        }
        else if(thisMyaccountIndex==1){
            $("#personal-data").hide();
            $("#account-password").hide();
            var personDataTell = $("#nav-tellphone").val();
            var personDataEmail = $("#nav-email").val();
            if(personDataTell==""){

                $("#immediateBind").text("绑定");
            }else{
                $("#immediateBind").text("解绑");
                $("#bindphone").val(personDataTell);
            }
            if(personDataEmail==""){
                $("#btnEmailBind").text("绑定");
            }else{
                $("#btnEmailBind").text("解绑");
                $("#bindEmail").val(personDataEmail);
            }
            $("#account-bind").show();
        }
        else if(thisMyaccountIndex==2){
            $("#oldPwd").val("");
            $("#newId").val("");
            $("#reNewPwd").val("");
            $("#account-password").show();
            $("#personal-data").hide();            
            $("#account-bind").hide();

        }   
    }
    headPortrait('myAccountImgContainer','myAccountImgbtn');
    $("#myAccountnewclose").on("click",function(){
        $(".myaccount-box-cover").hide();
    });
    function getUserByLoginId(wloginID,wtoken){
        getData(myUrl+'/user/getUserByLoginId','post',{loginId :wloginID,token :wtoken},function(data){
            console.log("根据登录编号获取用户",data.result);
            $("#user_name").text(data.result.uName);
            /*if(typeof($(".myAccount-new-headerImg").val("data-fileId") == undefined)){

            }else{
            $("#user_header_img").attr("src","http://192.168.3.31:8080/bim/getPic?token=" + wtoken + "&loginId=" + wloginID + "&fileId=" +data.result.headPic)
            }*/
            if(data.result.headPic == ""){
                //
            }else{
               $("#user_header_img").attr("src","http://192.168.3.31:8080/bim/getPic?token=" + wtoken + "&loginId=" + wloginID + "&fileId=" +data.result.headPic); 
            }
        });
    }
});
/*两个数组的相同项*/
function  FilterData(a,b){
  //循环判断数组a里的元素在b里面有没有，有的话就放入新建立的数组中
    var result = new Array();
    var c=b.toString();
    for(var i=0;i<a.length;i++)
    {
      if(c.indexOf(a[i].toString())>-1)
      {
      result.push(a[i]);
      }      
    }
    return result;
}
/*两个数组中的的不同项*/
function unitArr(c,d){
    var temp = [];  
    var temparray = [];     
    for (var i = 0; i < d.length; i++) {      
        temp[d[i]] = true; 
     };      
    for (var i = 0; i < c.length; i++) {     
        if (!temp[c[i]]) {          
            temparray.push(c[i]);       
        } ;      
    };
    return temparray;
}
/*删除的项*/
function noExistArr(f,g){
    var c = [];
    var tmp = f.concat(g);
    var o = {};
    for (var i = 0; i < tmp.length; i ++) (tmp[i] in o) ? o[tmp[i]] ++ : o[tmp[i]] = 1;
    for (x in o) if (o[x] == 1) c.push(x);
    return c;
}
function drawCanvas(){
    var cv = document.getElementById('canvasValue');
    var canvas = cv.getContext('2d');
    //十字线
    canvas.clearRect(0, 0, 200, 160);
    canvas.beginPath();
    canvas.moveTo(100, 25);
    canvas.lineTo(100, 125);
    canvas.moveTo(40, 80);
    canvas.lineTo(160, 80);
    canvas.lineWidth = 3;
    canvas.strokeStyle = "white";
    canvas.stroke();
    canvas.closePath();
    //文字
    canvas.beginPath();
    canvas.fillText("创建项目", 79, 148);
    canvas.strokeStyle = "white";
    canvas.stroke();
    canvas.closePath();
}
function itemsManageShow(){
    $('.project-manage').css('display','block');
    $('.bNine').css('display','none');
    $('.container-myAccount-new').css('display','none');
    $('.b7').css('display','none');
    $('.b6').css('display','none');
    $('.b5').css('display','none');
    $('.b8').css('display','none');
}
function unitManageShow(){
    $('.bNine').css('display','none');
    $('.project-manage').css('display','none');
    $('.container-myAccount-new').css('display','none');
    $('.b5').css('display','none');
    $('.b6').css('display','none');
    $('.b7').css('display','block');
    $('.b8').css('display','none');
}
function systemManageShow(){
    $('.bNine').css('display','block');
    $('.project-manage').css('display','none');
    $('.container-myAccount-new').css('display','none');
    $('.b5').css('display','none');
    $('.b6').css('display','none');
    $('.b7').css('display','none');
    $('.b8').css('display','none');
}
function userManageShow(){
    $('.project-manage').css('display','none');
    $('.b5').css('display','block');
    $('.container-myAccount-new').css('display','none');
    $('.bNine').css('display','none');
    $('.b6').css('display','none');
    $('.b7').css('display','none');
    $('.b8').css('display','none');
} 
/*退出登录上面的用户管理*/
function navAcountSetShow(){
    $('.project-manage').css('display','none');
    $('.b5').css('display','none');
    $('.container-myAccount-new').css('display','block');
    $('.bNine').css('display','none');
    $('.b6').css('display','none');
    $('.b7').css('display','none');
    $('.b8').css('display','none');
} 
function alertResult(msg, type) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    if(type == "success") {
        toastr.success(msg);
    } else {
        toastr.error(msg);
    }
}
function refresh(){
    window.location.reload();//刷新当前页面.
}
function getHttpHead(s) {
    var r = new RegExp("(http.*\/\/[^\/]+\/)");
    var a = r.exec(s);
    if(a) {
        return a[1];
    }
}
//drawCanvas();
function editwenjianuploader(){
    var $list = $('#fileContain');
    /*$list.on("click", ".webuploader-pick",function(){
        //$(".webuploader-pick").remove();
        //uploader.removeFile( file );
        uploader.removeFile( file );
    })*/
    var ratio = window.devicePixelRatio || 1; 
    var thumbnailWidth = 100 * ratio;
    var thumbnailHeight = 100 * ratio; 
    var uploader = WebUploader.create({ 
        auto: true,
        formData:{
            uid: 123
        },
        swf:'Uploader.swf',
        chunked : true,
        chunkSize: 1024 * 1024,
        threads:1,
        server: 'http://192.168.3.31:8080/bim/upload?token=' +eIdToken +"&loginId=" +eId,
        fileVal:'test',
        pick: '#aginChoose',
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        compress : false        
    });

    uploader.on( 'fileQueued', function( file ) {
        console.log("file",file);
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<img>' +
                '</div>'
                ),
            $img = $li.find('img');
        //$list.append( $li );
       
        //$("#defaultImg").hide();
        //$(".webuploader-pick").css("top","-50px");
 
        // 创建缩略图
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            } 
            //$img.attr( 'src', src );
           // $(".neIMg").attr("src",src);
            $(".editdefaultImg").attr("src",src);
        }, thumbnailWidth, thumbnailHeight );
    });

    uploader.on( 'uploadSuccess', function( file,data ) {
        $( '#'+file.id ).addClass('upload-state-done');
        console.log("data",data);
        $("#editItemCover").attr("data-fileId",data.result.fileId);
        console.log("路径",data.result.tempFileDir + data.result.fileId);
        uploader.reset();
    });

    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');
 
        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }
 
        $error.text('上传失败!!!');
    });
 
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
        uploader.reset();
    });
    /*$list.on("click", ".webuploader-pick",function(){
        //$(".webuploader-pick").remove();
        //uploader.removeFile( file );
        uploader.removeFile( file );
    })*/
} 
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if(r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
//头像上传
function headPortrait(imgContain, imgBtn){
    var $list = $('#' +imgContain);
    var ratio = window.devicePixelRatio || 1; 
    var thumbnailWidth = 80 * ratio;
    var thumbnailHeight = 80 * ratio; 
    var uploader = WebUploader.create({ 
        auto: true,
        formData:{
            uid: 123
        },
        swf:'Uploader.swf',
        chunked : true,
        chunkSize: 1024 * 1024,
        threads:1,
        server: 'http://192.168.3.31:8080/bim/upload?token=' +eIdToken +"&loginId=" +eId,
        fileVal:'test',
        pick: '#'+imgBtn,
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        compress : false        
    });

    uploader.on( 'fileQueued', function( file ) {
        console.log("file",file);
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<img>' +
                '</div>'
                ),
            $img = $li.find('img');
 
        $list.append( $li );
        $(".webuploader-pick").css("top","-30px");
 
        // 创建缩略图
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }             
            $(".myAccountImgFault").attr("src",src);
        }, thumbnailWidth, thumbnailHeight );
    });

    uploader.on( 'uploadSuccess', function( file,data ) {
        $( '#'+file.id ).addClass('upload-state-done');
        console.log("data",data);
        $(".myAccount-new-headerImg").attr("data-fileId",data.result.fileId);
        console.log("路径",data.result.tempFileDir + data.result.fileId);
    });

    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');
 
        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }
 
        $error.text('上传失败!!!');
    });
 
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
    });
}
