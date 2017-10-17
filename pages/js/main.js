const vm = new Vue({
    el: '#app',
    data: {
        remainder: 765,
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
                id: 1,
                name: '宝宝账本',
                color: '#9013FE'
            },
            {
                id: 1,
                name: '衣服',
                color: '#E61395'
            },
            {
                id: 1,
                name: '家居',
                color: '#7ED321'
            }
        ],
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
    mounted: function() {
        axios.get('/api/products').then(function(response) {
            console.log(response.data.products);
        }).catch(function(error) {
            console.log(`${error}`);
        });
    }
});
