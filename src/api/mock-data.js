import Mock from 'mockjs';
export default [
    {
        url: '/api/doLogin',
        method: 'post',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: {
                    user_info: {
                        'user_id|1-100': 1,
                        group_id: 1,
                    },
                    token: '@guid',
                    config: [
                        {
                            id: 1,
                            start_date: '2023-11-01',
                            end_date: '2024-05-19',
                            default: 0,
                            allow_group_id: [3]
                        },
                        {
                            id: 2,
                            start_date: '2024-05-19',
                            end_date: '2024-06-19',
                            default: 1,
                            allow_group_id: [1, 2, 3]
                        },
                        {
                            id: 3,
                            start_date: '2024-05-19',
                            end_date: 'live',
                            default: 0,
                            allow_group_id: [2, 3]
                        }
                    ]
                },
                message: 'test information'
            });
        }
    },
    {
        url: '/api/refreshToken',
        method: 'post',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: {
                    token: '@guid',
                },
                message: 'test information'
            });
        }
    },
    {
        url: '/api/refreshConfig',
        method: 'post',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: {
                    config: [
                        {
                            id: 1,
                            start_date: '2023-11-01',
                            end_date: '2024-05-19',
                            default: 0,
                            allow_group_id: [3]
                        },
                        {
                            id: 2,
                            start_date: '2024-05-19',
                            end_date: '2024-06-19',
                            default: 1,
                            allow_group_id: [1, 2, 3]
                        },
                        {
                            id: 3,
                            start_date: '2024-05-19',
                            end_date: 'live',
                            default: 0,
                            allow_group_id: [2, 3]
                        }
                    ]
                },
                message: 'test information'
            });
        }
    },
    {
        url: '/api/getEventByDate',
        method: 'get',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: [
                    {
                        compition_name: '意甲',
                        host_name: '尤文图斯',
                        guest_name: '蒙扎',
                        compition_time: '2024-05-31 18:00',
                        market_id: '1.229143041'
                    },
                    {
                        compition_name: '英超',
                        host_name: '尤文图斯',
                        guest_name: '蒙扎',
                        compition_time: '2024-05-31 18:00',
                        market_id: '1.229143042'
                    },
                    {
                        compition_name: '英超',
                        host_name: '尤文图斯',
                        guest_name: '蒙扎',
                        compition_time: '2024-05-31 18:00',
                        market_id: '1.229143043'
                    },
                ],
                message: 'test information'
            });
        }
    },
    {
        url: '/api/getMarketMenu',
        method: 'get',
        response: () => {
            return Mock.mock({
                ret: 200,
                // 1 必发数据 2欧赔数据 3北单数据
                // default是否默认菜单 1
                data: [
                    {
                        type: 1,
                        default: 1,
                        menu_name: '主',
                        selection_id: 55,
                    },
                    {
                        type: 1,
                        default: 0,
                        menu_name: '客',
                        selection_id: 555,
                    },
                    {
                        type: 1,
                        default: 0,
                        menu_name: '和',
                        selection_id: 5555,
                    },
                    {
                        type: 2,
                        default: 0,
                        menu_name: '欧',
                        sid: 55556,
                    },
                    {
                        type: 3,
                        default: 0,
                        menu_name: '北',
                        sid: 55555,
                    },
                ],
                message: 'test information'
            });
        }
    },
    {
        url: '/api/getRawData',
        method: 'get',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: [
                    {
                        "datetime": "05/31 01:02:57",
                        "price": "2.30",
                        "volume": "7.32",
                        "property": 3,
                        "symbol": 1,
                        "raw_timestamp": 1717088577000
                    },
                    {
                        "datetime": "05/31 15:04:48",
                        "price": "2.24",
                        "volume": "21.91",
                        "property": 1,
                        "symbol": 1,
                        "raw_timestamp": 1717139088000
                    },
                    {
                        "datetime": "05/31 15:04:48",
                        "price": "2.30",
                        "volume": "11.04",
                        "property": 2,
                        "symbol": 1,
                        "raw_timestamp": 1717139088001
                    },
                    {
                        "datetime": "06/01 05:02:53",
                        "price": "2.36",
                        "volume": "180.82",
                        "property": 2,
                        "symbol": 1,
                        "raw_timestamp": 1717189373000
                    },
                    {
                        "datetime": "06/01 05:04:54",
                        "price": "2.42",
                        "volume": "420.30",
                        "property": 2,
                        "symbol": 1,
                        "raw_timestamp": 1717189494000
                    },
                    {
                        "datetime": "06/01 05:04:58",
                        "price": "2.40",
                        "volume": "181.44",
                        "property": 1,
                        "symbol": 1,
                        "raw_timestamp": 1717189498000
                    },
                    {
                        "datetime": "06/01 05:05:24",
                        "price": "2.38",
                        "volume": "926.89",
                        "property": 1,
                        "symbol": 1,
                        "raw_timestamp": 1717189524000
                    },
                    {
                        "datetime": "06/01 05:05:39",
                        "price": "2.38",
                        "volume": "0.24",
                        "property": 3,
                        "symbol": 1,
                        "raw_timestamp": 1717189539000
                    },
                    {
                        "datetime": "06/01 05:05:39",
                        "price": "2.48",
                        "volume": "64.74",
                        "property": 2,
                        "symbol": 1,
                        "raw_timestamp": 1717189539001
                    },
                    {
                        "datetime": "06/01 05:05:40",
                        "price": "2.62",
                        "volume": "54.08",
                        "property": 2,
                        "symbol": 1,
                        "raw_timestamp": 1717189540000
                    },
                    {
                        "datetime": "06/01 05:05:45",
                        "price": "2.50",
                        "volume": "432.89",
                        "property": 1,
                        "symbol": 1,
                        "raw_timestamp": 1717189545000
                    },
                    {
                        "datetime": "06/01 05:05:59",
                        "price": "2.48",
                        "volume": "40.57",
                        "property": 1,
                        "symbol": 1,
                        "raw_timestamp": 1717189559000
                    },
                    {
                        "datetime": "06/01 05:06:01",
                        "price": "2.50",
                        "volume": "14.06",
                        "property": 2,
                        "symbol": 1,
                        "raw_timestamp": 1717189561000
                    },
                    {
                        "datetime": "06/01 05:06:06",
                        "price": "2.46",
                        "volume": "325.50",
                        "property": 1,
                        "symbol": 1,
                        "raw_timestamp": 1717189566000
                    },
                    {
                        "datetime": "06/01 05:06:42",
                        "price": "2.40",
                        "volume": "1563.48",
                        "property": 1,
                        "symbol": 1,
                        "raw_timestamp": 1717189602000
                    },
                    {
                        "datetime": "06/01 05:10:57",
                        "price": "2.44",
                        "volume": "25.60",
                        "property": 2,
                        "symbol": 1,
                        "raw_timestamp": 1717189857000
                    },
                    {
                        "datetime": "06/01 05:13:34",
                        "price": "2.42",
                        "volume": "548.44",
                        "property": 1,
                        "symbol": 1,
                        "raw_timestamp": 1717190014000
                    },
                    {
                        "datetime": "06/01 05:15:23",
                        "price": "2.42",
                        "volume": "0.26",
                        "property": 3,
                        "symbol": 1,
                        "raw_timestamp": 1717190123000
                    },
                    {
                        "datetime": "06/01 05:15:23",
                        "price": "2.44",
                        "volume": "27.60",
                        "property": 2,
                        "symbol": 1,
                        "raw_timestamp": 1717190123001
                    },
                   
                ],
                message: 'test information'
            });
        }
    },
    {
        url: '/api/getRawStat',
        method: 'get',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: {
                    "between0_100_sum": {
                        "pure_buy": "537.63",
                        "pure_sell": "811.95",
                        "pure_buy_self": "2309.49"
                    },
                    "between100_1000_sum": {
                        "pure_buy": "6626.10",
                        "pure_sell": "1497.54",
                        "pure_buy_self": null
                    },
                    "between1000_2000_sum": {
                        "pure_buy": "2428.48",
                        "pure_sell": null,
                        "pure_buy_self": null
                    },
                    "all_between0_1000_sum": {
                        "pure_buy": "7163.73",
                        "pure_sell": "2309.49",
                        "pure_buy_self": "2309.49"
                    },
                    "all_between0_2000_sum": {
                        "pure_buy": "9592.21",
                        "pure_sell": "2309.49",
                        "pure_buy_self": "2309.49"
                    },
                    "between0_100_count": {
                        "pure_buy_self": 35,
                        "pure_buy": 16,
                        "pure_sell": 25
                    },
                    "between100_1000_count": {
                        "pure_buy_self": 0,
                        "pure_buy": 21,
                        "pure_sell": 10
                    },
                    "between1000_2000_count": {
                        "pure_buy_self": 0,
                        "pure_buy": 2,
                        "pure_sell": 0
                    },
                    "all_between0_1000_count": {
                        "pure_buy_self": 35,
                        "pure_buy": 37,
                        "pure_sell": 35
                    },
                    "all_between0_2000_count": {
                        "pure_buy_self": 35,
                        "pure_buy": 39,
                        "pure_sell": 35
                    }
                },
                message: 'test information'
            });
        }
    },
    {
        url: '/api/getKLine',
        method: 'get',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: [
                    {
                        "id":188968,
                        "market_id":"1.229407391",
                        "selection_id":215817,
                        "begin_time":"2024-06-01 12:00:00",
                        "open_price":"1.51",
                        "close_price":"1.51",
                        "high_price":null,
                        "low_price":null,
                        "quality":"0.0000",
                        "ask_list":"[[1.51,48.3],[1.52,525.01],[1.53,934.55]]",
                        "bid_list":"[[1.5,2392.21],[1.49,2759.3],[1.48,2963.47]]",
                        "last_trade_time_raw":1717213861185,
                        "last_trade_time":"2024-06-01 11:51:01",
                        "last_trade_price":"1.51",
                        "market_total_quality":"45852.8300",
                        "create_time":"2024-06-01 12:00:02"
                    },
                    {
                        "id":189046,
                        "market_id":"1.229407391",
                        "selection_id":215817,
                        "begin_time":"2024-06-01 12:13:00",
                        "open_price":"1.51",
                        "close_price":"1.51",
                        "high_price":null,
                        "low_price":null,
                        "quality":"0.0000",
                        "ask_list":"[[1.51,48.3],[1.52,578.06],[1.53,1089.78]]",
                        "bid_list":"[[1.5,2452.21],[1.49,2897.55],[1.48,3167.35]]",
                        "last_trade_time_raw":1717215085242,
                        "last_trade_time":"2024-06-01 12:11:25",
                        "last_trade_price":"1.51",
                        "market_total_quality":"46120.3000",
                        "create_time":"2024-06-01 12:13:01"
                    }
                ],
                message: 'test information'
            });
        }
    },
    {
        url: '/api/getAmountStat',
        method: 'get',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: {
                    selection_name: '尤文图斯',
                    amount_stat: [
                        {
                            selection_name: '尤文',
                            amount: 192.5,
                            amount_percent: 80,
                            pure_amount: 182.5,
                            pure_amount_percent: 70,
                        },
                        {
                            selection_name: '蒙扎',
                            amount: 192.5,
                            amount_percent: 10,
                            pure_amount: 182.5,
                            pure_amount_percent: 70,
                        },
                        {
                            selection_name: '和局',
                            amount: 192.5,
                            amount_percent: 10,
                            pure_amount: 182.5,
                            pure_amount_percent: 70,
                        },
                    ]
                },
                message: 'test information'
            });
        }
    },
    {
        url: '/api/getKLineGrowthStat',
        method: 'get',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: {
                    selection_name: '尤文图斯',
                    growth_stat: [
                        {
                            "s_trends_graph_id": 193870,
                            "begin_time": "06/02 01:37:00",
                            "direction_type": 2,
                            "price": "1.49",
                            "grow_quantity": "3321.5400",
                            "symbol": 1
                        },
                        {
                            "s_trends_graph_id": 194992,
                            "begin_time": "06/02 04:49:00",
                            "direction_type": 2,
                            "price": "1.51",
                            "grow_quantity": "2040.5200",
                            "symbol": 1
                        }
                    ]
                },
                message: 'test information'
            });
        }
    },
    {
        url: '/api/getOdds',
        method: 'get',
        response: () => {
            return Mock.mock({
                ret: 200,
                //main 排在第一个
                data: [ 
                    {
                        info: 'Name ex. Man City',
                        data: [
                            {
                                create_time: '2024-05-28 01:37:00',
                                avg_sp: 2.4
                            },
                            {
                                create_time: '2024-05-28 01:38:00',
                                avg_sp: 2.3
                            },
                        ]
                    },
                    {
                        info: 'Name ex. draw',
                        data: [
                            {
                                create_time: '2024-05-28 01:38:00',
                                avg_sp: 2.4
                            },
                            {
                                create_time: '2024-05-28 01:38:00',
                                avg_sp: 2.3
                            },
                        ]
                    },
                    {
                        info: 'Name ex. Man unit',
                        data: [
                            {
                                create_time: '2024-05-28 01:38:00',
                                avg_sp: 2.4
                            },
                            {
                                create_time: '2024-05-28 01:38:00',
                                avg_sp: 2.3
                            },
                        ]
                    },
                ],
                message: 'test information'
            });
        }
    },
    {
        url: '/api/getBd',
        method: 'get',
        response: () => {
            return Mock.mock({
                ret: 200,
                data: {
                    show_other: true,
                    main: {
                        info: 'Name ex. Man City',
                        data: [
                            {
                                create_time: '2024-05-28 01:38:00',
                                Ladbrokes: 67,
                                William_Hill: 75,
                                bd: 76
                            },
                            {
                                create_time: '2024-05-28 01:38:00',
                                Ladbrokes: 67,
                                William_Hill: 75,
                                bd: 76
                            },
                        ]
                    },
                    other:[
                        {
                            info: 'Name ex. draw',
                            data: [
                                {
                                    create_time: '2024-05-28 01:38:00',
                                    Ladbrokes: 67,
                                    William_Hill: 75,
                                    bd: 76
                                },
                                {
                                    create_time: '2024-05-28 01:38:00',
                                    Ladbrokes: 67,
                                    William_Hill: 75,
                                    bd: 76
                                },
                            ]
                        },
                        {
                            info: 'Name ex. Man unit',
                            data: [
                                {
                                    create_time: '2024-05-28 01:38:00',
                                    Ladbrokes: 67,
                                    William_Hill: 75,
                                    bd: 76
                                },
                                {
                                    create_time: '2024-05-28 01:38:00',
                                    Ladbrokes: 67,
                                    William_Hill: 75,
                                    bd: 76
                                },
                            ]
                        },
                    ]
                },
                message: 'test information'
            });
        }
    },
]