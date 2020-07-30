//引入用户集合构造函数
const User = require('../../model/user');
module.exports = (req, res) => {
    res.render('./home/shop-car', {
        uname: req.app.locals.username
    });
}