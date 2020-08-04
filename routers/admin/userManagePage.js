const { model } = require("mongoose");

module.exports = (req, res) => {

    res.render('admin/userManage', {
        //标记当前页位置
        currentPage: 'userManage'
    });
}