$(function(){
	/*var width = $(window).width();
	var rightWidth = width - 200;
	console.log("rightWidth",rightWidth);
	$(".bNineContent").css("width",rightWidth);

	$(window).resize(function(){
		$(".bNineContent").css("width","76.7%");
	});*/

	/*pageLimiteAjax(myUrl+'project/projectDelete','post',{loginId :eId,token :eIdToken,deletelist :JSON.stringify(getIdArr)},
    function(data){
        
    })*/
	$("#psy-aside-show-btn").on("click",function(){
		$(".bNine").toggleClass("narrowLeftMenu");
		$(this).children("img").toggleClass("imgrotate");
		$(".bNineLeft ul").toggle();
	});

	//处理ajax
    function pageLimiteAjax(url, method,parm,callback){
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
    //页面加载时获取获取全部角色
    pageLimiteAjax(myUrl+'/permission/rolelist','post',{loginId :eId,token :eIdToken},
    function(data){
    	var roleData = data.result;
        console.log("页面加载时获取获取全部角色roleData",roleData);
        var roletmp = template("limit-table-body",roleData);
        $("#message-list-content").append(roletmp);
    });
    
    $("#limit-add").on("click",function(){
        $(".limit-role-name").val("");
        $(".limit-sort").val("");
        $(".limit-describe").val("");
    	$("#add-message-do").show();
    });

    $("#message-cancel").on("click",function(){
    	$("#add-message-do").hide();
    });
    //添加角色
    $("#message-save").on("click",function(){
    	var that =this;
    	var roleName = $(".limit-role-name").val();
    	var sort = $(".limit-sort").val();
    	var describe = $(".limit-describe").val();
    	var objRole = {
    		name :roleName,
    		roleSeq :sort,
    		description :describe
    	}
    	if(roleName =="" || sort =="" || describe ==""){
        	layer.msg("请输入角色名称,排序,描述,保证输入的信息完整");
        	$(".limit-role-name").focus();
        }else{
	    	pageLimiteAjax(myUrl+'/permission/createRole','post',{loginId :eId,token :eIdToken,roleName:roleName,order:sort,remake:describe,type:1},
		    function(data){
		        var addRole = template("limit-table-body",[objRole]);
	        	$("#message-list-content").append(addRole);
	        	$(that).parents("#add-message-do").hide();
		    })
		}
    });
    $("#limit-role-name,#limit-describe").keyup(function(){
        if($(this).val().length>4){
            var word = $(this).val().split("").splice(0,6).join("");
            $(this).val(word)
        }
    })
    //删除角色
    $(document).on("click",".limit-remove",function(){
    	var that =this;
        var deleteListId = $(that).parents("tr").attr("data-id");                          
        pageLimiteAjax(myUrl+'/permission/updateRoleDeleteStatu','post',{loginId :eId,token :eIdToken,deleteList :JSON.stringify([deleteListId])},
        function(data){
            var code = data.code;
            layer.confirm('确定删除该角色吗？', {
                btn: ['取消','确定'], //按钮
                title: false,
                closeBtn:0,
                shadeClose:true,
            }, function() {
                layer.closeAll();
            },function(){
                if(code == 20004){
                    layer.msg("角色和人员存在关联信息，无法删除角色");
                }
                else if(code == 0) {
                    $(that).parents("tr").remove();
                    layer.msg("角色删除成功");
                }                
            });            
        });    	
    });
    //修改角色
    $(document).on("click",".limit-modify",function(){
        var that = this;
    	var rank = $(this).parents("tr").find(".rank").text();
        var character = $(this).parents("tr").find(".character").text();
        var wdescription = $(this).parents("tr").find(".wdescription").text();
        var idPartens = $(this).parents("tr").attr("data-id");
        var roletypePartens = $(this).parents("tr").attr("data-roletype");
        $(".modify-role").val(character);
        $(".modify-rank").val(rank);
        $(".modify-wdescription").val(wdescription);
    	layer.open({
            type: 1,
            btn: ['确定'], //按钮
            title: false,
            closeBtn:0,
            shadeClose:true,
            content: $('.layer_notice'),
            yes: function(index, layero){
                var modifyRole = $(".modify-role").val();
                var modifyRank= $(".modify-rank").val();
                var modifyDescription = $(".modify-wdescription").val();
                pageLimiteAjax(myUrl+'/permission/updateRole','post',{loginId :eId,token :eIdToken,order :modifyRank,remake :modifyDescription,roleType :roletypePartens,roleName :modifyRole,roleId :idPartens},
                function(data){
                    $(that).parents("tr").find(".rank").text(modifyRank);
                    $(that).parents("tr").find(".character").text(modifyRole);
                    $(that).parents("tr").find(".wdescription").text(modifyDescription);
                    layer.closeAll();
                })
            }
        });
    });
    //搜索
    $("#limits-search").keydown(function(){
        var search = $(this).val();
        if(event.keyCode == "13"){
            pageLimiteAjax(myUrl+'/permission/serach/' + search,'post',{loginId :eId,token :eIdToken},
            function(data){
                $("#message-list-content tr").remove();
                var searchResult = data.result;
                var searchResultTbody = template("limit-table-body",searchResult);
                $("#message-list-content").append(searchResultTbody);
            })
        }
    });
    //编辑权限
    $('#limitClose-box').click(function() {
        $('#limitbox-cover').hide();
        $('#limitbox-cover #limitpopups-box').hide();
    });
    $("#inputItemsName").focus(function(){
        selectItemName();
    })
    function selectItemName() {
        $("#showItemData").css("display","block");
        $(".tem-itemName-li").mousedown(function() {
            $("#inputItemsName").val($(this).html());
            $("#inputItemsName").attr("data-pid",$(this).attr("data-pid"));
        });
    }
    $("#inputItemsName").focusout(function() {
        $("#showItemData").slideUp(300);
    });
    var limitIndex;
    $(document).on("click",".limit-edit",function(){
        limitIndex = $(".limit-edit").index(this);
        console.log(limitIndex);
        $('#limitbox-cover').show();
        $('#limitbox-cover #limitpopups-box').show();
        pageLimiteAjax(myUrl+'project/roleProject','post',{loginId :eId,token :eIdToken},
        function(data){
            if(data.code == 0){
                $("#showItemData li").remove();
                var searchItemName = template("temItemNameLi",data.result);
                $("#showItemData").append(searchItemName);
            }
        });
    });
    
})
 