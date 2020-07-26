$(function() {
  //购物车的全选与全不选
  $(".select-all").on('click', function() {
    if ($(this).prop('checked')) {
      $(".select-all").prop('checked', true);
      $(".select-one").prop('checked',true);
    } else {
      $(".select-all").prop('checked',false);
      $(".select-one").prop('checked',false);
    }
  })
  //所有单选框选中时，全选框选中
  $(".select-one").on('click', function() {
    let num = 0;
    $.each($(".select-one"), function(i, n) {
      if ($(n).prop('checked')) {
        num++;
      }
    })
    if (num == $(".select-one").length) {
      $(".select-all").prop('checked',true);
    }
  })

  //购物车数量加减操作  价格随之变动
  // 点击增加函数
  $(".shop-bd .count-add").on('click', function() {
    var count = $(this).siblings('.count').attr('value');
    count++;
    $(this).siblings('.count').attr('value', count);
    gettotle($(this));
    getPriceTotle();
  })
  // 单击减少函数
  $(".shop-bd .count-reduce").on('click', function() {
    var count = $(this).siblings('.count').attr('value');
    if (count <= 1) {
      return; 
    } else {
      count--;
    }
    $(this).siblings('.count').attr('value', count);
    gettotle($(this));
    getPriceTotle();
  })
  //求每个商品的小计
  function gettotle(item) {
    var onePrice = item.siblings('.select-price').html().split('￥')[1] * 1;
    var count = item.siblings('.count').attr('value');
    var tot = onePrice * 1 * count;
    tot = '￥' + tot;
    item.siblings('.totle').html(tot);
  }
  //声明一个求总价格的函数，并直接调用
  getPriceTotle();
  function getPriceTotle() {
    var sum = 0;
    $.each($('.totle'), function(i, n) {
      var num = $(n).html().split('￥')[1] - 0;
      sum = sum + num;
    })
    sum = '￥' + sum;
    $(".price-totle-number").html(sum);
  }
})