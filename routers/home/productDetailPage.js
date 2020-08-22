//引入商品集合构造函数
const Product = require('../../model/product');

module.exports = async (req, res) => {
    const product = await Product.findOne({_id: req.query.productId})
    res.render('./home/product-detail', {
        product,
        uname: req.app.locals.username
    });
}