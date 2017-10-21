
const model = require('../model');

const User = model.user;

module.exports = {
    login: async (name = '', pwd = '', session) => {

        let result = await User.findAll({
            where: {
                name : name
            }
        });
        
        if (result.length > 0) {
            if(result[0].pwd == pwd) {
                //用于判断是否登陆
                session.loggedIn = true;
                //用于得到当前用户
                //TODO 应该也要保存加密后的密码
                session.userId = result[0].id;
                return {success: true};
            } else {
                return {success:false, err:'密码不正确呀'};
            }
        } else {
            return {success:false, err:'用户不存在呀'};
        }
    },

    getCurUserInfo: async (userId) => {
        let userInfoAll = await User.findById(userId);
        let userInfo = {};
        //解构赋值风骚使用
        ({name: userInfo.name, head: userInfo.head} = userInfoAll);
        return userInfo;
    }
};