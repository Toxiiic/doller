const services = require('../services');
const APIError = require('../rest').APIError;

const userSvc = services.userSvc;

module.exports = {
    'GET /api/users': async (ctx, next) => {
        // products.getProducts().then(function(result) {
        //     ctx.rest({
        //         products: result
        //     });
        // });

        var result = await userSvc.getProducts();
        ctx.rest({
            products: result
        });
        console.log(result);
    },

    'POST /api/products': async (ctx, next) => {
        var p = userSvc.createProduct(ctx.request.body.name, ctx.request.body.manufacturer, parseFloat(ctx.request.body.price));
        ctx.rest(p);
    },

    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = userSvc.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
};