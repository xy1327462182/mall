module.exports = (req, res) => {
        res.render('./admin/productEdit', {
            //标记当前页位置
            currentPage: 'productEdit',
        });
}