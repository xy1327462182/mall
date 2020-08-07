//引入商品集合构造函数
const Product = require('../../model/product');
//引入mongoose-sex-page模块 用于数据分页显示
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {

    //设置查询条件
    let search = {};
    req.query.searchStatus ? search.status = req.query.searchStatus : null;
    req.query.searchCategory ? search.category = req.query.searchCategory : null;
    
    //如果没有传page，默认打开第一页
    if (!req.query.page) {
      req.query.page = 1;
    }
    //获取到page参数
    const page = req.query.page;
    //根据分页条件以及用户查询条件   从数据库中查询数据
    const pros = await pagination(Product).find(search).page(page).size(5).display(3).exec();
    res.render('./admin/productManage', {
        //标记当前页位置
        currentPage: 'productManage',
        pros: pros.records,
        pages: pros.display,
        page: page,
        searchCategory: search.category,
        searchStatus: search.status
    });
}

/*
{
  page: 1,
  size: 5,
  total: 5,
  records: [
    {
      attribute: [Array],
      images: [Array],
      status: 0,
      _id: 5f28f37e8b00b21d50373b49,
      title: '荣耀30S 麒麟820 5G芯片 3倍光学变焦 20倍数字变焦 全网通版8GB+128GB 蝶羽白',
      category: '手机通讯',
      stock: 10,
      price: 2399,
      createdAt: 2020-08-04T05:34:54.582Z,
      updatedAt: 2020-08-04T05:34:54.582Z,
      __v: 0
    },
    {
      attribute: [Array],
      images: [Array],
      status: 0,
      _id: 5f28f8ddaed1d120f08f6e8d,
      title: '荣耀X10 Max 5G双模 7.09英寸超大屏对称式双扬声器 5000mAh大电池 NFC 全网通 6GB+128GB竞速蓝',
      category: '手机通讯',
      stock: 60,
      price: 2099,
      createdAt: 2020-08-04T05:57:49.293Z,
      updatedAt: 2020-08-04T05:57:49.293Z,
      __v: 0
    },
    {
      attribute: [Array],
      images: [Array],
      status: 0,
      _id: 5f28f9cbaed1d120f08f6e8e,
      title: '百草味 手撕面包1000g整箱装 早餐食品蛋糕小面包口袋小糕点点心 零食大礼包礼盒 原味',
      category: '食品生鲜',
      stock: 20,
      price: 25.9,
      createdAt: 2020-08-04T06:01:47.269Z,
      updatedAt: 2020-08-04T06:01:47.269Z,
      __v: 0
    },
    {
      attribute: [Array],
      images: [Array],
      status: 0,
      _id: 5f28faa4aed1d120f08f6e8f,
      title: '烟台红富士苹果 4个 一级铂金果 单果160-190g 简装 新生鲜水果',
      category: '食品生鲜',
      stock: 80,
      price: 12.8,
      createdAt: 2020-08-04T06:05:24.916Z,
      updatedAt: 2020-08-04T06:05:24.916Z,
      __v: 0
    },
    {
      attribute: [Array],
      images: [Array],
      status: 0,
      _id: 5f28fbe4aed1d120f08f6e90,
      title: '机械师F117-V 144Hz全面屏游戏本十代i7-10750H/RTX2060独显吃鸡笔记本电脑 荣耀版10代i7/8G/512G PCIE高速固态',
      category: '手机通讯',
      stock: 568,
      price: 8299,
      createdAt: 2020-08-04T06:10:44.081Z,
      updatedAt: 2020-08-04T06:10:44.081Z,
      __v: 0
    }
  ],
  pages: 1,
  display: [ 1 ]
}
*/