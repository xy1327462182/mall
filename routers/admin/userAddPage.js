//引入User集合构造函数
const User = require('../../model/user');

module.exports = async (req, res) => {
    let id = req.query.id
    if (id) {
        let userMsg = await User.findOne({_id: id})
        return res.render('./admin/userEdit', {
            //标记当前页位置
            currentPage: 'userManage',
            userMsg
        });
    } else {
        return res.render('./admin/userEdit', {
            //标记当前页位置
            currentPage: 'userManage'
        });
    }
    
}