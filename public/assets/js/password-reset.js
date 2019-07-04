//当表单发生提交事件时
$('#modifyPassForm').on('submit', function () {
  //获取表单的值 并组成字符串
  var formData = $(this).serialize();
  //判断是否为空
  if ($('#old').val().trim().length == 0 || $('#password').val().trim().length == 0||$('#confirm').val().trim().length == 0) {
    alert('请输入完整');
    return;
  }
  //发送ajax请求
  $.ajax({
    type: 'put',//get或post
    url: '/users/password',//请求的地址
    data: formData,
/*     beforeSend: function () {
      //两次密码验证
      $('#confirm').on('blur', function () {
        if ($(this).val() == $('#password').val()) {
          $('#txt').html('两次密码输入一致');
        } else {
          $('#txt').html('两次密码输入不一致');
        }
      })
    }, */
    success: function (result) {//成功的回调函数
      // console.log(result)
      // alert(result);
      location.href = 'login.html';
    },
    error: function (result) {
      var message = JSON.parse(result.responseText).message
      alert(message);
    }
  })
  //阻止表单默认提交事件
  return false;
})
