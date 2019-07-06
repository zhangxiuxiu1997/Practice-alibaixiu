//获取地址栏中的id值
var categoryId = getUrlParams('id');

//设置一个全局变量存储文章是否能显示提交评论的功能
var review;

//根据id获取文章信息
$.ajax({
  type: 'get',
  url: '/posts/' + categoryId,//请求的地址
  success: function (result) {//成功的回调函数
    var html = template('articleInfoTpl', { data: result });
    $('#articleInfoBox').html(html);
  }
})

//点赞功能的实现
$('#articleInfoBox').on('click', '#like', function () {
  //发送ajax请求
  $.ajax({
    type: 'post',
    url: '/posts/fabulous/' + categoryId,//请求的地址
    success: function (result) {//成功的回调函数
      alert('点赞成功，感谢您的支持')
    }
  })
})

//获取站点信息，用来控制站点的评论功能
$.ajax({
  type: 'get',
  url: '/settings',//请求的地址
  success: function (result) {//成功的回调函数
    review = result.review;
    //用户开启评论功能就显示评论框
    if (result.comment) {
      $('#commentBox').show();
    } else {
      $('#commentBox').hide();

    }
  }
})

//实现用户评论提交的表单事件
$('#commentBox form').on('submit', function () {
  console.log(categoryId)
  var content = $(this).find('textarea').val();
  var state;
  if (review) {
    state = 1;
  } else {
    state = 0;
  }
  console.log(content)
  console.log(state)
  $.ajax({
    type: 'POST',
    url: '/comments',//请求的地址
    data: {
      content: content,
      post: categoryId,
      state: state
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      alert('评论成功');
      location.reload();
    },
    error: function () {
      alert('发生未知错误');
    }
  })
  //阻止默认提交行为
  return false;
})