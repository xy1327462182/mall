//引入商品集合构造函数
const Product = require('../../model/product');
//引入path模块
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    let id = req.query.id
    //1.查询数据 根据图片路径 删除本商品所有图片
    let pro = await Product.findOne({_id: id})
    
    //遍历images 删除图片
    pro.images.forEach((n,i) => {
        if (n.path) {
            fs.unlink(path.join(__dirname, '../', '../','public',n.path), function(err) {
                console.log(err);
            })
        }
    })

    //遍历details 删除图片
    pro.details.forEach((n,i) => {
        if (n.path) {
            fs.unlink(path.join(__dirname, '../', '../','public',n.path), function(err) {
                console.log(err);
            })
        }
    })
    
    //删除数据库中的数据
    await Product.findByIdAndDelete(id)
    //重定向到商品管理页
    res.redirect('/admin/productManagePage');
}
//

/*
{
  attribute: [ 'Pro 2.5K', 'Pro 小新' ],
  images: [
    {
      id: 0,
      path: '\\uploads\\product-img\\upload_9156e0e51a956f91d1f57ee6dcebd386.jpg',
      status: 1
    },
    {
      id: 1,
      path: '\\uploads\\product-img\\upload_4feecd96f4523319c82d55bf38b18aed.jpg',
      status: 1
    },
    {
      id: 2,
      path: '\\uploads\\product-img\\upload_b5a3810ec4cc12f4e418ecc9abf6b598.jpg',
      status: 1
    },
    { id: 3, path: '', status: 0 },
    { id: 4, path: '', status: 0 }
  ],
  details: [
    {
      id: 0,
      path: '\\uploads\\product-img\\upload_c319d88c421d56e87ff37a1ff4b02fe9.jpg',
      status: 1
    },
    {
      id: 1,
      path: '\\uploads\\product-img\\upload_7b2e5eed180af04e045c4b017e861631.jpg',
      status: 1
    },
    { id: 2, path: '', status: 0 },
    { id: 3, path: '', status: 0 },
    { id: 4, path: '', status: 0 }
  ],
  status: 0,
  sold: 0,
  _id: 5f3b6867070fa8057cba89c0,
  title: '联想(Lenovo)小新Air14性能版轻薄本 英特尔酷睿i5 全面屏学生独显笔记本电脑(i5 16G 512G MX350 高色域)银',
  category: '手机通讯',
  stock: 10,
  price: 4999,
  createdAt: 2020-08-18T05:34:31.770Z,
  updatedAt: 2020-08-18T07:10:48.636Z,
  __v: 0
}
*/