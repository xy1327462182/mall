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
        console.log(file);
        //根据商品id 查询原有数据
        let pro = await Product.findOne({_id: fields.proId})
        let images = pro.images
        let details = pro.details
        //遍历所有图片  根据修改情况做不同处理
        // for (let attr in file) {
        //     if (attr.indexOf('image') != -1) {
        //         //是主图
        //         if (file[attr]['path'].split('.')[1]) {
        //             //修改图片了
        //             //删除原来图片
        //             await fs.unlink(path.join(__dirname,'../','../','public',images[attr]['path']), function(err) {
        //                 if (err) {
        //                     console.log(err);
        //                 }//更改图片最新地址
                        
        //             })
        //             console.log(images[attr]['path']);
        //             console.log(file[attr]['path'].split('public')[1]);
        //             images[attr]['path'] = file[attr]['path'].split('public')[1]
                    
        //         } else {
        //             //没修改图
        //             //判断原来有没有这张图
        //             if (images[attr]['path']) {
        //                 //如果原来有  则证明图片是删除了
        //                 //删除该图片文件
        //                 await fs.unlink(path.join(__dirname,'../','../','public',images[attr]['path']), function(err) {
        //                     if (err) {
        //                         console.log(err);
        //                     }
        //                 })
        //             } 
        //             //如果原来就没有图 则不做处理
        //         }
                
        //     } else if (attr.indexOf('detail') != -1) {
        //         //是详情图
        //         if (file[attr]['path'].split('.')[1]) {
        //             //修改图片了
        //             //删除原来图片
        //             await fs.unlink(path.join(__dirname,'../','../','public',details[attr]['path']), function(err) {
        //                 if (err) {
        //                     console.log(err);
        //                 }
                        
        //             })
        //             //更改图片最新地址
        //             details[attr]['path'] = file[attr]['path'].split('public')[1]
                    
        //         } else {
        //             //没修改图
        //             //判断原来有没有这张图
        //             if (details[attr]['path']) {
        //                 //如果原来有  则证明图片是删除了
        //                 //删除该图片文件
        //                 await fs.unlink(path.join(__dirname,'../','../','public',details[attr]['path']), function(err) {
        //                     if (err) {
        //                         console.log(err);
        //                     }
        //                 })
        //             } 
        //             //如果原来就没有图 则不做处理
        //         }
        //     }
        // }
        data.title = fields.title;
        data.category = fields.category;
        data.attribute = fields.attribute;
        data.stock = fields.stock;
        data.price = fields.price;
        data.status = fields.status;

        // data.images = images;
        // data.details = details;
        
        data.attribute = data.attribute.split(',');
        // console.log(data);
        //更新数据库
        // await Product.findByIdAndUpdate(fields.proId,data)
  })
  //重定向到商品管理页
  res.redirect('/admin/productManagePage');
}