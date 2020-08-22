//引入User集合构造函数
const User = require('../../model/user')
//引入商品集合构造函数
const Product = require('../../model/product');

module.exports = async (req, res) => {
    let proId = req.query.id
    let userId = req.app.locals.uid

    let pro = await Product.findOne({_id: proId})
    let user = await User.findOne({_id: userId})

    let data = {
        productId: proId,
        sid: Date.now(),
        productNum: req.body.num,
        productAttr: req.body.attr,
        images: pro.images[0].path,
        title: pro.title,
        price: pro.price
    }
    
    //增加数据到数组
    user.shopcar.push(data)
    
    let obj1 = {
        shopcar: user.shopcar
    }
    //更新数据库的数据
    await User.findByIdAndUpdate(userId,obj1)

    res.render('./home/add-shopcar-success')
}