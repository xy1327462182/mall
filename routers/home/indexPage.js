//引入商品集合构造函数
const Product = require('../../model/product');
module.exports = async (req, res) => {
    //记录当前页面位置
    req.app.locals.currentPage = 'index';

    const shouJiTongXunPros = await Product.find({category: '手机通讯'}).limit(10)
    const diannaoPros = await Product.find({category: '电脑耗材'}).limit(10)
    const shipinPros = await Product.find({category: '食品生鲜'}).limit(10)

    if (req.session.login) {
        return res.render('./home/index', {
            currentPage: req.app.locals.currentPage,
            uname: req.app.locals.username,
            shouJiTongXunPros,
            diannaoPros,
            shipinPros
        });
    } else {
        return res.render('./home/index', {
            currentPage: req.app.locals.currentPage,
            shouJiTongXunPros,
            diannaoPros,
            shipinPros
        });
    }
    
}

/*
6G 128G

8G 128G

8G 256G

*/