
const Record = require('../model').record;

module.exports = {
    addRecord: async (body) => {
        console.log(body);

        let record = await Record.create({
            book_id: body.bookId,
            type_id: body.typeId,
            amount: body.amount,
            remark: body.remark,
            date: new Date()
        });
        console.log(record);
        // let result = await User.findAll({
        //     where: {
        //         name : name
        //     }
        // });
        
        // if (result.length > 0) {
        //     if(result[0].pwd == pwd) {
        //         return {success: true};
        //     } else {
        //         return {success:false, err:'密码不正确呀'};
        //     }
        // } else {
        //     return {success:false, err:'用户不存在呀'};
        // }
    },

};