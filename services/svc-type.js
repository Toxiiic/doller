
const model = require('../model');
const Type = model.type;

module.exports = {
    getTypes: async (bookId) => {

        let types = await Type.findAll({
            where: {
                book_id: bookId
            }
        });
        return types;
    },

};