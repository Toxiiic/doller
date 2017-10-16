//返回类
const Koa = require('koa');
//返回函数
// const getKoaRouter = require('koa-router');
const bodyparser = require('koa-bodyparser');
const controller = require('./controller');
const staticFiles = require('./static-files');
const Sequelize = require('sequelize');
const config = require('./config');


const app = new Koa();

/** 中间件的注册顺序很重要！！*/
app.use(async (ctx, next) => {
    console.log(`处理 方法：${ctx.request.method} url：${ctx.request.url}`);
    await next();
});
app.use(bodyparser());
app.use(controller());
app.use(staticFiles('/static/', __dirname + '/pages'));


// const model = require('./model');

// let User = model.user;

// (async () => {
//     var user = await User.create({
//         name: '哦耶这是我的名字',
//         pwd: '123456'
//     });
//     console.log(user);
// })()


app.listen(3000);
console.log('在3000端口监听啦');