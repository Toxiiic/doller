var config = {
    db: {
        database: 'trial',
        username: 'root',
        password: '8724jiao',
        host: 'localhost',
        port: 3306
    }
    , session: {
        maxAge: 86400000 * 180 //180天
    }
    , app: {
        port: 3000 //app的端口号
    }
}

module.exports = config;