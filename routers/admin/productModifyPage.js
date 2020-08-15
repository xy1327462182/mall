const Product = require('../../model/product');

module.exports = async (req, res) => {
    const productId = req.query.id;
    const pro = await Product.findOne({_id: productId})
    
    let imgArr = [1,2,3,4,5]
   
    res.render('./admin/productModifyPage', {
        currentPage: 'productEdit',
        pro,
        imgArr: imgArr,
        imgs: pro.images,
        dets: pro.details,
        btn: '修改'
    });
}