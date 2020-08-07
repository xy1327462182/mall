//引入商品集合构造函数
const Product = require('../../model/product');
module.exports = async (req, res) => {
    //记录当前页面位置
    req.app.locals.currentPage = 'index';

    const shouJiTongXunPros = await Product.find({category: '手机通讯'}).limit(11)


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
  {
    attribute: [ 'A315', 'A314' ],
    images: [
      '\\uploads\\product-img\\upload_c74913f7c3e78d464b48e19ce34007e4.jpg',
      '\\uploads\\product-img\\upload_0eaef66770ca4d0c20298ef99826941d.jpg'
    ],
    status: 0,
    _id: 5f2cff7a9875d529a44e5434,
    title: '宏碁(Acer)蜂鸟Fun 2020新款 14英寸 高性能轻薄宏基笔记本电脑(十代酷睿 8G 512GSSD MX350独显 长续航)银',
    category: '手机通讯',
    stock: 65,
    price: 3988,
    createdAt: 2020-08-07T07:15:06.949Z,
    updatedAt: 2020-08-07T07:15:06.949Z,
    __v: 0
  }
]
*/