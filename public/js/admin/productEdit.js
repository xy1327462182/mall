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
  }
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
    $('.pro-img-box').find('.pro-img').hide()
    $('.pro-img-box').find('.pro-img-edit').show();

    

    //存放图片状态数据
    let imagesArr = [0,0,0,0,0]
    let detailsArr = [0,0,0,0,0]

    //默认数据给input-hidden
    $('.images-data').val(imagesArr)
    $('.details-data').val(detailsArr)

    //给图片的删除按钮事件绑定
    $('.pro-img-del').on('click', function() {
        //图片隐藏 src属性置空
        $(this).hide().siblings('.pro-img').attr('src','').hide();
        //编辑显示 input value值置空
        $(this).siblings('.pro-img-edit').show().find('.pro-file').val('');
        //变更状态
        //获取索引
        let index = $(this).siblings('.pro-img-edit').find('.pro-file').attr('name').split('s')[1] - 1
        //获取name
        let name = $(this).siblings('.pro-img-edit').find('.pro-file').attr('name').split('s')[0]
        //更改状态
        if (name == 'image') {
            imagesArr[index] = 0
        } else if (name == 'detail') {
            detailsArr[index] = 0
        }
        //重新赋value值
        $('.images-data').val(imagesArr)
        $('.details-data').val(detailsArr)
    })

    //监听图片上传事件
    $('.pro-file').on('change', function() {
        //获取本次点击的input的各个兄弟节点
        let img = $(this).parent().siblings('.pro-img');
        let del = $(this).parent().siblings('.pro-img-del');
        let edit = $(this).parent();
        //获取当前点击的input的索引
        let index = $(this).attr('name').split('s')[1] - 1;
        //获取当前点击的input的name   image || detail
        let name = $(this).attr('name').split('s')[0]

        let reader = new FileReader();
        reader.readAsDataURL($(this)[0].files[0]);
        reader.onload = function () {
            //将读取到的结果放在图片的 src 属性中 让图片显示在页面中
            img.attr('src', reader.result).show();
            //编辑隐藏 删除按钮显示
            edit.hide();
            del.show()
            //更改状态
            if (name == 'image') {
                imagesArr[index] = 1
            } else if (name == 'detail') {
                detailsArr[index] = 1
            }

            //重新赋value值
            $('.images-data').val(imagesArr)
            $('.details-data').val(detailsArr)
    }
  })
}) 