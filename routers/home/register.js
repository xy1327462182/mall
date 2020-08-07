//引入User集合构造函数
const User = require('../../model/user');
//引入bcryptjs模块
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    //1.查找手机号或者邮箱是否已经存在
    const phone = await User.find({phone: req.body.phone});
    const email = await User.find({email: req.body.email});
    if (phone.length > 0) {
        return res.redirect('/home/register?errmsg=手机号已经存在')
    } else if (email.length > 0) {
        return res.redirect('/home/register?errmsg=邮箱已经存在')
    } else {
        //2.进行密码加密
		    const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.pwd1, salt);
        req.body.pwd1 = password;    
        //3.存入数据库
        await User.create({
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.pwd1,
        })
        //4.重定向到登录页
        res.redirect('/home/login');
    }
    
    /*
    {
  phone: '15936389235',
  email: 'zhangsan@163.com',
  pwd1: '123456',
  pwd2: '123456'
} 
    */
}