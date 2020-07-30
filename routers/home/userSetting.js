//引入User集合构造函数
const User = require('../../model/user');
//引入formidable模块，处理表单数据
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    //获取当前用户id
    let uid = req.app.locals.uid;
    //查找数据
    const old = await User.findOne({_id: uid});
    
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
    } else {
        var imgpath;
        //创建一个表单实例
	    const form = new formidable.IncomingForm();
	    //配置模块
	    //设置表单域的编码类型
	    form.encoding = 'UTF-8';
	    //上传文件的文件夹
	    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads', 'user-img');
	    //保留文件默认后缀
        form.keepExtensions = true;
	    form.parse(req, async (err, fields, file) => {
            //将图片路径分割处理，路径设置为uploads文件夹里
            imgpath = file.userImg.path.split('public')[1];
            //将数据更新进数据库
            await User.updateOne({_id: uid}, {avatar: imgpath});
        })
        let p = path.join(__dirname, '../', '../', 'public', old.avatar);
        //删除原来的图片
        fs.unlink(p, function(err) {
            if (err) {
                console.log(err);
            }
        })
        //重定向到用户中心
        res.redirect('/home/user-center?id=' + uid);
    } 
}

/*
{
  userImg: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 45122,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\user-img\\upload_9507bb4142a22436d712928971d54bb9.jpg',
    name: 'HUAWEI nova 5 Pro01.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-07-30T09:14:44.826Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\user-img\\upload_9507bb4142a22436d712928971d54bb9.jpg',
      fd: 4,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 45122,
      closed: false,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  }
}
*/