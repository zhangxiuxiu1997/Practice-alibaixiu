//表单的提交事件 创建分类
$('#categoriesAdd').on('submit', function () {
  //表单参数拼接
  var dataForm = $(this).serialize();
  //创建ajax请求
  $.ajax({
    type:'post',//get或post
    url:'/categories',//请求的地址
    data:dataForm,
    success:function(result){//成功的回调函数
      location.reload();
      console.log(111)
    },
    error: function () {
      console.log(222)
    }

  })
  //阻止表单默认提交行为
  return false;
})

//页面展示数据
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  success: function (result) {//成功的回调函数
    //拼接字符串
    var html = template('categoryTpl', { data: result });
    $('#categoryBox').html(html);
  },
  error: function () {
    alert('服务器错误');
  }
})

//修改按钮的点击事件  事件委托
$('#categoryBox').on('click', '#modify', function () {
  //获取当前数据的id值
  var id = $(this).attr('data-id');
  //将查询到的数据显示在左边
  $.ajax({
    type:'get',//get或post
    url:'/categories/'+id,//请求的地址
    success:function(result){//成功的回调函数
      //拼接模板
      var html = template('modifyTpl', { data: result });
      $('#modifyBox').html(html);
    }
  })
})
//修改功能
//确认修改提交到数据库 - 事件委托
$('#modifyBox').on('submit','#categoriesModify', function () {
  //获取到id值
  var id = $(this).attr('data-id');
  // console.log(id);
  //拼接请求参数地址
  var formData = $(this).serialize();
  //创建ajax请求
  $.ajax({
    type: 'put',
    url: '/categories/' + id,//请求的地址
    data: formData,
    success: function (result) {//成功的回调函数
      // console.log('ok')
      location.reload();
    }
  });
  //阻止表单默认提交
  return false;
})


//删除功能
//删除按钮的点击事件 -- 动态创建的需要用到事件委托
$('#categoryBox').on('click', '#delete', function () {
  //获取当前数据的id值
  var id = $(this).attr('data-id');
  if (confirm('您确定要删除这条数据吗？')) {
    $.ajax({
      type:'delete',//get或post
      url:'/categories/'+id,//请求的地址
      success:function(result){//成功的回调函数
        location.reload();
      }
    })
  }
})