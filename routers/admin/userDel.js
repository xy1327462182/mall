//引入User集合构造函数
const User = require('../../model/user')
const fs = require('fs')
//引入path模块
const path = require('path')

module.exports = async (req, res) => {
	let id = req.query.id
	let oldUser = await User.findOne({ _id: id })
	fs.unlink(
		path.join(__dirname, '../', '../', 'public', oldUser.avatar),
		function (err) {
			console.log(err)
		}
	)
	await User.findByIdAndDelete(id)
	//重定向到用户管理页
	res.redirect('/admin/userManagePage')
}
