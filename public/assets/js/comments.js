//将评论信息添加到页面中
$.ajax({
  type: 'get',
  url: '/comments',//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    //拼接字符串
    var html = template('commentsTpl', { data: result })
    var html1 = template('pageTpl', { data: result })
    //将字符串显示在页面中
    $('#commentBox').html(html);
    $('#page').html(html1);
  }
})

//封装分页方法
function pageChange(page) {
  //发送ajax请求
  $.ajax({
    type: 'get',
    url: '/comments',//请求的地址
    data: { page: page },
    success: function (result) {//成功的回调函数
      console.log(result)
      var html = template('commentsTpl', { data: result })
      var html1 = template('pageTpl', { data: result })
      //将字符串显示在页面中
      $('#commentBox').html(html);
      $('#page').html(html1);

    }
  })
}