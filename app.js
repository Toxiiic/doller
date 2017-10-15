//返回类
const Koa = require('koa');
//返回函数
const getKoaRouter = require('koa-router');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const router = getKoaRouter();

/** 中间件的注册顺序很重要！！*/
app.use(async (ctx, next) => {
    console.log(`处理 方法：${ctx.request.method} url：${ctx.request.url}`);
    await next();
});
app.use(bodyparser());
app.use(router.routes());


router.get('/hello/:name', async (ctx, next) => {
    let name = ctx.params.name;
    ctx.response.body = `Oh year, ${name}`;
});
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>index页～～～</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});
router.post('/signin', async (ctx, next) => {
    ctx.response.body = ctx.request.body;
});

app.listen(3000);
console.log('在3000端口监听啦');