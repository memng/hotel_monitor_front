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
                        defalut: 1,
                        menu_name: '主',
                        selection_id: 55,
                    },
                    {
                        type: 1,
                        defalut: 0,
                        menu_name: '客',
                        selection_id: 555,
                    },
                    {
                        type: 1,
                        defalut: 0,
                        menu_name: '和',
                        selection_id: 5555,
                    },
                    {
                        type: 2,
                        defalut: 0,
                        menu_name: '欧',
                        sid: 55556,
                    },
                    {
                        type: 3,
                        defalut: 0,
                        menu_name: '北',
                        sid: 55555,
                    },
                ],
                message: 'test information'
            });
        }
    }
]
