const services = require('../services');
const APIError = require('../rest').APIError;

const typeSvc = services.typeSvc;

module.exports = {
    'GET /api/types/:bookId': async (ctx, next) => {
        let types = await typeSvc.getTypes(ctx.params.bookId);
        ctx.rest(types);
    },
    'POST /api/types/edit/:bookId': async (ctx, next) => {
        
        ctx.rest(await typeSvc.processEdit(ctx.params.bookId, ctx.request.body));
    }

};