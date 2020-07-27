module.exports = (req, res) => {
    req.app.locals.currentPage = 'hotgoods';
    res.render('./home/hot-goods', {
        currentPage: req.app.locals.currentPage
    });
}