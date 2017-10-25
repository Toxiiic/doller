
const model = require('../model');
const Type = model.type;

const typeSvc = {
    getTypes: async (bookId) => {

        let types = await Type.findAll({
            where: {
                book_id: bookId
            }
        });
        return types;
    },
    /**
     * 先根据id是否为空判断是增加还是修改，然后掉用单纯的操作
    */
    processEdit: async (bookId, typeInput) => {
        if(typeInput.id == null) {
            await typeSvc.addType(bookId, typeInput);
        } else {
            await typeSvc.modifyType(typeInput);
        }
        return true;
    },
    addType: async (bookId, typeInput) => {
        await Type.create({
            book_id: bookId,
            name: typeInput.name,
            color: typeInput.color,
            remark: typeInput.remark,
            is_in: typeInput.isIn
        });
        return true;
    },
    modifyType: async (typeInput) => {
        let type = await Type.findById(typeInput.id);
        type.name = typeInput.name,
        type.color = typeInput.color,
        type.remark = typeInput.remark,
        type.is_in = typeInput.isIn
        await type.save();

        return true;
    }
};

module.exports = typeSvc;