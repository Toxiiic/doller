const fs = require('mz/fs');
const path = require('path');
const services = require('../services');

module.exports = {
    'GET /': async (ctx, next) => {
        let root = path.resolve(__dirname, '..');
        let html;
        //判断是否登陆
        if(ctx.session.loggedIn != true) {
            html = await fs.readFile(root+'/pages/html/login.html');
        } else {
            //如果已经登陆了
            html = await fs.readFile(root+'/pages/html/main.html');
        }
    
        ctx.response.type = 'text/html; charset=utf-8';
        ctx.response.body = html;
    }
}