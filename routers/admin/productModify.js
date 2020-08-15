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
        // for (let attr in file) {
        //     if (attr.indexOf('image') != -1) {
        //         //是主图
        //         if (file[attr]['path'].split('.')[1]) {
        //             //上传图片了
        //             images[attr] = {
        //                 path: file[attr]['path'].split('public')[1],
        //                 imagesId: attr.split('s')[1]
        //             }
        //         } else {
        //             //没传图
        //             images[attr] = {
        //                 path: '',
        //                 imagesId: attr.split('s')[1]
        //             }
        //         }
                
        //     } else if (attr.indexOf('detail') != -1) {
        //         //是详情图
        //         if (file[attr]['path'].split('.')[1]) {
        //             //传图了
        //             details[attr] = {
        //                 path: file[attr]['path'].split('public')[1],
        //                 detailsId: attr.split('s')[1]
        //             }
        //         } else {
        //             //没传图
        //             details[attr] = {
        //                 path: '',
        //                 detailsId: attr.split('s')[1]
        //             }
        //         }
        //     }
        // }
    

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