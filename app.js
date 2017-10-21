//返回类
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const staticFiles = require('./static-files');
const Sequelize = require('sequelize');
const config = require('./config');
const rest = require('./rest');
// const session = require('koa-session2');
const session = require('koa-session');


const app = new Koa();

app.use(bodyParser({
    enableTypes: 'json'
}));


app.keys = ['some secret hurr'];
const CONFIG = {
 key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
 /** (number || 'session') maxAge in ms (default is 1 days) */
 /** 'session' will result in a cookie that expires when session/browser is closed */
 /** Warning: If a session cookie is stolen, this cookie will never expire */
 maxAge: 86400000,
 overwrite: true, /** (boolean) can overwrite or not (default true) */
 httpOnly: true, /** (boolean) httpOnly or not (default true) */
 signed: true, /** (boolean) signed or not (default true) */
 rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};
app.use(session(CONFIG, app));
// app.use(ctx => {
//     // ignore favicon 
//     if (ctx.path === '/favicon.ico') return;
   
//     let n = ctx.session.views || 0;
//     ctx.session.views = ++n;
//     ctx.session.signed = true;
//     ctx.body = ctx.session.signed;
// });

app.use(rest.restify());
/** 中间件的注册顺序很重要！！*/
app.use(async (ctx, next) => {
    console.log(`处理 方法：${ctx.request.method} url：${ctx.request.url}`);
    await next();
});

app.use(controller());
//url以pages开头，则去找pages目录下的静态文件
app.use(staticFiles('/pages/', __dirname + '/pages'));


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