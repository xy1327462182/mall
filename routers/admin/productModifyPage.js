const Product = require('../../model/product');

module.exports = async (req, res) => {
    const productId = req.query.id;
    const pro = await Product.findOne({_id: productId})
    //获取未填入图片剩余长度
    let imagesLen = 5 - pro.images.length;
    let detailsLen = 5 - pro.details.length;
    res.render('./admin/productModifyPage', {
        currentPage: 'productEdit',
        pro,
        imagesLen,
        detailsLen,
        btn: '修改'
    });
}