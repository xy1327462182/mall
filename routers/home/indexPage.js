module.exports = (req, res) => {
    req.app.locals.currentPage = 'index';
    res.render('./home/index', {
        currentPage: req.app.locals.currentPage
    });
}