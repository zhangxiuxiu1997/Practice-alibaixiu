//当表单发生表单提交行为时
$('#userForm').on('submit', function () {
  // var data = new FormData(userForm);
  // console.log(data)
  //获取到用户在表单中输入的内容并将内容格式化
  var formData = $(this).serialize();
  // console.log(formData);
  //创建ajax请求
  $.ajax({
    type: 'POST',//get或post
    url: '/users',//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      // console.log(result)
      //刷新页面
      location.reload();
    },
    error: function () {
      alert('用户添加失败');
    }
  })
  //阻止表单的默认提交行为
  return false;
})

//用户选择文件时的操作
$('#modifyBox').on('change', '#avatar', function () {
  //选择的文件 this.files[0];
  var formData = new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'POST',//get或post
    url: '/upload',//请求的地址
    data: formData,
    //告诉ajax方法不要解析请求参数
    processData: false,
    //告诉ajax方法不要设置请求参数的类型
    contentType: false,
    success: function (result) {//成功的回调函数
      // console.log(result)
      //实现头像预览功能
      $('#preview').attr('src', result[0].avatar);
      console.log('成功')
      $('#hiddenAvatar').val($('#preview').attr('src'));
    }
  })
});

//展示用户列表
$.ajax({
  type: 'get',//get或post
  url: '/users',//请求的地址
  success: function (result) {//成功的回调函数
    // console.log(result);
    //使用模板引擎拼接字符串
    var html = template('userTpl', { users: result });
    //将代码渲染到页面中
    $('#userBody').html(html);
  }
})

//修改用户之查询用户
$('#userBody').on('click', '#modify', function () {
  var id = $(this).attr('data-id');
  console.log(id);
  $.ajax({
    type: 'get',//get或post
    url: '/users/' + id,//请求的地址
    success: function (result) {//成功的回调函数
      // console.log(result)
      //与模板引擎拼接字符串
      var html = template('modifyTpl', { data: result });
      // console.log(html)
      //渲染页面
      $('#modifyBox').html(html);
    }
  })
})

//因为是动态创建的表单  所以得用事件委托的方式
$('#modifyBox').on('submit', '#modifyForm', function () {
  //获取到用户在表单中输入的内容并将内容格式化
  var formData = $(this).serialize();
  var id = $(this).attr('data-id');
  //创建ajax请求
  $.ajax({
    type: 'PUT',//get或post
    url: '/users/' + id,//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      // console.log(result)
      //刷新页面
      location.reload();
    },
    error: function () {
      alert('用户修改失败');
    }
  })
  //阻止表单的默认提交行为
  return false;
})

//单个删除用户
$('#userBody').on('click', '#delete', function () {
  var id = $(this).attr('data-id');
  if (confirm('您真的要删除这个用户吗?')) {
    $.ajax({
      type: 'DELETE',//get或post
      url: '/users/' + id,//请求的地址
      success: function (result) {//成功的回调函数
        location.reload();
      }
    })
  }
})

//多选和取消多选
$('#checkAll').on('change', function () {
  var status = $(this).prop('checked');
  // var checkItems = $(this).parent().parent().parent().siblings().find('input[type=checkbox]');
  // $.each(checkItems, function (index, ele) {
  //   $(ele).prop('checked', status)
  // })
  if (status) {
    $('#deleteMany').css('visibility','');
  } else {
    $('#deleteMany').css('visibility','hidden');
  }
  $('#userBody').find('input[type=checkbox]').prop('checked', status);
});

//事件委托判断用户是否全部被选中
$('#userBody').on('click', '.checkItem', function () {
  //判断选中的按钮和总按钮的数量是否一致
  if ($('#userBody').find('input').length == $('#userBody').find('input').filter(':checked').length) {
    $('#checkAll').prop('checked', true);
  } else {
    $('#checkAll').prop('checked', false);
  }
  //选中的复选框的数量大于2的话就显示批量删除按钮
  if ($('#userBody').find('input').filter(':checked').length >= 2) {
    $('#deleteMany').css('visibility','');
  } else {
    $('#deleteMany').css('visibility','hidden');
  }
})

//批量删除功能的实现
$('#deleteMany').on('click', function () {
  //找到被选中的按钮
  var checkedUsers = $('#userBody').find('input').filter(':checked');
  //存放id的数组
  var checkedArr = [];
  //循环被选中的按钮 并获取到之前添加到删除或者修改按钮上的id值
  $.each(checkedUsers, function (index, ele) {
    checkedArr.push($(ele).parent().siblings().find('#delete').attr('data-id'))
  })
  var dataStr = checkedArr.join('-');
  if (confirm('您真的要进行批量删除操作吗？')) {
    $.ajax({
      type:'DELETE',//get或post
      url:'/users/'+dataStr,//请求的地址
      success:function(result){//成功的回调函数
        location.reload();
      }
    })
  }
})
