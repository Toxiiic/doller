
const model = require('../model');

const User = model.user;



var id = 0;

function nextId() {
    id++;
    return 'p' + id;
}

function Product(name, manufacturer, price) {
    this.id = nextId();
    this.name = name;
    this.manufacturer = manufacturer;
    this.price = price;
}

var products = [
    new Product('iPhone 7', 'Apple', 6800),
    new Product('ThinkPad T440', 'Lenovo', 5999),
    new Product('LBP2900', 'Canon', 1099)
];

module.exports = {
    login: async (name = '', pwd = '') => {

        let result = await User.findAll({
            where: {
                name : name
            }
        });
        
        if (result.length > 0) {
            if(result[0].pwd == pwd) {
                return {success: true};
            } else {
                return {success:false, err:'密码不正确呀'};
            }
        } else {
            return {success:false, err:'用户不存在呀'};
        }
    },

    getProducts: async () => {
        // var user = await User.create({
        //     name: '呃呃呃没有灯光',
        //     pwd: '123456'
        // });

        let users = await User.findAll();
        // console.log(`1 ${JSON.stringify(users)}`);
        return JSON.stringify(users);
    },

    getProduct: (id) => {
        var i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                return products[i];
            }
        }
        return null;
    },

    createProduct: (name, manufacturer, price) => {
        var p = new Product(name, manufacturer, price);
        products.push(p);
        return p;
    },

    deleteProduct: (id) => {
        var
            index = -1,
            i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            // remove products[index]:
            return products.splice(index, 1)[0];
        }
        return null;
    }
};