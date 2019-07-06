//图片上传功能的实现以及即时显示功能的实现
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
      // var html = template('imageTpl', { data: result[0].avatar });
      $('#headerImage').prop('src',result[0].avatar )
    }
  })
})

//站点添加功能
$('#webForm').on('submit', function () {
  var dataForm = $(this).serialize();
  console.log(dataForm)
  $.ajax({
    type:'post',
    url:'/settings',//请求的地址
    data:dataForm,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result)
    }
  })
  //阻止默认跳转行为
  return false;
})

//站点显示功能
$.ajax({
  type:'get',
  url:'/settings',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    //站点名称的显示
    $('input[name=title]').val(result.title);
    //网站图标的显示
    $('#headerImage').prop('src', result.logo);
    //是否开启评论
    $('input[name=comment]').prop('checked',result.comment);
    // 评论必须经人工批准
    $('input[name=review]').prop('checked', result.review);
  }
})