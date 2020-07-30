module.exports = (req, res) => {
    req.app.locals.currentPage = 'index';
    if (req.session.login) {
        return res.render('./home/index', {
            currentPage: req.app.locals.currentPage,
            uname: req.app.locals.username
        });
    } else {
        return res.render('./home/index', {
            currentPage: req.app.locals.currentPage,
        });
    }
    
}