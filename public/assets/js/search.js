//获取到浏览器地址栏中的key的值
var key = getUrlParams('key');
//发送ajax请求
$.ajax({
  type: 'get',
  url: '/posts/search/' + key,//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    var html = template('searchTpl', { data: result });
    $('#searchBox').html(html);

  }
})
