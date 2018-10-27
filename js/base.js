/*表格常用功能/参数:挂载表格类,调用排序列数*/
function table_effect(mount,index){
  /*全选/反选*/
  $("."+mount+" thead").on("click","input[type=checkbox]",function(){
    if(this.checked){
      $("."+mount+" tbody input[type=checkbox]").prop("checked",true);
    }else{
      $("."+mount+" tbody input[type=checkbox]").prop("checked",false);
    }
  })
  $("."+mount+" tbody").on("click"," input[type=checkbox]",function(){
    if(!this.checked){
      $("."+mount+" thead input[type=checkbox]").prop("checked",false);
    }else{
      var is=$("."+mount+" tbody input[type=checkbox]");
      for(var i=0;i<is.length;i++){
        if(!is[i].checked){
          return;
        }
      }
      $("."+mount+" thead input[type=checkbox]").prop("checked",true);
    }
  })
  /*排序:sort类为调用列*/
  if(index){
	index=index.split(",");
	for(var i=0;i<index.length;i++){
      $("."+mount+" thead tr th").eq(--index[i]).addClass("sort");
	}
  }
  var isArray=true;
  $("."+mount+" thead tr .sort").on("click",function(){
    var list=$("."+mount+" tbody tr");
    var arr=[];
    var index=$(this).index();
    function load(){
	  $("."+mount+" tbody").remove();
      var add=$("<tbody></tbody>");
      for(var i=0;i<arr.length;i++){
        add.append(arr[i]);
      }
      $("."+mount).append(add);
    }
    function sort_order(a,b){
      var a=$($($(a)[0]).children("td")[index]).text();
      var b=$($($(b)[0]).children("td")[index]).text();
      return a-b;
    }
    function sort_drop(a,b){
      var a=$($($(a)[0]).children("td")[index]).text();
      var b=$($($(b)[0]).children("td")[index]).text();
      return b-a;
    }
    if(isArray){
      for(var i=0;i<list.length;i++){
        arr.push(list[i]);
      }
      arr.sort(sort_order);
      load();
      isArray=false;
    }else{
      for(var i=0;i<list.length;i++){
        arr.push(list[i]);
      }
      arr.sort(sort_drop);
      load();
      isArray=true;
    }
  })
}
/*表格头部加载/参数:挂载表格类,列名*/
function table_box(mount,data){
  if(!Array.isArray(data)){
    var data=data.split(",");
  };
  var template='<tr>';
  for(var i=0;i<data.length;i++){
    if(data[i]=="input"){
      template+='<th><input type="checkbox"></th>';
    }else{
      template+='<th>'+data[i]+'</th>';
    }
  }
  template+='</tr>';
  $("."+mount+" thead").html(template);
}
/*获取多选框值/参数:挂载表格类,获取内容列,属性或文本,属性名*/
function table_checked(mount,index,type,property){
  var checked=$("."+mount+" tbody input[type=checkbox]:checked");
  var arr=[];
  for(var i=0;i<checked.length;i++){
	var index_=index
	if(index>=0&&type=="attr"&&property){
	  var val=checked.eq(i).parent().parent().children("td:nth("+(--index_)+")").attr(""+property+"");
	  if(val!=null){
	    arr.push(val);
	  }
	}else if(index>=0&&type=="text"){
	  var val=checked.eq(i).parent().parent().children("td:nth("+(--index_)+")").text();
	  if(val!=""){
	    arr.push(val);
	  }
	}else{
	  arr.push(checked.eq(i).val());
	}
  }
  if(arr.length==0){
    return null;
  }else{
    return arr.join(",");
  };
}
/*浏览器返回跳转指定页面*/
function return_page(site){
  var state={title:"title",url:"#"};
  window.history.pushState(state,state.title,state.url);
  window.addEventListener("popstate",function(e){
	window.location.href=site;//后退跳转的链接
  },false);
}
/*控制台输出*/
function con(content,format){
  format=="渲染"?document.write(content):
    format=="弹窗"?alert(content):
	format=="警告"?console.warn(content):
	format=="错误"?console.error(content):console.log(content);
}
/*获取滚动方向事件/ture_向上滑动/false_向下滑动*/
function is_roll(fn_a,fn_b){
  var is_browser="";
  if(browser("pc","Firefox")){
    is_browser="DOMMouseScroll";
  }else{
    is_browser="mousewheel";
  }
  $(document).on(is_browser,function(e){
    e=window.event||e;
	var scroll=document.body.scrollTop||document.documentElement.scrollTop;
	if(e.detail>0||e.wheelDelta<0){
	  fn_a==""?"":fn_a(scroll);
	}else{
	  fn_b==null?"":fn_b(scroll);
	}
  })
}
/*判断浏览器及ie版本号*/
function browser(para_,para){
  function is(data,is){
    if(is){
	  return info.match(data);
	}else{
	  return info.indexOf(data);
	}
  }
  function obj_for(obj,is){
    for(var i in obj){
	  if(obj[i]==true){
	    con(i+"："+obj[i],is);
	  }
	}
  }
  var info=navigator.userAgent;
  var versions={
    port:!!is(/AppleWebKit.*Mobile.*/,true),//是否移动端
	pc:{
	  Safari:is("Safari")!=-1&&is("Chrome")==-1,//safari浏览器
	  Quirks:document.compatMode=="BackCompat",//怪异模式
	  Chrome:is("Chrome")!=-1&&is("Safari")!=-1,//谷歌
	  Firefox:is("Firefox")!=-1,//火狐
	  Opera:is("Opera")!=-1,//opera
	},
	move:{
	  android:is("Android")!=-1||is("Linux")!=-1,//android终端或者uc浏览器
	  ios:!!is(/\(i[^;]+;(U;)?CPU.+Mac OS X/,true),//ios终端
	  iPhone:is("iPhone")!=-1,//是否为iPhone或者QQHD浏览器
	  gecko:is("Gecko")!=-1&&is("KHTML")==-1,//火狐内核
	  webKit:is("AppleWebKit")!=-1,//苹果&谷歌内核
	  qq:!!is(/QQ.[0-9]+.[0-9]+./,true),//是否QQ
	  webApp:is("Safari")==-1,//是否web应用程序
	  wx:is("MicroMessenger")!=-1,//是否微信
	  presto:is("Presto")!=-1,//opera内核
	  trident:is("Trident")!=-1,//IE内核
	  iPad:is("iPad")!=-1,//是否为iPad
	},
  }
  versions.pc.ie=is("compatible")!=-1&&is("MSIE")!=-1&&!versions.pc.Opera;//ie
  versions.pc.Edge=is("Windows NT 6.1; Trident/7.0;")!=-1&&!versions.pc.ie;//ie_edge
  versions.pc.ie_Edge=versions.pc.ie&&versions.pc.Edge;//所有ie(包括edge)浏览器
  versions.pc.wx_pc=versions.move.wx&&(is("Version")==-1||is("MQQBrowser")==-1);//是否为web开发者
  if(is!=null&&para!=null){
    return versions[para_][para];
  }else if(versions.port){
    obj_for(versions.move,"渲染")
  }else{
    obj_for(versions.pc)
  }
}
/*间隔触发/间隔时间过后才能触发*/
function itr(fn,wait,parm){
  var previous=null;
  return function(){
    var now=+new Date();
	if(now-previous>wait){
	  fn(parm);
	  previous=now;
	}
  }
}
/*延迟触发/延迟时间过后触发*/
function delay(fn,wait,parm){
  var timer,is=true;
  return function(){
    if(is){
	  fn(parm);
	  is=false;
	}
	if(timer){
	  return;
	}
	timer=setTimeout(function(){
	  clearTimeout(timer);
	  timer=null;
	  fn(parm);
	},wait==""||null?500:wait);
  }
}
/*获取url地址参数*/
function get_url(data){
  if(data!=null){
    var reg=new RegExp("(^|&)"+data+"=([^&]*)(&|$)");
	var arr=window.location.search.substr(1).match(reg);
	if(arr!=null){
	  return arr[2];
	}else{
	  return false;
	}
  }else{
    var data=location.search.substr(1);
	var obj={};
	var arr=data.length?data.split("&"):[];
	for(var i=0;i<arr.length;i++){
	  var value=arr[i].split("=");
	  obj[value[0]]=value[1];
	}
	return obj;
  }
}
/*冒泡排序*/
function sort(data,is){
  if(data instanceof Array){
    var arr=data;
	is==false?false:true
  }else{
	var arr=data.arr;
	is==data.order==false?false:true;
  }
  for(var i in arr){
    for(var i in arr){
	  var last=i++,next=i;
	  var a=arr[last],b=arr[next];
	  if(a>b&&is==true||a<b&&is==false){
	    arr[last]=b;
		arr[next]=a;
	  }
	}
  }
  return arr;
}
/*file图片预览*/
function preview(data,count){
  if(count){
    $("."+data+" input[type=file]").attr("multiple",true);
  }
  $("."+data+" input[type=file]").on("change",function(){
    var file_=$(this)[0].files;
	for(var i=0;i<file_.length;i++){
	  var file=file_[i];
	  if(file.type.indexOf("image")!=-1){
	    var url=new FileReader();
	    url.readAsDataURL(file);
	    $(url).on("load",function(){
	      var newUrl=this.result;
		  $("."+data+"").append("<img src="+newUrl+">");
	    })
	  }
	}
  })
}
/*file上传文件框*/
function uploading_(data,is,url){
  var width="20%",height="50%;",display="none",position="fixed",margin="margin-top:40px;";
  var style=$("<style></style>");
  if(!is){
	width="100%",height="100%;",display="block",position="relative",margin="";
  }
  $("head").append(style);
  $(style).html("#"+data+"{width:"+width+";height:"+height+";display:"+display+";border:2px dashed #aaa;border-radius:10px;position:"+position+";margin:auto;left:0;bottom:0;right:0;top:0;overflow:auto;}#"+data+"::-webkit-scrollbar {display: none;}#"+data+" h1{text-align:center;line-height:50px;font-size:2em;color:#999;cursor:pointer;width:80%;margin:auto;"+margin+"border-bottom:2px dashed #aaa;font-weight:bold;}#"+data+" li{width:80%;margin:auto;border:2px dashed #999;border-top:none;}#"+data+" span{display:inline-block;line-height:35px;text-align:center;vertical-align: middle;overflow:hidden;}#"+data+" li span:nth-child(1){width:60%;}#"+data+" li span:nth-child(2){width:20%;box-sizing:border-box;border-right:2px dashed #999;border-left:2px dashed #999;}#"+data+" li span:nth-child(3){width:20%;}#"+data+" li i{width:30px;height:30px;vertical-align: middle;display:inline-block;background-repeat:no-repeat;background-size:70%;background-position:center;cursor:pointer;background-image:url(data:img\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAc0AAAIOBAMAAAAo\/0upAAAAMFBMVEX\/\/\/8nJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYnJjYMJptVAAAAD3RSTlMAEUQiVYi7mWaq7t3MM3fiZdTbAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAASAAAAEgARslrPgAACi9JREFUeNrt3c9vHPUZx\/EZL04cgskKBaWKotYNICEVKVYl6C32FXGIo9ZRmlZaoypGrVTZAg6otNrl0EPowe5fkFDaqD2km0pNrwscekPeUw8UyS5Vb5ViEvCPXSdf\/Nsz3+\/M7OzMfOeZ3X1\/rjx5\/Lx2fi3zax0n+7jnU+U5CyNZyOkrKmXW3ilLIzrGvZFWuSt9T9rRiXktC6ZSrR9KS3JhbueytCUqr2XGVK1JaUx4hrNjKrVeluaExV3K0qk+lfaE5bNMmarVlAYFZ7SerVPdkRYFJ+PFWdQF6jaydqoPpU1BOZY5U21Jm4JSyd6ppqRRZkYtMNUDaZUZC6utUm1plZkFG84CrrgNK84PpFl6Rqww1Ya0S89TdpyF20An7DhVUxqmpWLJOS8N07JkyXlXGuaPa4mpHkrL\/HnClvOxtMyfTM+YePO1tMyfE7aca9Iyf6x8u91JwQ6gT9pyKmmZP6dw4sSJs2jOTxJezK72mHMmYaMKziIEJ06cOKWDEydOnNLBiRMnTungxIkTp3Rw4sSJUzo4ceLEKR2cRXQ+87\/p2WSZ08e7nbBRQ2+UsM\/16S\/GQ5Tfelf1VVrBj7O\/Kj1X9tmsmczfSQ9lI20D+pL0SJagY37mGemBbGXTt42ONqTnsZY\/eJ0L0tNYjGcTtfTQVDHiucO+Ij2L1cwPxOL0PBpySXoSy9nfQkt16UEsZ\/89DJYeaSxO9h\/bvy89h\/VM7TDduvQY1rP7MN5x6SnsZ33HOSE9RQ4Z7\/svCXvZ+apQlx4ih3xp8QnVImXD4pObRcqWzScai5Sysyw9Qi6ZHIjd7c43oqr0CLlkxpmTHiGXfDQQh0+lVh3pCXDixIlTegIpZwYviHHPvzCdPOe\/m36C4Vyc8sGJsxeDE2cvBifOXgxOnL0YnDh7MThx9mJw4uzF4MTZi8GJsxeDE2cvBifOXgxOnL0YnAPn7M\/g7K\/g7K\/g7K+sDshzHXcH5jmdivQIuWTKuSA9Qi6ZtPgLa0VKeWCec+3zl7js5fFAvCZi70URVekhcsiiMxjviRhzBuK9H7s\/2tz3rx9S6tHuyZSK9BjWM7Xr7Pv3LLXLu87RuvQglvNo\/yzggvQglrMSdrazv7J+eFq3Kj2K1cwfOvv6ELruOU9\/X3oYi5n3OJ+oS09jLX\/2XXh5RXocW9lq+q8wvS89kJ20VvxMx70mPZIV5mXjkqH7f+mhss\/Wf4Iujr48Jz1XxrnedILzoudnD5b0f\/XPhL9AYDPGkP84\/E9vXB2Lden7gt4i3j\/LN8aQU+lb4MSJEydOnDhx4ixecOLEiVM6OHHixCkdnDhx4pQOTpw4cUoHJ06cOKWDEydOnId55oXp8zEbl56f\/qIZs\/b7v736XIGc7o2dgr+8F6fvxaXt0tbbcUpHf7LT9l7Eh5Kv8+Ce1natc9sz+90+6VxamtsrXRsviPN7ByXtZqeuI\/WD2tc7TlA5KA1\/VVCuTs8TwX\/s1LWqYn8m547aflwIZ9VTVItu6n2U7U50qds4Kt1\/QEzW6XvA+0F0U+9H0hqPLD3nbRu2QPN0+gpbzaieT6s4w5sfie9ZGylnw1c1E9Vzwlca+SYy7efLJ8Wd\/mUUveL6llH0invS3\/auuPOsv2oromVJ6zgfUbvgL90Qd17SyprhLfXnL29F\/Pk5f+mauLOqla2Et9TWRfVVeKmr\/\/WytLOulX0U3nJZK43YERlvI6kJO\/VtTq2Gt9RX8bXw0uF4gPycQ104K1ppO7zUeIvOYtGcEQcW3anCS4\/ppTPCTmMFw4kTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixDkQzqcHxDmklz0cEOdqeMv7WulaeOlxve28sNPVy27FbxnhHI4HyM\/pLGlli+Etv6OVPg4vNVaTSWlnRSurhbc8oZVGbMpO3V\/aijmkPeeyVlYOb6nvm+9G\/Pmqv3Rd3Hks1kC7cbWFVIuo1T6+R+JObUv6MKrnfV9pO6pU2+HOizudm\/H\/0Elf6VdRpSXfsm+NyzvPeYvWInuO1uPPtOAt3Yg7pEWnb\/i\/RTe9FPsj8R9Bw8bP0+l8dlSz1YxuOuLp93qHAapHpaE7t1ydpaXYs3s+k\/VOpZ7PpFYIp\/PsQcmfOnYtHSyl9mTH2n8dtP1l\/CGtOp0f7DPLndsOze0xV2KM8Npe2793MaRdp3P619v7lbdj9S3daKjW9Was2ou\/UOr2f7sZ0rJzO+X4rd0uSqPbCjhFghMnTpzSwYkTJ07p4MSJc7CcK9KoOENOSnxUAs6x\/nRW0jsn9BaL0ig7zlN6ixlpVEDmLDhXpVEBaehDdt\/iSb3Fo+572I5xc0QCp3Fny+Pue9jOiD7jVvc9jDs+NqVVZoy7b9a672E4W933sJ2T+oxfd9\/DuLMlwXcN21nWR9zovseo4VyUZhmp6iM+SNDEcH4pzTJSz2JE4xicYOW3G2N3G3lHUlgqxo6oLA3TYuyGwm6\/icwFo8uUNEzLQia7ylNGlw+kYVoaxoTlBF2ML0RF20CNI3ySr0NBbVRTmubLRDYLwjyAqo+lab4YB4ToO+lCY67+He\/5yTMB69utRI0qZqOaNM4T83iQ6LAStP6rO9K4o\/jviUyz\/3jKbNRK1slGzprTtZN1Mr9WdbiNOM+4S+ZwCc8EuAHOwizQzwOGe5iwVzWgV0G20KCtM\/EZyYAdUVEuP7wfNNpYwmbHg5ptlqWN2zkTNFmCk0N7KQV1i7pNNK8MNYIGS3IyYS83A6E\/k2a6wXPNJG54IbCfekuWWboWPNZY4o4nghuq30gyR6vBQyXePPWHZTy51xRjXmyEzJTmukglpKdqvzMmonzx3bCJUp3VOanCc3t2Oudcma2Hj9Mup3AOqZ5Jsv\/HPshN6fFjZyaV82z6AfJJ2BOF\/bbiplttI\/a4BctUSuex9CPkkURnbr3Rn6kuaNKf51iWJsTKZGrnSPoh7CfBdWwjC9KIGFnJwDmcfgzbyeY6QVWa0THzmTiPpx\/EbrK67FOVhnRINosz4N1YxUp2V\/EWpCmRqWXmHKlLWyKSxbHzIP+WxoSnNZahM+SMaRHy+wyZ27uiurQnJFnfFfx5+pFspN3M2OlWpEmBuZwx03FKc9KmgHyaObOQB5e\/WmB6Xr9TlKyXrTidZ+vSMj9z3A6zYNA4bztKmm83pHWHuWeR6Tijv5L27aX1pk3lTl6VJu5ks2ab6ThDP5VWbv2obJ+5ndNX6oLK2zkpd\/P8j2fnBIyzP786lmzgbwDRUxNrSKuqEQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wNS0xOFQxNzozNzoyOSswODowMEv8LO4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDUtMThUMTc6Mzc6MjkrMDg6MDA6oZRSAAAAH3RFWHRwczpIaVJlc0JvdW5kaW5nQm94ADQ2MXg1MjYrMCswMVHA7wAAABx0RVh0cHM6TGV2ZWwAQWRvYmUtMy4wIEVQU0YtMy4wCptwu+MAAAAASUVORK5CYII=);}");
  var html="<h1>拖拽文件</h1><ul><li><span>文件名</span><span>大小</span><span>操作</span></li></ul>";
  $("#"+data+"").append(html);
  var element=document.getElementById(data);
  var formData=new FormData();
  element.ondragover=function(e){
    e.preventDefault();
    $("#"+data+" h1").text("释放文件");
    $("#"+data+"").css({
      "border-color":"#ddd",
	  "box-shadow":"-2px -2px 10px #999 inset"
	});
  }
  element.ondragleave=function(e){
    e.preventDefault();
	$("#"+data+" h1").text("拖拽文件");
	$("#"+data+"").css({
	  "border-color":"#aaa",
	  "box-shadow":"none"
	});
  }
  element.ondrop=function(e){
    e.preventDefault();
	$("#"+data+" h1").text("上传文件");
	$("#"+data+"").css({
      "border-color":"#aaa",
	  "box-shadow":"none"
	});
	var data_=e.dataTransfer.files;
	var html_="";
	for(var i=0;i<data_.length;i++){
	  formData.append(data_[i].name,data_[i]);
	  html_+="<li><span>"+data_[i].name+"</span><span>"+data_[i].size+"</span><span><i data-id="+data_[i].name+"></i></span></li>";
	}
	$("#"+data+" ul").append(html_);
  }
  $("#"+data+" ul").on("click","li i",function(){
    var name=$(this).attr("data-id");
    formData.delete(name);
	$(this).parent().parent().remove();
	if($("#"+data+" ul li").length==1){
	  $("#"+data+" h1").text("拖拽文件");
	};
  })
  if(url){
    $("#"+data+" h1").on("click",function(){
	  if($(this).text()=="上传文件"){
	    $.ajax({
		  url:""+url+"",
		  data:formData,
		  type:"POST",
		  contentType:false,
		  processData:false,
		  success:function(res){
		    console.log(res);
		  }
		})
	  }else{
	    alert("请先上传文件");	
	  }
	})
  }
  this.ret=formData;
}
/*copy操作*/
function copy(data,event){
  data_={
    mouse:false,
	copy:false,
	select:false,
	alter:false,
	gain:false,
  }
  var data=Object.assign(data_,data);
  if(data.mouse){
    $(document).on("contextmenu",function(){
	  return false;
	})
  }
  if(data.copy){
    $(document).on("copy",function(){
	  return false;
	})
  }
  if(data.select){
    $(document).on("selectstart",function(){
	  return false;
	})
  }
  if(data.alter){
    document.addEventListener("copy",function(e){
	  e.preventDefault();
	  e.clipboardData.setData("Text",data.alter);
	})
  }
  if(data.gain){
	var txt="";
	document.addEventListener("paste",function(e){
	  e.preventDefault();
	  txt=e.clipboardData.getData("Text");
	  txt+=data.gain;
	  $(event).val(txt);
	})
  }
}
/*参数:挂载元素类/内容/大小/角度/字体颜色/上半部分颜色/下半部分颜色*/
function special_a(mount,data){
  var data_={
	content:"自定义",
	size:"5",
	skew:"10",
	color:"rgba(255,158,177,0.5)",
	color_up:"#fbf7f4",
	color_below:"#d3cfcc"
  }
  var data=Object.assign(data_,data);
  var style=$("<style></style>");
  var style_="."+mount+"{position:relative;font-family:'Source Code Pro',monospace;}."+mount+" h1{font-size:"+data.size+"em;font-weight:bold;display:inline-block;text-align:center;position:absolute;top:0;bottom:0;left:0;right:0;text-transform:uppercase;transform:skew("+data.skew+"deg)rotate(-6deg);text-rendering:optimizeLegibility;color:"+data.color+";text-shadow:1px 4px 6px #e6e2df,0 0 0 #66303a,1px 4px 6px #e6e2df;}."+mount+" h1:before,."+mount+" h1:after{content:'"+data.content+"';position:absolute;height:50%;overflow:hidden;right:0;left:0;}."+mount+" h1:before{top:0;color:"+data.color_up+";z-index:2;text-shadow:2px -1px 6px rgba(0,0,0,0.2);transform:translate(13.5px)skew(-15deg)scale(1,1);}."+mount+" h1:after{bottom:0;line-height:0;color:"+data.color_below+";z-index:1;text-shadow:2px -1px 6px rgba(0,0,0,0.3);transform:translate(11.6px,-10px)skew(16deg)scale(1,0.8);}";
  style.html(style_);
  $("head").append(style);
  var h1="<h1 data-heading="+data.content+">"+data.content+"</h1>";
  $("."+mount+"").append(h1);
  var h=$("."+mount+"").height();
  $("."+mount+" h1").css("line-height",h+"px")
}
/*扇型导航*/
function fan_area(mount,data,style){
  var style_data={"speed":"0.5s","color":"#000","bg_a":"#c8c8c8","bg_b":["#ddd","#ccc","#bbb","#aaa","#999","#888","#777"],"bg_c":["#aaa","#999","#888","#777","#666","#555","#444"],"hover":{"bg_a":{"bg":"#f00","color":"#fff"},"bg_b":{"bg":"#d00","color":"#fff"},"bg_c":{"bg":"#b00","color":"#fff"}}};
  var style=Object.assign(style_data,style);
  var _style=$("<style></style>");
  var style_="."+mount+"{position:fixed;left:0;top:0;}."+mount+" ul{position:absolute;transform:rotate(90deg);transition:all "+style.speed+" linear;}."+mount+" span{cursor:pointer;z-index:25;font-weight:bold;line-height:2;font-size:14px;width:100px;position:absolute;text-align:center;box-shadow:-5px 5px 5px rgba(0,0,0,0.5);transform-origin:0 0;color:"+style.color+";}."+mount+">div>span{height:100px;border-radius:0 0 100px 0;}."+mount+" ."+mount+"_submenu>span{height:200px;padding-left:100px;border-radius:0 0 200px 0;}."+mount+" ."+mount+"_submenu li span{height:300px;padding-left:200px;border-radius:0 0 300px 0;}";
  style_+="."+mount+" li."+mount+"_rotate_7:nth-child(2)>span{transform:rotate(12.857143deg);}."+mount+" li."+mount+"_rotate_7:nth-child(3)>span{transform:rotate(25.714286deg);}."+mount+" li."+mount+"_rotate_7:nth-child(4)>span{transform:rotate(38.571429deg);}."+mount+" li."+mount+"_rotate_7:nth-child(5)>span{transform:rotate(51.428572deg);}."+mount+" li."+mount+"_rotate_7:nth-child(6)>span{transform:rotate(64.285715deg);}."+mount+" li."+mount+"_rotate_7:nth-child(7)>span{transform:rotate(77.142858deg);}."+mount+" li."+mount+"_rotate_6:nth-child(2)>span{transform:rotate(15deg);}."+mount+" li."+mount+"_rotate_6:nth-child(3)>span{transform:rotate(30deg);}."+mount+" li."+mount+"_rotate_6:nth-child(4)>span{transform:rotate(45deg);}."+mount+" li."+mount+"_rotate_6:nth-child(5)>span{transform:rotate(60deg);}."+mount+" li."+mount+"_rotate_6:nth-child(6)>span{transform:rotate(75deg);}."+mount+" li."+mount+"_rotate_5:nth-child(2)>span{transform:rotate(18deg);}."+mount+" li."+mount+"_rotate_5:nth-child(3)>span{transform:rotate(36deg);}."+mount+" li."+mount+"_rotate_5:nth-child(4)>span{transform:rotate(54deg);}."+mount+" li."+mount+"_rotate_5:nth-child(5)>span{transform:rotate(72deg);}."+mount+" li."+mount+"_rotate_4:nth-child(2)>span{transform:rotate(22.5deg);}."+mount+" li."+mount+"_rotate_4:nth-child(3)>span{transform:rotate(45deg);}."+mount+" li."+mount+"_rotate_4:nth-child(4)>span{transform:rotate(67.5deg);}."+mount+" li."+mount+"_rotate_3:nth-child(2)>span{transform:rotate(30deg);}."+mount+" li."+mount+"_rotate_3:nth-child(3)>span{transform:rotate(60deg);}."+mount+" li."+mount+"_rotate_2:nth-child(2)>span{transform:rotate(45deg);}";
  style_+="."+mount+">div>span{background:"+style.bg_a+";}";
  for(var i=0;i<style.bg_b.length;i++){
	var number=i;
    style_+="."+mount+" ."+mount+"_submenu:nth-child("+(++number)+")>span{background:"+style.bg_b[i]+";}";
  }
  for(var i=0;i<style.bg_c.length;i++){
    var number=i;
	style_+="."+mount+" ."+mount+"_submenu li:nth-child("+(++number)+")>span{background:"+style.bg_c[i]+";}";
  }
  style_+="."+mount+">div:hover>span{background:"+style.hover.bg_a.bg+";color:"+style.hover.bg_a.color+";}."+mount+" ."+mount+"_submenu:hover>span{background:"+style.hover.bg_b.bg+";color:"+style.hover.bg_b.color+";}."+mount+" ."+mount+"_submenu li:hover>span{background:"+style.hover.bg_c.bg+";color:"+style.hover.bg_c.color+";}."+mount+">div:hover >ul{transform:rotate(0deg);}."+mount+" ."+mount+"_submenu:hover >ul{transform:rotate(0deg);}";
  $(_style).html(style_);
  $("head").append(_style);
  var length=""+obj_leng(data)+""-1;
  var div=$("<div><span>"+data.title+"</span></div>");
  var html="";
  for(var i in data){
    if(Array.isArray(data[i])){
	  html+="<li class='"+mount+"_submenu "+mount+"_rotate_"+length+"'><span>"+i+"</span><ul>";
	  for(var i_=0;i_<data[i].length;i_++){
	    html+="<li class='"+mount+"_rotate_"+data[i].length+"'><span>"+data[i][i_]+"</span></li>";
	  }
	  html+="</ul>";
	};
  }
  $(div).append("<ul>"+html+"</ul>");
  $("."+mount+"").html(div);
}
/*获取对象length长度/输出第n个对象*/
function obj_length(e,number){
  var count=0;
  for(var i in e){
    count++;
	if(number!=null&&count==number){
	  return i;
	}
  }
  return count;
}
/*对象||数组转字符串/字符串转对象||数组*/
function turn(data){
  var reg=/^\W"[\S]*","[\S]"\W$/;
  if(reg.test(data)){
    data=data.replace("[","");
    data=data.replace("]","");
    data=data.replace(/"/g,"");
  }
  var reg=/{/;
  if(data instanceof Array){
	var is=true;
	for(var i in data){
      if(data[i] instanceof Object){
		is=false;
	  };
    }
	if(is){
	  data=data.join(",");
	}else{
	  data=JSON.stringify(data);
	}
  }else if(typeof data=="string"){
	if(reg.test(data)){
	  data=eval("("+data+")");
	}else{
	  data=data.split(",");
	};
  }else{
    data=JSON.stringify(data);
  }
  return data;
}
/*正则验证/替换文本*/
function reg(data,type,parm){
  var type_={"name":"No","attr":"gi"};
  var type=Object.assign(type_,type);
  var parm_={"count":"","max_count":"","content":"","text":""};
  var parm=Object.assign(parm_,parm);
  var count;
  if(parm.count!=""&&parm.max_count!=""){
    count="{"+parm.count+","+parm.max_count+"}";
  }else if(parm.max_count!=""&&parm.count==""){
    count="{1,"+parm.max_count+"}";
  }else if(parm.count!=""){
    count="{"+parm.count+"}";
  }else{
    count="*";
  };
  var _type={
	"No":"^[0-9]"+count+"$",
	"Cn":"^[\u4e00-\u9fa5]"+count+"$",
	"Eng":"^[A-Za-z]"+count+"$",
	"Eng||Cn":"^[A-Za-z0-9]"+count+"$",
	"Cy":"^[1-9][0-9]"+count+"$",
	"Phone":"^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$",
	"Mail":"^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$",
	"Card":"(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)"
  };
  if(type.name=="Rep"){
	if(parm.content!=""&&parm.text!=""){
	  return data.replace(new RegExp(parm.content,type.attr),parm.text);
	}
  }
  var reg=new RegExp(_type[type.name],type.attr);
  return reg.test(data);
}
/*整屏滚屏/挂载类/是否循环*/
function scroll_roll(mount,parm){
  var style=$("<style></style>");
  style_="."+mount+"{position:fixed;width:100%;height:100%;}."+mount+">ul>li,."+mount+">ul>li>ul>li{position:absolute;width:100%;height:100%;}."+mount+">ul>li:not(:first-child){top:100%;}."+mount+">ul>li>ul>li:not(:first-child){left:100%;}";
  $(style).html(style_);
  $("head").append(style);
  var X,Y,now=0,judge=true,judge_=true,date_=null,li=$("."+mount+">ul>li"),len=li.length-1,parm_={x:false,y:false,click:false};
  parm=Object.assign(parm_,parm);
  for(var i=0;i<li.length;i++){
    li.eq(i).attr("tag",i);
	var min_li=li.eq(i).children("ul").children("li");
	if(min_li.length>0){
	  for(var w=0;w<min_li.length;w++){
	    min_li.eq(w).attr("across_tag",w);
	  }
	  li.eq(i).attr("tag","0");
	}else{
	  li.eq(i).attr("tag",false);
	}
  }
  function to_(direction){
	var son_now=+$("."+mount+">ul>li[tag]:nth("+now+")").attr("tag");
	var son_len=$("."+mount+">ul>li[tag]:nth("+now+")>ul>li").length-1;
	var date=+new Date();
	if(date-date_>1000){
	  date_=date;
	  if(direction=="up"){
	    judge=false;
	    if(!parm.y&&now==len){
	      return;
	    }
	    var next=now==len?0:now+1;
	    $("."+mount+">ul>li[tag]:nth("+next+")").css("top","100%");
	    $("."+mount+">ul>li[tag]:nth("+next+")").animate({"top":"0"});
	    $("."+mount+">ul>li[tag]:nth("+now+")").animate({"top":"-100%"});
	    now=next;
	  }else if(direction=="down"){
	    if(judge==true){
		  $("."+mount+">ul>li:not(:first-child)").css("top","-100%");
		  judge=false;
	    }
	    if(!parm.y&&now==0){
	      return;
	    }
	    var next=now==0?len:now-1;
	    $("."+mount+">ul>li[tag]:nth("+next+")").css("top","-100%");
	    $("."+mount+">ul>li[tag]:nth("+next+")").animate({"top":"0"});
	    $("."+mount+">ul>li[tag]:nth("+now+")").animate({"top":"100%"});
	    now=next;
	  }else if(direction=="left"&&son_now!="false"){
	    judge_=false;
	    if(!parm.x&&son_now==son_len){
	      return;
	    }
	    var son_next=son_now==son_len?0:son_now+1;
	    $("."+mount+">ul>li[tag]:nth("+now+")>ul>li[across_tag]:nth("+son_next+")").css("left","100%");
	    $("."+mount+">ul>li[tag]:nth("+now+")>ul>li[across_tag]:nth("+son_next+")").animate({"left":"0"});
	    $("."+mount+">ul>li[tag]:nth("+now+")>ul>li[across_tag]:nth("+son_now+")").animate({"left":"-100%"});
	    $("."+mount+">ul>li[tag]:nth("+now+")").attr("tag",son_next);
	  }else if(direction=="right"&&son_now!="false"){
	    if(judge_==true){
		  $("."+mount+">ul>li[tag]:nth("+now+")>ul>li:not(:first-child)").css("left","-100%");
		  judge_=false;
	    }
	    if(!parm.x&&son_now==0){
	      return;
	    }
	    var son_next=son_now==0?son_len:son_now-1;
	    $("."+mount+">ul>li[tag]:nth("+now+")>ul>li[across_tag]:nth("+son_next+")").css("left","-100%");
	    $("."+mount+">ul>li[tag]:nth("+now+")>ul>li[across_tag]:nth("+son_next+")").animate({"left":"0"});
	    $("."+mount+">ul>li[tag]:nth("+now+")>ul>li[across_tag]:nth("+son_now+")").animate({"left":"100%"});
	    $("."+mount+">ul>li[tag]:nth("+now+")").attr("tag",son_next);
	  }
	};
  };
  function judge_direction(x,y,X,Y){
	if(X==x&&Y==y){
	  return;
	}
	var is=Math.abs(x-X)-Math.abs(y-Y);
    if(is<0&&is<-100){
	  if(Y-y<0){
	    to_("down");
	  }else{
	    to_("up");
	  };
	}else if(is>100){
	  if(X-x<0){
		to_("right");
	  }else{
		to_("left");
	  };
	};
  }
  if(parm.click){
	$(document).on("click",function(e){
	  var height=$(window).height()/2,width=$(window).width()/2,X=e.clientX,Y=e.clientY;
	  if(height-Y>100){
	    to_("down");
	  }else if(height-Y<-100){
		to_("up");
	  }else if(Math.abs(height-Y)<100&&width-X>100){
	    to_("right");
	  }else if(Math.abs(height-Y)<100&&width-X<-100){
	    to_("left");
	  };
	})
  }else{
	$(document).on("mousedown",function(e){
	  X=e.clientX;
	  Y=e.clientY;
	})
	$(document).on("mouseup",function(e){
	  judge_direction(e.clientX,e.clientY,X,Y);
	})
  }
  is_roll(function(){
    to_("down");
  },function(){
	to_("up");
  });
  $(document).on("keydown",function(e){
    var key=e.keyCode;
    if(key==37){
	  if($("."+mount+">ul>li[tag]:nth("+now+")").attr("tag")!="false"){
		to_("left");
	  };
    }else if(key==38){
      to_("up");
    }else if(key==39){
      if($("."+mount+">ul>li[tag]:nth("+now+")").attr("tag")!="false"){
	    to_("right");
	  };
    }else if(key==40){
      to_("down");
    };
  })
  $(document).on("touchstart",function(e){
	X=e.originalEvent.changedTouches[0].clientX;
	Y=e.originalEvent.changedTouches[0].clientY;
  })
  $(document).on("touchend",function(e){
	var end_X=e.originalEvent.changedTouches[0].clientX;
	var end_Y=e.originalEvent.changedTouches[0].clientY;
	judge_direction(end_X,end_Y,X,Y);
  })
}