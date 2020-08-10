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

    // 将图片路径分割处理 将图片路径保存进数组   
    let images = [];
    let details = [];

    for (let attr in file) {
      if (attr.indexOf('file') != -1) {
        //主图
        images.push(file[attr]['path'].split('public')[1]);
      } else if (attr.indexOf('details') != -1) {
        //详情图
        details.push(file[attr]['path'].split('public')[1]);
      }
    }

    // 将规格切成数组
    let attribute = [];
    for (let attri in fields) {
        if (attri.indexOf('attribute') != -1) {
            //规格
            attribute.push(fields[attri]);
        }
    }    

    // 将数据赋值给最终数据
    let data = {};
    data.title = fields.title;
    data.category = fields.category;
    data.stock = fields.stock;
    data.price = fields.price;
    data.status = fields.status;

    // 将处理好的图片路径放到最终数据中
    data.images = images;
    data.details = details;
    //将处理好的规格放到最终数据中
    data.attribute = attribute;
    console.log(data);
    // 将最终数据存入数据库
    await Product.create(data);
  })
  //重定向到商品管理页
  res.redirect('/admin/productManagePage');
}

/*
[ '100g', '200g' ]
{
  title: '三只松鼠小贱麻辣味小米锅巴 休闲零食地方特产膨化食品儿童食品小吃锅巴60g/袋',
  category: '食品生鲜',
  attribute0: '100g',
  attribute1: '200g',
  stock: '90',
  price: '8.9',
  status: '0',
  images: [
    '\\uploads\\product-img\\upload_e3a6cc87bb6a14c0fbe0fe4b3be6f128.jpg',
    '\\uploads\\product-img\\upload_38d779f4775a34dcbbe581880ab07761.jpg',
    '\\uploads\\product-img\\upload_99fba91b9290f9c65234b72f620895ba.jpg'
  ],
  details: [
    '\\uploads\\product-img\\upload_4e8c41ccf376fc39018e597c96d7488c.jpg',
    '\\uploads\\product-img\\upload_d3cb12273a247b772d420063c59c92bf.jpg'
  ],
  attribute: [ '100g', '200g' ]
}
*/




/*
数据库连接成功
服务器创建成功
(node:3780) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use Collection.countDocuments or Collection.estimatedDocumentCount instead
(Use `node --trace-deprecation ...` to show where the warning was created)
{
  title: '荣耀笔记本电脑MagicBook 14 14英寸全面屏轻薄本（AMD锐龙5 8G 256G 多屏协同 指纹Win10）',
  category: '手机通讯',
  attribute: '128G,256G',
  stock: '90',
  price: '3499',
  status: '0'
}
{
  file0: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 73025,
    path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_08074e334e5c3012ee3aec77f222a3a8.jpg',
    name: '荣耀笔记本电脑MagicBook 14-01.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-07T11:49:49.486Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_08074e334e5c3012ee3aec77f222a3a8.jpg',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 73025,
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
    size: 59720,
    path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_4bf3619b77d0ac32b7ef2ce07f110e21.jpg',
    name: '荣耀笔记本电脑MagicBook 14-02.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-07T11:49:49.493Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_4bf3619b77d0ac32b7ef2ce07f110e21.jpg',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 59720,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  details0: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 271555,
    path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_420bae32f6c9175afbee93895ac30309.jpg',
    name: '荣耀笔记本电脑MagicBook 14-detail01.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-07T11:49:49.502Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_420bae32f6c9175afbee93895ac30309.jpg',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 271555,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  details1: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 306698,
    path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_c34ef1a32db406f817e4fe1ea415d8b7.jpg',
    name: '荣耀笔记本电脑MagicBook 14-detail02.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-07T11:49:49.511Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_c34ef1a32db406f817e4fe1ea415d8b7.jpg',
      fd: 4,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 306698,
      closed: false,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  }
}
*/











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