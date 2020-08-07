module.exports = (req, res) => {
    
    if (req.query.id) {

    } else {
        res.render('./admin/productEdit', {
            //标记当前页位置
            currentPage: 'productAddPage'
        });
    }
}

/*
荣耀30S 麒麟820 5G芯片 3倍光学变焦 20倍数字变焦 全网通版8GB+128GB 蝶羽白
全网通6+128G
全网通8+128G
全网通8+256G
2399

*/