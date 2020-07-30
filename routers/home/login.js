//引入User集合构造函数
const User = require('../../model/user');
//引入bcryptjs模块
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    //1.查找手机号
    const phone = await User.find({phone: req.body.phone});
    if (phone.length<1) {
        //没查到
        return res.redirect('/home/login?errmsg=1');
    } else {
        //2.进行密码比对
        let isV = await bcrypt.compare(req.body.pwd, phone[0].password);
        if (isV) {
            //如果比对成功 登录成功
            //重定向到首页
            req.session.login = true;
            req.app.locals.username = phone[0].username;
            req.app.locals.uid = phone[0]._id;
            return res.redirect('/home/index?login=1&username=' + phone[0].username);
        } else {
            //如果比对失败
            //重定向到登录页
            return res.redirect('/home/login?errmsg=1');
        }
    }
    
}