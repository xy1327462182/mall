//引入商品集合构造函数
const Product = require('../../model/product');
//引入path模块
const path = require('path');
//引入formidable模块 处理表单数据
const formidable = require('formidable');

module.exports = async (req, res) => {
    //创建一个表单实例
	const form = new formidable.IncomingForm();
	//配置模块
	//设置表单域的编码类型
	form.encoding = 'UTF-8';
	//上传文件的文件夹
	form.uploadDir = path.join(__dirname,'../', '../', 'public', 'uploads', 'product-img');
	//保留文件默认后缀
	form.keepExtensions = true;
	form.parse(req, async (err, fields, file) => {
    //存放最终数据
    let data = {};
    // 将图片路径分割处理 将图片路径保存进数组   
    let images = [];
    let details = [];
    
    for (let attr in file) {
        if (attr.indexOf('image') != -1) {
            //是主图
            images.push(file[attr]['path'].split('public')[1]);
        } else if (attr.indexOf('detail') != -1) {
            //是详情图
            details.push(file[attr]['path'].split('public')[1]);
        }
    }
    

    // 将规格切成数组 放到最终数据中
    data.attribute = fields.attribute.split(',');

    // 将数据赋值给最终数据
    data.title = fields.title;
    data.category = fields.category;
    data.stock = fields.stock;
    data.price = fields.price;
    data.status = fields.status;

    // 将处理好的图片路径放到最终数据中
    data.images = images;
    data.details = details;
    console.log(data);
    //  将最终数据存入数据库
    await Product.create(data);
  })
  //重定向到商品管理页
  res.redirect('/admin/productManagePage');
}