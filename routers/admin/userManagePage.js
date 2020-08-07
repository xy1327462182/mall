//引入用户集合构造函数
const User = require('../../model/user');
//引入mongoose-sex-page模块 用于数据分页显示
const pagination = require('mongoose-sex-page');
//引入moment
const moment = require('moment');

module.exports = async (req, res) => {
  //如果没有传page，默认打开第一页
  if (!req.query.page) {
    req.query.page = 1;
  }
  //获取到page参数
  const page = req.query.page;

  //根据分页条件以及查询条件   从数据库中查询数据
  const users = await pagination(User).find().page(page).size(4).display(3).exec();
  res.render('./admin/userManage', {
      //标记当前页位置
      currentPage: 'userManage',
      users: users.records,
      pages: users.display,
      page,
      moment
  });
}