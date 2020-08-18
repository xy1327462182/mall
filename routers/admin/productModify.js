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
        //查询老数据
        let oldData = await Product.findOne({_id: fields.proId})

        //存放最终数据
        let data = {}

        //将主图和详情图状态切成数组
        let imagesDataArr = fields.imagesData.split(',');
        let detailsDataArr = fields.detailsData.split(',');

        //图片处理后 存放图片数据
        let images = []
        let details = []

        imagesDataArr.forEach((n,i) => {
            if (n == 1) {
                //有图
                if (file['images'+ (i - 0 + 1)]) {
                    //如果file中有这个属性 则是上传的新图
                    //更新数据
                    images[i] = {
                        id: i,
                        path:  file['images'+ (i - 0 + 1)]['path'].split('public')[1],
                        status: 1
                    }
                    //看旧数据原本是否有图 如有则删除
                    let oldP = oldData.images[i].path
                    if (oldP) {
                        fs.unlink(path.join(__dirname, '../', '../','public',oldP), function(err) {
                            console.log(err);
                        })
                    }
                } else {
                    //旧图没动
                    images[i] = {
                        id: i,
                        path: oldData.images[i]['path'],
                        status: 1
                    }
                }
            } else if (n == 0) {
                //没图 （用户删除原图 或者本就没图）
                //更新数据
                images[i] = {
                    id: i,
                    path: '',
                    status: 0
                }
                //看旧数据原来是否有图 有则删除
                let oldP = oldData.images[i].path
                if (oldP) {
                    fs.unlink(path.join(__dirname, '../', '../','public',oldP), function(err) {
                        console.log(err);
                    })
                }
            }
        });
    
        detailsDataArr.forEach((n,i) => {
            if (n == 1) {
                //有图
                if (file['details'+ (i - 0 + 1)]) {
                    //如果file中有这个属性 则是上传的新图
                    //更新数据
                    details[i] = {
                        id: i,
                        path:  file['details'+ (i - 0 + 1)]['path'].split('public')[1],
                        status: 1
                    }
                    //看旧数据原本是否有图 如有则删除
                    let oldP = oldData.details[i].path
                    if (oldP) {
                        fs.unlink(path.join(__dirname, '../', '../','public',oldP), function(err) {
                            console.log(err);
                        })
                    }
                } else {
                    //旧图没动
                    details[i] = {
                        id: i,
                        path: oldData.details[i]['path'],
                        status: 1
                    }
                }
            } else if (n == 0) {
                //没图 （用户删除原图 或者本就没图）
                //更新数据
                details[i] = {
                    id: i,
                    path: '',
                    status: 0
                }
                //看旧数据原来是否有图 有则删除
                let oldP = oldData.details[i].path
                if (oldP) {
                    fs.unlink(path.join(__dirname, '../', '../','public',oldP), function(err) {
                        console.log(err);
                    })
                }
            }
        });
      
        data.title = fields.title;
        data.category = fields.category;
        data.attribute = fields.attribute;
        data.stock = fields.stock;
        data.price = fields.price;
        data.status = fields.status;

        //图片最终数据
        data.images = images;
        data.details = details;

        //处理规格数据
        data.attribute = data.attribute.split(',');
       
        //更新数据库
        await Product.findByIdAndUpdate(fields.proId,data)
  })
  //重定向到商品管理页
  res.redirect('/admin/productManagePage');
}