$('#logout').on('click',function(){
  $.ajax({
    type:'POST',
    url: '/logout',
    success:function(response){
      // alert(response.message);
      location.href = 'login.html';
    },
    error:function(){
      alert('发生错误，退出失败');
    }
  })
})

//用户信息显示
$.ajax({
  type:'get',
  url:'/users/'+userId,//请求的地址 --- userId是在主页面上调取的script执行后出来的值
  success:function(result){//成功的回调函数
    console.log(result)
    $('.profile .avatar').prop('src', result.avatar);
    $('.profile .name').html(result.nickName);
  }
})