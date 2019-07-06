//获取地址栏中的id值
var categoryId = getUrlParams('id');
console.log(categoryId)
//根据id获取文章信息
$.ajax({
  type:'get',
  url:'/posts/'+categoryId,//请求的地址
  success:function(result){//成功的回调函数
    var html = template('articleInfoTpl', { data: result });
    $('#articleInfoBox').html(html);
  }
})

//点赞功能的实现
$('#articleInfoBox').on('click', '#like', function () {
  //发送ajax请求
  $.ajax({
    type:'post',
    url:'/posts/fabulous/'+categoryId,//请求的地址
    success:function(result){//成功的回调函数
      alert('点赞成功，感谢您的支持')
    }
  })
})