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

//将分页信息添加到页面的分页类别中
$.ajax({
  type: 'get',
  url: '/categories',//请求的地址
  success: function (result) {//成功的回调函数
    //拼接字符串
    var html = template('categoryTpl', { data: result });
    $('#category').html(html);
  }
});

//文件上传
$('#feature').on('change', function () {
  //创建一个表单对象  将文件的内容添加到 实例化对象中
  var formData = new FormData();
  formData.append('feature', this.files[0]);
  $.ajax({
    type: 'POST',
    url: '/upload',//请求的地址
    data: formData,
    //告诉ajax方法不要解析请求参数
    processData: false,
    //告诉ajax方法不要设置请求参数的类型
    contentType: false,
    success: function (result) {//成功的回调函数
      $('#featureHidden').val(result[0].feature);
    }
  })
});

//文章表单的提交事件
$('#postAdd').on('submit', function () {
  if ($('#title').val().trim().length == 0 || $('#content').val().trim().length == 0 || $('#category').val().trim().length == 0 || $('#status').val().trim().length == 0) {
    alert('请填写完整')
  } else {
    //将 表单的数据拼接成参数格式字符串
    var formData = $(this).serialize();
    console.log(formData);
    //发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/posts',//请求的地址
      data: formData,
      success: function (result) {//成功的回调函数
        location.href = 'posts.html';
      },
      error: function (result) {
        $('#error').show();
        console.log(result)
        var html = template('errorTpl', { data: result });
        $('#error').html(html);
      }
    })
  }
  //阻止表单的默认提交
  return false
});

//如果用户是通过修改操作进入的这个页面
var id = getUrlParams('id');
if (id != -1) {
  //通过ajax请求获取数据
  $.ajax({
    type: 'get',
    url: '/posts/' + id,//请求的地址
    success: function (result) {//成功的回调函数
      //获取文章列表信息
      $.ajax({
        type: 'get',
        url: '/categories',//请求的地址
        success: function (categories) {//成功的回调函数
          result.categories = categories;
          //拼接模板字符串
          var html = template('modifyArticle', { data: result });
          $('#modifyArticleBox').html(html);
        }
      })
    }
  })
}

//修改功能 -- 委托
$('#modifyArticleBox').on('submit', '#postModify', function () {
  //拼接表单提交的字符串
  var formData = $(this).serialize();
  //发送ajax请求
  $.ajax({
    type:'PUT',
    url:'/posts/'+id,//请求的地址
    data:formData,
    success:function(result){//成功的回调函数
      // console.log(result)
      location.href = 'posts.html';
    }
  })
  //阻止表单的默认提交行为
  return false;
})

//修改功能的文件上传
$('#modifyArticleBox').on('change','#featureNew', function () {
  //创建一个表单对象  将文件的内容添加到 实例化对象中
  var formData = new FormData();
  formData.append('feature', this.files[0]);
  $.ajax({
    type: 'POST',
    url: '/upload',//请求的地址
    data: formData,
    //告诉ajax方法不要解析请求参数
    processData: false,
    //告诉ajax方法不要设置请求参数的类型
    contentType: false,
    success: function (result) {//成功的回调函数
      $('#featureHidden').val(result[0].feature);
    }
  })
});

//封装 从浏览器的地址栏中获取查询参数  name就是你要获取的参数的名称
function getUrlParams(name) {
  //获取地址栏中？之后的数据
  var paramArr = location.search.slice(1).split('&');
  //继续切割
  for (var i = 0; i < paramArr.length; i++) {
    var newArr = paramArr[i].split('=');
    // console.log(newArr)
    if (newArr[0] == name) {
      return newArr[1];
    }
  }
  return -1;
}