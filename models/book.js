const db = require('../db');

module.exports = db.defineModel('book', {
    user_id: db.INTEGER,
    name: db.STRING(20),
    remainder: db.FLOAT,
    cover: {
        type: db.STRING(50),
        allowNull: true
    }
});