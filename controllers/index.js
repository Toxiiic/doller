const fs = require('mz/fs');
const path = require('path');
const services = require('../services');


module.exports = {
    'GET /': async (ctx, next) => {
        let root = path.resolve(__dirname, '..');
        //TODO 应该先判断是否登陆
        var html = await fs.readFile(root+'/pages/html/login.html');
    
        ctx.response.type = 'text/html; charset=utf-8';
        ctx.response.body = html;
        // const userSvc = services.userSvc;
        // var html = await userSvc.getProducts();
    }
}