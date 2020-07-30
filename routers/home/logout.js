module.exports = (req, res) => {
    req.session.login = false;
    req.session.destroy();
    res.clearCookie('connect.sid');
    //重定向到登陆页面
    res.redirect('/home/login');
}