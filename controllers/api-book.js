const services = require('../services');
const APIError = require('../rest').APIError;

const bookSvc = services.bookSvc;

module.exports = {

    'GET /api/books': async (ctx, next) => {
        let books = await bookSvc.getBooksInfo(ctx.session.userId);
        ctx.rest(books);
    },
    'POST /api/books/edit': async (ctx, next) => {
        ctx.rest(await bookSvc.modifyBook(ctx.request.body));
    }
};