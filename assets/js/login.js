// 要点击切换,所以点了就隐藏之前的显示之后的
$('.login a').on('click',function () {
    $('.register').show().prev().hide()
});

$('.register a').on('click',function () {
    $('.login').show().next().hide()
});
// 注册表单提交事件
$('.register form').on('submit', function (e) { 
    // 表单默认可以提交,所以要组织一下默认提交行为
    e.preventDefault()
    // 获取表单的所有输入内容并获取
    let data = $(this).serialize()
    // 请求接口
    $.post({
        url: 'http://www.itcbc.com:8080/api/reguser',
        // 因为上面获取到的直接是对象所以下面不需要加大括号
        data: data,
        success: function (res) { 
            console.log(res);
            alert(res.message)
            if (res.status === 0) {
                
                // 清空注册列表项目,要先转成dom对象,jq获得的是一个数组所以加下标就可以获取到
                $('.register form')[0].reset();
                // 显示登陆盒子
                $('.register').hide().prev().show()
            }
        }  
    })
})
// 登陆提交表单
$('.login form').on('submit', function (e) { 
    // 表单默认可以提交,所以要组织一下默认提交行为
    e.preventDefault()
    // 获取表单的所有输入内容并获取
    let data = $(this).serialize()
    // 请求接口
    $.post({
        url: 'http://www.itcbc.com:8080/api/login',
        // 因为上面获取到的直接是对象所以下面不需要加大括号
        data: data,
        success: function (res) { 
            alert(res.message)
            if (res.status === 0) { 
                alert('登陆成功')
                localStorage.setItem('token', res.token);
                // 登陆成功跳转
                location.href='./index.html'
            }

        }
    })
})
    
// 因为要确定表单注册页面的密码以及确认密码一致才能成功所以添加正则定律
// 先声明
let form = layui.form;
form.verify({
    // 这里面的格式是  自定义属性名 例如 len:[/正则表达式/,'如果不正确提示的内容']\S为非空格
    // 可以是键值对,也可以写一个函数,在html中调用即可
    len: [/^\S{6,12}$/],
    same: function (val) { 
        // val就是我们输入的值  return是固定的  不一样时返回的值
        //  判断输入的密码是否与我们的确认密码一致
         if (val !== $('.pwd').val()) { 
            return '两次密码不一致'
         }
     }
  })