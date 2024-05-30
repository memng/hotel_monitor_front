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
                        'group_id|1-10': 1,
                    },
                    token: '@guid',
                    'config|1-10': [
                        {
                            'id|1-10': 1,
                            start_date: '2023-11-01',
                            end_date: '2024-05-19',
                            default: 1,
                            allow_group_id: [1, 2, 3]
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
                    'config|1-10': [
                        {
                            'id|1-10': 1,
                            start_date: '2023-11-01',
                            end_date: '2024-05-19',
                            default: 1,
                            allow_group_id: [1, 2, 3]
                        }
                    ]
                },
                message: 'test information'
            });
        }
    }
]
