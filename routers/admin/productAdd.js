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
    let images = {}
    let details = {}
    // console.log(file);
    
    for (let attr in file) {
        if (attr.indexOf('image') != -1) {
            //是主图
            if (file[attr]['path'].split('.')[1]) {
                //上传图片了
                images[attr] = {
                    path: file[attr]['path'].split('public')[1],
                    imagesId: attr.split('s')[1]
                }
            } else {
                //没传图
                images[attr] = {
                    path: '',
                    imagesId: attr.split('s')[1]
                }
            }
            
        } else if (attr.indexOf('detail') != -1) {
            //是详情图
            if (file[attr]['path'].split('.')[1]) {
                //传图了
                details[attr] = {
                    path: file[attr]['path'].split('public')[1],
                    detailsId: attr.split('s')[1]
                }
            } else {
                //没传图
                details[attr] = {
                    path: '',
                    detailsId: attr.split('s')[1]
                }
            }
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
    // 将最终数据存入数据库
    await Product.create(data);
  })
  //重定向到商品管理页
  res.redirect('/admin/productManagePage');
}


/*

{
  images1: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 247839,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_1e22e2bdadcb7d6cabafedf493f56518.jpg',
    name: '1595243507580.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-15T08:31:03.643Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_1e22e2bdadcb7d6cabafedf493f56518.jpg',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 247839,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  images2: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 25098,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_11d14a78b96446963929a13b1490b7a2.jpg',
    name: '1595243848881.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-15T08:31:03.660Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_11d14a78b96446963929a13b1490b7a2.jpg',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 25098,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  images4: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 0,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_adbbe21ce444bf3a6c222eb1e16446c1',
    name: '',
    type: 'application/octet-stream',
    hash: null,
    lastModifiedDate: null,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_adbbe21ce444bf3a6c222eb1e16446c1',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 0,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  images5: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 0,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_2a4d790356f2691a0db8534eb161f425',
    name: '',
    type: 'application/octet-stream',
    hash: null,
    lastModifiedDate: null,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_2a4d790356f2691a0db8534eb161f425',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 0,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  images3: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 166984,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_af2a2c201de217840d48bf0d1179f6ff.jpg',
    name: '1595243903896.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-15T08:31:03.662Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_af2a2c201de217840d48bf0d1179f6ff.jpg',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 166984,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  details3: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 0,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_9b9c176c346501d7970a528a7d60e300',
    name: '',
    type: 'application/octet-stream',
    hash: null,
    lastModifiedDate: null,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_9b9c176c346501d7970a528a7d60e300',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 0,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  details5: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 0,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_2bbd04674391691ee21edbafd66e260d',
    name: '',
    type: 'application/octet-stream',
    hash: null,
    lastModifiedDate: null,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_2bbd04674391691ee21edbafd66e260d',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 0,
      closed: true,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  details4: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 0,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_765fb16edddaa825bb1328f7236141ce',
    name: '',
    type: 'application/octet-stream',
    hash: null,
    lastModifiedDate: null,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_765fb16edddaa825bb1328f7236141ce',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 0,
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
    size: 83178,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_f4faa5c164028e232c13e9ed47af5c51.jpg',
    name: '1595243979366.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-15T08:31:03.669Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_f4faa5c164028e232c13e9ed47af5c51.jpg',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 83178,
      closed: false,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  },
  details2: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 96134,
    path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_24e620a5a84fff5445a74cc367114267.jpg',
    name: '1595243974710.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: 2020-08-15T08:31:03.670Z,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\ly\\Desktop\\study\\git\\mall\\public\\uploads\\product-img\\upload_24e620a5a84fff5445a74cc367114267.jpg',
      fd: 9,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 96134,
      closed: false,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  }
}
*/