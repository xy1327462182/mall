$(function() {
    //购物车鼠标悬浮 显示购物车盒子
    $(".user-msg li:first-child").on('mouseover', function() {
        $(".shop-car-box").show();
    })
    $(".user-msg li:first-child").on('mouseout', function() {
        $(".shop-car-box").hide();
    })
})