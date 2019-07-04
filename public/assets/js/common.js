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