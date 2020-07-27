//引入express
const express = require('express');
//引入path
const path = require('path');
//引入body-parser
const bodyParser = require('body-parser');

//创建服务器
const app = express();

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

app.use('/home', home);
app.use('/admin', admin);
//监听80端口
app.listen(80);
console.log('服务器创建成功');