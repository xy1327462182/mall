$(function () {
  // 规格选择模块，鼠标悬浮显示选择项
  $('.guige-item').on('mouseover', function () {
    $(this).find('.item-del').show();
    $(this).find('.item-edit').show();
  })
  $('.guige-item').on('mouseout', function () {
    $(this).find('.item-del').hide();
    $(this).find('.item-edit').hide();
  })

  //点击删除规格中的选项
  $('.item-del').on('click', function () {
    $(this).parent().remove();
  })

  //点击添加，输入框显示 取消按钮显示
  $('.guige-add').on('click', function () {
    if ($('.guige-text').css('display') == 'none') {
      $('.guige-text').val('').show();
      $(this).html('取消添加').css({ backgroundColor: 'pink' });
    } else {
      $('.guige-text').val('').hide();
      $(this).html('点击添加').css({ backgroundColor: '#009688' });
    }
  })

  //输入框监听键盘事件，按下enter，添加规格项
  $('.guige-text').on('keyup', function (e) {
    let code = e.keyCode;
    let va = $(this).val()
    if (va.length > 0 && code == 13) {
      //创建节点
      let node = document.createElement('div');
      let inner = va + '<a href="javascript:;" class="item-del">删除</a>';
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
      //给新节点下的删除和编辑按钮添加点击事件
      $(node).find('.item-del').on('click', function () {
        $(this).parent().remove();
      })
      //追加元素到输入框之前 输入框内容置空
      $(this).before(node).val('');
    }
    //esc == 27
    //enter == 13
  })

  //图片选择模块
  //点击添加图片 创建一个类名为pro-img-box的div节点 取消按钮显示
  $('.img-add').on('click', function () {
      //动态获取当前所有pro-img-box的长度
      let len = $('.pro-img-box').length;
      //创建div节点
      let div = document.createElement('div');
      div.className = 'pro-img-box';
      //拼接div内容
      let inner = '<img class="pro-img"><div class="pro-img-edit">上传<input type="file" name="' + 'file' + len + '" ' + 'class="pro-file"></div><div class="pro-img-del">删除</div>';
      div.innerHTML = inner;

      //给新节点绑定事件
      //图片预览效果
      $(div).find('input').on('change', function () {
        console.log(1111);
        let reader = new FileReader();
        reader.readAsDataURL($(this)[0].files[0]);
        reader.onload = function () {
          //将读取到的结果放在图片的 src 属性中 让图片显示在页面中
          $(div).find('.pro-img').attr('src', reader.result).show();
          $(div).find('.pro-img-del').show().on('click', function () {
            $(this).parent().remove();
          });
          $(div).find('.pro-img-edit').hide();
          $('.img-cancel').hide();
          $('.img-add').show();
        }
      })
      //追加元素 取消按钮显示
      $('.img-cancel').show().before(div);
      //添加按钮隐藏
      $(this).hide();
  })

  //图片添加取消按钮绑定点击事件
  $('.img-cancel').on('click', function() {
    // 删除自己前面的节点  自己隐藏 添加按钮显示
    $(this).prev('.pro-img-box').remove();
    $(this).hide();
    $('.img-add').show();
  })
}) 