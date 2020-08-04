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
    //将图片路径分割处理 将图片路径保存进数组   
    let images = [];
    for (let f in file) {
        images.push(file[f]['path'].split('public')[1]);
    }

    //将规格切成数组
    fields.attribute = fields.attribute.split(',');
    //将数据赋值给最终数据
    let data = fields;
    //将处理好的图片路径放到最终数据中
    data.images = images;
    //将最终数据存入数据库
    await Product.create(data);
  })
  //重定向到商品管理页
  res.redirect('/admin/productManagePage');
}

/*
{
  title: '荣耀30S 麒麟820 5G芯片 3倍光学变焦 20倍数字变焦 全网通版8GB+128GB 蝶羽白',
  category: '手机通讯',
  attribute: '全网通6+128G,全网通8+128G,全网通8+256G',
  stock: '10',
  price: '2399',
  status: '0'
}

{
  file0: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 58434,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_40133678615d48d0644e89fb9e07ef6f.jpg',
    name: '荣耀30S-02.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-04T05:14:20.884Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_40133678615d48d0644e89fb9e07ef6f.jpg',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 58434,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  file1: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 72916,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_ac7c562b669ecaa5aeab9b5ffcbf42f1.jpg',
    name: '荣耀30S-01.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-04T05:14:20.899Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_ac7c562b669ecaa5aeab9b5ffcbf42f1.jpg',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 72916,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  file2: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 65040,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_d78b31d77f1802c7a31a986be540a92a.jpg',
    name: '荣耀30S-03.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-04T05:14:20.901Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_d78b31d77f1802c7a31a986be540a92a.jpg',
      fd: 4,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 65040,
      closed: false,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  }
}

*/