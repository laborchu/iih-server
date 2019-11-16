import * as http from 'http';
let express = require('express');
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import cookieParser = require('cookie-parser');
import * as dotenv from 'dotenv';

//config env
dotenv.config({ path: path.join(__dirname, `./.env.${process.env.ENV}`) });

var app = express();
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.text());
// app.use(compression());

// app.use(express.static(path.join(__dirname, '../../dist')));
// app.use(express.static(path.join(__dirname, '../../')));

app.all('*', function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

//初始化路由
let routes = require('./routes');
routes.init(app);
var renderIndex = (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '../../dist' + '/index.html'));
};
app.get('/*', renderIndex);

// let infoSpider = new InfoSpider();
// infoSpider.resetCrawl();

app.listen(process.env.PORT, () => {
    console.log('App is listening on port:' + process.env.PORT);
});

process.on('uncaughtException', function (err: any) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});