//引入商品集合构造函数
const Product = require('../../model/product');

module.exports = (req, res) => {
    //记录当前页的位置
    req.app.locals.currentPage = 'allgoods';

    //设置商品筛选条件 默认是无条件

    //设置页码分页

    //根据筛选条件从数据库中查询数据

    if (req.session.login) {
        //如果登录状态
        return res.render('./home/product-list', {
            currentPage: req.app.locals.currentPage,
            uname: req.app.locals.username,
        });

    } else {
        //如果非登录状态
        return res.render('./home/product-list', {
            currentPage: req.app.locals.currentPage
        });
    }


    
}