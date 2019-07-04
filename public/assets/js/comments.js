//时间日期的格式化函数
function dateFormat(str) {
  var date = new Date(str);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month >= 10 ? 10 : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? 10 : '0' + day;
  return year + "-" + month + "-" + day;
}

//将评论信息添加到页面中
$.ajax({
  type: 'get',
  url: '/comments',//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    //拼接字符串
    var html = template('commentsTpl', { data: result })
    var html1 = template('pageTpl', { data: result })
    //将字符串显示在页面中
    $('#commentBox').html(html);
    $('#page').html(html1);
  }
})

//封装分页方法
function pageChange(page) {
  //发送ajax请求
  $.ajax({
    type: 'get',
    url: '/comments',//请求的地址
    data: { page: page },
    success: function (result) {//成功的回调函数
      var html = template('commentsTpl', { data: result })
      var html1 = template('pageTpl', { data: result })
      //将字符串显示在页面中
      $('#commentBox').html(html);
      $('#page').html(html1);

    }
  })
}

//审核状态
$('#commentBox').on('click', '#approval', function () {
  //获取id值
  var id = $(this).attr('data-id');
  //发送ajax请求
  $.ajax({
    type:'put',
    url:'/comments/'+id,//请求的地址
    data:{state:1},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
})

//驳回状态
$('#commentBox').on('click', '#reject', function () {
  //获取id值
  var id = $(this).attr('data-id');
  //发送ajax请求
  $.ajax({
    type:'put',
    url:'/comments/'+id,//请求的地址
    data:{state:0},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
})

//删除评论
$('#commentBox').on('click', '#delete', function () {
  //获取id值
  var id = $(this).attr('data-id');
  //发送ajax请求
  $.ajax({
    type:'delete',
    url:'/comments/'+id,//请求的地址
    data:{state:0},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
})