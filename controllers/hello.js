let fn_hello = async (ctx, next) => {
    let name = ctx.params.name;
    ctx.response.body = `Oh year, ${name}`;
};

module.exports = {
    'GET /hello/:name': fn_hello
}