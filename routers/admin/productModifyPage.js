const Product = require('../../model/product');

module.exports = async (req, res) => {
    const productId = req.query.id;
    const pro = await Product.findOne({_id: productId})
   
    res.render('./admin/productModifyPage', {
        currentPage: 'productEdit',
        pro,
        btn: '修改'
    });
}