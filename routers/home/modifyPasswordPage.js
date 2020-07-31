module.exports = (req, res) => {
    //页面导航
    req.app.locals.userCurrentPage = 'modifyPassword';

    if (req.query.passwordErr == 1) {
        res.render('./home/modify-password',{
            userCurrentPage: req.app.locals.userCurrentPage,
            uname: req.app.locals.username,
            errmsg: '密码输入错误'
        });
    } else if (req.query.passwordSuccess == 1) {
        res.render('./home/modify-password',{
            userCurrentPage: req.app.locals.userCurrentPage,
            uname: req.app.locals.username,
            errmsg: '密码修改成功'
        });
    } else {
        res.render('./home/modify-password',{
            userCurrentPage: req.app.locals.userCurrentPage,
            uname: req.app.locals.username
        });
    }
}