var page_=false;
var name_=sessionStorage.getItem("user");
var id="",url="";
if(!name_){
  top.location.href="login.html";
}
function local(data){
  var name=$(".input_box [name]");
  for(var i=0;i<name.length;i++){
    if(name[i].localName=="select"){
      $(name[i]).html("<option value="+data[name.eq(i).attr("name")]+">"+data[name.eq(i).attr("name")]+"</option>");
    }else{
	  name.eq(i).val(data[name.eq(i).attr("name")]);
	};
  }
}
function disabled(is){
  var input=$(".input_box input");
  var textarea=$(".input_box textarea");
  var select=$(".input_box select");
  for(var i=0;i<input.length;i++){
    input.eq(i).attr("disabled",is);
  }
  for(var i=0;i<textarea.length;i++){
    textarea.eq(i).attr("disabled",is);
  }
  for(var i=0;i<select.length;i++){
    select.eq(i).attr("disabled",is);
  }
}
function select_(url){
  if(url.indexOf("recordInfo/selectNo")!="-1"){
	$("select[name=fixtype]").html(option("硬件维修,软件维修"));
	$("select[name=status]").html(option("未处理,维修中,已修好,报废"));
	$(".input_box select[name=departure]").html(option("section","is"));
	$.ajax({
	  url:url,
	  type:"POST",
	  headers:{'Content-Type':'application/json;charset=UTF-8'},
	  success:function(res){
		var html="";
		var html_="";
		var data=res.data;
		for(var i=0;i<data.length;i++){
		  html+="<option value="+data[i].assetName+">"+data[i].assetName+"</option>";
		}
		$("select[name=assetName]").html(html);
		for(var i=0;i<data.length;i++){
		  if(data[i].assetName==$("select[name=assetName]").val()){
		    var data_=data[i].assetNo
			for(var q=0;q<data_.length;q++){
			  html_+="<option value="+data_[q]+">"+data_[q]+"</option>";
			};
		  }
		};
		$("select[name=assetNo]").html(html_);
		$("select[name=assetName]").on("change",function(){
		  var html_="";
		  for(var i=0;i<data.length;i++){
		    if(data[i].assetName==$("select[name=assetName]").val()){
			  var data_=data[i].assetNo
			  for(var q=0;q<data_.length;q++){
			    html_+="<option value="+data_[q]+">"+data_[q]+"</option>";
			  };
			}
		  };
		  $("select[name=assetNo]").html(html_);
		})
	  }
	})  
  }else if(url.indexOf("transfer/selectNo")!="-1"){
    $(".input_box select[name=recievingDepr]").html(option("section","is"));
	$.ajax({
	  url:url,
	  type:"POST",
	  headers:{'Content-Type':'application/json;charset=UTF-8'},
	  success:function(res){
		var data=res.data;
	    var html="";
		var html_="";
		var _html="";
		var remark_="";
		for(var i in data){
		  html+="<option value="+data[i].departure+">"+data[i].departure+"</option>";
		};
		$(".input_box select[name=transferDepr]").html(html);
		function assetname(){
		  for(var i in data){
		    if(data[i].departure==$(".input_box select[name=transferDepr]").val()){
		      var data_=data[i].assets1;
			  for(var q in data_){
			    html_+="<option value="+data_[q].assetName+">"+data_[q].assetName+"</option>";
			  }
		    }
		  }
		  $(".input_box select[name=assetname]").html(html_);
		}
		function assetno(){
		  for(var i in data){
		    if(data[i].departure==$(".input_box select[name=transferDepr]").val()){
			  var data_=data[i].assets1;
			  for(var q in data_){
			    if(data_[q].assetName==$(".input_box select[name=assetname]").val()){
			      var _data=data_[q].assetno;
				  for(var a in _data){
				    _html+="<option value="+_data[a].assetNo+">"+_data[a].assetNo+"</option>";
				  }
			    };
			  }
		    }
		  }
		  $(".input_box select[name=assetno]").html(_html);
		}
		function remark(){
		  for(var i in data){
		    if(data[i].departure==$(".input_box select[name=transferDepr]").val()){
			  var data_=data[i].assets1;
			  for(var q in data_){
			    if(data_[q].assetName==$(".input_box select[name=assetname]").val()){
			      var _data=data_[q].assetno;
				  for(var a in _data){
				    if(_data[a].assetNo==$(".input_box select[name=assetno]").val()){
					  remark_=_data[a].remark;
					};
				  }
			    };
			  }
		    }
		  }
		  $("[name=remark]").val(remark_);
		}
		assetname();
		assetno();
		remark();
		$(".input_box select[name=transferDepr]").on("change",function(){
		  html_="",_html="",remark_="";
		  $(".input_box select[name=assetname]").html("");
		  $(".input_box select[name=assetno]").html("");
		  $("[name=remark]").val("");
		  assetname();
		  assetno();
		  remark();
		})
		$(".input_box select[name=assetname]").on("change",function(){
		  _html="",remark_="";
		  $(".input_box select[name=assetno]").html("");
		  $("[name=remark]").val("");
		  assetno();
		  remark();
		})
		$(".input_box select[name=assetno]").on("change",function(){
		  remark_="";
		  $("[name=remark]").val(remark);
		  $("[name=remark]").val("");
		  remark();
		})
	  }
	})
  }else if(url.indexOf("borrowinfo/selectno")!="-1"){
	$("[name=borrowDeparture]").html(option("section","is"));
	$.ajax({
	  url:url,
	  type:"POST",
	  headers:{'Content-Type':'application/json;charset=UTF-8'},
	  success:function(res){
	    var data=res.data;
		var html="";
		var html_="";
		for(var i in data){
		  html+="<option value="+i+">"+i+"</option>";
		}
		$("select[name=assetName]").html(html);
		var data_=data[$("select[name=assetName]").val()];
		if(data_==null){
		  return;
		}
		for(var i=0;i<data_.length;i++){
		  html_+="<option value="+data_[i].assetNo+">"+data_[i].assetNo+"</option>";
		}
		$("select[name=assetNo]").html(html_);
		for(var i=0;i<data_.length;i++){
		  if(data_[i].assetNo==$("select[name=assetNo]").val()){
		    $("[name=remark]").val(data_[i].remark);
		  }
		}
		$("select[name=assetName]").on("change",function(){
		  html_="";
		  data_=data[$("select[name=assetName]").val()];
		  $("select[name=assetNo]").html("");
		  $("[name=remark]").val("");
		  for(var i=0;i<data_.length;i++){
		    html_+="<option value="+data_[i].assetNo+">"+data_[i].assetNo+"</option>";
		  }
		  $("select[name=assetNo]").html(html_);
		  for(var i=0;i<data_.length;i++){
		    if(data_[i].assetNo==$("select[name=assetNo]").val()){
		      $("[name=remark]").val(data_[i].remark);
		    }
		  }
		})
		$("select[name=assetNo]").on("change",function(){
		  for(var i=0;i<data_.length;i++){
		    if(data_[i].assetNo==$(this).val()){
		      $("[name=remark]").val(data_[i].remark);
		    }
		  }
		})
	  }
	})
  }
}
function is_input_val(){
  var input=$(".input_box input"),is=false;
  for(var i=0;i<input.length;i++){
    if(input.eq(i).val()!=""){
      is=true;
      break;
    };
  }
  return is;
}
function option(data,is){
  var html="";
  if(data=="section"){
		$.ajax({
			url:"http://guding.seamantf.com/departure/select",
			type:"POST",
			async:false,
			headers:{"Content-Type":"application/json;charset=UTF-8"},
			success:function(res){
				var data_=res.data
				if(res.code==100){
					for(var i=0;i<data_.length;i++){
						html+="<option value="+data_[i]+">"+data_[i]+"</option>";
					}
				};
			}
		})
		if(is=="is"){
		  return html;
	  }else{
	    html="<option value=''>所有部门</option>"+html;
	  }
    $(".input_box select[name=departure]").html(html);
  }else if(data=="sort"){
    $.ajax({
	  url:"http://guding.seamantf.com/assets/AssetNo",
	  type:"POST",
	  headers:{'Content-Type':'application/json;charset=UTF-8'},
	  success:function(res){
		var html="";
		for(var i in res.data){
		  html+="<option value='"+i+"'>"+i+"</option>";
		};
		$(".input_box select[name=assetName]").html("<option value=''>所有资产</option>"+html);
	  }
	})
  }else{
    data=data.split(",");
    for(var i=0;i<data.length;i++){
      html+="<option value="+data[i]+">"+data[i]+"</option>";
    }
  }
  return html;
}
function obj(type,data){
  data=data.split(",");
  var data_={};
  for(var i=0;i<data.length;i++){
	if(data[i].indexOf(":")!="-1"){
	  var _data=eval('('+data[i]+')');
	  data_[_data.select]=$("."+type+" select[name="+_data.select+"]").val();
	}else{
	  data_[data[i]]=$("."+type+" input[name="+data[i]+"]").val();
	};
  }
  return data_;
}
function _btn(type){
  if(type=="new"){
    $(".mask").fadeToggle();
	$("form.new").fadeToggle();
  }else if(type=="amend"){
    $(".mask").fadeToggle();
	$("form.amend").fadeToggle();
  }else{
    $(".mask").fadeToggle();
	$("."+type).fadeToggle();
  }
}
function tr_get(parm,type){
  var input=$("form.amend input");
  for(var i=0;i<input.length;i++){
	if(type=="register"){
	  input.eq(i).val(parm.children("td").eq((i+2)).text());
	}else{
	  input.eq(i).val(parm.children("td").eq((i+1)).text());
	}
  }
  if(type=="recipients"){
    var name=$("form.amend [name]");
	for(var i=0;i<name.length;i++){
	  if(name[i].localName=="select"){
	    name.eq(i).html("<option value="+parm.children("td").eq((i+1)).text()+">"+parm.children("td").eq((i+1)).text()+"</option>"+option("section","is"));
	    $(".amend option:contains("+parm.children("td").eq((i+1)).text()+"):last").remove();
	  }else{
	    name.eq(i).val(parm.children("td").eq((i+1)).text());
	  }
	}
  }
  if(type=="register"){
    id=parm.children("td").eq(1).attr("data-id");
  }else{
    id=parm.children("td").eq(0).attr("data-id");
  }
  input.eq((input.length-1)).val(parm.find("span").eq(0).attr("src"));
}
function data(url,type,page,select,fields){
  if(type=="get"){
    var currentpage=$(".article input").val()||"1";
    var pagesize=$(".article select").val();
    if(page=="+"&&currentpage!=page_){
	  currentpage=++currentpage;
    }else if(page=="-"&&currentpage!="1"){
      currentpage=--currentpage;
    }
    var data={"currentpage":parseInt(currentpage),"pagesize":parseInt(pagesize)};
  }else if(type=="select"){
	if(page=="查询"){
	  $(".article input").val("");
	};
    var currentpage=$(".article input").val()||"1";
    var pagesize=$(".article select").val();
    if(page=="+"&&currentpage!=page_){
      currentpage=++currentpage;
    }else if(page=="-"&&currentpage!="1"){
      currentpage=--currentpage;
    }
	var data=obj("input_box",select);
	data.currentpage=parseInt(currentpage);
	data.pagesize=parseInt(pagesize);
  }
  $(".article input").val(currentpage);
  $.ajax({
    url:url,
	type:"POST",
	data:JSON.stringify(data),
	headers:{'Content-Type':'application/json;charset=UTF-8'},
	success:function(res){
	  var data=res.data.assets;
		page_=res.data.pagecount;
		$(".article .page").text("当前页数:"+currentpage+"/总页数:"+page_);
	  fields=fields.split(",");
	  var html="";
	  for(var i=0;i<data.length;i++){
	    html+="<tr>"
		for(var j=0;j<fields.length;j++){
		  if(fields[j]=="input"){
		    html+="<td><input type='checkbox'></td>";
		  }else if(fields[j]=="picurl"){
		    html+="<td src="+data[i][fields[j]]+"><img src="+data[i][fields[j]]+"></td>";
		  }else if(fields[j]=="fileurl"){
			if(data[i][fields[j]]!=""){
			  html+="<td><span class='btn' src="+data[i][fields[j]]+">查看附件</span></td>";
			}else{
			  html+="<td>无附件</td>";
			}
		  }else if(fields[j]=="id"){
		    html+="<td data-id="+data[i][fields[j]]+">"+data[i].aid+"</td>";
		  }else if(fields[j]=="operate"){
			if(data[i].borrowStatus=="已还"){
			  html+="<td><span class='btn'>已还</span></td>"
			}else{
		      html+="<td><span class='btn' id="+data[i].id+">归还</span></td>";
			}
		  }else{
		    html+="<td>"+data[i][fields[j]]+"</td>";
		  }
		}
		html+="</tr>";
	  }
		$(".table tbody").html(html);
	}
  })
}
function _data(url,type,fields,verify){
  var data=obj(type,fields);
  if(type=="new"){
    data.founder=name_;
  }else if(type=="amend"){
	data.founder=name_;
    data.id=id;
  }else if(type=="input_box"){
	data.founder=name_;
	data.remark=$("[name=remark]").val();
	if(url.indexOf("recordInfo")!="-1"){
	  data.fixreson=$("[name=fixreson]").val();
	  if(url.indexOf("update")!="-1"){
	    data.id=get_url("id");
	  }
	}
	if(url.indexOf("borrowinfo")!="-1"){
	  if(url.indexOf("update")!="-1"){
	    data.id=get_url("id");
	  }
	}
  }
  if(verify!=null){
    verify=verify.split(",");
    for(var i=0;i<verify.length;i++){
	  if(data[verify[i]]==""){
	    return alert("必填项不可留空");
	  }
	}
  }else{
	if($(".min_window span:contains(备注) i").length!=0){
	  if(data.remark==""){
	    return alert("内容不可留空");
	  }
	}
	if($(".input_box span:contains(维修完成日期) i").length!=0){
	  if(data.dateFix==""){
	    return alert("内容不可留空");
	  }
	}
    for(var i in data){
	  if(data[i]==""){
	    return alert("内容不可留空");
	  }
	}
  }
  $.ajax({
    url:url,
		type:"POST",
		data:JSON.stringify(data),
		headers:{'Content-Type':'application/json;charset=UTF-8'},
		success:function(res){
			alert(res.msg);
			if(url.indexOf("recordInfo")!="-1"||url.indexOf("transfer")!="-1"||url.indexOf("borrowinfo")!="-1"){
				window.history.back(-1);
			}else{
				window.location.reload();
			}
		}
  })
}
$("input[placeholder=选择上传文件]").on("focus",function(){
  $("input[type=file]").val("");
  $("input[type=file]").click();
  url="http://guding.seamantf.com/file/upload/pdffile";
})
$(".btn:contains(登记导入)").on("click",function(){
  $("input[type=file]").val("");
  $("input[type=file]").click();
  url="http://guding.seamantf.com/assets/listinsert";
})
$(".btn:contains(领用导入)").on("click",function(){
  $("input[type=file]").val("");
  $("input[type=file]").click();
  url="http://guding.seamantf.com/useasset/import";
})
$("input[type=file]").on("change",function(){
  var formdata=new FormData($(".file")[0]);
  formdata.append("founder",name_);
  if(url.indexOf("pdffile")=="-1"){
    var html="<div class='new_mask'>上传中...</div>";
	$("body").append(html);
  }else{
	var href=window.location.href
	if(href.indexOf("a_repair_info")!="-1"||href.indexOf("a_borrowing_info")!="-1"){
	  var html="<div class='new_mask'>上传中...</div>";
	  $("body").append(html);
	}else{
	  var html="<div class='min_mask'>上传中...</div>";
      $(".min_window").append(html);
	};
  }
  $.ajax({
    url:url,
		type:"POST",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(res){
			if(url.indexOf("pdffile")!="-1"){
			alert(res.msg);
				$(".min_mask").remove();
				$(".new_mask").remove();
				$("input[name=fileurl]").val(res.data);
			}else if(url.indexOf("assets/listinsert")!="-1"){
			if(res.code==0){
				alert(res.msg);
				window.location.reload();
			}else{
				if(res.data.未导入成功的){
				var data=res.data.未导入成功的;
					var html="";
					for(var i=0;i<data.length;i++){
						html+="</p>"+data[i]+"</p>";
					}
					$(".new_mask").html("<p>未导入成功的:</p>"+html);
					$(".new_mask").on("dblclick",function(){
						window.location.reload();
					})
				}else{
					$(".new_mask").html("<p>"+res.data+"</p>");
					$(".new_mask").on("dblclick",function(){
						window.location.reload();
					})
				}
			}
			}else{
				if(data=res.data.未导入成功的){
				var html="";
				for(var i=0;i<data.length;i++){
					html+="</p>"+data[i]+"</p>";
				}
				$(".new_mask").html("<p>未导入成功的:</p>"+html);
				$(".new_mask").on("dblclick",function(){
					window.location.reload();
				})
			}else{
				$(".new_mask").html("<p>导入成功</p>");  
				$(".new_mask").on("dblclick",function(){
					window.location.reload();
				})
			};
			}
		},
		error:function(err){
			alert("上传失败");
			window.location.reload();
		}
		})
})
function hidden(type){
  /*显示数据栏*/
  $(".btn:contains(新增)").on("click",function(){
	if(type=="recipients"){
	  $.ajax({
	    url:"http://guding.seamantf.com/assets/selectuse",
			type:"POST",
			headers:{'Content-Type':'application/json;charset=UTF-8'},
			success:function(res){
				var html="";
				for(var i in res.data){
					html+="<option value="+[i]+">"+[i]+"</option>";
				}
				$(".min_window select[name=assetName]").append(html);
				var data=res.data[$(".min_window select[name=assetName]").val()];
				var html="";
				for(var i=0;i<data.length;i++){
					html+="<option value="+data[i].assetNo+">"+data[i].assetNo+"</option>";
				}
				$(".min_window select[name=assetNo]").html(html);
				$(".min_window select[name=assetName]").on("change",function(){
					var data=res.data[$(this).val()];
				var html="";
				for(var i=0;i<data.length;i++){
					html+="<option value="+data[i].assetNo+">"+data[i].assetNo+"</option>";
				}
				$(".min_window select[name=assetNo]").html(html);
				})
				var data_=res.data[$(".min_window select[name=assetName]").val()];
				for(var i in data_){
				if(data_[i].assetNo==$(".min_window select[name=assetNo]").val()){
					$(".min_window input[name=remark]").val(data_[i].remark);
				}
				}
				$(".min_window select[name=assetNo]").on("change",function(){
					var data_=res.data[$(".min_window select[name=assetName]").val()];
				for(var i in data_){
					if(data_[i].assetNo==$(this).val()){
						$(".min_window input[name=remark]").val(data_[i].remark);
					}
				}
				})
			}
	  })
	}else if(type=="register"){
	  $.ajax({
	    url:"http://guding.seamantf.com/assets/AssetNo",
			type:"POST",
			headers:{'Content-Type':'application/json;charset=UTF-8'},
			success:function(res){
				var html="";
				for(var i in res.data){
					html+="<option value="+i+">"+i+"</option>";
				};
				$(".min_window select[name=assetName]").html(html);
				$(".min_window input[name=assetNo]").val(res.data[$(".min_window select[name=assetName]").val()]);
				if($(".min_window select[name=assetName]").val()=="其他资产"){
				$(".min_window span:contains(备注)").prepend("<i>*</i>");
				}else{
				$(".min_window span:contains(备注) i").remove();
				}
				$(".min_window select[name=assetName]").on("change",function(){
					$(".min_window input[name=assetNo]").val(res.data[$(this).val()]);
				$(".min_window span:contains(备注) i").remove();
				if($(this).val().indexOf("其他")!="-1"){
					$(".min_window span:contains(备注)").prepend("<i>*</i>");
				}
				})
			}
	  })
	}
	$("input[name=fileurl]").val("");
    _btn("new");
  })
  /*隐藏新增栏*/
  $(".new .btn:contains(取消)").on("click",function(){
    _btn("new");
  })
  /*显示修改栏*/
  $(".table tbody").on("dblclick","tr",function(){
	tr_get($(this),type);
    _btn("amend");
  })
  /*隐藏修改栏*/
  $(".amend .btn:contains(取消)").on("click",function(){
    _btn("amend");
  })
}
/*F5刷新*/
$(document).bind("keydown",function(e){ 
  var key=e.keyCode;
  if(key==116){ 
    e.preventDefault();
	window.location.reload(true);
  } 
});