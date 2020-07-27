module.exports = (req, res) => {
    req.app.locals.userCurrentPage = 'modifyPassword';
    res.render('./home/modify-password',{
        userCurrentPage: req.app.locals.userCurrentPage
    });
}