
const vm = new Vue({
    el: '#app',
    data: {
        userinfo: null,
        books: [],
        types: null,
        records: null,
        currentBookId: null, //当前选择的bookId /* 这个book不可以直接修改，必须调用openBook() */
        input: {
            //bookId: null, 
            typeId: 1,
            amount: null,
            remark: null
        },
        typesInput: {
            name: null,
            color: null,
            remark: null,
            isIn: null,
        },
        bookInput: {
            name: null,
            remainder: null,
            remark: null
        }
        //有些变化：1.year，month，day全部分开了；2.type和color都由type id获取
    },
    mounted: function () {
        let vm = this;
        // this.clearTypesInput(this);
        //user信息（当前登陆的一个user）
        axios.get('/api/userinfo').then(function(response) {
            vm.userinfo = response.data;
        }).catch(function(error) {
            console.log(`${error}`);
        });

        vm.loadAllBooksAndOpen();
        
    },
    updated: function() {
        //TODO 执行起来蛮冗余
        $('[data-toggle="tooltip"]').tooltip()
    },
    methods: {
        chooseType: function (typeId) {
            this.input.typeId = typeId;
        },
        submitRecord: function () {
            //计算属性能在js中使用吗
            if(this.noAmount) {
                return;
            }
            axios.post(`/api/record/add/${this.currentBookId}`, this.input).then(function (result) {
                if(result.data.result) {
                    // vm.clearInput();
                    vm.reloadBook();
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        //传入typeId是为了判断是否当前选中
        typeStyle: function(color, typeId) {
            if(typeId == this.input.typeId) {
                return {
                    borderColor: color,
                    color: 'white',
                    background: color,
                    boxShadow: '0 0 0 3px rgba(208, 1, 27, 0.15)'
                }
            } else {
                return {
                    borderColor: color,
                    color: color
                }
            }
        },
        clearInput: function() {
            this.input.amount = null;
            this.input.remark = null;
        },
        /**
         * 传入属性名，得到id对应的type的属性值
         */
        getByTypeId: function(key, id) {
            return vm.types.find((obj) => {
                return obj.id == id;
            })[key];
        },
        getByBookId: function(key, id) {
            return vm.books.find((obj) => {
                return obj.id == id;
            })[key];
        },
        /**
         * 
         */
        loadAllBooksAndOpen: (bookId) => {
            //books信息（当前用户的所有book）
            axios.get('/api/books').then(function(response) {
                vm.books = response.data;
                //页面加载完成默认打开第一个book
                if(bookId == null) {
                    bookId = vm.books[0].id;
                }
                vm.openBook(bookId);
            }).catch(function(error) {
                console.log(`${error}`);
            });
        },
        openBook: function(bookId) {
            //先把input里的bookId换掉
            vm.currentBookId = bookId;
            //请求这个book的信息
            vm.loadTypes(bookId);
            vm.loadRecords(bookId);

            vm.fillBookInput();
        },
        reloadBook: () => {
            vm.openBook(vm.currentBookId);
        },
        /**
         * 
         */
        //TODO 应该让依赖（bookId）通过参数传入，还是应该直接使用data中的公共数据？
        loadTypes: (bookId) => {
            //types信息（当前打开book的所有types）
            axios.get(`/api/types/${bookId}`).then(function(response) {
                vm.types = response.data;
                vm.input.typeId = vm.types[0].id;
            }).catch(function(error) {
                console.log(`${error}`);
            });
        },
        loadRecords: (bookId) => {
            //records信息（当前打开book的所有records）
            axios.get(`/api/records/${bookId}`).then(function(response) {
                console.log(response.data);
                //把一条条的数据转换成可以绑定的树形格式
                vm.records = getGoodRecords(response.data);
            }).catch(function(error) {
                console.log(`${error}`);
            });
        },
        clearTypesInput: () => {
            vm.fillTypesInput({
                id: null,
                name: null,
                color: '#4e00ff',
                remark: null,
                isIn: false,
            });
        },
        fillTypesInput: (typeObj) => {
            vm.typesInput.id = typeObj.id;
            vm.typesInput.name = typeObj.name;
            vm.typesInput.color = typeObj.color;
            vm.typesInput.remark = typeObj.remark;
            vm.typesInput.isIn = typeObj.is_in;
        },
        submitTypeInput: () => {
            axios.post(`/api/types/edit/${vm.currentBookId}`, vm.typesInput).then(function (result) {
                if(result.data) {
                    vm.reloadBook();
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        fillBookInput: function() {
            vm.bookInput = {
                id: vm.curBook.id,
                name :vm.curBook.name,
                remainder: vm.curBook.remainder
            }
        },
        submitBookInput: function() {
            axios.post(`/api/books/edit`, vm.bookInput).then(function (result) {
                if(result.data) {
                    vm.loadAllBooksAndOpen();
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
    computed: {
        noAmount: function() {
            return this.input.amount == '' || this.input.amount == null;
        },
        curBook: function() {
            return this.books.find((book) => {
                return book.id == this.currentBookId;
            });
        }
    }
});



function getGoodRecords (rawRecords) {
    let records = [];
    let rawDate; //current rawRecord date obj
    let monthStr;
    let ifExistMonth, ifNextMonth, ifExistDay, ifNextDay;
    let lastMonthDayRecords;
    let daySum = 0;
    let flag = 1;
    // debugger
    for(let rawRecord of rawRecords) {
        rawDate = new Date(rawRecord.date);
        
        /**
         * 是否之前没有
         * 如果有的话是否是下个月
         */
        ifExistMonth = ifNextMonth = false;
        //1.是否之前有
        ifExistMonth = !!records.length;
        //2.如果之前有，是否是下个月
        if(ifExistMonth) {
            ifNextMonth = records[records.length-1].month != rawDate.getMonth()+1;
        }
        //如果之前没有，或者有但是这是下个月
        if(!ifExistMonth || ifNextMonth) {
            //如果之前有（即下月）
            if(ifExistMonth) {
                //TODO 把之前的加和放进之前month的数据中
                // month.amount = sum;
            }
            //创，写，推
            month = {
                year: rawDate.getFullYear(),
                month: rawDate.getMonth() + 1,
                dayRecords: []
            };
            records.push(month);
        }

        /**
         * 
        */
        ifExistDay = ifNextDay = false;
        //最后一个月的dayRecords
        lastMonthDayRecords = records[records.length-1].dayRecords;
        //1.是否之前没有
        ifExistDay = !!lastMonthDayRecords.length;
        //2.如果之前有，是否是下一天
        if(ifExistDay) {
            ifNextDay = lastMonthDayRecords[lastMonthDayRecords.length-1].day != rawDate.getDate();
        }
        //如果之前没有，或者有但是这是下一天
        if(!ifExistDay || ifNextDay) {
            //如果之前有（即下月）
            if(ifExistDay) {
                //TODO 把之前的加和放进之前day的数据中
                day.out = daySum.toFixed(2);
                daySum = 0;
            }
            //创，写，推
            day = {
                day: rawDate.getDate(),
                detailRecords: []
            };
            lastMonthDayRecords.push(day);
        }


        //创，写，推
        detail = {
            amount: rawRecord.amount,
            typeId: rawRecord.type_id,
            remark: rawRecord.remark
        };
        lastMonthDayRecords[lastMonthDayRecords.length-1].detailRecords.push(detail);
        
        //得到这条记录的正负，并做和
        flag = vm.getByTypeId('is_in', rawRecord.type_id) == null ? -1 : 1;
        daySum += rawRecord.amount * flag;
    }
    //将和写入天对象
    day.out = daySum.toFixed(2);


    return records;
}
