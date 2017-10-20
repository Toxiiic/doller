const services = require('../services');
const APIError = require('../rest').APIError;

const recordSvc = services.recordSvc;

module.exports = {
    'POST /api/record/add': async (ctx, next) => {
        
        ctx.rest({
            result: await recordSvc.addRecord(ctx.request.body)
        }); 
    }

};