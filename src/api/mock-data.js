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
    }
]
