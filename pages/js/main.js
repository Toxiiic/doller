

const vm = new Vue({
    el: '#app',
    data: {
        remainder: 765,
        books: [
            {
                id: 0,
                name: '布老公大账本',
                cover: ''
            }
        ],
        types: [
            {
                id: 0,
                name: '吃饭',
                color: '#F6A623'
            },
            {
                id: 1,
                name: '理财账本',
                color: '#D0011B'
            },
            {
                id: 2,
                name: '宝宝账本',
                color: '#9013FE'
            },
            {
                id: 3,
                name: '衣服',
                color: '#E61395'
            },
            {
                id: 4,
                name: '家居',
                color: '#7ED321'
            }
        ],
        input: {
            bookId: 0, //放在这里是想让用户传到后台
            typeId: 0,
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
        // axios.get('/api/users').then(function(response) {
        //     console.log(response.data.products);
        // }).catch(function(error) {
        //     console.log(`${error}`);
        // });
    },
    methods: {
        chooseType: function (typeId) {
            this.input.typeId = typeId;
        },
        submitRecord: function () {
            axios.post('/api/record/add', this.input).then(function (result) {
                console.log(result);
                this.clearInput();
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
        
    }
});
