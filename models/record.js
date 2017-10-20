const db = require('../db');

module.exports = db.defineModel('record', {
    book_id: db.INTEGER,
    type_id: db.INTEGER,
    date: db.DATE,
    amount: db.INTEGER,
    remark: {
        type: db.STRING(50),
        allowNull: true
    },
    //这个应当根据type，查询得到。但是为了方便，写在了这里
    is_in: {
        type: db.BOOLEAN,
        allowNull: true
    }
});