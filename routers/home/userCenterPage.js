module.exports = (req, res) => {
    req.app.locals.userCurrentPage = 'userCenter';
    res.render('./home/user-center', {
        userCurrentPage: req.app.locals.userCurrentPage
    });
}