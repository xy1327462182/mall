//引入用户集合构造函数
const User = require('../../model/user');
//引入商品集合构造函数
const Product = require('../../model/product');

module.exports = async (req, res) => {
    let userId = req.app.locals.uid

    let user = await User.findOne({_id: userId})

    let shopcarArr = user.shopcar
    
    // req.app.locals.shopcarArr = shopcarArr
    // req.app.locals.shopcarProArr = shopcarProArr


    res.render('./home/shop-car', {
        uname: req.app.locals.username,
        shopcarArr: shopcarArr
    });
}