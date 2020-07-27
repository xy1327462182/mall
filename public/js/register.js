$(function() {
    //监听键盘事件，判定输入是否合法
    $(document).on('keyup', function() {
        if ($("#phone").val().length != 11) {
            $("#errmsg").html('手机号格式不正确');
        } else if ($("#email").val().length == 0) {
            $("#errmsg").html('请输入邮箱');
        } else if ($("#pwd1").val().length == 0) {
            $("#errmsg").html('请输入密码');
        } else if ($("#pwd2").val().length == 0) {
            $("#errmsg").html('请再次输入密码');
        } else if ($("#pwd1").val().length > 0 &&  $("#pwd2").val().length > 0  &&  $("#pwd1").val() != $("#pwd2").val()) {
            $("#errmsg").html('两次输入密码不一致');
        } else {
            $("#errmsg").html('');
            $(".login1-btn").prop('disabled', false).css({background: '#52c41a'});
        }
        //如果表单有一项为空，则按钮被禁用
        if ($("#phone").val() == '' || $("#email").val() == '' || $("#pwd1").val() == '' || $("#pwd2").val() == '') {
            $(".login1-btn").prop('disabled', true).css({background: 'gray'});
        }
    })
})