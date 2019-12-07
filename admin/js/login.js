/* 登录按钮要实现的思路
    1.给登录按钮注册点击事件，阻止默认跳转事件（表单submit会自动跳转）
    2.要获取用户名和密码 并且判断非空
    3.发送ajax请求
    4.处理响应结果 登录成功跳转index页面 失败提醒用户 
    另外要先把token 这个指令封装到jq里面 我们每次请求都要带token去服务器 直接封装到jq里面，直接引用的时候就可以发送token过去*/
// 入口函数
$(function(){
    $('.input_sub').on('click',function(e){
        // 阻止默认跳转事件
        e.preventDefault();
        // 获取用户名和密码
       let userName =  $('.input_txt').val().trim();
       let password = $('.input_pass').val().trim();
        // 判断非空
        if(userName === '' || password === ''){
            //在longin页面引入bootstrap的模态框 提示用户
            $('.modal-body').text('用户名和密码不能为空');
            $('#modelId').modal();
            return ;
        }
        // 发送ajax请求
        $.ajax({
            url:BigNew. user_login,
            type:'post',
            data:{
                username:userName,
                password:password
            },
            success:function(res){
                $('.modal-body').text('登录成功')
                $('#modelId').modal();
                if(res.code===200){
                    // console.log(res);
                     //   登录成功把token存起来
                     localStorage.setItem('token',res.token);
                    // 跳转页面
                    // 要弹出模态框点击确定之后 跳转 可以用bootstrap里面提供的方法
                    $('#modelId').on('hidden.bs.modal',function(){
                        window.location.href = './index.html';
                    })    
                }
            }
        })
    })
})