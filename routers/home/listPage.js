module.exports = (req, res) => {
    req.app.locals.currentPage = 'allgoods';
    res.render('./home/product-list', {
        currentPage: req.app.locals.currentPage
    });
}