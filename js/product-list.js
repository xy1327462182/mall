$(function() {
    // 左侧列表导航折叠效果
    $(".category-list dl dt .fold").on('click', function() {
        if ($(this).html() == '-') {
            $(this).html('+');
            //折叠
            $(this).parent().parent().find("dd").hide(); 
        } else {
            $(this).html('-');
            //伸开
            $(this).parent().parent().find("dd").show(); 
        }
    })

    //默认排序和按价格按钮
    $(".sort-default").on('click', function() {
        $(".sort-price").removeClass('sort-active');
        $(".sort-default").addClass('sort-active');
    })
    $(".sort-price").on('click', function() {
        $(".sort-default").removeClass('sort-active');
        $(".sort-price").addClass('sort-active');
        // if ($(".sort-price-top").hasClass('t')) {
        //     $(".sort-price-top").removeClass('t');
        //     $(".sort-price-bottom").addClass('b');
        // } else {
        //     $(".sort-price-top").addClass('t');
        //     $(".sort-price-bottom").removeClass('b');
        // }
    })
    $(".sort-price-top").on('click', function() {
        $(".sort-price-top").addClass('t');
        $(".sort-price-bottom").removeClass('b');
    })
    $(".sort-price-bottom").on('click', function() {
        $(".sort-price-top").removeClass('t');
        $(".sort-price-bottom").addClass('b');
    })
})