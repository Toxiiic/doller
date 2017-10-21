
const model = require('../model');
const Book = model.book;

module.exports = {
    getBooksInfo: async (userId) => {

        let books = await Book.findAll({
            where: {
                user_id: userId
            }
        });
        return books;
    },

};