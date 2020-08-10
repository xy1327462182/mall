const Product = require('../../model/product');

module.exports = async (req, res) => {
    const productId = req.query.id;
    const pro = await Product.findOne({_id: productId})
    console.log(pro);
    res.render('./admin/productModifyPage', {
        currentPage: 'productEdit',
        pro,
        btn: '修改'
    });
}

/*
{
  attribute: [ '全网通6+128G', '全网通8+128G', '全网通8+256G' ],
  images: [
    '\\uploads\\product-img\\upload_ce1c8b8a271e73a3a61c34a77bd5549d.jpg',
    '\\uploads\\product-img\\upload_37b7693f34d754b578b36a42d8f8350e.jpg',
    '\\uploads\\product-img\\upload_61eb7c7f431648ae4a7f798b15cfd5e5.jpg'
  ],
  details: [],
  status: 0,
  sold: 20,
  _id: 5f28f37e8b00b21d50373b49,
  title: '荣耀30S 麒麟820 5G芯片 3倍光学变焦 20倍数字变焦 全网通版8GB+128GB 蝶羽白',
  category: '手机通讯',
  stock: 80,
  price: 2399,
  createdAt: 2020-08-04T05:34:54.582Z,
  updatedAt: 2020-08-04T05:34:54.582Z,
  __v: 0
}
*/