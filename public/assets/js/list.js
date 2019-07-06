

//根据分类id获取文章列表
var categoryId = getUrlParams('categoryId');
$.ajax({
  type: 'get',
  url: '/posts/category/' + categoryId,//请求的地址
  success: function (result) {//成功的回调函数
    $.ajax({
      type: 'get',
      url: '/categories/' + categoryId,//请求的地址
      success: function (category) {//成功的回调函数
        console.log(result)
        result.category = category;
        var html = template('articleMainTpl', { data: result });
        $('#articleMainBox').html(html);
      }
    })
  }
})
