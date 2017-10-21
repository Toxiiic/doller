const services = require('../services');
const APIError = require('../rest').APIError;

const typeSvc = services.typeSvc;

module.exports = {
    'GET /api/types/:bookId': async (ctx, next) => {
        let types = await typeSvc.getTypes(ctx.params.bookId);
        ctx.rest(types);
    }
};