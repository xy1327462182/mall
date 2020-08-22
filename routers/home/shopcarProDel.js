//引入用户集合构造函数
const User = require('../../model/user');
//引入商品集合构造函数
const Product = require('../../model/product');

module.exports = async (req, res) => {
    let sId = req.query.sid
    let uid = req.app.locals.uid

    let user = await User.findOne({_id: uid})
    let shopcarArr = user.shopcar
    let arr1 = []
    
    for (let i=0; i < shopcarArr.length; i++) {
        if (shopcarArr[i].sid != sId) {
            arr1.push(shopcarArr[i]) 
        }
    }

    //更新数据库的数据
    await User.findByIdAndUpdate(uid, {
        shopcar: arr1
    })

    res.redirect('/home/shopCar')
}