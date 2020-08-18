//引入express
const express = require('express');
const { model } = require('mongoose');

//创建路由
const admin = express.Router();

//进入后台管理页路由
admin.get('/', require('./admin/userManagePage'));

//进入用户管理页路由
admin.get('/userManagePage', require('./admin/userManagePage'));
//进入用户添加页路由
admin.get('/userAddPage', require('./admin/userAddPage'));
//用户添加提交路由
admin.post('/userAdd', require('./admin/userAdd'));
//进入用户修改页路由
admin.get('/userModifyPage', require('./admin/userAddPage'));
//用户修改提交路由
admin.post('/userModify', require('./admin/userModify'));
//用户删除路由
admin.get('/userDel', require('./admin/userDel'));

//进入商品管理页 商品搜索展示管理页
admin.get('/productManagePage', require('./admin/productManagePage'));
//进入商品添加页路由
admin.get('/productAddPage', require('./admin/productAddPage'));
//商品添加提交路由
admin.post('/productAdd', require('./admin/productAdd'));
//进入商品修改页路由
admin.get('/productModifyPage', require('./admin/productModifyPage'));
//商品修改提交路由
admin.post('/productModify', require('./admin/productModify'));
//商品删除路由
admin.get('/productDel', require('./admin/productDel'));


//进入订单管理页面
admin.get('/orderManagePage', require('./admin/orderManagePage'));


//导出home
module.exports = admin;