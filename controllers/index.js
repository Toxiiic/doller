let fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>index页～～～</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
};

let fn_signin = async (ctx, next) => {
    ctx.response.body = ctx.request.body;
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}