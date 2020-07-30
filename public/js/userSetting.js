$(function() {
    //监听修改信息的输入框，长度为0则禁止修改
    $(document).on('keyup', function() {
        if ($("#phone").val().length > 0) {
            $("#phone").siblings(".set-btn") .prop('disabled', false).css({background: '#52c41a'});
        } else {
            $("#phone").siblings(".set-btn") .prop('disabled', true).css({background: 'gray'});
        }
        if ($("#email").val().length > 0) {
            $("#email").siblings(".set-btn") .prop('disabled', false).css({background: '#52c41a'});
        } else {
            $("#email").siblings(".set-btn") .prop('disabled', true).css({background: 'gray'});
        }
        if ($("#uname").val().length > 0) {
            $("#uname").siblings(".set-btn") .prop('disabled', false).css({background: '#52c41a'});
        } else {
            $("#uname").siblings(".set-btn") .prop('disabled', true).css({background: 'gray'});
        }

    })
})