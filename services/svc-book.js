
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
    modifyBook: async (bookInput) => {
        let book = await Book.findById(bookInput.id);
        book.name = bookInput.name,
        book.remainder = bookInput.remainder,
        book.remark = bookInput.remark,
        await book.save();

        return true;
    }
};