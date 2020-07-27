$(function() {
  //右侧订单筛选状态点击切换
  $(".order-select li").on('click', function() {
    $(".order-select li").removeClass('order-select-active');
    $(this).addClass('order-select-active');
  })
})