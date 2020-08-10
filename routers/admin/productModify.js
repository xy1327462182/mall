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
        let attribute = []
        //根据商品id 查询原有数据
        let pro = Product.findOne({_id: fields.id})
        //遍历所有图片  根据修改情况做不同处理
        for (let attr in file) {
            if (file[attr]['path'].split('.')[1]) {
                //图片修改了
                console.log(attr + '改了啊');
            } else {
                console.log(attr + '图片没改');
            }
        }


        /*
        商品添加页：
          
        1.商品规格功能修改： 点击添加 点击删除 enter按键 都重新获取最新规格数据 利用&符号重新拼接到字符串，然后提交到后台。后台处理： 拆分字符串放到数组中
        2.主图 固定为5个。添加按钮取消，每个input给固定name属性。后台遍历获取数据，放到数组中
        3.详情图同上

        商品修改页：
        1.商品规格功能：数据库查找已经有的规格，遍历渲染到页面。 监听添加按钮 删除按钮 enter按键 都重新获取最新的规格数据，利用&符号拼接字符串  放到隐藏的input 的 value 中（建议规格数据放到同一个类名标签中）
        如规格未修改，则隐藏的input的value值为空。
        2.主图：固定5个，name属性固定 从数据库查找已有的数据并得到长度 用5减去此长度得到剩余为上传图片的长度。遍历渲染有数据的  遍历渲染没数据的。删除图片或者添加图片都是固定name属性，因此后台可直接遍历所有的input然后根据后缀判断是否修改了。如没修改则不做处理，如修改了，则删除原来图片，将新路径放到新数据，更新数组（根据固定的name属性判断索引）。
        3.详情页同上

        */



            // if (file[attr]['path'].split('.')[1]) {//图片修改了
                // if (attr.indexOf('file') != -1) {
                //     //是主图
                    
                //     //获取新图片路径
                //     let pa = file[attr]['path'].split('public')[1]
                //     //获取当前图片在images中的索引
                //     let imagesIndex = attr.split('file')[1]
                //     //根据老图片的路径，将其删除
                //     fs.unlink(path.join(__dirname,pro.images[imagesIndex]),function(err) {
                //         if (err) {
                //             console.log(err);
                //         }
                //     })
                //     //更新路径
                //     pro.images[imagesIndex] = pa
            // } else {
                    //是详情图
                    //获取新图片路径
                    // let pa = file[attr]['path'].split('public')[1]
                    // //获取索引
                    // let detailsIndex = attr.split('details')[1]
                    // //根据老图片的路径，将其删除
                    // fs.unlink(path.join(__dirname,pro.details[detailsIndex]),function(err) {
                    //     if (err) {
                    //         console.log(err);
                    //     }
                    // })
                    // //更新路径
                    // pro.details[detailsIndex] = pa
                // }
            // } else {//图片未修改
            //     //删除空白文件  attr.path
            //     fs.unlink(path.join(file[attr]['path']),function(err) {
            //         if (err) {
            //             console.log(err);
            //         }
            //     })
        //     }
        // }

        //遍历所有规格 存入attribute数组
        // for (let attri in fiedls) {
        //     if (attri.indexOf('attribute') != -1) {
        //         //规格
        //         attribute.push(fields[attri]);
        //     }
        // }
        // data.title = fields.title
        // data.category = fields.category
        // data.stock = fields.stock
        // data.price = fields.price
        // data.status = fields.status
        // data.images = pro.images
        // data.details = pro.details
        // data.attribute = attribute
   
        //将所处理完的数据保存到最终数据中  更新数据库中的数据
        // await Product.updateOne({_id: fields.id},data)
  })
  //重定向到商品管理页
  res.redirect('/admin/productManagePage');
}

/*
未修改
服务器创建成功
{
  title: '荣耀笔记本电脑MagicBook 14 14英寸全面屏轻薄本（AMD锐龙5 8G 256G 多屏协同 指纹Win10）',
  category: '手机通讯',
  attribute0: '128G',
  attribute1: '256G',
  stock: '90',
  price: '3499',
  status: '0'
}
---------------------
{
  file0: File {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    size: 0,
    path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_934e2afcfc0bed9f292ac5a2c10ec488',
    name: '',
    type: 'application/octet-stream',
    hash: null,
    lastModifiedDate: null,
    _writeStream: WriteStream {
      _writableState: [WritableState],
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      path: 'C:\\Users\\user\\Desktop\\WEB前端案例\\TianMall\\mall\\public\\uploads\\product-img\\upload_934e2afcfc0bed9f292ac5a2c10ec488',
      fd: null,
      flags: 'w',
      mode: 438,
      start: undefined,
      autoClose: true,
      pos: undefined,
      bytesWritten: 0,
      closed: false,
      [Symbol(kFs)]: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(kIsPerformingIO)]: false
    },
    [Symbol(kCapture)]: false
  }
}
*/