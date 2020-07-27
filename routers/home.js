//引入express
const express = require('express');

//创建路由
const home = express.Router();

//进入首页路由
home.get('/', require('./home/indexPage'));
//进入登录页面
home.get('/login', require('./home/loginPage'));
//进入注册页面
home.get('/register', require('./home/registerPage'));
//进入购物车页面
home.get('/shopCar', require('./home/shopCarPage'));

//进入个人中心(用户中心)页面
home.get('/user-center', require('./home/userCenterPage'));
//进入基本设置页面
home.get('/user-settings', require('./home/userSettingPage'));
//进入我的订单页面
home.get('/my-order', require('./home/myOrderPage'));
//进入修改密码页面
home.get('/modify-password', require('./home/modifyPasswordPage'));

//进入商品列表页面
home.get('/list', require('./home/listPage'));
//进入热销商品页面
home.get('/hot-goods', require('./home/hotGoodsPage'));
//进入商品详情页面
home.get('/product-detail', require('./home/productDetailPage'));
//导出home
module.exports = home;