const services = require('../services');
const APIError = require('../rest').APIError;

const bookSvc = services.bookSvc;

module.exports = {

    'GET /api/books': async (ctx, next) => {
        let books = await bookSvc.getBooksInfo(ctx.session.userId);
        ctx.rest(books);
    }
};