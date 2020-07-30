//引入用户集合构造函数
const User = require('../../model/user');
//引入moment时间格式化
const moment = require('moment');

module.exports = async (req, res) => {
    //页面导航
    req.app.locals.userCurrentPage = 'userCenter';

    const user = await User.findOne({_id: req.query.id});
    res.render('./home/user-center', {
        userCurrentPage: req.app.locals.userCurrentPage,
        uname: req.app.locals.username,
        user: user,
        moment: moment
    });
}