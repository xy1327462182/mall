//引入User集合构造函数
const User = require('../../model/user')

module.exports = async (req, res) => {
    let proId = req.query.id
    let userId = req.app.locals.uid
    let data = {
        productId: proId,
        productNum: req.body.num,
        productAttr: req.body.attr
    }
    let user = await User.findOne({_id: userId})
    //增加数据到数组
    user.shopcar.push(data)
    let obj1 = {
        shopcar: user.shopcar
    }
    //更新数据库的数据
    await User.findByIdAndUpdate(userId,obj1)

    res.render('./home/add-shopcar-success')
}