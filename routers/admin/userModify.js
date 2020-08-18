//引入path模块
const path = require('path');
//引入formidable模块 处理表单数据
const formidable = require('formidable');
//引入User集合构造函数
const User = require('../../model/user');
const fs = require('fs')

module.exports = async (req, res) => {
    let id = req.query.id
    let oldUserMsg = await User.findOne({_id: id})
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
        var imgPath = ''
        if (file) {
            //改图了
            imgPath = file.avatar.path.split('public')[1]

            //删除原来图片
            fs.unlink(path.join(__dirname,'../', '../','public',oldUserMsg.avatar), function (err) {
                console.log(err);
            })
        } else {
            //没改图
            imgPath = oldUserMsg.avatar
        }
        //更新数据
        await User.findByIdAndUpdate(id, {
            avatar: imgPath,
            username: fields.username,
            orders: fields.orders,
            role: fields.role,
            phone:fields.phone,
            email:  fields.email
        })
        //重定向到用户管理页
         res.redirect('/admin/userManagePage');
    })
}