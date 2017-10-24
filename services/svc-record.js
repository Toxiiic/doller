
const model = require('../model');
const Record = model.record;
const Book = model.book;
const Type = model.type;

module.exports = {
    addRecord: async (body) => {
        console.log(body);

        //Add
        let record = await Record.create({
            book_id: body.bookId,
            type_id: body.typeId,
            amount: body.amount,
            remark: body.remark,
            date: new Date()
        });

        //Logic
        let type = await Type.findAll({
            where: {
                id: body.typeId
            }
        });
        let book = await Book.findAll({
            where: {
                id: body.bookId
            }
        });

        //给对应的book的reminder增减
        let flag = type[0].is_in ? 1 : -1;
        book[0].reminder += flag * body.amount;

        await book[0].save();
        
        return true;
    },
    getRecords: async (bookId) => {
        let records = await Record.findAll({
            where: {
                book_id: bookId
            },
            order: [['date', 'DESC']]
        });

        // let aggr = await Record.findAll({
        //     attributes: [
        //         'sum',
        //         [
        //             Sequelize.fn('SUM', Sequelize.col('amount')),
        //             'sum'
        //         ]
        //     ],
        //     group: 'date',
        //     raw: true
        // });
        // let aggr = await Record.aggregate('date', Record.sum, {});


        return records;
    },
};