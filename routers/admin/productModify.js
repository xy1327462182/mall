//引入商品集合构造函数
const Product = require('../../model/product');
//引入path模块
const path = require('path');
//引入formidable模块 处理表单数据
const formidable = require('formidable');
const fs = require('fs');

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
        let data = {}
        
        //根据商品id 查询原有数据
        let pro = await Product.findOne({_id: fields.proId})
        let images = pro.images
        let details = pro.details
        
        //遍历所有图片  根据修改情况做不同处理
        for (let attr in file) {
            if (file[attr]['path'].split('.')[1]) {
                console.log('走到图片改了');
                //图片修改了
                if (attr.split('s')[0] == 'image') {
                    //主图
                    console.log('走到主图修改了');
                    images[attr.split('s')[1]] = attr['path'].split('public')[1]
                } else if (attr.split('s')[0] == 'detail') {
                    console.log('走到详情图修改了');
                    //详情图
                    details[attr.split('s')[1]] = attr['path'].split('public')[1]
                }
                
            }
        }

        data.title = fields.title;
        data.category = fields.category;
        data.attribute = fields.attribute;
        data.stock = fields.stock;
        data.price = fields.price;
        data.status = fields.status;
        data.images = images;
        data.details = details;
        data.attribute = data.attribute.split(',');
        console.log(data);
        //更新数据库
        await Product.updateOne({_id: fields.proId}, data)
            .then( res => console.log(res))
            .catch(err => console.log(err))
  })
  //重定向到商品管理页
  res.redirect('/admin/productManagePage');
}