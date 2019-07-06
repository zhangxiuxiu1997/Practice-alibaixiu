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


//获取随机推荐
$.ajax({
  type:'get',
  url:'/posts/random',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var randomArticleTpl = `
    {{each data}}
    <li>
      <a href="detail.html?id={{$value._id}}">
        <p class="title">{{$value.title}}</p>
        <p class="reading">阅读({{$value.meta.views}})</p>
        <div class="pic">
          <img src="{{$value.thumbnail}}" alt="">
        </div>
      </a>
    </li>
    {{/each}}`;
    var html =template.render(randomArticleTpl, { data: result });
    $('#randomArticleBox').html(html);
  }
})

//获取最新评论
$.ajax({
  type:'get',
  url:'/comments/lasted',//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    var newCommendTpl = `
    {{each data}}
    <li>
      <a href="detail.html?id={{$value.post}}">
        <div class="avatar">
          <img src="{{$value.author.avatar}}" alt="" style="
          height: 40px;">
        </div>
        <div class="txt">
          <p>
            <span>{{$value.author.nickName}}</span>{{$imports.dateFormat($value.createAt)}}说:
          </p>
          <p>{{$value.content}}</p>
        </div>
      </a>
    </li>
    {{/each}}`;
    var html = template.render(newCommendTpl, { data: result });
    $('#newCommendBox').html(html);
  }
})

//获取导航数据--分类列表
$.ajax({
  type:'get',
  url:'/categories',//请求的地址
  success: function (result) {//成功的回调函数
    var categoriesTpl = `
    {{each data}}
    <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `
    var html = template.render(categoriesTpl, { data: result });
    $('#headernavBox').html(html);
    $('#topnavBox').html(html);
  }
})

//搜索功能的实现
//因为有两个搜索表单 给id值太繁琐  所以直接用搜索表单的方式  只有一个input 获取的值也就直接搜索
// $('#searchBox').on('submit', function () {})
$('.search form').on('submit', function () {
  var key = $(this).find('.keys').val();
  //发送ajax请求
  $.ajax({
    type:'get',
    url:'/posts/search/'+key,//请求的地址
    success: function (result) {//成功的回调函数
      console.log(result)
      location.href = '/search.html?key=' + key;
    }
  })
  //阻止表单默认提交行为
  return false;
})