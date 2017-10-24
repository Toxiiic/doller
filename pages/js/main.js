

const vm = new Vue({
    el: '#app',
    data: {
        userinfo: null,
        books: [],
        types: null,
        records: null,
        remainder: 765,
        types: [],
        input: {
            bookId: null, /* 这个book不可以直接修改，必须调用changeBook() */
            typeId: 1,
            amount: null,
            remark: null
        },
        //有些变化：1.year，month，day全部分开了；2.type和color都由type id获取
        records: []
    },
    mounted: function () {
        let vm = this;
        // axios.get('/api/users').then(function(response) {
        //     console.log(response.data.products);
        // }).catch(function(error) {
        //     console.log(`${error}`);
        // });
        
        //user信息（当前登陆的一个user）
        axios.get('/api/userinfo').then(function(response) {
            vm.userinfo = response.data;
        }).catch(function(error) {
            console.log(`${error}`);
        });
        //books信息（当前用户的所有book）
        axios.get('/api/books').then(function(response) {
            vm.books = response.data;
            //页面加载完成默认打开第一个book
            // vm.input.bookId = vm.books[0].id;
            vm.changeBook(vm.books[0].id);

            

        }).catch(function(error) {
            console.log(`${error}`);
        });
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
            axios.post('/api/record/add', this.input).then(function (result) {
                if(result.data.result) {
                    vm.clearInput();
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
        changeBook: function(bookId) {
            //先把input里的bookId换掉
            vm.input.bookId = bookId;
            //请求这个book的信息
            //types信息（当前打开book的所有types）
            axios.get(`/api/types/${bookId}`).then(function(response) {
                vm.types = response.data;
                vm.input.typeId = vm.types[0].id;
            }).catch(function(error) {
                console.log(`${error}`);
            });
            //records信息（当前打开book的所有records）
            axios.get(`/api/records/${bookId}`).then(function(response) {
                console.log(response.data);
                //把一条条的数据转换成可以绑定的树形格式
                vm.records = getGoodRecords(response.data);
            }).catch(function(error) {
                console.log(`${error}`);
            });
        }
    },
    computed: {
        noAmount: function() {
            return this.input.amount == '' || this.input.amount == null;
        },
        curBook: function() {
            return this.books.find((book) => {
                return book.id == this.input.bookId;
            });
            // for(let book of this.books) {
            //     if(book.id == this.input.bookId) {
            //         return book;
            //     }
            // }
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
                day.out = daySum;
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
            typeId: rawRecord.type_id
            // color: rawRecord.color,
        };
        lastMonthDayRecords[lastMonthDayRecords.length-1].detailRecords.push(detail);
        
        //得到这条记录的正负，并做和
        flag = vm.getByTypeId('is_in', rawRecord.type_id) == null ? -1 : 1;
        daySum += rawRecord.amount * flag;
    }
    //将和写入天对象
    day.out = daySum;


    return records;
}
