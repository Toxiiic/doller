const services = require('../services');
const APIError = require('../rest').APIError;

const userSvc = services.userSvc;

module.exports = {
    'GET /api/userinfo': async (ctx, next) => {
        let userInfo = await userSvc.getCurUserInfo(ctx.session.userId);
        ctx.rest(userInfo);
    },

};