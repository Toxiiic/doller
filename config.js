
//开发环境配置
const devConfig = './config-dev.js';
//生产环境配置
const prodConfig = './config-prod.js';
//
const overrideConfig = './config-override.js';

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'production') {
    console.log(`Load ${prodConfig}...`);
    config = require(prodConfig);
} else {
    console.log(`Load ${devConfig}...`);
    config = require(devConfig);
    try {
        //config-override.js的话，就会先使用它
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;