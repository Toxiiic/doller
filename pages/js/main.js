

const vm = new Vue({
    el: '#app',
    data: {
        userinfo: null,
        books: [],
        types: null,
        records: null,

        remainder: 765,
        // books: [
        //     {
        //         id: 1,
        //         name: '布老公大账本',
        //         cover: ''
        //     }
        // ],
        types: [
            {
                id: 1,
                name: '吃饭',
                color: '#F6A623'
            },
            {
                id: 2,
                name: '理财账本',
                color: '#D0011B'
            },
            {
                id: 3,
                name: '宝宝账本',
                color: '#9013FE'
            },
            {
                id: 4,
                name: '衣服',
                color: '#E61395'
            },
            {
                id: 5,
                name: '家居',
                color: '#7ED321'
            }
        ],
        input: {
            bookId: 3, //放在这里是想让用户传到后台
            typeId: 1,
            amount: null,
            remark: null
        },
        //有些变化：1.year，month，day全部分开了；2.type和color都由type id获取
        records: [
            {
                // month: '2017/10',
                year: '2017',
                month: '10',
                out: 1208,
                in: 6000,
                dayRecords: [{
                    // date: '10-14',
                    day: '14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            typeId: 5,
                            color: '#F6A623'
                        }, {
                            amount: 12,
                            typeId: 4,
                            color: '#D0011B'
                        }]
                }]
            }
        ]
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
            vm.input.bookId = vm.books[2].id;

            //types信息（当前打开book的所有types）
            axios.get(`/api/types/${vm.input.bookId}`).then(function(response) {
                vm.types = response.data;
                vm.input.typeId = vm.types[0].id;
            }).catch(function(error) {
                console.log(`${error}`);
            });
            //records信息（当前打开book的所有records）
            axios.get(`/api/records/${vm.input.bookId}`).then(function(response) {
                console.log(response.data);
                //把一条条的数据转换成可以绑定的树形格式
                vm.records = getGoodRecords(response.data);
            }).catch(function(error) {
                console.log(`${error}`);
            });

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
            return vm.types.find((typeObj) => {
                return typeObj.id == id;
            })[key];
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
