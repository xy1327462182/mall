//引入商品集合构造函数
const Product = require('../../model/product');
//引入mongoose-sex-page模块 用于数据分页显示
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    //记录当前页的位置
    req.app.locals.currentPage = 'allgoods';

    //设置商品筛选条件 默认是无条件
    let search = {}

    req.query.searchCategory ? search.category = req.query.searchCategory : null

    //获取到page参数
    let page = req.query.page;
    //根据分页条件以及用户查询条件   从数据库中查询数据
    const pros = await pagination(Product).find(search).page(page).size(8).display(3).exec();

    var len = pros.records.length
    if (req.query.up == 1) {
        //升序
        //重复比较的轮数   
        for(let i = 0; i < len - 1; i++) {
            //从第一个数到已经找出的最大数比较的次数
            for(let j = 0; j < len - 1 - i; j++) {
                //升序:相邻元素比较如果前面的数大于后面的数交换位置        
                if(pros.records[j].price > pros.records[j+1].price) {
                    var temp = pros.records[j+1];  
                    pros.records[j+1] = pros.records[j];
                    pros.records[j] = temp;
                }
            }
        }
    } else if (req.query.dec == 1) {
        //降序
        //重复比较的轮数   
        for(let i = 0; i < len - 1; i++) {
            //从第一个数到已经找出的最大数比较的次数
            for(let j = 0; j < len - 1 - i; j++) {
                //降序:相邻元素比较如果前面的数小于后面的数交换位置        
                if(pros.records[j].price < pros.records[j+1].price) {
                    var temp = pros.records[j+1];  
                    pros.records[j+1] = pros.records[j];
                    pros.records[j] = temp;
                }
            }
        }
    }

    if (req.session.login) {
        //如果登录状态
        return res.render('./home/product-list', {
            uname: req.app.locals.username,
            currentPage: req.app.locals.currentPage,
            up: req.query.up,
            dec: req.query.dec,
            pros: pros.records,
            pages: pros.display,
            page: page,
            searchCategory: search.category,
        });

    } else {
        //如果非登录状态
        return res.render('./home/product-list', {
            currentPage: req.app.locals.currentPage
        });
    }


    
}