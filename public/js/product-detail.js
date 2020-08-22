$(function() {
    //商品主图放大效果
    //鼠标悬浮，遮罩层和大图显示与隐藏
    $('.product-img').on('mouseover', function() {
        $(".mask").show();
        $(".bigimg").show();
    })
    $('.product-img').on('mouseout', function() {
        $(".mask").hide();
        $(".bigimg").hide();
    })
    $('.product-img').on('mousemove', function(e) {
        var mouseX = e.pageX - $(this).offset().left;
        var mouseY = e.pageY - $(this).offset().top;
        var maskLeft = mouseX;
        var maskTop = mouseY;
        var bigLeft = (mouseX - 120) * 1.28;
        var bigTop = (mouseY - 120) * 1.28;
        if (mouseX <= 120) {
            maskLeft = 120;
            bigLeft = 0;
        }
        if (mouseY <= 120) {
            maskTop = 120;
            bigTop = 0;
        }
        if ($(this).width() - mouseX <= 120) {
            maskLeft = $(this).width() - 120;
            bigLeft = 250;
        }
        if ($(this).height() - mouseY <= 120) {
            maskTop = $(this).height() - 120;
            bigTop = 250;
        }
        $(".mask").css({left: maskLeft-120+'px', top: maskTop-120+'px'});
        $(".bigimg img").css({left: bigLeft *(-1)+'px', top: bigTop*(-1)+'px'});
    })

    //鼠标悬浮小图，主图切换，并给该小图添加product-img-list-active类
    $(".product-img-list li").on('mouseover', function() {
        $(".product-img-list li").removeClass('product-img-list-active');
        $(this).addClass('product-img-list-active');
        //将小图图片的src的值赋给大图的src
        var src = $(this).find("img").attr("src")
        $(".bigimg img").attr({src: src});
        $(".product-img img").attr({src: src});
    })

    function getDate() {
        let att = $('.product-color-active').html()
        let num = $('.product-count').html() - 0

        $('#attr').val(att)
        $('#pro-nnum').val(num)
    }

    //点击规格中的哪个颜色，哪个被选中
    $(".product-color ul li").on('click', function() {
        $(".product-color ul li").removeClass('product-color-active');
        $(this).addClass('product-color-active');

        getDate()
    })

    //数量点击增加和减少
    $(".product-count-add").on('click', function() {
        var num = $(".product-count").html() - 0;
        num++;
        $(".product-count").html(num);

        getDate()
        
    })
    $(".product-count-reduce").on('click', function() {
        var num = $(".product-count").html() - 0;
        if (num <= 1) {
            return;
        } else {
            num--;
            $(".product-count").html(num);
        }

        getDate()
    })
    

    //商品详情介绍导航栏点击添加detail-hd-active类
    $(".detail-hd ul li").on('click', function() {
        $(".detail-hd ul li").removeClass('detail-hd-active');
        $(this).addClass('detail-hd-active');
    })
    
})