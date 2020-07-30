module.exports = (req, res) => {
    if (req.query.errmsg == 1) {
        return res.render('./home/login1', {
            errmsg: '手机号或者密码错误'
        });
    } else {
        return res.render('./home/login1');
    }
    
}