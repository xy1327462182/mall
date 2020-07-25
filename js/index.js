$(function() {
    //给侧边导航的子目录框动态设置top属性的值
    $.each($(".silde-nav li"), function(i, n) {
        $(n).find(".child-cate").css({"top":0 - (40 * i) - 20 + 'px'});
    })
    //侧边导航鼠标悬浮，目录框显示
    $(".silde-nav li").on('mouseover', function() {
        $(this).find(".child-cate").show();
    })
    $(".silde-nav li").on('mouseout', function() {
        $(this).find(".child-cate").hide();
    })

    //楼层模块
    var cTopArr = [];
    $.each($(".floor .fl-box"), function(i, n) {
        //1.根据楼层数量，动态的创建电梯导航，并把楼层名字写入电梯导航
        $(".elevator ul").append('<li>' + $(n).find("h3 a").html().split(" ")[1] + '</li>');
        //获取每个楼层对应的相对于屏幕顶部的高度
        cTopArr[i] = $(n).offset().top;
        //2.监听屏幕滚动，根据楼层不同高度，动态的给电梯导航的li添加ele-active类
        $(window).on('scroll', function() {
            //获取屏幕滚动的top值
            var wTop = $("html, body").scrollTop();
            $.each(cTopArr, function(i, n) { 
                if (wTop < 760) {
                    $(".elevator ul li").removeClass("ele-active");
                } else if (wTop >= n-40) {
                    $(".elevator ul li").removeClass("ele-active");
                    $(".elevator ul li:nth-child(" + (i-0+1) +")").addClass('ele-active');
                } 
            })
        })
    })

    //点击电梯导航中的li 进入对应的楼层
    $(".elevator ul li").on('click', function() {
        // $(".elevator ul li").removeClass("ele-active");
        // $(this).addClass('ele-active');
        $("html, body").stop().animate({scrollTop: cTopArr[$(this).index()] -40});
        console.log(cTopArr[$(this).index()] -30);
    })
    //置顶
    $(".backtop").on('click', function() {
        $("html, body").stop().animate({scrollTop: 0});
    })
    
    

})