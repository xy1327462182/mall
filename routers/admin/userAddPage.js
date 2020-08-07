module.exports = (req, res) => {
    res.render('./admin/userEdit', {
        //标记当前页位置
        currentPage: 'userManage'
    });
}