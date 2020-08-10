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
/*
{
  attribute: [ '128G', '256G' ],
  images: [
    '\\uploads\\product-img\\upload_7891605a5d5836850a3bf7eb9a4c9710.jpg',
    '\\uploads\\product-img\\upload_a8abfc8f18c6b9058af3072540bd6ba5.jpg'
  ],
  details: [
    '\\uploads\\product-img\\upload_93da49f92fe1f1c224c8f1c02ed64f2c.jpg',
    '\\uploads\\product-img\\upload_50652b48f677e783af06e6b1c50b7517.jpg'
  ],
  status: 0,
  sold: 0,
  _id: 5f2d42cb5c1bed13b48a09d7,
  title: '荣耀笔记本电脑MagicBook 14 14英寸全面屏轻薄本（AMD锐龙5 8G 256G 多屏协同 指纹Win10）',
  category: '手机通讯',
  stock: 90,
  price: 3499,
  createdAt: 2020-08-07T12:02:19.985Z,
  updatedAt: 2020-08-07T12:02:19.985Z,
  __v: 0
}
*/