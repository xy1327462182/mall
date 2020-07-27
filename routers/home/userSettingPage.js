module.exports = (req, res) => {
    req.app.locals.userCurrentPage = 'userSettings';
    res.render('./home/user-settings', {
        userCurrentPage: req.app.locals.userCurrentPage
    })
}