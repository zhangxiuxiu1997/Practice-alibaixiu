//查询文章数量
$.ajax({
  type:'get',
  url:'/posts/count',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    $('#article').html('<strong>' + result.postCount + '</strong>篇文章（<strong>' + result.draftCount + '</strong>篇草稿）');
  }
})

//查询分类
$.ajax({
  type:'get',
  url:'/categories/count',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    $('#classify').html('<strong>' + result.categoryCount + '</strong>个分类');
  }
})

//查询评论
$.ajax({
  type:'get',
  url:'/comments/count',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    $('#comment').html('<strong>' + result.commentCount + '</strong>条评论（<strong>' + result.notAuditedCount + '</strong>条待审核）');
  }
})