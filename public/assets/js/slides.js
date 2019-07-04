//轮播图图片添加功能
$("#slidesForm").on('submit',function () {
  var dataForm = $(this).serialize();
  $.ajax({
    type:'POST',
    url:'/slides',//请求的地址
    data:dataForm,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
})

//图片文件上传
$('#image').on('change', function () {
  var dataForm = new FormData();
  dataForm.append('avatar', this.files[0])
  $.ajax({
    type:'POST',
    url: '/upload',//请求的地址
    //告诉ajax方法不要解析请求参数
    processData: false,
    //告诉ajax方法不要设置请求参数的类型
    contentType: false,
    data:dataForm,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      $('#imageHidden').val(result[0].avatar);
    }
  })
})

//图片轮播页面展示
$.ajax({
  type:'get',
  url:'/slides',//请求的地址
  success:function(result){//成功的回调函数
    var html = template('imageTpl', { data: result });
    $('#imageBox').html(html);
  }
})

//删除功能
$('#imageBox').on('click', '#delete', function () {
  var id = $(this).attr('data-id');
  //发送ajax请求
  $.ajax({
    type:'delete',
    url:'/slides/'+id,//请求的地址
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
})