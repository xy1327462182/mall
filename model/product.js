//引入mongoose
const mongoose = require('mongoose');
//创建商品集合规则
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    attribute: {
        type: [],
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [],
        required: true
    },
    details: {
        type: []
    },
    status: {
        type: Number,
        default: 0 //0在售 1下架
    },
    sold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

//创建商品集合
const Product = mongoose.model('Product', productSchema);

//导出商品集合构造函数
module.exports = Product;