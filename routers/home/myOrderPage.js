module.exports = (req, res) => {
    req.app.locals.userCurrentPage = 'myOrder';
    res.render('./home/my-order', {
        userCurrentPage: req.app.locals.userCurrentPage,
        uname: req.app.locals.username
    });
}