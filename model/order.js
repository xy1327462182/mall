//引入mongoose
const mongoose = require('mongoose');
//创建订单集合规则
const orderSchema = new mongoose.Schema({
    orderNo: {
        type: Number,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    status: {//订单状态
        type: Number,
        required: true,
        default: 1 //1未支付  2已支付 3已发货 4完成 5取消
    },
    payment: {//订单金额
        type: Number,
        required: true
    },
    paymentType: {
        type: Number,
        required: true,
        default: 10 //10支付宝 20微信
    },
    productList: {
        type: [],
        default: []
    }
}, {
    timestamps: true
})

//创建订单集合
const Order = mongoose.model('Order', orderSchema);

//导出订单集合构造函数
module.exports = Order;