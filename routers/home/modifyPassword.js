//引入User
const User = require('../../model/user');
//引入bcryptjs模块
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    const uid = req.app.locals.uid;
    const old = await User.findOne({_id: uid}); 
    //进行密码比对
    let isV = await bcrypt.compare(req.body.oldpwd,old.password);
    if (isV) {
        //比对成功
        //密码加密
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.pwd1, salt);
        //更新数据库
        await User.updateOne({_id: uid}, {password: password});
        return res.redirect('/home/modify-password?passwordSuccess=1');
    } else {
        //比对失败
        return res.redirect('/home/modify-password?passwordErr=1');
    }
}