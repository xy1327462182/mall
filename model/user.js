//引入mongoose
const mongoose = require('mongoose');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: '/images/user-img.jpg'
    },
    username: {
        type: String,
        default: 'users'
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Array
    },
    orders: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'normal'
    },
    registerTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

//创建用户集合
const User = mongoose.model('User', userSchema);

//导出用户集合构造函数
module.exports = User;