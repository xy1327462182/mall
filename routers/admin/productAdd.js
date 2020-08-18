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

    //将主图和详情图状态切成数组
    let imagesDataArr = fields.imagesData.split(',');
    let detailsDataArr = fields.detailsData.split(',');
    
    // 将图片路径分割处理 将图片路径保存   
    let images = []
    let details = []

    imagesDataArr.forEach((n,i) => {
        if (n == 1) {
            //传图了
            images[i] = {
                id: i,
                path:  file['images'+ (i - 0 + 1)]['path'].split('public')[1],
                status: 1
            }
        } else if (n == 0) {
            //没传图
            images[i] = {
                id: i,
                path: '',
                status: 0
            }
        }
    });

    detailsDataArr.forEach((n,i) => {
        if (n == 1) {
            //传图了
            details[i] = {
                id: i,
                path:  file['details'+ (i - 0 + 1)]['path'].split('public')[1],
                status: 1
            }
        } else if (n == 0) {
            //没传图
            details[i] = {
                id: i,
                path: '',
                status: 0
            }
        }
    });

    

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
    // 将最终数据存入数据库
    await Product.create(data);
  })
  //重定向到商品管理页
  res.redirect('/admin/productManagePage');
}

/*
{
  title: '荣耀30S 麒麟820 5G芯片 3倍光学变焦 20倍数字变焦 全网通版8GB+128GB 蝶羽白',
  category: '汽车保养',
  attribute: '100,200',
  stock: '10',
  price: '2399',
  status: '1',
  imagesData: '1,1,0,0,0',
  detailsData: '1,1,0,0,0'
}
*/