const services = require('../services');
const APIError = require('../rest').APIError;

const recordSvc = services.recordSvc;

module.exports = {
    'GET /api/records/:bookId': async (ctx, next) => {
        let records = await recordSvc.getRecords(ctx.params.bookId);
        ctx.rest(records);
    },
    'POST /api/record/add': async (ctx, next) => {
        
        ctx.rest({
            result: await recordSvc.addRecord(ctx.request.body)
        }); 
    }
};