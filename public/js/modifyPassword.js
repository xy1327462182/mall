$(function() {
    //密码输入显示错误信息，按钮禁用，通过后按钮开启
    $(document).on('keyup', function() {
        if ($("#oldpwd").val().length < 1) {
            console.log(111);
            $(".mod-btn").prop('disabled', true).css({background: 'gray'});
            $(".errmsg").html('请输入密码');
        } else if ($("#pwd1").val() != $("#pwd2").val()) {
            $(".mod-btn").prop('disabled', true).css({background: 'gray'});
            $(".errmsg").html('两次输入密码不一致');
        } else {
            $(".mod-btn").prop('disabled', false).css({background: '#52c41a'});
            $(".errmsg").html('');
        }
    })

    if ($(".errmsg").html() == '密码修改成功') {
        $(".errmsg").css({color: "#52c41a"});
    }
})