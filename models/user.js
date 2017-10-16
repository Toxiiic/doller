const db = require('../db');

module.exports = db.defineModel('user', {
    name: db.STRING(20),
    pwd: db.STRING(20),
    head: {
        type: db.STRING(50),
        allowNull: true
    }
});