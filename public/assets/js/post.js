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

//将数据显示到页面上
$.ajax({
  type:'get',
  url:'/posts',//请求的地址
  success:function(result){//成功的回调函数
    var html = template('articleTpl', { data: result.records });
    $('#articleBox').html(html);
    var html1 = template('pageTpl', { data: result });
    $('#ulPage').html(html1);
  }
})

//定义页码改变数据显示不同的函数
function pageChange(page) {
  $.ajax({
    type:'get',
    url: '/posts',//请求的地址
    data: {
      page: page
    },
    success:function(result){//成功的回调函数
      var html = template('articleTpl', { data: result.records });
      $('#articleBox').html(html);
      var html1 = template('pageTpl', { data: result });
      $('#ulPage').html(html1);
    }
  })
}

//将分类信息显示在下拉框中
$.ajax({
  type:'get',
  url:'/categories',//请求的地址
  success:function(result){//成功的回调函数
    var html = template('categoriesTpl', { data: result })
    $('#categoriesBox').html(html);
  }
})

//筛选按钮的表单提交事件
$('#screenForm').on('submit', function () {
  var dataForm = $(this).serialize();
  //获取文章id值
  let id = $(this).attr('data-id');
  //发送ajax请求
  $.ajax({
    type:'get',
    url:'/posts',//请求的地址
    data: dataForm,
    success:function(result){//成功的回调函数
      var html = template('articleTpl', { data: result.records });
      $('#articleBox').html(html);
      var html1 = template('pageTpl', { data: result });
      $('#ulPage').html(html1);
    }

  })
  //阻止表单默认提交
  return false;
})


//删除功能
$('#articleBox').on('click', '#delete', function () {
  //获取文章的id值
  let id = $(this).attr('data-id');
  console.log(id)
  //发送ajax请求
  $.ajax({
    type:'delete',
    url:'/posts/'+id,//请求的地址
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
})
