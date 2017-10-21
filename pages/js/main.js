

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
        records: [
            {
                month: '2017/10',
                out: 1208,
                in: 6000,
                dayRecords: [{
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#D0011B'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#E61395'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }, {
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }, {
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }]
            }, {
                month: '2017/10',
                out: 1208,
                in: 6000,
                dayRecords: [{
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#D0011B'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#E61395'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }, {
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }, {
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }]
            }, {
                month: '2017/10',
                out: 1208,
                in: 6000,
                dayRecords: [{
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#D0011B'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#E61395'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }, {
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }, {
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }]
            }, {
                month: '2017/10',
                out: 1208,
                in: 6000,
                dayRecords: [{
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#D0011B'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#E61395'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }, {
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }, {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }, {
                    date: '10-14',
                    out: 16,
                    remainder: 365,
                    detailRecords: [
                        {
                            amount: 12,
                            type: '吃饭',
                            color: '#F6A623'
                        }]
                }]
            },
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
            vm.input.bookId = vm.books[0].id;

            //types信息（当前打开book的所有types）
            axios.get(`/api/types/${vm.input.bookId}`).then(function(response) {
                vm.types = response.data;
            }).catch(function(error) {
                console.log(`${error}`);
            });
            //records信息（当前打开book的所有records）
            axios.get(`/api/records/${vm.input.bookId}`).then(function(response) {
                console.log(response.data);
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
        }
    },
    computed: {
        noAmount: function() {
            return this.input.amount == '' || this.input.amount == null;
        },
        curBook: function() {
            for(let book of this.books) {
                if(book.id == this.input.bookId) {
                    return book;
                }
            }
        }
    }
});
