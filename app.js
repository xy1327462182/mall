//引入express
const express = require('express');
//引入path
const path = require('path');
//引入body-parser
const bodyParser = require('body-parser');
//引入express-session模块
const session = require('express-session')

//创建服务器
const app = express();
//连接数据库
require('./model/connect');

//配置session
// 使用 session 中间件
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
    },
}));

//配置静态资源处理
app.use(express.static(path.join(__dirname, 'public')));

//配置模板引擎
app.engine('html', require('express-art-template'));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//配置body-parser
app.use(bodyParser.urlencoded({extended: true}));

//导入二级home路由
const home = require('./routers/home');
const admin = require('./routers/admin');

// 登录拦截，判断登录状态，不是登录状态则拦截
app.use('/home', (req, res, next) => {
    if (req.session.login != true) {   
        if (req.url == '/login' || req.url == '/login?errmsg=1' || req.url == '/' || req.url == '/register') {
            next();            
        } else {
            res.redirect('/home/login');
        }
    } else {
        next();
    }
    
}) 

app.use('/home', home);
app.use('/admin', admin);
//监听80端口
app.listen(80);
console.log('服务器创建成功');