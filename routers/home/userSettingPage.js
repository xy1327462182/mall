//引入用户集合构造函数
const User = require('../../model/user');
module.exports = async (req, res) => {
    //页面导航
    req.app.locals.userCurrentPage = 'userSettings';
    //查询数据
    const user = await User.findOne({_id: req.query.id});
    res.render('./home/user-settings', {
        userCurrentPage: req.app.locals.userCurrentPage,
        user: user,
        phoneErr: req.query.phoneErr,
        emailErr: req.query.emailErr,
    })
}