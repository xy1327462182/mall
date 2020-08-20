//引入path模块
const path = require('path');
//引入formidable模块 处理表单数据
const formidable = require('formidable');
//引入User集合构造函数
const User = require('../../model/user');
//引入bcryptjs模块
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    //创建一个表单实例
	const form = new formidable.IncomingForm();
	//配置模块
	//设置表单域的编码类型
	form.encoding = 'UTF-8';
	//上传文件的文件夹
	form.uploadDir = path.join(__dirname,'../', '../', 'public', 'uploads', 'user-img');
	//保留文件默认后缀
	form.keepExtensions = true;
	form.parse(req, async (err, fields, file) => {
    //存放最终数据
    let result = {};
    //字段数据存入result
    result = fields;

    //密码加密
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(fields.password, salt);
    result.password = password;

    //将图片路径分割处理  然后存入result
    const userImgPath =  file.avatar.path.split('public')[1];
    result.avatar = userImgPath;
    //将最终数据存入数据库
    await User.create(result);
  })
  //重定向到用户管理页
  res.redirect('/admin/userManagePage');
}