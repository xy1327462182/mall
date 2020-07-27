$(function() {
  //点击添加新地址 遮罩层开启，新增地址盒子显示
  $('.add-address').on('click', function() {
    $('.mask').show();
  })
  //单击关闭 遮罩层关闭，新增地址盒子关闭
  $('.close-ico').on('click', function() {
    $('.mask').hide();
  })

  //监听所有的收货地址的编辑按钮点击事件，点击编辑，展开隐藏盒子及遮罩层，并将对应默认信息填入盒子
  $(".address-msg .modify-address").on('click', function() {
    //开启遮罩层
    $('.mask').show();
    //获取该收货地址的信息
    var address1 =  $(this).parent('.address-msg').text().split(" ");
    var address2 = [];
    for (let i=0; i<address1.length; i++) {
        if (i < 7) {
            address2[i] = address1[i];
        }
    }
    //填入默认信息
    $("#phoneNumber").val(address2[0]);
    $("#uname").val(address2[1]);
    $("#address").val(address2[5]);
    $("#postCode").val(address2[6]);
    //遍历省下的option，将默认省份的selected改为true
    $.each($("#sheng option"), function(i, n) {
        if ($(n).val() == address2[2]) {
            $(n).prop('selected', true);
        }
    })
    //根据当前省份，动态创建城市
        //直接调用省份改变事件
    $("#sheng").change();
        // 将默认城市的selected设为true
    $.each($("#shi option"), function(i, n) {
        if ($(n).val() == address2[3]) {
            $(n).prop('selected', true);
        }
    })
    //根据当前城市，动态创建区
    $("#shi").change();
        //将默认区的selected设置为true
    $.each($("#qu option"), function(i, n) {
        if ($(n).val() == address2[4]) {
            $(n).prop('selected', true);
        }
    })
  })

  //省市区三级联动
  var selectObj = {
    "河南省": [{
      "郑州市": [{
        "中原区": "中原区",
        "二七区": "二七区",
        "管城回族区": "管城回族区",
        "金水区": "金水区",
        "上街区": "上街区",
        "惠济区": "惠济区",
      }],
      "开封市": [{
        "龙亭区": "龙亭区",
        "顺河回族区": "顺河回族区",
        "鼓楼区": "鼓楼区",
        "禹王台区": "禹王台区",
        "祥符区": "祥符区",
      }],
      "洛阳市": [{
        "老城区": "老城区",
        "西工区": "西工区",
        "瀍河回族区": "瀍河回族区",
        "涧西区": "涧西区",
        "吉利区": "吉利区",
        "洛龙区": "洛龙区"
      }],
      "许昌市": [{
        "魏都区": "魏都区",
        "建安区": "建安区"
      }],
    }],
    "北京市": [{
      "北京市": [{
        "东城区": "东城区",
        "西城区": "西城区",
        "朝阳区": "朝阳区",
        "丰台区": "丰台区",
        "石景山区": "石景山区",
        "海淀区": "海淀区",
        "门头沟区": "门头沟区",
        "房山区": "房山区",
        "通州区": "通州区",
        "顺义区": "顺义区",
      }]
    }],
    "浙江省": [{
      "杭州市": [{
        "上城区": "上城区",
        "下城区": "下城区",
        "江干区": "江干区",
        "拱墅区": "拱墅区",
        "西湖区": "西湖区",
      }],
      "宁波市": [{
        "海曙区": "海曙区",
        "江北区": "江北区",
        "北仑区": "北仑区",
        "镇海区": "镇海区",
        "鄞州区": "鄞州区",
        "奉化区": "奉化区",
      }]
    }]
  }
  //遍历省，循环创建省节点
  for(let x in selectObj) {
    var node = $("<option></option>").html(x).val(x);
    $("#sheng").append(node);
  }
  //监听省份选择改变，动态的创建城市
  $("#sheng").on('change', function() {
    //获取当前选择的省份
    var shengCon = $("#sheng option:selected").val();
    //先清除原先的市和区
    $("#shi").html("<option>请选择</option>");
    $("#qu").html("<option>请选择</option>");
    //遍历该省份下的所有城市，动态创建城市节点
    for(let x in selectObj[shengCon][0]) {
      var node = $("<option></option>").html(x).val(x);
      $("#shi").append(node);
    }
  })
  //监听市选择改变，动态创建区节点
  $("#shi").on('change', function() {
    //获取当前省份的选择
    var shengCon = $("#sheng option:selected").val();
    //获取当前市的选择
    var shiCon = $("#shi option:selected").val();
    //清空原来的区节点
    $("#qu").html("<option>请选择</option>");
    //遍历当前市下面的区，动态创建区节点
    for (let x in selectObj[shengCon][0][shiCon][0]) {
      var node = $("<option></option>").html(x).val(x);
      $("#qu").append(node);
    }
  })

  //监听表单盒子点击事件，根据所有必填项的value值判断提交按钮的状态
  $(document).on('keyup', function() {
    if ($("#uname").val()=='' || $("#sheng option:selected").val()=='' || $("#shi option:selected").val() == '' || $("#qu option:selected").val() == '' || $("#address").val()=='' || $("#phoneNumber").val() == '' || $("#postCode").val()=='') {
      $(".f-btn").prop("disabled", true).css({'background': 'gray'});
    } else if ($("#phoneNumber").val() != '' && $("#phoneNumber").val().length != 11) {
      $(".f-btn").prop("disabled", true).css({'background': 'gray'});
      $(".err-msg").html('手机号格式不正确');
    } else if ($("#postCode").val() != '' && $("#postCode").val().length != 6) {
      $(".f-btn").prop("disabled", true).css({'background': 'gray'});
      $(".err-msg").html('邮编格式不正确');
    } else {
      $(".err-msg").html('');
      $(".f-btn").prop("disabled", false).css({'background': '#52c41a'});
    }
  })
})