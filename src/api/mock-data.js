export default [
    {
        url: '/api/doLogin',
        method: 'post',
        response: () => {
            return {
                ret: 200,
                data: {
                    user_info: {
                        user_id: 1,
                        group_id: 2,
                        token: '54fdsf'
                    },
                    config: {}
                },
                message: 'test infomation'
            };
        }
    }
]
