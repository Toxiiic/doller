const db = require('../db');

module.exports = db.defineModel('type', {
    book_id: db.INTEGER,
    name: db.STRING(20),
    remark: {
        type: db.STRING(100),
        allowNull: true
    },
    to_book_id: {
        type: db.INTEGER,
        allowNull: true
    },
    color: {
        type: db.STRING(7),
        allowNull: true
    },
    is_in: {
        type: db.BOOLEAN,
        allowNull: true
    }
});