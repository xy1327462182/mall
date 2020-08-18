$(function() {
    if ($('.user-imgs').attr('src')) {
        $('.user-imgs').show()
    } else {
        $('.user-imgs').hide()
    }

    $('#upload-img').on('change', function() {
        let reader = new FileReader();
        reader.readAsDataURL($(this)[0].files[0]);
        reader.onload = function () {
            $('.user-imgs').attr('src',reader.result).show();
        }
    })
})