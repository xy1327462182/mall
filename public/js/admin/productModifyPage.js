$(function () {
    //规格选择模块，鼠标悬浮显示选择项
  $('.guige-item').on('mouseover', function () {
    $(this).find('.item-del').show();
  })
  $('.guige-item').on('mouseout', function () {
    $(this).find('.item-del').hide();
  })

  //点击删除规格中的选项
  $('.item-del').on('click', function () {
    $(this).parent().remove();
    getGuige();
  })

  //点击添加，输入框显示 取消按钮显示
  $('.guige-add').on('click', function () {
      if ($(this).html() == '点击添加') {
        $('.guige-text').val('').show();
        $(this).html('取消添加').css({ backgroundColor: 'pink' });
      }
    else if ($(this).html() == '取消添加') {
      $('.guige-text').val('').hide();
      $(this).html('点击添加').css({ backgroundColor: '#009688' });
    }
  })
  function getGuige() {
    let result = [];
    //遍历所有的guige-inner，拼接字符串
    $.each($('.guige-inner'),function(i,n) {
        result[i] = n.innerHTML;
    })
    $('.guige-res').val(result);
    console.log($('.guige-res').val());
  }
  getGuige();
  //输入框监听键盘事件，按下enter，添加规格项 并将所有的规格项的值存进隐藏的input内
  $('.guige-text').on('keyup', function (e) {
        let code = e.keyCode;
        let va = $(this).val();
        if (va.length > 0 && code == 13) {
            //创建节点
            let node = document.createElement('div');
            let inner = '<span class="guige-inner">'+ va +'</span>' + '<a   href="javascript:;  " class="item-del">删除</a>'

            //给新节点添加类 添加内容
            node.className = 'guige-item';
            node.innerHTML = inner;
            //给新节点绑定鼠标悬浮事件
            $(node).on('mouseover', function () {
              $(this).find('.item-del').show();
            })
            $(node).on('mouseout', function () {
              $(this).find('.item-del').hide();
            })
            //给新节点下的删除按钮添加点击事件
            $(node).find('.item-del').on('click', function () {
              $(this).parent().remove();
              getGuige();
            })
            //追加元素到输入框之前 输入框内容置空
            $(this).val('').before(node);

            getGuige();
        }
  })

    //商品主图模块 商品详情模块 默认图片隐藏 添加按钮显示
    // $('.pro-img-box').find('.pro-img').attr('src').length > 0 ? $('.pro-img-box').find('.pro-img').show() : $('.pro-img-box').find('.pro-img').hide()

    // $('.pro-img-box').find('.pro-img').attr('src').length > 0 ? $('.pro-img-box').find('.pro-img-edit').hide() : $('.pro-img-box').find('.pro-img-edit').show();

    //给图片的删除按钮事件绑定
    $('.pro-img-del').on('click', function() {
        $(this).hide().siblings('.pro-img').attr('src','').hide();
        $(this).siblings('.pro-img-edit').show().children('.pro-file').val('');
        
    })

    //监听图片上传事件
    $('.pro-file').on('change', function() {
        //本次点击的input
        let img = $(this).parent().siblings('.pro-img');
        let del = $(this).parent().siblings('.pro-img-del');
        let edit = $(this).parent();
        let that = $(this);
        let reader = new FileReader();
        reader.readAsDataURL($(this)[0].files[0]);
        reader.onload = function () {
        //将读取到的结果放在图片的 src 属性中 让图片显示在页面中
        img.attr('src', reader.result).show();
        edit.hide();
        del.show().on('click', function() {
            img.attr('src', '').hide();
            that.val('');
            edit.show();
            del.hide();
        })
    }
  })
}) 