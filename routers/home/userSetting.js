//引入User集合构造函数
const User = require('../../model/user');
//引入formidable模块，处理表单数据
const formidable = require('formidable');

module.exports = async (req, res) => {
    //获取当前用户id
    let uid = req.app.locals.uid;
    if (req.body.uname) {
        await User.updateOne({_id: uid}, {username: req.body.uname});
        return res.redirect('/home/user-center?id=' + uid);
    } else if (req.body.phone) {
        // console.log(req.body.phone);
        const phone = await User.find({phone: req.body.phone});
        if (phone.length>0) {
            res.redirect('/home/user-settings?id=' + uid + '&phoneErr=手机号已经存在');
        } else {
            await User.updateOne({_id: uid}, {phone: req.body.phone});
            return res.redirect('/home/user-center?id=' + uid);
        }
    } else if (req.body.email) {
        const email = await User.find({email: req.body.email});
        if (email.length > 0) {
            res.redirect('/home/user-settings?id=' + uid + '&emailErr=邮箱已经存在');
        } else {
            await User.updateOne({_id: uid}, {email: req.body.email});
            return res.redirect('/home/user-center?id=' + uid);
        }
    }

    //创建一个表单实例
	const form = new formidable.IncomingForm();
	//配置模块
	//设置表单域的编码类型
	form.encoding = 'UTF-8';
	//上传文件的文件夹
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads', 'logo');
	//保留文件默认后缀
	form.keepExtensions = true;
	form.parse(req, (err, fields, file) => {
    //将图片路径分割处理，路径设置为uploads文件夹里
    const imgpath = file.jobimg.path.split('public')[1];
    //将数据存入数据库
    })
}