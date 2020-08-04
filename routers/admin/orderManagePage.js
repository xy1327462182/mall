module.exports = (req, res) => {
    
    res.render('./admin/orderManage', {
        //标记当前页位置
        currentPage: 'orderManage'
    });
}