//page-1-a2
//文字处理
$(function(){
	$(document).ready(function() {
		 $('.c5list li').tooltipster();
		 $(".c622list li").tooltipster();
	});
})
//page-1-b5用户管理
//var pageNumberList;
// function mangerWin(){
// 	$.ajax({
// 		type:"POST",
// 		url:myUrl+"user/select",
// 		data:{loginId:eId,pageNum:1,token:eIdToken},
// 		cache:false,
// 		success:function(data){
// 			// var data1=JSON.parse(data);//字符串转为对象
// 			// //console.log(data);
// 			// toastr.success(11)
// 			if(data.code == 0){
// 				// var tr="";
// 				// data.result.forEach(function(item,index){
// 				// 	// //console.log(item);
// 				// 	tr=$("ul.b5-tbody li:hidden").clone();
// 				// 	tr.removeAttr("hidden");
// 				// 	tr.attr("id",item.uId);
// 				// 	tr.children("span").eq(0).attr("loginId");
// 				// 	tr.children("span").eq(1).html(item.loginName.loginName);
// 				// 	tr.children("span").eq(2).html(item.uName);
// 				// 	tr.children("span").eq(3).html(item.uPhone);
// 				// 	tr.children("span").eq(4).html(item.companyName.name);
// 				// 	tr.children("span").eq(5).html(item.uCreateTime);
// 				// 	$("ul.b5-tbody").append(tr);
// 				// });
// 				var pageNumberList="";
// 				data.result.forEach(function (item,index) {
// 					// //console.log(item);
// 					pageNumberList=
// 						'<li class="b5list" id='+item.uId+' lId='+item.lId+'>' +
// 						'<span class="selected-delete"><input type="checkbox" name="userName"></span>'+
// 						'<span id="beforeId">'+item.loginName.loginName+'</span>'+
// 						'<span id="beforeName">'+item.uName+'</span>'+
// 						'<span id="beforePhone">'+item.uPhone+'</span>'+
// 						'<span id="beforeAddress">'+(item.companyName==null?'':item.companyName.name)+'</span>'+
// 						'<span id="beforeTime">'+item.uCreateTime+'</span>'+
// 						'<span class="b5-tbodyEidit"><span class="exit">编辑</span><span class="mangerLimit">设置角色</span><span class="b5delete">删除</span></span>'+
// 						'</li>';
// 					$('ul.b5-tbody').append(pageNumberList);
// 					//移除重复的
// 					var lis=$("ul.b5-tbody li");
// 					lis.each(function(index,item,input){
// 						if(index>data.result.length-1){
// 							lis[index].remove();
// 						}
// 					});
// 				});
// 			}
// 			// else if(data.code == 10001|| data.code == 10002 || data.code == 10003){
// 			// 	toastr.error('身份过期，请重新登录')
// 			// }
// 		},
// 		error:function(data){
//
// 		}
// 	})
// }
// $(function(){
// 	// //用户列表
// 	// $(".Manger").click(function(){
// 	// 	//先清空
// 	// 	mangerWin();
// 	// });
// 	// $('.mangerWin').click(function(){
// 	// 	mangerWin();
// 	// });
//
// });
//page-1-b7单位管理
// function UnitWin(){
// 	var pageSelectNUM=$('.b7-tbody').attr('selectId');
// 	$.ajax({
// 		type:"POST",
// 		url:myUrl+"company/select",
// 		data:{pageNum:1,loginId:eId,token:eIdToken},
// 		success:function (str) {
// 			//var data =JSON.parse(str);
// 			if(str.code == 0){
// 				var data=str;
// 				//console.log(str);
// 				var tr="";
// 				str.result.forEach(function (item,index) {
// 					pageNumberList=
// 						'<li class="b7list" id='+item.id+'>' +
// 						'<span class="b7TbodyInput"><input type="checkbox" name="userName"></span>'+
// 						'<span>'+item.name+'</span>'+
// 						'<span>'+item.companyPhone+'</span>'+
// 						'<span>'+item.companyAddress+'</span>'+
// 						'<span>'+item.createTime+'</span>'+
// 						'<span class="b7-tbodyEidit"><span class="exitb7">编辑</span><span class="deleteb7">删除</span></span>'+
// 						'</li>';
// 					$('ul.b7-tbody').append(pageNumberList);
// 				});
// 				//移除重复的
// 				var lis=$("ul.b7-tbody li");
// 				lis.each(function(index,item,input){
// 					if(index>data.result.length-1){
// 						lis[index].remove();
// 					}
// 				});
// 			}
// 			// else if(str.code == 10001|| str.code == 10002 || str.code == 10003){
// 			// 	toastr.error('身份过期，请重新登录')
// 			// }
// 		},
// 		error:function () {
//
// 		}
// 	})
// }
// $(function(){
// 	$('.Unit').click(function(){
// 		UnitWin();
//     });
// 	$(".UnitWin").click(function () {
// 		UnitWin();
// 	});
// 	//编辑
// 	// var thisId="";
// 	// $(".b7-tbody").on('click',"span .exitb7",function(){
// 	// 	//添加创建单位的类型
// 	// 	var unitItem=
// 	// 		[{'id':'1','name':'业主单位'},
// 	// 			{'id':'2','name':'勘察单位'},
// 	// 			{'id':'3','name':'设计单位'},
// 	// 			{'id':'4','name':'施工单位'},
// 	// 			{'id':'5','name':'监理单位'}
// 	// 		];
// 	// 	var unitType="";
// 	// 	unitItem.forEach(function (item,index){
// 	// 		unitType='<option uitId='+item.id+'>'+item.name+'</option>';
// 	// 		//编辑
// 	// 		$('.b7selType').append(unitType);
// 	// 	});
// 	// 	//编辑移除重复
// 	// 	var unitList=$('.b7selType option');
// 	// 	unitList.each(function(index,item){
// 	// 		if(index>unitItem.length -1){
// 	// 			unitList[index].remove();
// 	// 		}else{
//     //
// 	// 		}
// 	// 	});
// 	// 	thisId=$(this).parents("li").attr("id");
// 	// 	// //console.log()
// 	// 	// //console.log(thisId);
// 	// 		$(".b7Exit").css("display","block");
// 	// 		$('#popLayer').css('display','block');
// 	// 		var val1=$(this).parents("li").children("span").eq(1);
// 	// 		var val2=$(this).parents("li").children("span").eq(2);
// 	// 		var val3=$(this).parents("li").children("span").eq(3);
// 	// 		var val4=$(this).parents("li").children("span").eq(4);
// 	// 		$("#cmpName").attr("value",val1.html());
// 	// 		$("#cmpPhone").attr("value",val2.html());
// 	// 		$("#cmpAddress").attr("value",val3.html());
// 	// 		$("#cmpTime").attr("value",val4.html());
// 	// 		//保存
// 	// 		$("#b71Save").unbind('click');
// 	// 		$("#b71Save").on("click",function(){
// 	// 			if($('#cmpName').val()=='' || $('#cmpAddress').val()=='' || $('#cmpPhone').val()==''){
// 	// 				toastr.error('内容不得为空！');
// 	// 				return false;
// 	// 			}else if($('#cmpName').val().length>50){
// 	// 				toastr.error('单位名称长度不能超过50！');
// 	// 				return false;
// 	// 			 }else if($('#cmpAddress').val().length>50){
// 	// 	            toastr.error('单位地址长度不能超过50！');
// 	// 				return false;
// 	// 	        }else if($('#cmpPhone').val().length>11){
// 	// 	            toastr.error('联系方式长度不能超过11！');
// 	// 				return false;
// 	// 	        }
//      //            //手机号码正则判断
// 	// 			if($('#cmpPhone').val()==""){
// 	// 			}else{
// 	// 				regUrl = /^1\d{10}$/.test($('#cmpPhone').val());
// 	// 				if(!regUrl){
// 	// 					layer.msg("号码有误，请重填");
// 	// 					$(this).focus();
// 	// 					return false;
// 	// 				}
// 	// 			}
// 	// 			var unitTypeId=$('.b7selType').children("option:selected").attr('uitId');
// 	// 			var afterVal1 = $("#cmpName").val();    //单位名称
// 	// 			var afterVal2 = $("#cmpPhone").val();   //联系方式
// 	// 			var afterVal3 = $("#cmpAddress").val(); //单位地址
// 	// 			var afterVal4 = $("#cmpTime").val();    //创建时间
// 	// 			//后台传值
// 	// 			var formData = new FormData();
// 	// 			formData.append("loginId", eId);
// 	// 			formData.append("token", eIdToken);
// 	// 			formData.append("companyName", afterVal1);
// 	// 			formData.append("companyAddress",afterVal3);
// 	// 			formData.append("companyType", unitTypeId);
// 	// 			formData.append("companyPhone",afterVal2);
// 	// 			$.ajax({
// 	// 				data: formData,
// 	// 				type: 'POST',
// 	// 				dataType: 'json',
// 	// 				processData: false,
// 	// 				contentType: false,
// 	// 				url: myUrl + "company/updateCompany/"+thisId,
// 	// 				success: function (data) {
// 	// 					if (data.code == 0) {
// 	// 						// //console.log(data);
// 	// 						//页面传值
// 	// 						val1.html(afterVal1);
// 	// 						val2.html(afterVal2);
// 	// 						val3.html(afterVal3);
// 	// 						val4.html(afterVal4);
// 	// 						UnitWin();
// 	// 						$(".b7Exit").css("display", "none");
// 	// 						$('#popLayer').css('display', 'none');
// 	// 					}
// 	// 					// else if (data.code == 10001 || data.code == 10002 || data.code == 10003) {
// 	// 					// 	toastr.error('身份过期，请重新登录！');
// 	// 					// } else if (data.code == 20014) {
// 	// 					// 	toastr.error('该名字公司已存在，请重新输入！');
// 	// 					// } else {
// 	// 					// 	toastr.error("请求错误！");
// 	// 					// }
// 	// 				},
// 	// 				error: function (data) {
// 	// 					toastr.error("修改失败！");
// 	// 				}
// 	// 			})
// 	// });
// 	// //close
// 	// $(".b71Close").on("click",function(){
// 	// 	$(".b7Exit").css("display","none");
// 	// 	$('#popLayer').css('display','none');
// 	// })
// 	// });
// 	//删除
// 	// $(document).on('click',".b7-tbody span .deleteb7",function(){
// 	// 	$(this).parents("li").remove();
// 	// 	// //console.log($(this).parents("li").attr("id"));
// 	// 	var userId=JSON.stringify(new Array($(this).parents("li").attr("id")));
// 	// 	// //console.log(userId)
// 	// 	// toastr.warning("确定要删除此用户吗？");
// 	// 	$.ajax({
// 	// 		type:"POST",
// 	// 		// data:$.param({userId:userId}),
// 	// 		data:{companyIdjson:userId,loginId:eId,token:eIdToken},
// 	// 		url:myUrl+"company/updateIsDelete", //后台提供的删除接口
// 	// 		dataType:'json',
// 	// 		success:function(data){
// 	// 			//console.log(data);
// 	// 			if(data.code == 0){
// 	// 				toastr.success('删除成功');
// 	// 			}
// 	// 		},
// 	// 		error:function(data){
// 	// 		}
// 	// 	})
// 	// })
// });
// $('.cSixShow').click(function(){
// 	$.ajax({
// 		type:'POST',
// 		url:myUrl+'equipment/selectCount',
// 		data:{loginId:eId,token:eIdToken},
// 		success:function(selectCount){
// 			// //console.log(selectCount);
// 			var pagecoung =Math.ceil(selectCount.result/15);
// 			$('.b7-tbody').attr('selectId',pagecoung);
// 			$(".zxf_pagediv").createPage({
// 				pageNum: pagecoung,
// 				current: 1,
// 				backfun: function(e) {
// 					////console.log(e);//回调
// 				}
// 			});
// 		}
// 	})
// });
	
/*人员管理*/
$(function(){
	//获取总页数
	var pages;
	//每页出现的数量
    var nums = 15; 
    //类型点击的ID
    var typeId;
	//删除文件的数组初始化
	var delArr=[];
	//添加的文件ID
	var addfileIds=[];
	//编辑的文件ID
	var exitfileIds=[];
	//类型值
	var thisVal;
	var userId;
	//点击人员管理
	$(".cFiveShow").on("click",function(){
		$(".c5list").remove();
		delArr=[];
		addfileIds=[];
		exitfileIds=[];
		//c5count();
		//获取类型
	    $.ajax({
	        type:"POST",
	        url:myUrl+"personClass/selectPersonClassByparentClassId",
	        data:{
	        	parentClassId:0,loginId:eId,token:eIdToken
	        },
	        success:function (data) {
	        	// //console.log(data.result);
				if(data.code == 0){
					var a="";
					data.result.forEach(function(item,index){
						//if(item.parentClassId==0){
						if(index==0){
							a=$("<a href='#' class='active3' id='"+item.cid+"'>"+item.cname+"</a>");
						}else{
							a= $("<a href='#' id='"+item.cid+"'>"+item.cname+"</a>");
						}
						$(".c5type").append(a);
						//}
					});
					//模拟展示一个
					//$(document).ready(function () {
						//模拟第一个
					$(".c5type>a").eq(0).trigger("click");
					//});
					//移除重复的
					var types=$(".c5type a");
					types.each(function(index,item,input){
						if(index>data.result.length-1){
							types[index].remove();
						}
					});
				}else if(data.code == 20002){
                    toastr.error('账户或密码错误');
                }else if(data.code == 20006){
                    toastr.error("用户名不存在");
                }else if(data.code ==20004){
                    toastr.error('数据处理失败');
                }else if(data.code==20005){
                    toastr.error('暂无数据');
                }else if(data.code==20014){
                    toastr.error('同名任务已存在');
                }else if(data.code==20012){
                    toastr.error('配置参数名称已存在');
                }else if(data.code==20009){
                    toastr.error('过期操作');
                }
	        },
	        error:function(data){

	        }
	    });
		//添加弹框
		//类型选择框
		$.ajax({
	        type:"POST",
	        url:myUrl+"personClass/selectPersonClassByparentClassId",
	        data:{
	        	parentClassId:0,loginId:eId,token:eIdToken
	        },
	        success:function (data) {
        		// //console.log(data.result);
				if(data.code == 0){
					//添加
					data.result.forEach(function(item,index){
						var opt=$("<option id="+item.cid+">"+item.cname+"</option>");
						$(".c5type1").append(opt);
						// //console.log(opt);
						//移除重复的
						var types=$(".c5type1 option");
						types.each(function(index,item,input){
							if(index>data.result.length-1){
								types[index].remove();
							}
						});
					})
					//编辑
					data.result.forEach(function(item,index){
						var opt=$("<option id="+item.cid+">"+item.cname+"</option>");
						$(".mc5type1").append(opt);
						// //console.log(opt);
						//移除重复的
						var types=$(".mc5type1 option");
						types.each(function(index,item,input){
							if(index>data.result.length-1){
								types[index].remove();
							}
						});
					})
				}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
        	},
        	error:function(data){

        	}
        })
	})
    //搜索
    var c5search;
    $("#c5Find").on("click",function(){
		c5search=$(".c5search").val();
		//console.log(c5search);
		if(c5search.length==0){
			toastr.error("搜索内容不能为空！");
		}else{
			$("#c5Find").css("display","none");
			$("#c5FindClose").css("display","block");
			//console.log(typeId);
			//搜索获取总页数
	        // $.ajax({
	        //     type:'POST',
	        //     url:myUrl+'person/personCount/'+typeId,
	        //     data:{loginId:eId,token:eIdToken,proId:pId,condition:c5search},
	        //     success:function(data){
	        //     	if(data.code==0){
	        //     		//console.log(data.result);
	        //     		pages=Math.ceil(data.result/nums); //得到总页数
		       //          //console.log(pages);
		       //          //c5searchFun();
	        //     	}
	        //         // else if(data.code==10001||data.code==10002||data.code==10003){
		       //  	// 	toastr.error('身份过期，请重新登录！');
		       //  	// }else{
		       //  	// 	toastr.error("请求错误！");
		       //  	// }
	        //     }
	        // })
	        c5searchPerson();
	        c5handles();
		}
    })
    //c5search();
    //搜索展示列表
    var c5searchCurr;
	function c5searchPerson(curr){
		var _this="";
		_this=$("#cFiveList");
		var pageSize = 15;//每页展示的条数
		$.ajax({
			//url:"http://192.168.3.149:8080/bim/"+"person/likeSelectPersn",
			url:myUrl+"person/likeSelectPersn",
			data:{pageNum:curr||1,personClassId:typeId,loginId:eId,token:eIdToken,pId:pId,condition:c5search},
			type:'POST',
			dataType:'json',
	        success:function (data) {
	        	//console.log(data);
	        	//console.log(data.result.personlist);
	        	if(data.code==0){
	        		_this.html("");
	        		//console.log(data.result.count);
	        		pages=Math.ceil(data.result.count/nums); //得到总页数
	        		//console.log(pages);
	        		laypage({
					    cont: 'c5page',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
					    pages:pages,//通过后台拿到的总页数pages
					    curr: curr||1, //当前页
					    skip: true, //是否开启跳页
						skin: '#00A63C',//皮肤
						groups: 5, //连续显示分页数
						jump: function(obj, first){ //触发分页后的回调
					        if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					           c5searchCurr=obj.curr;
					           //console.log(obj.curr);
					           c5searchPerson(obj.curr);
					        }
					    }
					})
		        	var len=data.result.length;
		        	if(len==0){
		        		//toastr.error("没有数据！");
		        	}else{
		        		//追加信息
		        		data.result.personlist.forEach(function(item,index){
							var length=index+1;
		        			//多个文件
		        			if (pages > 0){
                                _this.html("");
                                var list=data.result.personlist;
                                //console.log(data.result);
                                for (var i = 0; i < list.length ; i++) {
                                    var filelist=list[i].filelist;
                                    //文件是否为空和写名字
                                    var files=[];
                                    var filesId=[];
                                    var thisId;
                                    var pFile=$('<div></div>');
                                    if(filelist==""){
                                        files=" ";
                                        pFile.html(" ");
                                    }else{
                                        //追加文件
                                        //console.log(filelist);
                                        filelist.forEach(function(item,index,input){
                                            if(item.fname!=""){
                                                files.push(item.fname);
                                                //给每个文件绑ID
                                                oneFile=$('<span class="onefile" id='+item.fid+' title='+item.fname+'>'+item.fname+'</span>');
                                                pFile.append(oneFile);
                                            }
                                        })
                                    }
							var typeId=list[i].personClassList[0].cid;
							var c5list='<ul class="c5list" id='+list[i].pid+'>' +
								'<li style="width:5%;" class="idx"><input type="checkbox" name="c5cc" style="margin-left:0%;margin-right:5px;">'+(i+1)+'</li>' +
								'<li style="width:8%;">'+list[i].pname+'</li>' +
								'<li style="width:10%;">'+list[i].phone+'</li>' +
								'<li style="width:10%;">'+list[i].identity+'</li>' +
								'<li style="width:5%;">'+thisVal+'</li>' +
								'<li style="width:5%;" id='+typeId+'>'+list[i].personClassList[0].cname+'</li>' +
								'<li style="width:8%;">'+list[i].personEnterTime+'</li>' +
								'<li style="width:8%;">'+list[i].personOuterTime+'</li>' +
								'<li style="width:10%;" class="addFile">'+pFile.html()+'</li>' +
								'<li class="c5handle"><span class="exitc5">编辑</span>' +
									'<span class="deletec5">删除</span>'+
								'</li>' +
								'<div style="clear: both"></div>' +
								'</ul>';
							//$(".cFiveList").append(c5list);
							_this.append(c5list);
							 }
                          }else {
                            _this.html("");
                            _this.append("");
                          }
							//移除重复的
				        	var lists=$(".c5list");
				        	lists.each(function(index,item,input){
				        		if(index>data.result.length-1){
				        			lists[index].remove();
				        		}
				        	});
		        		})
		        	}
					c5handles();
				}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    })
	}
    //关闭搜索
	$("#c5FindClose").on("click",function(){
		$("#c5FindClose").css("display","none");
		$("#c5Find").css("display","block");
		$(".c5search").val("");
		//$(".cFiveShow").trigger("click");
		$(".c5type a.active3").trigger("click");
	})
	//根据类型展示列表
	var c5lookCurr;
	function lookPerson(curr){
    	var _this="";
		_this=$("#cFiveList");
		var pageSize = 15;//每页展示的条数
		$.ajax({
	        url:myUrl+"person/PageData",
			data:{pageNum:curr||1,personType:typeId,loginId:eId,token:eIdToken,pId:pId},
			//url:myUrl+"person/likeSelectPersn",
			//data:{pageNum:curr||1,loginId:eId,token:eIdToken,pId:pId,condition:"11"},
			type:'POST',
			dataType:'json',
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code==0){
	        		_this.html("");
	        		//console.log(pages);
	        		laypage({
					    cont: 'c5page',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
					    pages:pages,//通过后台拿到的总页数pages
					    curr: curr||1, //当前页
					    skip: true, //是否开启跳页
						skin: '#00A63C',//皮肤
						groups: 5, //连续显示分页数
						jump: function(obj, first){ //触发分页后的回调
					        if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					           c5lookCurr=obj.curr;
					           //console.log(obj.curr);
					           lookPerson(obj.curr);
					        }
					    }
					})
		        	var len=data.result.length;
		        	if(len==0){
		        		//toastr.error("没有数据！");
		        	}else{
		        		//追加信息
		        		data.result.forEach(function(item,index){
							var length=index+1;
		        			//多个文件
		        			if (pages > 0){
                                _this.html("");
                                var list=data.result;
                                //console.log(data.result);
                                for (var i = 0; i < list.length ; i++) {
                                    var filelist=list[i].filelist;
                                    //文件是否为空和写名字
                                    var files=[];
                                    var filesId=[];
                                    var thisId;
                                    var pFile=$('<div></div>');
                                    if(filelist==""){
                                        files=" ";
                                        pFile.html(" ");
                                    }else{
                                        //追加文件
                                        //console.log(filelist);
                                        filelist.forEach(function(item,index,input){
                                            if(item.fname!=""){
                                                files.push(item.fname);
                                                //给每个文件绑ID
                                                oneFile=$('<span class="onefile" id='+item.fid+' title='+item.fname+'>'+item.fname+'</span>');
                                                pFile.append(oneFile);
                                            }
                                        })
                                    }
							var typeId=list[i].personClassList[0].cid;
							//'<ul class="c6list" id='+list[i].mId+'><li style="width:5%;" class="idx"><input type="checkbox" name="cc">'+(i+1)+'</li>
							var c5list='<ul class="c5list" id='+list[i].pid+'>' +
								'<li style="width:5%;" class="idx"><input type="checkbox" name="c5cc" style="margin-left:0%;margin-right:5px;">'+(i+1)+'</li>' +
								'<li style="width:8%;">'+list[i].pname+'</li>' +
								'<li style="width:10%;">'+list[i].phone+'</li>' +
								'<li style="width:10%;">'+list[i].identity+'</li>' +
								'<li style="width:5%;">'+thisVal+'</li>' +
								'<li style="width:5%;" id='+typeId+'>'+list[i].personClassList[0].cname+'</li>' +
								'<li style="width:8%;">'+list[i].personEnterTime+'</li>' +
								'<li style="width:8%;">'+list[i].personOuterTime+'</li>' +
								'<li style="width:10%;" class="addFile">'+pFile.html()+'</li>' +
								'<li class="c5handle"><span class="exitc5">编辑</span>' +
									'<span class="deletec5">删除</span>'+
								'</li>' +
								'<div style="clear: both"></div>' +
								'</ul>';
							//$(".cFiveList").append(c5list);
							_this.append(c5list);
							 }
                          }else {
                            _this.html("");
                            _this.append("");
                          }
							//移除重复的
				        	var lists=$(".c5list");
				        	lists.each(function(index,item,input){
				        		if(index>data.result.length-1){
				        			lists[index].remove();
				        		}
				        	});
		        		})
		        	}
					c5handles();
				}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    })
	}
	//类型转换,及展示
    $(".c5type").on("click","a",function(){
    	//搜索框
    	$("#c5FindClose").css("display","none");
		$("#c5Find").css("display","block");
		$(".c5search").val("");
    	$(".c5list").remove();
    	$(".c5type a").removeClass("active3");
    	$(this).addClass("active3");
    	typeId=$(this).attr("id");
    	thisVal=$(this).html();
    	//console.log(typeId);
    	$(".c5type1").val(thisVal);
    	//页数交互
	    function c5count(){
	    	$.ajax({
	            type:'POST',
	            url:myUrl+'person/personCount/'+typeId,
	            data:{loginId:eId,token:eIdToken,pId:pId},
	            success:function(data){
	            	if(data.code==0){
	            		//console.log(data);
	            		pages=Math.ceil(data.result/nums);;
		                //console.log(pages);
	            	}else if(data.code==10001||data.code==10002||data.code==10003){
		        		toastr.error('身份过期，请重新登录！');
		        	}else{
		        		toastr.error("请求错误！");
		        	}
	            }
	        })
	    }
	    c5count();
		lookPerson();
    	
	});
	function c5handles(){
	 	//文字超长处理
		$(".c5list").on("mouseover","li",function(){
	 		if(!$(this).hasClass("addFile")&&!$(this).hasClass("c5handle")&&!$(this).hasClass("idx")){
	 			$(this).attr("title",$(this).html());
	 		}
	 	})
		//图片预览
		$(".c5list>li").on("click",".onefile",function(){
			//console.log($(this).attr("id"));
			var thisId=$(this).attr("id");
			$.ajax({
		        url:myUrl+"getPic",
				data:{
					fileId:thisId,
					loginId:eId,
					token:eIdToken
				},
				type:'POST',
		        success:function (data) {
		        	$(".c5photo").css("display","block");
		        	$("#popLayer").css("display","block");
		        	$(".c5photo>img").attr("src",myUrl+"getPic?token=" +eIdToken +"&loginId=" +eId+"&fileId="+thisId);
				},
		        error:function(data){

		        }
		    })
		})
		//关闭照片框
		$("#photoClose").on("click",function(){
			$(".c5photo").css("display","none");
		    $("#popLayer").css("display","none");
		})
    	//编辑
		$(".c5list>li").on("click",".exitc5",function(){
			//删除文件的数组
			delArr=[];
			//添加的文件ID
			exitfileIds=[];
			PhotoUrlArray=[];
			//模拟选择
			$(".mc5type1>option").eq(0).trigger("change");
			userId=$(this).parents(".c5list").attr("id");
			$(".c5Exit").css("display","block");
			$("#popLayer").css("display","block");
			$(".c5Exit input").val("");
			//取列表值
			var aType=$(".c5type a.active3").html();
			var name=$(this).parents(".c5list").children("li").eq(1).html();
			var phone=$(this).parents(".c5list").children("li").eq(2).html();
			var sfz=$(this).parents(".c5list").children("li").eq(3).html();
			var gz=$(this).parents(".c5list").children("li").eq(5).html();
			var start=$(this).parents(".c5list").children("li").eq(6).html();
			var end=$(this).parents(".c5list").children("li").eq(7).html();
			var file=$(this).parents(".c5list").children("li").eq(8).html();
			//传值给编辑框
			var box_name=$(".mc5name").val(name);
		    var box_phone=$(".mc5phone").val(phone);
		    var box_sfz=$(".mc5sfz").val(sfz);
		    var box_typeId=$(".mc5type1").val(aType);
		    var box_gz=$(".mc5gz").val(gz);
		    var box_start=$(".mc5start").val(start);
		    var box_end=$(".mc5end").val(end);
		     var box_file=$(".mc5fileBox").html(file);
		    //文件是否为空和写名字
		    if(file==""){
		    	file="无文件";
		    }else{
		    	file=getFileName(file);
			    function getFileName(o){
				    var pos=o.lastIndexOf("\\");
				    return o.substring(pos+1);  
				}
		    }
		    //点击file选删除
		    var selected=$("<button class='selected'>删除</button>");
			$(".mc5fileBox .onefile").append(selected);
		})
		//选定删除的方法
		function checked(){ 
			var count = 0;
		    var checkArry = document.getElementsByName("c5cc");
            for (var i = 0; i < checkArry.length; i++) { 
                if(checkArry[i].checked == true){
                    //选中的操作
                    $(".c5select-delete").css("display","block");	
                    count++; 
                }
            }
		    if( count == 0 ){
		        $(".c5select-delete").css("display","none");
		    } 
		}
		$(".c5center").on("change",".idx input",function(){
			checked();
		})	
		//删除
		$(".c5list>li").on("click",".deletec5",function(){
			var userArr=[];
			userId=$(this).parents(".c5list").attr("id");
			userArr.push(userId);
			userArr=JSON.stringify(userArr);
			console.log(userArr);
			$.ajax({
		        url:myUrl+"person/deletePerson",
				data:{deleteList:userArr,loginId:eId,token:eIdToken},
				type:'POST',
				dataType:'json',
		        success:function (data) {
		        	// //console.log(data);
		        	if(data.code==0){
						toastr.success("删除成功！");
						$(this).parents().parents(".c5list").remove();
						//模拟重新加载
				    	$(document).ready(function () {
					    	if($("#c5Find").css("display")=="block"){
						    	lookPerson(c5lookCurr);
		        			}else{
		        				c5searchPerson(c5searchCurr);
		        			}
					    });
		        	}
		        	// else if(data.code==10001||data.code==10002||data.code==10003){
		        	// 	toastr.error('身份过期，请重新登录！');
		        	// }else{
		        	// 	toastr.error("请求错误！");
		        	// }
		        },
		        error:function(data){

		        }
		    })
		})
	}
	//选定删除
	$(".c5select-delete").on("click",function(e){
		//e.preventDefault();
		var delArr=[];
		$(".idx input").each(function(index,item){
			 if($(this).get(0).checked){
			 	delArr.push($(this).parents(".c5list").attr("id"));
			 	$(".c5select-delete").css("display","block");
			 }
		});
		delArr=JSON.stringify(delArr);
		console.log(delArr);
		$.ajax({
	        url:myUrl+"person/deletePerson",
			data:{deleteList:delArr,loginId:eId,token:eIdToken},
			type:'POST',
			dataType:'json',
	        success:function (data) {
	        	// //console.log(data);
	        	if(data.code==0){
					toastr.success("删除成功！");
					$(".c5select-delete").css("display","none");
					$(".c5list").remove();
					//模拟重新加载
			    	$(document).ready(function () {
				    	if($("#c5Find").css("display")=="block"){
					    	lookPerson(c5lookCurr);
	        			}else{
	        				c5searchPerson(c5searchCurr);
	        			}
				    });
	        	}
	        	// else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    })
	})
	//添加工种选择框
	$(".c5type1").on("change",function(){
		$(".c5gz").find("option").remove(); 
		var typeId=$(".c5type1").children('option:selected').attr("id");
		// //console.log(typeId);
        $.ajax({
	        type:"POST",
	        url:myUrl+"personClass/selectPersonClassByparentClassId",
	        data:{
	        	parentClassId:typeId,loginId:eId,token:eIdToken
	        },
	        success:function (data) {
	        	// //console.log(data.result);
	        	if(data.code==0){
	        	//添加
	        		data.result.forEach(function(item,index){
	        			// //console.log(typeId);
		        		if(typeId==item.parentClassId){
		        			// //console.log(item.cname);
				        	var opt=$("<option id="+item.cid+">"+item.cname+"</option>");
			    			$(".c5gz").append(opt);
			    			//移除重复的
				        	var types=$(".c5gz option");
				        	types.each(function(index,item,input){
				        		if(index>data.result.length-1){
				        			types[index].remove();
				        		}
				        	});
		        		}
					})
        		}
        		// else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    })
	})
	//编辑工种选择框
	$(".mc5type1").on("change",function(){
		$(".mc5gz").find("option").remove(); 
		var typeId=$(".mc5type1").children('option:selected').attr("id");
		// //console.log(typeId);
	        $.ajax({
		        type:"POST",
		        url:myUrl+"personClass/selectPersonClassByparentClassId",
		        data:{
		        	parentClassId:typeId,loginId:eId,token:eIdToken
		        },
		        success:function (data) {
		        	// //console.log(data.result);
		        	//添加
		        	if(data.code==0){
		        		data.result.forEach(function(item,index){
		        			// //console.log(typeId);
			        		if(typeId==item.parentClassId){
			        			// //console.log(item.cname);
					        	var opt=$("<option id="+item.cid+">"+item.cname+"</option>");
				    			$(".mc5gz").append(opt);
				    			//移除重复的
					        	var types=$(".mc5gz option");
					        	types.each(function(index,item,input){
					        		if(index>data.result.length-1){
					        			types[index].remove();
					        		}
					        	});
			        		}

		        		})
		        	}
		        	// else if(data.code==10001||data.code==10002||data.code==10003){
		        	// 	toastr.error('身份过期，请重新登录！');
		        	// }else{
		        	// 	toastr.error("请求错误！");
		        	// }
		        },
		        error:function(data){

		        }
		    })
	})
	//添加
	$(".c5Add").on("click",function(){
		$(".c5AddBox").css("display","block");
		$("#popLayer").css("display","block");
		$(".c5AddBox input").val("");
		$("#c5thelist").html("");
		//模拟选择
	    $(".c5type1>option").eq(0).trigger("change");
	    PhotoUrlArray=[];
	    addfileIds=[];
	})
	//关框
	$(".closeC5").on("click",function(){
		$(".c5AddBox").css("display","none");
		$(".c5Exit").css("display","none");
		$("#popLayer").css("display","none");
	})
	/*人员管理文件上传*/
	uploadFile('#c5picker',$('#c5thelist'));
	//点击file选删除
    $(".mc5fileBox").on("click",".selected",function(){
		$(this).addClass("delete");
		var delId=$(this).parents(".onefile").attr("id");
		delArr.push(delId);
		$(this).parents(".onefile").remove();
		$(this).remove();
		if($(this).hasClass(".delete")){
			$(this).removeClass("delete");
		}else{
			$(this).addClass("delete");
		}
    });
	//编辑的保存
    $("#exitSave").on("click",function(){
    	$(".c5Exit").css("display","none");
		$("#popLayer").css("display","none");
	    var box_name2=$(".mc5name").val();
	    var box_phone2=$(".mc5phone").val();
	    var box_sfz2=$(".mc5sfz").val();
	    var box_typeId2=$(".mc5type1").children('option:selected').attr("id");
	    var box_gz2=$(".mc5gz").children('option:selected').attr("id");
	    var box_start2=$(".mc5start").val();
	    var box_end2=$(".mc5end").val();
	    var box_file2=$(".mfileBox").val();
	    //传值
		var formData = new FormData();
		formData.append("personId",userId);
		formData.append("pId",pId);
		//删除的文件
    	//console.log(delArr);
		var dd=JSON.stringify(delArr);
		//console.log(dd);
		//添加的文件
		//var fileIds=[];
		var filenames=[];
		for(var i in PhotoUrlArray){
			exitfileIds.push(PhotoUrlArray[i].id);
			filenames.push(PhotoUrlArray[i].fileName);
		}
		//添加的文件ID
		exitfileIds=JSON.stringify(exitfileIds);
		//console.log(exitfileIds);
		//添加的文件名字
		filenames=JSON.stringify(exitfileIds);
		//console.log(filenames);
		formData.append("myfiles",filenames);
	    var personObj={
	    	"pname":box_name2,
	    	"phone":box_phone2,
	    	"identityId":box_sfz2,
	    	"classId":box_typeId2,
	    	"personType":box_gz2,
	    	"enteringTime":box_start2,
	    	"outerTime":box_end2,
	    	"dellist":dd,
	    	"fileIdList":exitfileIds
	    }
	    var person=JSON.stringify(personObj);
	    formData.append("personJson",person);
		formData.append("loginId",eId);
		formData.append("token",eIdToken);
	    $.ajax({
	        url:myUrl+"person/newUpdatePerson",
			data:formData,
			type:'POST',
			dataType:'json',
			processData: false,
	        contentType: false,
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code==0){
		        	//模拟重新加载
			    	//$(".c5type a.active3").trigger("click");
			    	toastr.success("修改成功！");
			    	if($("#c5Find").css("display")=="block"){
				    	lookPerson(c5lookCurr);
        			}else{
        				c5searchPerson(c5searchCurr);
        			}
	        	}else if(data.code==10001||data.code==10002||data.code==10003){
	        		toastr.error('身份过期，请重新登录！');
	        	}else{
	        		toastr.error("请求错误！");
	        	}
			},
	        error:function(data){

	        }
	    })
    });
	//删除的数组
	$(".c5thelist").on("click",".selected",function(){
    	$(this).addClass("delete");
		var delId=$(this).parents(".onefile").attr("id");
		//console.log(delId);
		addfileIds.pop(delId);
		$(this).parents(".onefile").remove();
		$(this).remove();
	});
	//添加的保存
    $("#c5AddSave").click(function(){
    	//模拟重新加载
    	var name=$(".c5name").val();
	    var phone=$(".c5phone").val();
	    var sfz=$(".c5sfz").val();
	    var type1=$(".c5type1").val();
	    var gz=$(".c5gz").val();
	    var gzId=$(".c5gz").children('option:selected').attr("id");
	    var start=$(".c5start").val();
	    var end=$(".c5end").val();
	    var file;
	    //文件是否为空和写名字
	    if(file==""){
	    	file=" ";
	    }else{
	    	file=$("#c5thelist").html();
	    }
	    //||start.length==""||end.length==""
		if(name.length==""||phone.length==""||sfz.length==""||type1.length==""){
			toastr.error("请完善信息，再提交！");
		}else if(name.length>50){
			toastr.error('姓名长度不能超过50！');
		}else if(!/^1\d{10}$/.test(phone)){
			toastr.error("请写入正确的联系方式！");
		}else if(!/\d{15}|\d{18}/.test(sfz)){
			toastr.error("请写入15位或18位正确的身份证！");
		}else{
	    	$(".c5AddBox").css("display","none");
			$("#popLayer").css("display","none");
		    var len=$(".c5list").length+1;
		    //追加
		    var aType=$(".c5type a.active3").html();
			//工种选择框
			var typeId=$(".c5type1").children('option:selected').attr("id");
			//后台传值
			var formData = new FormData();
			//var fileIds=[];
			for(var i in PhotoUrlArray){
				addfileIds.push(PhotoUrlArray[i].id);
				formData.append("myfiles",PhotoUrlArray[i].fileName);
			}
			//console.log(addfileIds);
			addfileIds=JSON.stringify(addfileIds);
			formData.append("pId",pId);
			formData.append("loginId",eId);
		    formData.append("classId",typeId);
		    formData.append("token",eIdToken);
		    formData.append("personName",name);
		    formData.append("personPhone",phone);
		    formData.append("identityId",sfz);
		    formData.append("personType",gzId);
		    formData.append("personEnterTime",start);
		    formData.append("personOuterTime",end);
		    formData.append("fileIdList",addfileIds);
			$.ajax({
		        url:myUrl+"person/personManger",
		        type:'POST',
				dataType:'json',
				data:formData,
				cache:false,
				processData:false,
				contentType:false,
			        success:function (data) {
			        	//console.log(data);
			        	if(data.code=="0"){
			        		toastr.success("添加成功！");
			        		$(".c5type a.active3").trigger("click");
			        	}
			        	// else if(data.code==10001||data.code==10002||data.code==10003){
			        	// 	toastr.error('身份过期，请重新登录！');
			        	// }else{
			        	// 	toastr.error("请求错误！");
			        	// }
			        },
			        error:function(data){
			        	// //console.log(data);
			        }
		    })
		}
    })
	//人员管理编辑文件上传
	uploadFile('#c51picker',$('#c51thelist'));
});
/*c622 设备管理*/
$(function(){
	//获取总页数
	var pages;
	//每页出现的数量
    var nums = 15; 
	//删除文件的数组
	var delArr=[];
	//添加的文件ID
	var	addfileIds=[];
	//编辑的文件ID
	var	exitfileIds=[];
	//编辑this
	var $thisExit;
	//编辑Id
	var exitId;
	//点击设备管理
	$(".cSixShow").on("click",function(){
		delArr=[];
		addfileIds=[];
		exitfileIds=[];
		//搜索框
		$("#c6Find").css("display","block");
		$("#c6FindClose").css("display","none");
		$(".c6search").val("");
		$.ajax({
            type:'POST',
            url:myUrl+'equipment/selectCount',
            data:{loginId:eId,token:eIdToken,proId:pId},
            success:function(data){
            	if(data.code==0){
            		pages=Math.ceil(data.result/nums); //得到总页数
	                //console.log(pages);
	                look(1);
            	}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
            }
        })
	})
    //搜索
    var c6search;
    $("#c6Find").on("click",function(){
		c6search=$(".c6search").val();
		//console.log(c6search);
		if(c6search.length==0){
			toastr.error("搜索内容不能为空！");
		}else{
			$("#c6Find").css("display","none");
			$("#c6FindClose").css("display","block");
			//搜索获取总页数
	        $.ajax({
	            type:'POST',
	            url:myUrl+'equipment/selectCount',
	            data:{loginId:eId,token:eIdToken,proId:pId,condition:c6search},
	            success:function(data){
	            	if(data.code==0){
	            		//console.log(data.result);
	            		pages=Math.ceil(data.result/nums); //得到总页数
		                //console.log(pages);
		                c6searchFun();
	            	}
	                // else if(data.code==10001||data.code==10002||data.code==10003){
		        	// 	toastr.error('身份过期，请重新登录！');
		        	// }else{
		        	// 	toastr.error("请求错误！");
		        	// }
	            }
	        })
		}
    })
    //关闭搜索
	$("#c6FindClose").on("click",function(){
		$("#c6FindClose").css("display","none");
		$("#c6Find").css("display","block");
		$(".c6search").val("");
		$(".cSixShow").trigger("click");
	})
	//条件搜索展示列表
	var c6searchCurr;
    function c6searchFun(curr){
		var _this="";
		_this=$("#cSixList");
		var pageSize = 15;//每页展示的条数
		$.ajax({
            type:'POST',
            url:myUrl+'equipment/likeSelect',
            data:{loginId:eId,token:eIdToken,proId:pId,pageNum:curr||1,condition:c6search},
            success:function(data,index){
	            //console.log(data);
            	if(data.code==0){
	                 _this.html("");
	        		laypage({
					    cont: 'c6page',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
					    pages:pages,//通过后台拿到的总页数pages
					    curr: curr||1, //当前页
					    skip: true, //是否开启跳页
						skin: '#00A63C',//皮肤
						groups: 5, //连续显示分页数
						jump: function(obj, first){ //触发分页后的回调
					        if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					           //document.getElementById('cSixList').innerHTML =
					           c6searchCurr=obj.curr;
					           //console.log(obj.curr);
					           c6searchFun(obj.curr);
					        }
					    }
					})
				    $(document).ready(function () {
				    	var len=index+1;
			        	if(len==0){
			        		//toastr.error("没有数据！");
			        	}else{
			        		//追加信息
			        		data.result.forEach(function(item,index){
								var length=index+1;
			        			//多个文件
								//console.log(pages);
								if (pages > 0){
						            _this.html("");
						            var list=data.result;
						            for (var i = 0; i < list.length ; i++) {
							            var filelist=list[i].fileinfoList;
					        			//文件是否为空和写名字
					        			var files=[];
					        			var filesId=[];
					        			var thisId;
					        			var pFile=$('<div></div>');
									    if(filelist==""){
									    	files=" ";
									    	pFile.html(" ");
									    }else{
									    	//追加文件
									    	//console.log(filelist);
											filelist.forEach(function(item,index,input){
												if(item.fname!=""){
													files.push(item.fname);
							        				//给每个文件绑ID
							        				oneFile=$('<span class="onefile" id='+item.fid+' title='+item.fname+'>'+item.fname+'</span>');
												    pFile.append(oneFile);
												}
											})
										}
							             var html='<ul class="c622list" id='+list[i].equId+'>' +
										'<li style="width:6%;" class="idx"><input type="checkbox" style="margin-left:0%;margin-right:5px;" name="cc622">'+(i+1)+'</li>' +
										'<li style="width:11%;">'+list[i].equName+'</li>' +
										'<li style="width:8%;">'+list[i].equNum+'</li>' +
										'<li style="width:11%;">'+list[i].equChargeUser+'</li>' +
										'<li style="width:11%;">'+list[i].equEnterTime+'</li>' +
										'<li style="width:11%;">'+list[i].equOuterTime+'</li>' +
										'<li style="width:17%;" class="addFile">'+pFile.html()+'</li>' +
										'<li class="c622handle"><span class="exitc6">编辑</span>' +
											'<span class="deletec6">删除</span>'+
										'</li>' +'<div style="clear: both"></div>' +
										'</ul>';
							             _this.append(html);
						             	// $(".cSixList").append(html);
						            }
						          }else {
						            _this.html("");
						            _this.append("");
						          }
								//移除重复的
					        	var lists=$(".c622list");
					        	lists.each(function(index,item,input){
					        		if(index>data.result.length-1){
					        			lists[index].remove();
					        		}
					        	});
			        		})
			        	}
			        	c6handle();
				    });
            	}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
            }
        })
    }
    //根据类型展示列表
    var lookCurr;
	var look =function(curr){
		var _this="";
		_this=$("#cSixList");
		var pageSize = 15;//每页展示的条数
		$.ajax({
	        url:myUrl+"equipment/selectAll",
			data:{pageNum:curr||1,loginId:eId,token:eIdToken,proId:pId},
			type:'POST',
			async: false,//异步锁定，默认为true
			dataType:'json',
	        success:function (data,index) {
	        	//console.log(data);
	        	//console.log(pages);
	        	if(data.code==0){
	        		 _this.html("");
	        		laypage({
					    cont: 'c6page',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
					    pages:pages,//通过后台拿到的总页数pages
					    curr: curr||1, //当前页
					    skip: true, //是否开启跳页
						skin: '#00A63C',//皮肤
						groups: 5, //连续显示分页数
						jump: function(obj, first){ //触发分页后的回调
					        if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					           lookCurr=obj.curr;
					           //console.log(obj.curr);
					           look(obj.curr);
					        }
					    }
					})
				    $(document).ready(function () {
				    	var len=index+1;
			        	if(len==0){
			        		//toastr.error("没有数据！");
			        	}else{
			        		//追加信息
			        		data.result.forEach(function(item,index){
								var length=index+1;
			        			//多个文件
								//console.log(pages);
								if (pages >= 0){
						            _this.html("");
						            var list=data.result;
						            for (var i = 0; i < list.length ; i++) {
							            var filelist=list[i].fileinfoList;
					        			//文件是否为空和写名字
					        			var files=[];
					        			var filesId=[];
					        			var thisId;
					        			var thisFile;
					        			var pFile=$('<div></div>');
									    if(filelist==""){
									    	files=" ";
									    	pFile.html(" ");
									    }else{
									    	//追加文件
									    	//console.log(filelist);
											filelist.forEach(function(item,index,input){
												if(item.fname!=""){
													files.push(item.fname);
							        				//给每个文件绑ID
							        				oneFile=$('<span class="onefile" id='+item.fid+' title='+item.fname+'>'+item.fname+'</span>');
												    pFile.append(oneFile);
												    thisFile=item.fname;
												}
											})
										}
							             var html='<ul class="c622list" id='+list[i].equId+'>' +
										'<li style="width:6%;" class="idx"><input type="checkbox" style="margin-left:0%;margin-right:5px;" name="cc622">'+(i+1)+'</li>' +
										'<li style="width:11%;">'+list[i].equName+'</li>' +
										'<li style="width:8%;">'+list[i].equNum+'</li>' +
										'<li style="width:11%;">'+list[i].equChargeUser+'</li>' +
										'<li style="width:11%;">'+list[i].equEnterTime+'</li>' +
										'<li style="width:11%;">'+list[i].equOuterTime+'</li>' +
										'<li style="width:17%;" class="addFile">'+pFile.html()+'</li>' +
										'<li class="c622handle"><span class="exitc6">编辑</span>' +
											'<span class="deletec6">删除</span>'+
										'</li>' +'<div style="clear: both"></div>' +
										'</ul>';
							             _this.append(html);
						             	// $(".cSixList").append(html);
						            }
						          }else {
						            _this.html("");
						            _this.append("");
						          }
								//移除重复的
					        	var lists=$(".c622list");
					        	lists.each(function(index,item,input){
					        		if(index>data.result.length-1){
					        			lists[index].remove();
					        		}
					        	});
			        		})
			        	}
			        	c6handle();
				    });
	        	}
	        	// else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        	
	        },
			error:function(data){

	        }
		})
	}
    function c6handle(){
		//文字超长处理
		$(".c622list").on("mouseover","li",function(){
	 		if(!$(this).hasClass("addFile")&&!$(this).hasClass("c622handle")&&!$(this).hasClass("idx")){
	 			//$(this).attr("title",$(this).find("span").html());
	 			$(this).attr("title",$(this).html());
	 		}
	 	})
	    //图片预览
		$(".c622list>li").on("click",".onefile",function(){
			//console.log($(this).attr("id"));
			var thisId=$(this).attr("id");
			$.ajax({
		        url:myUrl+"getPic",
				data:{
					fileId:thisId,
					loginId:eId,
					token:eIdToken
				},
				type:'POST',
		        success:function (data) {
		        	$(".c6photo").css("display","block");
		        	$("#popLayer").css("display","block");
		        	$(".c6photo>img").attr("src",myUrl+"getPic?token=" +eIdToken +"&loginId=" +eId+"&fileId="+thisId);
				},
		        error:function(data){

		        }
		    })
		})
		//关闭照片框
		$("#c6photoClose").on("click",function(){
			$(".c6photo").css("display","none");
		    $("#popLayer").css("display","none");
		})
		//编辑
		$(".c622list>li").on("click",".exitc6",function(){
			$thisExit=$(this);
			//删除文件的数组
			delArr=[];
			//添加的文件ID
			exitfileIds=[];
			PhotoUrlArray=[];
			exitId=$(this).parents(".c622list").attr("id");
			//console.log(exitId);
			$(".c6Exit").css("display","block");
			$("#popLayer").css("display","block");
			$(".c6Exit input").val("");
			//取列表值
			var name=$(this).parents(".c622list").children("li").eq(1).html();
			var number=$(this).parents(".c622list").children("li").eq(2).html();
			var person=$(this).parents(".c622list").children("li").eq(3).html();
			var start=$(this).parents(".c622list").children("li").eq(4).html();
			var end=$(this).parents(".c622list").children("li").eq(5).html();
			var file=$(this).parents(".c622list").children("li").eq(6).html();
			//传值给编辑框
			var box_name=$(".bjc6name").val(name);
		    var box_phone=$(".bjc6number").val(number);
		    var box_person=$(".bjc6person").val(person);
		    var box_start=$(".bjc6start").val(start);
		    var box_end=$(".bjc6end").val(end);
		    var box_file=$(".bjc6fileBox").html(file);
		    //点击file选删除
		    var selected=$("<button class='selected'>删除</button>");
			$(".bjc6fileBox .onefile").append(selected);
		})
		//选定删除的方法
		function checked(){ 
			var count = 0;
		    var checkArry = document.getElementsByName("cc622");
            for (var i = 0; i < checkArry.length; i++) { 
                if(checkArry[i].checked == true){
                    //选中的操作
                    $(".c6select-delete").css("display","block");	
                    count++; 
                }
            }
		    if( count == 0 ){
		        $(".c6select-delete").css("display","none");
		    } 
		}
		$(".c6center").on("change",".idx input",function(){
			checked();
		})
		
		//删除
		$(".c622list>li").on("click",".deletec6",function(){
			var $this=$(this);
			var delId=[];
			var thisId=$(this).parents(".c622list").attr("id");
			delId.push(thisId);
			delId=JSON.stringify(delId);
			//console.log(delId);
			$.ajax({
		        url:myUrl+"equipment/deleteEqu",
				data:{deleteList:delId,loginId:eId,token:eIdToken},
				type:'POST',
				dataType:'json',
		        success:function (data) {
		        	//console.log(data);
		        	if(data.code==0){
		        		toastr.success("删除成功！");
					    $(".c622list").remove();
					    if($("#c6Find").css("display")=="block"){
					    	look(lookCurr);
	        			}else{
	        				c6searchFun(c6searchCurr);
	        			}
		        	}else if(data.code==10001||data.code==10002||data.code==10003){
		        		toastr.error('身份过期，请重新登录！');
		        	}else{
		        		toastr.error("请求错误！");
		        	}
		        },
		        error:function(data){

		        }
		    })
		})
	}
	//选定删除
	$(".c6select-delete").on("click",function(e){
		//e.preventDefault();
		var delArr=[];
		$(".idx input").each(function(index,item){
			 if($(this).get(0).checked){
			 	delArr.push($(this).parents(".c622list").attr("id"));
			 	$(".c6select-delete").css("display","block");
			 }
		});
		delArr=JSON.stringify(delArr);
		$.ajax({
	        url:myUrl+"equipment/deleteEqu",
			data:{deleteList:delArr,loginId:eId,token:eIdToken},
			type:'POST',
			dataType:'json',
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code==0){
	        		toastr.success("删除成功！");
				    $(".c622list").remove();
				    $(".c6select-delete").css("display","none");
				    if($("#c6Find").css("display")=="block"){
				    	look(lookCurr);
        			}else{
        				c6searchFun(c6searchCurr);
        			}
	        	}
	        	// else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    })
	})
	//c622编辑文件上传
	uploadFile('#c622picker',$('#c622thelist'));
	//编辑框删除上传文件
	$("#c622thelist").on("click",".selected",function(){
		$(this).addClass("delete");
		var delId=$(this).parents(".onefile").attr("id");
		delArr.push(delId);
		$(this).parents(".onefile").remove();
		$(this).remove();
		if($(this).hasClass(".delete")){
			$(this).removeClass("delete");
		}else{
			$(this).addClass("delete");
		}
	});
	//编辑的保存
    $("#c622exitSave").on("click",function(e){
    	//e.preventDefault();
    	$(".c6Exit").css("display","none");
		$("#popLayer").css("display","none");
	    var name=$(".bjc6name").val();
	    var number=$(".bjc6number").val();
	    var person=$(".bjc6person").val();
	    var start=$(".bjc6start").val();
	    var end=$(".bjc6end").val();
	    //传给后台
		var formData = new FormData();
		//删除的文件数组
		var dd=JSON.stringify(delArr);
		//console.log(dd);
		//添加的文件ID
		for(var i in PhotoUrlArray){
			exitfileIds.push(PhotoUrlArray[i].id);
		}
		exitfileIds=JSON.stringify(exitfileIds);
		//console.log(exitfileIds);
	    var equipObj={
	    	"equId":exitId,
			"equName":name,
			"num":number,
			"userName":person,
			"enterTime":start,
			"outTime":end,
			"dellist":dd,
			"fileIdList":exitfileIds
	    }
	    var equip=JSON.stringify(equipObj);
		formData.append("loginId",eId);
		formData.append("token",eIdToken);
		formData.append("equJson",equip);
	    $.ajax({
	        url:myUrl+"equipment/updateEqu",
			data:formData,
			type:'POST',
			dataType:'json',
			processData: false,
	        contentType: false,
	        success:function (data) {
	        	//console.log(data);
	        	//模拟重新加载
	        	if(data.code==0){
	        		toastr.success("修改成功！");
	        		$(document).ready(function () {
	        			$(".c622list").remove();
	        			if($("#c6Find").css("display")=="block"){
					    	look(lookCurr);
	        			}else{
	        				c6searchFun(c6searchCurr);
	        			}
				    });
	        	}else if(data.code==10001||data.code==10002||data.code==10003){
	        		toastr.error('身份过期，请重新登录！');
	        	}else{
	        		toastr.error("请求错误！");
	        	}
			},
	        error:function(data){

	        }
	    })
    });						
	//添加弹框
	$(".c6Add").on("click",function(){
		$(".c6AddBox").css("display","block");
		$("#popLayer").css("display","block");
		$(".c6AddBox input").val("");
		$("#c6thelist").html(" ");
		PhotoUrlArray=[];
		addfileIds=[];
	})
	//关框
	$(".closeC6").on("click",function(){
		$(".c6AddBox").css("display","none");
		$(".c6Exit").css("display","none");
		$("#popLayer").css("display","none");
	})
	//c622文件上传
	uploadFile("#c6picker",$("#c6thelist"));
	//上传时删除的数组
	$("#c6thelist").on("click",".selected",function(){
    	$(this).addClass("delete");
		var delId=$(this).parents(".onefile").attr("id");
		//console.log(delId);
		addfileIds.pop(delId);
		$(this).parents(".onefile").remove();
		$(this).remove();
	});
	//c622添加的保存
    $("#c622AddSave").click(function(){
    	//模拟重新加载
    	var name=$(".c6name").val();
	    var number=$(".c6number").val();
	    var person=$(".c6person").val();
	    var start=$(".c6start").val();
	    var end=$(".c6end").val();
	    var file;
	    //文件是否为空和写名字
	    if(file==""){
	    	file=" ";
	    }else{
	    	file=$("#c6thelist").html();
	    }
		if(name.length==""||number.length==""||person.length==""){
			toastr.error("请完善信息，再提交！");
		}else if(name.length>50){
			toastr.error('设备名称长度不能超过50！');
		}else if(!/^[1-9]\d*$/.test(number)){
			toastr.error("数量必须为数字！");
		}else if(person.length>50){
			toastr.error('负责人长度不能超过50！');
		}else{
	    	$(".c6AddBox").css("display","none");
			$("#popLayer").css("display","none");
		    var len=$(".c622list").length+1; 
			//后台传值
			var formData = new FormData();
			//var fileIds=[];
			for(var i in PhotoUrlArray){
				addfileIds.push(PhotoUrlArray[i].id);
			}
			addfileIds=JSON.stringify(addfileIds);
			//console.log(addfileIds);
			formData.append("loginId",eId);
		    formData.append("token",eIdToken);
		    var equipObj={
				"proId":pId,
				"equName":name,
				"num":number,
				"userName":person,
				"enterTime":start,
				"outTime":end,
				"fileIdList":addfileIds
			}
			var equip=JSON.stringify(equipObj);
			formData.append("equJson",equip);
			$.ajax({
		        url:myUrl+"equipment/addEqu",
		        type:'POST',
				dataType:'json',
				data:formData,
				cache:false,
				processData:false,
				contentType:false,
		        success:function (data) {
		        	//console.log(data);
		        	if(data.code==0){
		        		toastr.success("添加成功！");
		        		$(".c622list").remove();
		        		look(1);
		        // 		if($("#c6Find").css("display")=="block"){
					    	// look();
	        	// 		}else{
	        	// 			c6searchFun();
	        	// 		}
		        	}
		        	// else if(data.code==10001||data.code==10002||data.code==10003){
		        	// 	toastr.error('身份过期，请重新登录！');
		        	// }else{
		        	// 	toastr.error("请求错误！");
		        	// }
		        },
		        error:function(data){
		        	//console.log(data);
		        }
		    })
		}
    })
})
/*物料管理*/
//物料入库
$(function(){
	//类型的ID
	var typeName=0;
	//获取总页数
	var c61pages;
    var nums = 15; //每页出现的数量
    //搜索
    var c61search;
    $("#c61Find").on("click",function(){
		c61search=$(".c61search").val();
		//console.log(c61search);
		if(c61search.length==0){
			toastr.error("搜索内容不能为空！");
		}else{
			$("#c61Find").css("display","none");
			$("#c61FindClose").css("display","block");
	        c61Search();
		}
    })
	var c61SearchCurr;
    //搜索数据展示
    function c61Search(curr){
		var _this="";
		_this=$("#SixOneContent");
		var pageSize = 15;//每页展示的条数
		$.ajax({
            type:'POST',
            url:myUrl+'material/materialSearch',
            data:{loginId:eId,token:eIdToken,pId:pId,searchData:c61search,materialClassId:typeName,pageNum:curr||1},
            success:function(data){
            	if(data.code==0){
            		//console.log(data.result);
            		var c61searchPages=Math.ceil(data.result.count/nums);;
            		//console.log(c61searchPages);
	        		_this.html("");
					laypage({
					    cont: 'c61page',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
					    pages: c61searchPages,//通过后台拿到的总页数c61pages
					    curr: curr||1, //当前页
					    skip: true, //是否开启跳页
					    skin: '#00A63C',//皮肤
					    groups: 5, //连续显示分页数
					    jump: function(obj, first){ //触发分页后的回调
					        if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					           c61SearchCurr=obj.curr;
					           c61Search(obj.curr);
					        }
					    }
					})
		        	var len=data.result.result.length;
		        	if(len==0){
		        		//toastr.error("没有数据！");
		        	}else{
	        			//追加信息
		        		data.result.result.forEach(function(item,index){
							var length=index+1;
							if (c61pages >= 0){
							    _this.html("");
							    var list=data.result.result;
								for (var i = 0; i < list.length ; i++) {
									//多个文件
	       							var filelist=list[i].fileInfo;
				        			//文件是否为空和写名字
				        			var files=[];
				        			var pFile=$('<p></p>');
								    if(filelist==""){
								    	files=" ";
								    	pFile.html(" ");
								    }else{
								    	//追加文件
										filelist.forEach(function(item,index,input){
					        				files.push(item.fname);
					        				//给每个文件绑ID
					        				if(item.fname!=""){
					        					oneFile=$('<span class="onefile" id='+item.fid+' title='+item.fname+'>'+item.fname+'</span>');
					        					pFile.append(oneFile);
					        				}
					        			})
									}
									var html6='<ul class="c6list" id='+list[i].mId+'><li style="width:5%;" class="idx"><input type="checkbox" name="cc">'+(i+1)+'</li><li style="width:7%;">'+list[i].mtypeMatrial.typeName+'</li><li style="width:6%;">'+list[i].mType+'</li><li style="width:6%;">'+list[i].mBrand+'</li><li style="width:7%;">'+list[i].mSeries+'</li><li style="width:8%;">'+list[i].mStorageTime+'</li><li style="width:6%;" class="usel">'+'<span class="mtotal">'+list[i].mtotal+'</span><span class="munit" id='+list[i].mUnit.uid+'>'+list[i].mUnit.uName+'</span></li><li style="width:6%;">'+list[i].mprovicer+'</li><li style="width:10%;" class="addFile">'+pFile.html()+'</li><li style="width:7%;">'+list[i].remake+'</li><li class="c6handle"><span class="exitc6">编辑</span><span class="deletec6">删除</span>'+'</li>'+'<div style="clear: both"></div>' +'</ul>';
									_this.append(html6);
									//$(".cSixOneContent").append(c6list);
									}
								  }else {
								    _this.html("");
								    _this.append("");
								}
								//移除重复的
					        	var lists=$(".c6list");
					        	lists.each(function(index,item,input){
					        		if(index>data.result.length-1){
					        			lists[index].remove();
					        		}
					        	});
						})
		        	}
					materHandler();
	        	}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
            }
        })
    }
    //关闭搜索
	$("#c61FindClose").on("click",function(){
		$("#c61FindClose").css("display","none");
		$("#c61Find").css("display","block");
		$(".c61search").val("");
		lookMaterial(materCurr);
	})
    //全部物料
    function allMater(){
		$.ajax({
            type:'POST',
            url:myUrl+'material/selectCount',
            data:{loginId:eId,token:eIdToken,pId:pId,materialClass:0},
            success:function(data){
            	if(data.code==0){
            		//console.log(data.result);
            		c61pages=Math.ceil(data.result/nums); //得到总页数
	                //console.log(c61pages);
	                lookMaterial();
            	}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
            }
        })
	}
	$(".bSixOneClick").on("click",function(){
		//e.preventDefault();
		//物料类别获取
		$.ajax({
	        type:"POST",
	        url:myUrl+"material/lookMaterialType",
	        data:{pId:pId,loginId:eId,token:eIdToken},
	        success:function (data) {
	        	//console.log(data);
	        	//类别选
	        	if(data.code == 0){
					data.result.forEach(function(item,index){
			        	var opt=$("<option id="+item.typeId+">"+item.typeName+"</option>");
					    $(".cSixOneNavSec").append(opt);
					    //移除重复的
			        	var lists=$(".cSixOneNavSec option");
			        	lists.each(function(index,item,input){
			        		if(index>data.result.length-1){
			        			lists[index].remove();
			        		}
			        	});
		        	})
				}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    })
		//框类别获取
		$.ajax({
	        type:"POST",
	        url:myUrl+"material/basic/queryType",
	        data:{parentId:0,pId:pId,loginId:eId,token:eIdToken},
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code == 0){
					//添加框
					data.result.forEach(function(item,index){
						var opt=$("<option id="+item.typeId+">"+item.typeName+"</option>");
						$(".c61type").append(opt);
						//移除重复的
						var lists=$(".c61type option");
						lists.each(function(index,item,input){
							if(index>data.result.length-1){
								lists[index].remove();
							}
						});
					})
					//编辑框
					data.result.forEach(function(item,index){
						var opt=$("<option id="+item.typeId+">"+item.typeName+"</option>");
						$(".mc61type").append(opt);
						//移除重复的
						var lists=$(".mc61type option");
						lists.each(function(index,item,input){
							if(index>data.result.length-1){
								lists[index].remove();
							}
						});
					})
				}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){
	        }
	    });
	    //单位获取
	    $.ajax({
	        type:"POST",
	        url:myUrl+"materialUnit/queryMaterialUnit",
	        data:{loginId:eId,token:eIdToken},
	        success:function (data) {
	        	// //console.log(data);
				if(data.code == 0){
					//添加框
					data.result.forEach(function(item,index){
						var opt=$("<option id="+item.uid+">"+item.uName+"</option>");
						$(".c61unit").append(opt);
						//$(".mc61unit").append(opt);
						//移除重复的
						var lists=$(".c61unit option");
						lists.each(function(index,item,input){
							if(index>data.result.length-1){
								lists[index].remove();
							}
						});
					})
					//添加框
					data.result.forEach(function(item,index){
						var opt=$("<option id="+item.uid+">"+item.uName+"</option>");
						$(".mc61unit").append(opt);
						//移除重复的
						var lists=$(".mc61unit option");
						lists.each(function(index,item,input){
							if(index>data.result.length-1){
								lists[index].remove();
							}
						});
					})
				}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    });
	    $(".cSixOneNavSec").val("全部物料");
	    $(document).ready(function () {
            $(".cSixOneNavSec>option").eq(0).trigger("change");
            //allMater();
    		//lookMaterial();
        })
	})
	$(".bSixOneClick").one("click",function(){
		allMater();
	})
	//物料查看
    $(".cSixOneNavSec").on("change",function(){
    	$(".c6list").remove();
    	typeName=$(this).children('option:selected').attr("id");
    	//console.log(typeName);
    	// if(typeName=="0"){
    	// 	//allMater();
    	// 	lookMaterial();
    	// }else{
    		$.ajax({
	            type:'POST',
	            url:myUrl+'material/selectCount',
	            data:{loginId:eId,token:eIdToken,pId:pId,materialClass:typeName},
	            success:function(data){
	            	if(data.code==0){
	            		//console.log(data.result);
	            		c61pages=Math.ceil(data.result/nums); //得到总页数
		                //console.log(c61pages);
    					lookMaterial();
	            	}
                    // else if(data.code==10001||data.code==10002||data.code==10003){
		        	// 	toastr.error('身份过期，请重新登录！');
		        	// }else{
		        	// 	toastr.error("请求错误！");
		        	// }
	            }
	        })
    	//}
    })
    //物料查看交互
	//var typeName=0;
	//删除文件的数组
	var delArr=[];
	//添加的文件ID
	var addfileIds=[];
	//编辑文件ID
	var exitfileIds=[];
	var materCurr;
	function lookMaterial(curr){
		var _this="";
		_this=$("#SixOneContent");
		var pageSize = 15;//每页展示的条数
	    $.ajax({
	        type:"POST",
	        url:myUrl+"material/lookMaterial",
	        data:{pId:pId,pageNum:curr||1,loginId:eId,token:eIdToken,materialTypeName:typeName},
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code==0){
	        		_this.html("");
					laypage({
					    cont: 'c61page',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
					    pages: c61pages,//通过后台拿到的总页数c61pages
					    curr: curr||1, //当前页
					    skip: true, //是否开启跳页
					    skin: '#00A63C',//皮肤
					    groups: 5, //连续显示分页数
					    jump: function(obj, first){ //触发分页后的回调
					        if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					           materCurr=obj.curr;
					           lookMaterial(obj.curr);
					        }
					    }
					})
		        	var len=data.result.length;
		        	if(len==0){
		        		//toastr.error("没有数据！");
		        	}else{
	        			//追加信息
		        		data.result.forEach(function(item,index){
							var length=index+1;
							if (c61pages >= 0){
							    _this.html("");
							    var list=data.result;
								for (var i = 0; i < list.length ; i++) {
									//多个文件
	       							var filelist=list[i].fileInfo;
				        			//文件是否为空和写名字
				        			var files=[];
				        			var pFile=$('<p></p>');
								    if(filelist==""){
								    	files=" ";
								    	pFile.html(" ");
								    }else{
								    	//追加文件
										filelist.forEach(function(item,index,input){
					        				files.push(item.fname);
					        				//给每个文件绑ID
					        				if(item.fname!=""){
					        					oneFile=$('<span class="onefile" id='+item.fid+' title='+item.fname+'>'+item.fname+'</span>');
					        					pFile.append(oneFile);
					        				}
					        			})
									}
									var html6='<ul class="c6list" id='+list[i].mId+'><li style="width:5%;" class="idx"><input type="checkbox" name="cc">'+(i+1)+'</li><li style="width:7%;">'+list[i].mtypeMatrial.typeName+'</li><li style="width:6%;">'+list[i].mType+'</li><li style="width:6%;">'+list[i].mBrand+'</li><li style="width:7%;">'+list[i].mSeries+'</li><li style="width:8%;">'+list[i].mStorageTime+'</li><li style="width:6%;" class="usel">'+'<span class="mtotal">'+list[i].mtotal+'</span><span class="munit" id='+list[i].mUnit.uid+'>'+list[i].mUnit.uName+'</span></li><li style="width:6%;">'+list[i].mprovicer+'</li><li style="width:10%;" class="addFile">'+pFile.html()+'</li><li style="width:7%;">'+list[i].remake+'</li><li class="c6handle"><span class="exitc6">编辑</span><span class="deletec6">删除</span>'+'</li>'+'<div style="clear: both"></div>' +'</ul>';
									_this.append(html6);
									//$(".cSixOneContent").append(c6list);
									}
								  }else {
								    _this.html("");
								    _this.append("");
								}
								//移除重复的
					        	var lists=$(".c6list");
					        	lists.each(function(index,item,input){
					        		if(index>data.result.length-1){
					        			lists[index].remove();
					        		}
					        	});
						})
		        	}
					materHandler();
	        	}
	        	// else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    })
	}
	function materHandler(){
		//文字超长处理
		$(".c6list").on("mouseover","li",function(){
	 		if(!$(this).hasClass("addFile")&&!$(this).hasClass("c6handle")&&!$(this).hasClass("idx")&&!$(this).hasClass("usel")){
	 			$(this).attr("title",$(this).html());
	 		}
	 	})
		//一个一个删除
		$(".c6list>li").on("click",".deletec6",function(){
			var userArr=[];
			var dd;
			userId=$(this).parents(".c6list").attr("id");
			userArr.push(userId);
			dd=JSON.stringify(userArr);
			$.ajax({
		        url:myUrl+"material/deleteMaterial",
				data:{pId:pId,loginId:eId,token:eIdToken,delJson:dd},
				type:'POST',
				dataType:'json',
		        success:function (data) {
		        	//console.log(data);
		        	if(data.code==0){
						toastr.success("删除成功！");
						$(this).parents().parents(".c6list").remove();
						//模拟重新加载
				    	$(document).ready(function () {
        					$(".cSixOneNavSec").children('option:selected').trigger("change");
					    });
		        	}
		        	// else if(data.code==10001||data.code==10002||data.code==10003){
		        	// 	toastr.error('身份过期，请重新登录！');
		        	// }else{
		        	// 	toastr.error("请求错误！");
		        	// }
		        },
		        error:function(data){

		        }
		    })
		})
		//选定删除的方法
		function checked(){ 
			var count = 0;
		    var checkArry = document.getElementsByName("cc");
            for (var i = 0; i < checkArry.length; i++) { 
                if(checkArry[i].checked == true){
                    //选中的操作
                    $(".select-delete").css("display","block");	
                    count++; 
                }
            }
		    if( count == 0 ){
		        $(".select-delete").css("display","none");
		    } 
		}
		$(".c6list").on("change",".idx input",function(){
			checked();
		})
		//图片预览
		$(".c6list>li").on("click",".onefile",function(){
			//console.log($(this).attr("id"));
			var thisId=$(this).attr("id");
			$.ajax({
		        url:myUrl+"getPic",
				data:{
					fileId:thisId,
					loginId:eId,
					token:eIdToken
				},
				type:'POST',
		        success:function (data) {
		        	$(".c61photo").css("display","block");
		        	$("#popLayer").css("display","block");
		        	$(".c61photo>img").attr("src",myUrl+"getPic?token=" +eIdToken +"&loginId=" +eId+"&fileId="+thisId);
				},
		        error:function(data){

		        }
		    })
		})
		//关闭照片框
		$("#c61photoClose").on("click",function(){
			$(".c61photo").css("display","none");
		    $("#popLayer").css("display","none");
		})
		//c6编辑
		$(".c6list>li").on("click",".exitc6",function(e){
			//e.preventDefault();
			$(".c611exitBox").css("display","block");
			$("#popLayer").css("display","block");
			//删除文件的数组
			delArr=[];
			//添加的文件ID
			exitfileIds=[];
			PhotoUrlArray=[];
			//物料ID
			materialId=$(this).parents(".c6list").attr("id");
			//console.log(materialId);
			$(".c611exitBox input").val("");
			//取列表值
			var mclass=$(this).parents(".c6list").children("li").eq(1).html();
			var mspec=$(this).parents(".c6list").children("li").eq(2).html();
			var mbrand=$(this).parents(".c6list").children("li").eq(3).html();
			var btype=$(this).parents(".c6list").children("li").eq(4).html();
			var total=$(this).parents(".c6list").children("li").children(".mtotal").html();
			var unitId=$(this).parents(".c6list").children("li").children(".munit").attr("id");
			var unit=$(this).parents(".c6list").children("li").children(".munit").html();
			var offer=$(this).parents(".c6list").children("li").eq(7).html();
			var file=$(this).parents(".c6list").children("li").eq(8).html();
			var remake=$(this).parents(".c6list").children("li").eq(9).html();
			//给编辑框里传值
			var box_mclass=$(".mc61type").val(mclass);
		    var box_mspec=$(".mc61model").val(mspec);
		    var box_mbrand=$(".mbrand").val(mbrand);
		    var box_btype=$(".mbsize").val(btype);
		    var box_total=$(".mc61number").val(total);
		    var box_unit=$(".mc61unit").val(unit);
		    var box_offer=$(".mc61offer").val(offer);
		    var box_file=$(".mfileBox").html(file);
		    var box_remark=$(".mc61note").val(remake);
		    //文件是否为空和写名字
		    if(file==""){
		    	file="无文件";
		    }else{
		    	file=getFileName(file);
			    function getFileName(o){
				    var pos=o.lastIndexOf("\\");
				    return o.substring(pos+1);  
				}
		    }
		    //点击file时删除
		    var selected=$("<button class='selected'>删除</button>");
			$(".fileBox .onefile").append(selected);
			})
			
		//关框
		$(".close611").on("click",function(){
			$(".c611exitBox").css("display","none");
			$("#popLayer").css("display","none");
		})
	}
	//选定删除
	$(".c6del").on("click",function(e){
		//e.preventDefault();
		var userArr=[];
		$(".idx input").each(function(index,item){
			 if($(this).get(0).checked){
			 	userArr.push($(this).parents(".c6list").attr("id"));
			 	$(".select-delete").css("display","block");
			 }
		});
		var dd=JSON.stringify(userArr);
		$.ajax({
	        url:myUrl+"material/deleteMaterial",
			data:{pId:pId,loginId:eId,token:eIdToken,delJson:dd},
			type:'POST',
			dataType:'json',
	        success:function (data){ 
	        	if(data.code==0){
					toastr.success("删除成功！");
					$(".select-delete").css("display","none");
					$(this).parents().parents(".c6list").remove();
					//模拟重新加载
			    	$(document).ready(function () {
				    	//模拟
    					$(".cSixOneNavSec").children('option:selected').trigger("change");
				    });
	        	}
	        	// else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    })
	});
	//6-20
	/*物料入库文件上传*/
	uploadFile('#c61picker',$('#c61thelist'));
	//编辑文件上传
	uploadFile('#c611picker',$('#c611thelist'));
	//c6编辑
	$(function(){
		//删除的数组
		$(".mfileBox").on("click",".selected",function(){
	    	$(this).addClass("delete");
			var delId=$(this).parents(".onefile").attr("id");
			//console.log(delId);
			delArr.push(delId);
			$(this).parents(".onefile").remove();
			$(this).remove();
			if($(this).hasClass(".delete")){
				$(this).removeClass("delete");
			}else{
				$(this).addClass("delete");
			}
		});
		//c6编辑的保存
		$("#c6exitSave").on("click",function(e){
			e.preventDefault();
			$(".c611exitBox").css("display","none");
			$("#popLayer").css("display","none");
			//向后台传值
		    var box_mclass2=$(".mc61type").children('option:selected').attr("id");
		    var box_mspec2=$(".mc61model").val();
		    var box_mbrand2=$(".mbrand").val();
		    var box_btype2=$(".mbsize").val();
		    var box_total2=$(".mc61number").val();
		    var box_unitId=$(".mc61unit").children('option:selected').attr("id");
		    var box_offer2=$(".mc61offer").val();
		    var box_remark2=$(".mc61note").val();
			var formData = new FormData();
			// //添加的文件ID
			// var fileIds=[];
			for(var i in PhotoUrlArray){
				exitfileIds.push(PhotoUrlArray[i].id);
			}
			exitfileIds=JSON.stringify(exitfileIds);
			//console.log(exitfileIds);
			formData.append("pId",pId);
			formData.append("loginId",eId);
			formData.append("token",eIdToken);;
		    formData.append("materialId",materialId);
			var dd=JSON.stringify(delArr);;
		    var exitObj={
		    	"mtype":box_mclass2,
		    	"mspec":box_mspec2,
		    	"mbrand":box_mbrand2,
		    	"btype":box_btype2,
		    	"total":box_total2,
		    	"unit":box_unitId,
		    	"supporter":box_offer2,
		    	"remake":box_remark2,
		    	"dellist":dd,
		    	"fileIdlist":exitfileIds
		    }
		    var exitStr=JSON.stringify(exitObj);
		    formData.append("materialJson",exitStr);
			$.ajax({
		        type:"POST",
		        url:myUrl+"material/newModifyMaterial",
		        data:formData,
		        processData: false,
		        contentType: false,
		        success:function (data) {
		        	//console.log(data);
					if(data.code==0){
						//模拟
						toastr.success('修改成功！');
						$(".cSixOneNavSec").children('option:selected').trigger("change");
					}
                    // else if(data.code==10001||data.code==10002||data.code==10003){
		        	// 	toastr.error('身份过期，请重新登录！');
		        	// }else{
		        	// 	toastr.error("请求错误！");
		        	// }
		        },
		        error:function(data){

		        }
			})
		})
	});
	//添加的文件ID
	//var fileIds=[];
	//删除的数组
	$(".c61thelist").on("click",".selected",function(){
    	$(this).addClass("delete");
		var delId=$(this).parents(".onefile").attr("id");
		//console.log(delId);
		addfileIds.pop(delId);
		$(this).parents(".onefile").remove();
		$(this).remove();
	});
	//物料入库
	$("#c61add").on("click",function(e){
		PhotoUrlArray=[];
		addfileIds=[];
		$("#c61thelist").html("");
		//e.preventDefault();
		$(".c611addBox input").val("");
		$("#popLayer").css("display","block");
	})
	//物料入库保存
    $("#c6AddSave").on("click",function(){
    	var type=$(".c61type").children('option:selected').attr("id");
    	var model=$(".c61model").val();
    	var brand=$(".brand").val();
    	var size=$(".size").val();
    	var total=$(".c61number").val();
    	var unit=$(".c61unit").val();
    	var unitId=$(".c61unit").children('option:selected').attr("id");
    	var offer=$(".c61offer").val();
    	var remake=$(".c61note").val();
    	var file;
    	//文件是否为空和写名字
	    if(file==""){
	    	file=" ";
	    }else{
	    	file=$("#c61thelist").html();
	    }
	    if(brand.length==""||total.length==""){
			toastr.error("请完善信息，再提交！");
			// /^1\d{10}$/.test($('#cmpPhone').val());
		}else if(!/^[1-9]\d*$/.test(total)){
			toastr.error("物理量必须为数字！");
		}else{
	    	$("#popLayer").css("display","none");
	    	$(".c611addBox").css("display","none");
			var formData = new FormData();
			//var fileIds=[];
			for(var i in PhotoUrlArray){
				addfileIds.push(PhotoUrlArray[i].id);
			}
			//console.log(addfileIds);
			addfileIds=JSON.stringify(addfileIds);
			formData.append("pId",pId);
			formData.append("loginId",eId);
			formData.append("token",eIdToken)
			var materialObj={
				"mtype":type,
				"mspec":model,
				"mbrand":brand,
				"btype":size,
				"total":total,
				"unit":unitId,
				"supporter":offer,
				"remake":remake,
				"fileIdlist":addfileIds
			}
			var material=JSON.stringify(materialObj);
			formData.append("materialjson",material);
	    	$.ajax({
		        type:"POST",
		        url:myUrl+"material/basic/newInsertMateria",
		        data:formData,
		        processData: false,
		        contentType: false,
		        success:function (data) {
		        	//console.log(data);
		        	if(data.code==0){
			        	//模拟
			        	toastr.success('添加成功！');
			        	$(".cSixOneNavSec").children('option:selected').trigger("change");
		        	}
		        	// else if(data.code==10001||data.code==10002||data.code==10003){
		        	// 	toastr.error('身份过期，请重新登录！');
		        	// }else{
		        	// 	toastr.error("请求错误！");
		        	// }
		        },
		        error:function(data){

		        }
		    })
		}
    })
})
//文件上传封装方法
var PhotoUrlArray = new Array();
function uploadFile(pickId,listId){
   var uploader = WebUploader.create({
    auto: true,
    formData:{
        uid: 123,
        pId:pId
    },
    chunked : true,
    chunkSize: 1024 * 1024,
    threads:1,
    // swf文件路径
    swf:'Uploader.swf',
    fileVal:'test',
    // 文件接收服务端。
    server: 'http://192.168.3.31:8080/bim/upload?token=' +eIdToken +"&loginId=" +eId,
    // 选择文件的按钮。可选。
    pick: pickId,
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    chunked: true, //是否要分片处理大文件上传
	// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false
    });
   // 当有文件被添加进队列的时候
    var $list = listId;
   //var $btn = $('#ctlBtn');//这个留着，以便随时切换是否要手动上传
    var ratio = window.devicePixelRatio || 1; 
    var thumbnailWidth = 16 * ratio;
    var thumbnailHeight = 16 * ratio;
    var $wrap = $('#uploader');
    // 所有文件的进度信息，key为file id
    var percentages = {};
    // 状态栏，包括进度和控制按钮
    var $statusBar = $wrap.find( '.statusBar' );
    var $progress = $statusBar.find( '.progress' ).hide();
    var $li;   
    uploader.on( 'fileQueued', function( file ) {
    	$progress.show();
        $li = $(
            '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                '<div class="info" style="display: inline;">' + file.name + '<div class="progress" style="display: inline;"><span></span></div></div>' +
            '</div>'
            ),
        $img = $li.find('img');
        $list.append( $li );
        percentages[ file.id ] = [ file.size, 0 ];
        // 创建缩略图
        //如果为非图片文件，可以不用调用此方法。
        // uploader.makeThumb( file, function( error, src ) {
        //     if ( error ) {
        //         $img.replaceWith('<span>不能预览</span>');
        //         return;
        //     }
        //     $img.attr( 'src', src );
        // }, thumbnailWidth, thumbnailHeight );
    });
    // 文件上传过程中创建进度条实时显示。
     uploader.on('uploadProgress', function (file, percentage) {//进度条事件
        var $li = $('#' + file.id),
            $percent = $li.find('.progress .progress-bar');
        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<span class="progress progress-striped active">' +
                '<span class="text"></span>' +
              '<div class="progress-bar" role="progressbar" style="width: 0%;height:6px;background:#00A63C;border-radius: 6px;display:inline-block;margin-right: 50px;float: right;">' +
              '</div>' +
            '</span>').appendTo($li).find('.progress-bar');
        };
        //$li.find(".text").text(Math.round(percentage * 100) + '%');
        $percent.css('width', percentage * 30 + '%');
    });
   //保存从后台返回的图片url
   // var PhotoUrlArray = new Array();
    function PhotoUrl(id, filePath,name) {
        this.id = id;
        this.filePath = filePath;
        this.fileName=name;
    }
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。 
    uploader.on( 'uploadSuccess', function( file, data) { 
     //console.log(data);//这里可以得到上传后的文件
     //console.log(data.result) ;
     $( '#'+file.id ).addClass('upload-state-done');
     //将上传的url保存到数组
    PhotoUrlArray.push(new PhotoUrl(data.result.fileId, data.result.tempFileDir,file.name));
    //console.log(PhotoUrlArray);
    $handle2=$('<span class="handles handle1">取消</span>').appendTo( $li );
    $handle2=$('<span class="handles handle2">删除</span>').appendTo( $li );
    }); 
    // 文件上传失败，显示上传出错。 
    uploader.on( 'uploadError', function( file ) { 
     var $li = $( '#'+file.id ), 
     $error = $li.find('span.error'); 
     // 避免重复创建 
     if ( !$error.length ) { 
     $error = $('<span class="error"></span>').appendTo( $li ); 
     } 
     $error.text('上传失败'); 
    }); 
    // 完成上传完了，成功或者失败，先删除进度条。 
    uploader.on( 'uploadComplete', function( file ) { 
        $li.find('span.handle1').remove();
        $( '#'+file.id ).find('.progress').remove(); 
    });
     //删除
    $list.on("click", ".handle2", function (file) {
        var $ele = $(this);
        var Id = $ele.parent().attr("id");
        //console.log(Id);
        //删除该图片
        uploader.removeFile(Id, true);
        Id=Id.substr(Id.length-1,1);
        //console.log(Id);
        for (var i = 0; i < PhotoUrlArray.length; i++) {
            if (i == Id) {
               PhotoUrlArray.pop(PhotoUrlArray[i]);
            }
        }
        //console.log(PhotoUrlArray);
        $(this).parent().remove();
    });
}
//page-a3 数据管理
$(function(){
	//搜索
    var c3search;
    $("#c3Find").on("click",function(){
		c3search=$(".c3search").val();
		//console.log(c3search);
		if(c3search.length==0){
			toastr.error("搜索内容不能为空！");
		}else{
			$("#c3Find").css("display","none");
			$("#c3FindClose").css("display","block");
	        $.ajax({
	            type:'POST',
	            url:myUrl+'layout/likeSelect',
	            data:{loginId:eId,token:eIdToken,proId:pId,condition:c3search,parentId:prtId},
	       		success:function (data) {
		        	//console.log(data);
		        	if(data.code==0){
		        		//console.log(data.msg);
		        		$(".cThreeContentMain").remove();
		        		var thisIds=[];
		        		var thisNames=[];
		        		var imgName;
		        		data.result.forEach(function(item,index,input){
		        			//console.log(input);
		        			var theid=index;
		        			//if(item.parentId==thisId){
		        				if(item.layIsFile==1){
			        				var content=$('<div class="cThreeContentMain" id='+item.layId+' parentId='+item.parentId+'></div>');
			        				var c3Header=$('<div class="cThreeContentMainHeader" title='+item.layName+'>'+item.layName+'</div>')
			        				var c3remark=$('<div class="cThreeContentMainList" title='+item.layRemake+'>'+item.layRemake+'</div>')
			        				var c3exit=$('<div class="cThreeSelect"><span class="c3left">'+item.layTime+'</span><span class="c3delete c3exit"><img src="images/删除-ICON.png" /></span><span class="c3change c3exit"><img src="images/编辑-ICON.png" /></span><span class="c3load c3exit"><img src="images/下载-ICON.png" /></span><span class="c3move c3exit"><img src="images/移动-ICON.png" /></span></div>');
			  						imgName=input[index].fileinfoList[0].fname;
			  						imgName=imgName.split(".");
		        					imgName = imgName[imgName.length - 1];
			  						//console.log(imgName);
									if(imgName=="gif"||imgName=="jpg"||imgName=="jpeg"||imgName=="bmp"||imgName=="png"){
			  							thisIds.push(input[index].fileinfoList[0].fid);
				  						thisIds.forEach(function(item,idx){
						        			$.ajax({
										        url:myUrl+"getPic",
												data:{
													fileId:item,
													loginId:eId,
													token:eIdToken
												},
												type:'POST',
										        success:function (data) {
										        	//console.log(idx);
										        	$(".cThreeImg").eq(idx).find("img").attr("src",myUrl+"getPic?token=" +eIdToken +"&loginId=" +eId+"&fileId="+item);
												},
										        error:function(data){

										        }
										    })
						        		})
				        			}
			  						//console.log(thisIds);
			  						//添加ID
			  						thisIds.forEach(function(item1,idx){
					        			$.ajax({
									        url:myUrl+"getPic",
											data:{
												fileId:item1,
												loginId:eId,
												token:eIdToken
											},
											type:'POST',
									        success:function (data) {
									        	$(".cThreeImg").eq(idx).find("img").attr("id",item1);
									        	$(".cThreeContentMainHeader").eq(idx).attr("imgId",item1);
									        	//console.log($(".cThreeContentMainHeader").eq(idx).attr("imgid"));
									        },
									        error:function(data){

									        }
									    })
					        		})
			        				thisNames.push(item.fileinfoList[0].fname);
			        				if(imgName=="gif"||imgName=="jpg"||imgName=="jpeg"||imgName=="bmp"||imgName=="png"){
			        					var c3Img=$('<div class="cThreeImg"><img></div>');
			        					content.append(c3Img);
			        				}else if(imgName=="fbx"){
			        					var c3Img=$('<div class="cThreeImg cThreeImg2"><img src="images/FBX_ICON.png" id='+item.fileinfoList[0].fid+'></div>');
			        					content.append(c3Img);
			        				}else{
			        					var c3Img=$('<div class="cThreeImg cThreeImg3"><img src="images/dwg_ICON.png" id='+item.fileinfoList[0].fid+'></div>');
			        					content.append(c3Img);
			        				}
			        				content.append(c3Header);
			        				content.append(c3remark);
			        				content.append(c3exit);
			        				$(".cThreeContent").append(content);
			        			}else if(item.layIsFile==0){
			        				var c3content=$('<div class="cThreeContentMain" id='+item.layId+' parentId='+item.parentId+'></div>');
									var c3file=$('<div class="cThreeFileImg"><img src="images/文件夹-大图标-ICON.png" /></div><div class="c3fileMs">'+
										'<input type="text" name="" class="c3fileName" value='+item.layName+'></div>');
									var c3exit=$('<div class="cThreeSelectFolder"><span class="c3leftFolder"><span class="c3delete c3exit"><img src="images/删除-ICON.png" /></span></div>');
									c3content.append(c3file);
									c3content.append(c3exit);
									$(".cThreeContent").append(c3content);
			        			}
		        			//}
		        		})        		
		     			//移除重复的
			        	var lists=$(".cThreeContentMain");
			        	//console.log(data.result.length-1);
			        	lists.each(function(index,item,input){
			        		if(index>data.result.length-1){
			        			lists[index].remove();
			        		}
			        	});
		        	}else if(data.code==10001||data.code==10002||data.code==10003){
		        		toastr.error('身份过期，请重新登录! ');
		        	}else{
		        		toastr.error("请求错误！");
		        	}
		        },
		        error:function(data){

		        }
	        })
		}
    })
    //关闭搜索
	$("#c3FindClose").on("click",function(){
		$("#c3FindClose").css("display","none");
		$("#c3Find").css("display","block");
		$(".c3search").val("");
		$(".cThreeContent").html(" ");
		if(prtId==0){
			c3select();
		}else{
			c3addFiles();
		}
		//$(".cSixShow").trigger("click");
	})
	var c3Data=[];
	//文件夹操作
	var folders=[];
	var foldersNum;
	//文件夹名字
	var foldersName=[];
	function c3select(){
		folders=[];
		foldersNum=0;
		//清空
		c3Data=[];
		foldersName=[];
		$.ajax({
	        type:"POST",
	        url:myUrl+"layout/selectAll",
	        data:{
				loginId:eId,
				token:eIdToken,
				proId:pId
			},
	        success:function (data) {
	        	//console.log(data);
	        	c3Data=data.result;
	        	//console.log(c3Data);
	        	if(data.code==0){
	        		//console.log(data.msg);
	        		var thisIds=[];
	        		var files=[];
	        		data.result.forEach(function(item,index){
						if(item.layIsFile==0&&item.parentId==0){
	        				files.push(item);
	        				var c3content=$('<div class="cThreeContentMain" id='+item.layId+' parentId='+item.parentId+'></div>');
							var c3file=$('<div class="cThreeFileImg"><img src="images/文件夹-大图标-ICON.png" /></div><div class="c3fileMs">'+
								'<input type="text" name="" class="c3fileName" value='+item.layName+'></div>');
							var c3exit=$('<div class="cThreeSelectFolder"><span class="c3leftFolder"><span class="c3delete c3exit"><img src="images/删除-ICON.png" /></span></div>');
							c3content.append(c3file);
							c3content.append(c3exit);
							$(".cThreeContent").append(c3content);
	        			}
	        			//文件夹操作
	        			//总的文件夹个数
	        			if(item.layIsFile==0){
	        				folders.push(item);
	        				foldersName.push(item.layName);
	        			}
	        		})
	        		foldersNum=folders.length+1;
	        		//console.log(foldersNum);
	        		thisIds.forEach(function(item,index){
	        			$.ajax({
					        url:myUrl+"getPic",
							data:{
								fileId:item,
								loginId:eId,
								token:eIdToken
							},
							type:'POST',
					        success:function (data) {
					        	$(".cThreeImg").eq(index).find("img").attr("src",myUrl+"getPic?token=" +eIdToken +"&loginId=" +eId+"&fileId="+item);
					        	$(".cThreeImg").eq(index).find("img").attr("id",item);
					   		},
					        error:function(data){

					        }
					    })
	        		})	        		
	     			//移除重复的
		        	var lists=$(".cThreeContentMain");
		        	//console.log(data.result.length-1);
		        	lists.each(function(index,item,input){
		        		if(index>files.length-1){
		        			lists[index].remove();
		        		}
		        	});
	        	}
	        	// else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }
	        	else{
	        		toastr.error("请求错误！");
	        	}
	        },
	        error:function(data){

	        }
	    })
	}
	//展示数据
	$(".cThreeShow").on("click",function(){
		$(".cThreeContentMain").remove();
		//c3findFolder();
		c3select();
		prtId=0;
		//c3addFile();
	})
	//上传按钮
	$(".cThreeHeaderTwo").click(function(){
		if(prtId==0){
			toastr.error("请选择文件夹!");
		}else{
			$("#c3picker").css("display","inline-block");
			$(".c3mc").css("display","block");
			$("#popLayer").css("display","block");
			$('.cTwo').css('display','block');
			$("#c3thelist").html(" ");
			PhotoUrlArray2=[];
			$(".c3msBox").val(" ");
		}
	})
	//移动弹框
	$(".cThreeContent").on("click",".c3move",function(){
		$(".cThreeExitMain").remove();
		var thisId=$(this).parents(".cThreeContentMain").attr("id");
		//console.log(thisId);
		var thisMove=$(this).parents(".cThreeContentMain");
		var remake=$(this).parent().siblings(".cThreeContentMainList").html();
		var fileId=$(this).parent().siblings(".cThreeImg").find("img").attr("id");
		var filesName=$(this).parent().siblings(".cThreeContentMainHeader").html();
		//console.log(remake);
		//console.log(filesName);
		$(".c3ExitBox").css("display","block");
		$("#popLayer").css("display","block");
		//文件夹展示
		$.ajax({
	        type:"POST",
	        url:myUrl+"layout/selectAll",
	        data:{
				loginId:eId,
				token:eIdToken,
				proId:pId
			},
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code==0){
	        		//console.log(data.msg);
	        		var files=[];
	        		data.result.forEach(function(item,index){
	        			if(item.layIsFile==0){
	        				//console.log(item);
	        				files.push(item);
	        				var c3content=$('<div class="cThreeExitMain" id='+item.layId+' parentId='+item.parentId+'></div>');
							var c3file=$('<div class="cThreeFilesImg"><img src="images/文件夹-大图标-ICON.png" /></div>'+
								'<div class="c3filesMs"><span class="c3FilesName">'+item.layName+'</span></div>');
							c3content.append(c3file);
							$(".c3ExitContent").append(c3content);
	        			}
	        		})
	        		//console.log(files.length);        		
	     			//移除重复的
		        	var lists=$(".cThreeExitMain");
		        	lists.each(function(index,item,input){
		        		if(index>files.length-1){
		        			lists[index].remove();
		        		}
		        	});
		        	//选择移动
		        	//$(".c3ExitContent").off("click",".cThreeExitMain");
					$(".c3ExitContent").unbind('click');
		        	$(".c3ExitContent").on("click",".cThreeExitMain",function(){
		        		$(this).siblings(".cThreeExitMain").css("border","none");
		        		$(this).css("border","1px solid #00A63C");
		        		var theId=$(this).attr("id");
		        		//console.log(theId);
						var formData = new FormData();
						formData.append("pId",pId);
						formData.append("loginId",eId);
						formData.append("token",eIdToken);
						formData.append("layoutId",thisId);
						formData.append("parentId",theId);
						//移动提交
						$(".c3ExitSubmit").unbind('click');
						$(".c3ExitSubmit").click(function(){
							$.ajax({
						        type:"POST",
						        url:myUrl+"layout/moveLayout",
						        data:formData,
						        processData: false,
						        contentType: false,
						        success:function (data) {
						        	//console.log(data);
						        	if(data.code==0){
						        		//移动后删除
						        		$(".c3ExitBox").css("display","none");
										$("#popLayer").css("display","none");
						        		//console.log(data.msg);
						        		//thisMove.remove();
						        		//c3findFolder();
						        		toastr.success("移动成功！");
										c3addFiles()
						        	}
						        	// else if(data.code==10001||data.code==10002||data.code==10003){
						        	// 	toastr.error('身份过期，请重新登录！');
						        	// }else{
						        	// 	toastr.error("请求错误！");
						        	// }
						        },
						        error:function(data){

						        }
						    })
						})
		        	})
	        	}
	        	// else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }
	        	else{
	        		toastr.error("请求错误！");
	        	}
	        },
	        error:function(data){

	        }
	    })
	})
	//移动关框
	$(".c3ExitBack").click(function(){
		$(".c3ExitBox").css("display","none");
		$("#popLayer").css("display","none");
	})
	//删除交互
	function deleteFile(){
		var formData = new FormData();
		formData.append("pId",pId);
		formData.append("loginId",eId);
		formData.append("token",eIdToken);
		formData.append("deleteList",dellist);
		$.ajax({
	        type:"POST",
	        url:myUrl+"layout/deleteLay",
	        data:formData,
	        processData: false,
	        contentType: false,
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code==0){
	        		//console.log(data.msg);
	        		$this.parents(".cThreeContentMain").remove();
					//c3select();
				}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }
	        	else{
	        		toastr.error("请求错误！");
	        	}
	        },
	        error:function(data){

	        }
	    })
	}
	//删除
	$(".cThreeContent").on("click",".c3delete",function(){
		var dellist=[];
		var $this=$(this);
		//父亲自己的ID
		var thisId=$(this).parents(".cThreeContentMain").attr("id");
		dellist.push(thisId);
		//文件夹里的ID
		c3Data.forEach(function(item,index){
			if(item.parentId==thisId){
				dellist.push(item.layId);
			}
		})
		dellist=JSON.stringify(dellist);
		//console.log(dellist);
		//deleteFile();
		var formData = new FormData();
		formData.append("pId",pId);
		formData.append("loginId",eId);
		formData.append("token",eIdToken);
		formData.append("deleteList",dellist);
		$.ajax({
	        type:"POST",
	        url:myUrl+"layout/deleteLayByIds",
	        data:formData,
	        processData: false,
	        contentType: false,
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code==0){
	        		//console.log(data.msg);
	        		toastr.success("删除成功！");
	        		$this.parents(".cThreeContentMain").remove();
					//c3select();
				}
                // else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录！');
	        	// }
	        	else{
	        		toastr.error("请求错误！");
	        	}
	        },
	        error:function(data){

	        }
	    })
	})
	//点击文件夹
	$(".cThreeContent").on("click",".cThreeFileImg",function(){
		if($(this).siblings(".c3fileMs").children(".c3fileName").val().length==0){
			toastr.error("文件名不能为空!");
		}else{
			thisId=$(this).parents(".cThreeContentMain").attr("id");
			prtId=thisId;
			//console.log(prtId);
			//菜单展示
			var thisVal=$(this).siblings(".c3fileMs").children(".c3fileName").val();
			var $innav=$('<span class="nav3" id='+thisId+'><span class="iconl"><img src="images/ioc_l.png"></span>'+
                '<span>'+thisVal+'</span></span>');
        	$(".menuCenter").append($innav);
			//第二层文件请求
			//c3findFolder();
			c3addFiles();
		}
	})
	//菜单点击
	$(".menuCenter").on("click",".nav2",function(){
		//console.log(1)
		if($(this).children(".nav2Val").html()=="数据管理"){
			$(".cThreeShow").trigger("click");
		}
	})
	$(".menuCenter").on("click",".nav3",function(){
		$(this).nextAll(".nav3").remove();
		thisId=$(this).attr("id");
		prtId=thisId;
		c3addFiles();
	})
	//新建文件夹
	$(".cThreeHeaderOne").click(function(){
		//console.log(foldersNum);
		//console.log(foldersName);
		var c3content=$('<div class="cThreeContentMain"></div>');
		var c3file=$('<div class="cThreeFileImg"><img src="images/文件夹-大图标-ICON.png" /></div><div class="c3fileMs">'+
			'<input type="text" name="" class="c3fileName" value="新建文件夹'+foldersNum+'" autofocus></div>');
		c3content.append(c3file);
		$(".cThreeContent").append(c3content);
		$(".c3fileName").focus();
		$(".c3fileName").blur(function(){
			filesName=$(this).val();
			//console.log(filesName);
			isName();
			//判断是否已有该名字
			function isName(){
				for(var i=0;i<foldersName.length;i++){
					if(foldersName[i].indexOf(filesName)!=-1) {
			            toastr.error("已有该文件名，请重新命名！");
			            return false;
			        }
				}
				upFile();
				return true;
			}
		})
	})
	exitFolder();
	//文件夹编辑
	function exitFolder(){
		$(".cThreeContent").on("change",".c3fileName",function(){
			var $this=$(this);
			var exitFolder=$(this).val();
			var thisExitId=$(this).parents(".cThreeContentMain").attr("id");
			//console.log(thisExitId);
			isName2();
			//判断是否已有该名字
			function isName2(){
				for(var i=0;i<foldersName.length;i++){
					if(foldersName[i].indexOf(exitFolder)!=-1) {
			            toastr.error("已有该文件名，请重新命名！");
			            return false;
			        }
				}
				if(!thisExitId){
					return false;
					//不变
				}else{
					if(exitFolder.length!=0){
						var formData = new FormData();
						formData.append("pId",pId);
						formData.append("loginId",eId);
						formData.append("token",eIdToken);
						formData.append("layoutId",thisExitId);
						// 传名字
						formData.append("name",exitFolder);
						$.ajax({
					        type:"POST",
					        url:myUrl+"layout/updateLay",
					        data:formData,
					        processData: false,
					        contentType: false,
					        success:function (data) {
					        	//console.log(data);
					        	if(data.code==0){
					        		//console.log(data.msg);
					        		toastr.success("修改成功！");
					        		$this.val(exitFolder);
									//c2remake.html(remake);
									$(".c2ExitBox").css("display","none");
									$("#popLayer").css("display","none");
					        	}
					        	// else if(data.code==10001||data.code==10002||data.code==10003){
					        	// 	toastr.error('身份过期，请重新登录!');
					        	// }
					        	else{
					        		toastr.error("请求错误！");
					        	}
					        },
					        error:function(data){

					        }
					    })
					}else{
						toastr.error("文件夹名字不能为空！");
					}
				}
				return true;
			}
		})
	}
	//第二层请求,文件夹和文件
	var thisId;
	//总的文件夹个数
	var folders=[];
	var foldersNum;
	//文件夹名字
	var foldersName=[];
	function c3addFiles(){
		folders=[];
		foldersNum=0;
		//所有的数据
		c3Data=[];
		//清空
		foldersName=[];
		$.ajax({
	        type:"POST",
	        url:myUrl+"layout/selectAll",
	        data:{
				loginId:eId,
				token:eIdToken,
				proId:pId
			},
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code==0){
	        		//console.log(data.msg);
	        		c3Data=data.result;
	        		$(".cThreeContentMain").remove();
	        		var thisIds=[];
	        		var thisNames=[];
	        		var imgName;
	        		data.result.forEach(function(item,index,input){
	        			//console.log(input);
	        			var theid=index;
	        			if(item.parentId==thisId){
	        				if(item.layIsFile==1&&item.fileinfoList.length!=0){
		        				var content=$('<div class="cThreeContentMain" id='+item.layId+' parentId='+item.parentId+'></div>');
		        				var c3Header=$('<div class="cThreeContentMainHeader" title='+item.layName+'>'+item.layName+'</div>')
		        				var c3remark=$('<div class="cThreeContentMainList" title='+item.layRemake+'>'+item.layRemake+'</div>')
		        				var c3exit=$('<div class="cThreeSelect"><span class="c3left">'+item.layTime+'</span><span class="c3delete c3exit"><img src="images/删除-ICON.png" /></span><span class="c3change c3exit"><img src="images/编辑-ICON.png" /></span><span class="c3load c3exit"><img src="images/下载-ICON.png" /></span><span class="c3move c3exit"><img src="images/移动-ICON.png" /></span></div>');
		  						imgName=input[index].fileinfoList[0].fname;
		  						imgName=imgName.split(".");
	        					imgName = imgName[imgName.length - 1];
		  						//console.log(imgName);
								if(imgName=="gif"||imgName=="jpg"||imgName=="jpeg"||imgName=="bmp"||imgName=="png"){
		  							//console.log(input[index]);
		  							thisIds.push(input[index].fileinfoList[0].fid);
			  						thisIds.forEach(function(item,idx){
					        			$.ajax({
									        url:myUrl+"getPic",
											data:{
												fileId:item,
												loginId:eId,
												token:eIdToken
											},
											type:'POST',
									        success:function (data) {
									        	//console.log(idx);
									        	$(".cThreeImg1").eq(idx).find("img").attr("src",myUrl+"getPic?token=" +eIdToken +"&loginId=" +eId+"&fileId="+item);
											},
									        error:function(data){

									        }
									    })
					        		})
			        			}
			        			// else if(imgName=="fbx"){
			        			// 	$(".cThreeImg").eq(index).find("img").attr("src","images/FBX_ICON.png");
			        			// }else{
			        			// 	$(".cThreeImg").eq(index).find("img").attr("src","images/dwg_ICON.png");
			        			// }
		  						//console.log(thisIds);
		  						//添加ID
		  						thisIds.forEach(function(item1,idx){
				        			$.ajax({
								        url:myUrl+"getPic",
										data:{
											fileId:item1,
											loginId:eId,
											token:eIdToken
										},
										type:'POST',
								        success:function (data) {
								        	$(".cThreeImg").eq(idx).find("img").attr("id",item1);
								        	$(".cThreeContentMainHeader").eq(idx).attr("imgId",item1);
								        	//console.log($(".cThreeContentMainHeader").eq(idx).attr("imgid"));
								        },
								        error:function(data){

								        }
								    })
				        		})
		        				thisNames.push(item.fileinfoList[0].fname);
		        				if(imgName=="gif"||imgName=="jpg"||imgName=="jpeg"||imgName=="bmp"||imgName=="png"){
		        					var c3Img=$('<div class="cThreeImg cThreeImg1"><img></div>');
		        					content.append(c3Img);
		        				}else if(imgName=="fbx"){
		        					var c3Img=$('<div class="cThreeImg cThreeImg2"><img src="images/FBX_ICON.png" id='+item.fileinfoList[0].fid+'></div>');
		        					content.append(c3Img);
		        				}else{
		        					//console.log(item.fileinfoList[0].fid)
		        					var c3Img=$('<div class="cThreeImg cThreeImg3"><img src="images/dwg_ICON.png" id='+item.fileinfoList[0].fid+'></div>');
		        					content.append(c3Img);
		        				}
		        				content.append(c3Header);
		        				content.append(c3remark);
		        				content.append(c3exit);
		        				$(".cThreeContent").append(content);
		        			}else if(item.layIsFile==0){
		        				var c3content=$('<div class="cThreeContentMain" id='+item.layId+' parentId='+item.parentId+'></div>');
								var c3file=$('<div class="cThreeFileImg"><img src="images/文件夹-大图标-ICON.png" /></div><div class="c3fileMs">'+
									'<input type="text" name="" class="c3fileName" value='+item.layName+'></div>');
								var c3exit=$('<div class="cThreeSelectFolder"><span class="c3leftFolder"><span class="c3delete c3exit"><img src="images/删除-ICON.png" /></span></div>');
								c3content.append(c3file);
								c3content.append(c3exit);
								$(".cThreeContent").append(c3content);
		        			}
	        			}
	        			//文件夹操作
	        			//总的文件夹个数
	        			if(item.layIsFile==0){
	        				folders.push(item);
	        				foldersName.push(item.layName);
	        			}
	        		})
	        		foldersNum=folders.length+1;
	        		//console.log(foldersNum);	        		
	     			//移除重复的
		        	var lists=$(".cThreeContentMain");
		        	//console.log(data.result.length-1);
		        	lists.each(function(index,item,input){
		        		if(index>data.result.length-1){
		        			lists[index].remove();
		        		}
		        	});
	        	}
	        	//else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录! ');
	        	// }else{
	        	// 	toastr.error("请求错误！");
	        	// }
	        },
	        error:function(data){

	        }
	    })
	}
	//上传文件夹
	var filesName;
	var prtsId;
	function upFile(){
		//var len=$(".c3fileName").val().length;
		var len=filesName.length;
		//console.log(len);
		if(len==0){
			toastr.error("文件名不能为空!");
			//$(".c3fileName").focus();
		}else{
			//文件夹后台传值
			var formData = new FormData();
			formData.append("pId",pId);
			formData.append("loginId",eId);
			formData.append("token",eIdToken);
			formData.append("fileId",0);
			formData.append("fileName",filesName);
			formData.append("remake","");
			formData.append("isFile",0);
			formData.append("parentId",prtId);
			$.ajax({
		        type:"POST",
		        url:myUrl+"layout/addLay",
		        data:formData,
		        processData: false,
		        contentType: false,
		        success:function (data) {
		        	//console.log(data);
		        	if(data.code==0){
		        		//console.log(data.msg);
		        		//console.log(prtId);
		        		toastr.success("添加成功！");
		        		$(".cThreeContent").html(" ");
		        		//编辑文件夹
		     //    		$(".cThreeContent").on("change",".c3fileName",function(){
							// var $this=$(this);
							// var exitFolder=$(this).val();
							// var thisExitId=$(this).parents(".cThreeContentMain").attr("id");
		     //    			//console.log(thisExitId);
		     //    			exitFolder();
		     //    		})
		        		if(prtId==0){
		        			c3select();
		        		}else{
		        			c3addFiles();
		        		}
		        	}else if(data.code==10001||data.code==10002||data.code==10003){
		        		toastr.error('身份过期，请重新登录!');
		        	}else{
		        		toastr.error("请求错误！");
		        	}
		        },
		        error:function(data){

		        }
		    })
		}
	}
	//c3上传文件
	uploadImgFile();
	//uploadFile('#c3picker',$('#c3thelist'));
	//提交文件
	var prtId;
	var fileId;
	var fileName;
	//开始上传
	$(".cTwoSubmit").on("click",function(){
		$("#popLayer").css("display","none");
		//var fileId;
		//var fileName;
		for(var i in PhotoUrlArray2){
			fileId=PhotoUrlArray2[0].id;
			fileName=PhotoUrlArray2[0].fileName;
		}
		//console.log(fileName);
		c3addFile();
	})
	function c3addFile(){
		var remake=$(".c3msBox").val();
		var formData = new FormData();
		formData.append("pId",pId);
		formData.append("loginId",eId);
		formData.append("token",eIdToken);
		formData.append("fileId",fileId);
		formData.append("fileName",fileName);
		formData.append("remake",remake);
		formData.append("isFile",1);
		formData.append("parentId",prtId);
		$.ajax({
	        type:"POST",
	        url:myUrl+"layout/addLay",
	        data:formData,
	        processData: false,
	        contentType: false,
	        success:function (data) {
	        	//console.log(data);
	        	if(data.code==0){
	        		toastr.success("添加成功！");
	        		//console.log(data.msg);
	        		$(".cThreeContent").html(" ");
	        		if(prtId==0){
	        			//c3findFolder();
	        			c3select();
	        		}else{
	        			//c3findFolder();
	        			c3addFiles();
	        		}
	        	}
	        	// else if(data.code==10001||data.code==10002||data.code==10003){
	        	// 	toastr.error('身份过期，请重新登录!');
	        	// }
	        	else{
	        		toastr.error("请求错误！");
	        	}
	        },
	        error:function(data){

	        }
	    })
	}
	//编辑
	var c2remake;
	var c3exitId;
	$(".cThreeContent").off("click",".c3change");
	$(".cThreeContent").on("click",".c3change",function(){
		c3exitId=$(this).parents(".cThreeContentMain").attr("id");
		//console.log(c3exitId);
		$(this).siblings().off(".c3change");
		$(".c2ExitBox").css("display","block");
		$("#popLayer").css("display","block");
		c2remake=$(this).parent().siblings(".cThreeContentMainList");
		$(".c2msBox").val(c2remake.html());
		var c2Img=$(this).parent().siblings(".cThreeImg").html();
		$(".c2Img").html(c2Img);
		var c2ImgName=$(this).parent().siblings(".cThreeContentMainHeader");
		$(".c2ImgName").html(c2ImgName.html());
		
	})
	//编辑保存
	$(".c2ExitSubmit").click(function(){
		var remake=$(".c2msBox").val();
		if(remake.length!=0){
			var formData = new FormData();
			formData.append("pId",pId);
			formData.append("loginId",eId);
			formData.append("token",eIdToken);
			formData.append("layoutId",c3exitId);
			formData.append("remake",remake);
			$.ajax({
		        type:"POST",
		        url:myUrl+"layout/updateLay",
		        data:formData,
		        processData: false,
		        contentType: false,
		        success:function (data) {
		        	//console.log(data);
		        	if(data.code==0){
		        		//console.log(data.msg);
		    			//$(".cThreeContent").html(" ");
						//c3select();
						toastr.success("修改成功！");
						c2remake.html(remake);
						$(".c2ExitBox").css("display","none");
						$("#popLayer").css("display","none");
		        	}
		        	// else if(data.code==10001||data.code==10002||data.code==10003){
		        	// 	toastr.error('身份过期，请重新登录!');
		        	// }
		        	else{
		        		toastr.error("请求错误！");
		        	}
		        },
		        error:function(data){

		        }
		    })
		}else{
			toastr.error("描述不能为空！");
		}
	})
	//编辑关框
	$(".c2ExitBack").click(function(){
		$(".c2ExitBox").css("display","none");
		$("#popLayer").css("display","none");
	})
	//下载
	$(".cThreeContent").on("click",".c3load",function(){
		//var thisId=$(this).parents(".cThreeContentMain").attr("id");
		var thisId=$(this).parent().siblings(".cThreeImg").find("img").attr("id");
		//console.log(thisId);
		window.location.href=myUrl+"downLoad"+"?fileId="+thisId+"&loginId="+eId+"&token="+eIdToken;
// 		var formData = new FormData();
// 		formData.append("fileId",thisId);
// 		formData.append("loginId",eId);
// 		formData.append("token",eIdToken);
// 		$.ajax({
// 	        //type:"POST",
// 	        url:myUrl+"downLoad"+"?fileId="+thisId+"&loginId="+eId+"&token="+eIdToken,
// 	        //url:myUrl+"downLoad",
// 	        type: 'GET',
//         	//dataType: 'JSONP',
// 	        //data:
// 	        //formData,
// 	  //       {
// 	  //       	fileId:thisId,
// 	  //   	 	loginId:eId,
// 			//  	token:eIdToken
// 			// },
// 			//是否使用异步发送
// 　　　　　　async: true,
// 	        // processData: false,
// 	        // contentType: false,
// 	        success:function (data) {
// 	        	//console.log(data);
// 	        	if(data.code==0){
// 	        		//console.log(data.msg);
// 	        	}else if(data.code==10001||data.code==10002||data.code==10003){
// 	        		toastr.warning('身份过期，请重新登录! ');
// 	        	}else{
// 	        		toastr.error("请求错误！");
// 	        	}
// 	        },
// 	        error:function(data){

// 	        }
// 	    })
	})
})
//有图片的文件上传
var PhotoUrlArray2 = new Array();
function uploadImgFile(){
   var uploader = WebUploader.create({
    auto: true,
    formData:{
        uid: 123,
        pId:pId
    },
    chunked : true,
    chunkSize: 1024 * 1024,
    threads:1,
    // swf文件路径
    swf:'Uploader.swf',
    fileVal:'test',
    // 文件接收服务端。
    server: 'http://192.168.3.31:8080/bim/upload?token=' +eIdToken +"&loginId=" +eId,
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: "#c3picker",
    // accept: {
    //     title: 'Images',
    //     extensions: 'gif,jpg,jpeg,bmp,png',
    //     mimeTypes: 'image/jpg,image/jpeg,image/png'
    // },
    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false
    });
   // 当有文件被添加进队列的时候
   var $list = $('#c3thelist');
   //var $btn = $('#ctlBtn');//这个留着，以便随时切换是否要手动上传
    var ratio = window.devicePixelRatio || 1; 
    var thumbnailWidth = 16 * ratio;
    var thumbnailHeight = 16 * ratio;
    var $li;   
    uploader.on( 'fileQueued', function( file ) {
		//移除提示
		$("#c3picker").css("display","none");
		$(".c3mc").css("display","none"); 
        $li = $(
            '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                '<div class="info1" style="display: block;">' + file.name + '</div>' +
            '</div>'
            ),
        $img = $li.find('img');
        $list.append( $li );
        // 创建缩略图
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr( 'src', src );
        }, thumbnailWidth, thumbnailHeight );
    });
   //保存从后台返回的图片url
   // var PhotoUrlArray = new Array();
    function PhotoUrl(id, filePath,name) {
        this.id = id;
        this.filePath = filePath;
        this.fileName=name;
    }
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。 
    uploader.on( 'uploadSuccess', function( file, data) {
	 //console.log(data);//这里可以得到上传后的文件
     //console.log(data.result) ;
     $( '#'+file.id ).addClass('upload-state-done');
     //将上传的url保存到数组
    PhotoUrlArray2.push(new PhotoUrl(data.result.fileId, data.result.tempFileDir,file.name));
    //console.log(PhotoUrlArray2);
    }); 
    // 文件上传失败，显示上传出错。 
    uploader.on( 'uploadError', function( file ) { 
     var $li = $( '#'+file.id ), 
     $error = $li.find('span.error'); 
     // 避免重复创建 
     if ( !$error.length ) { 
     $error = $('<span class="error"></span>').appendTo( $li ); 
     } 
     $error.text('上传失败'); 
    }); 
    // 完成上传完了，成功或者失败，先删除进度条。 
    uploader.on( 'uploadComplete', function( file ) { 
         
    });
}
