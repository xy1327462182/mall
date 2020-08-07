//引入商品集合构造函数
const Product = require('../../model/product');
module.exports = async (req, res) => {
    //记录当前页面位置
    req.app.locals.currentPage = 'index';

    const shouJiTongXunPros = await Product.find({category: '手机通讯'}).limit(10)
    console.log(shouJiTongXunPros);


    if (req.session.login) {
        return res.render('./home/index', {
            currentPage: req.app.locals.currentPage,
            uname: req.app.locals.username,
            shouJiTongXunPros
        });
    } else {
        return res.render('./home/index', {
            currentPage: req.app.locals.currentPage,
            shouJiTongXunPros
        });
    }
    
}

/*[

*/