import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import SessionStorageService from '../service/SessionStorageService';
import OpenHttpService from '@/service/OpenHttpService';
import IndexLayout from '@/views/index/IndexLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: 'main/:market_id',
                    name: 'mainview',
                    component: () => import('@/views/MainView.vue'),
                    props: (route) => {
                        // 使用正则表达式匹配参数
                        const marketId = route.params.market_id.replace(/_/g, '.');
                        return {
                            market_id: marketId
                        };
                    }
                },
                {
                    path: 'mainempty',
                    name: 'mainviewempty',
                    component: () => import('@/views/MainViewEmpty.vue'),
                },
                {
                    path: 'nopermission',
                    name: 'nopermission',
                    component: () => import('@/views/pages/auth/Access.vue'),
                },
                {
                    path: 'usercentre',
                    name: 'usercentre',
                    component: () => import('@/views/user/UserCentre.vue')
                },
                {
                    path: 'goodsintro',
                    name: 'goodsintro',
                    component: () => import('@/views/user/GoodsIntro.vue')
                },
                {
                    path: 'logout',
                    name: 'logout',
                    component: () => import('@/views/user/Logout.vue')
                }
            ]
        },
        {
            path: '/index/',
            component: IndexLayout,
            children: [
                {
                    path: 'home',
                    name: 'index_home',
                    component: () => import('@/views/index/IndexMain.vue'),
                },
                {
                    path: 'price',
                    name: 'index_price',
                    component: () => import('@/views/index/IndexPrice.vue'),
                },
                {
                    path: 'faq',
                    name: 'index_faq',
                    component: () => import('@/views/index/IndexFaq.vue'),
                },
                {
                    path: 'contact',
                    name: 'index_contact',
                    component: () => import('@/views/index/IndexContact.vue'),
                },
                {
                    path: 'reg',
                    name: 'index_reg',
                    component: () => import('@/views/pages/auth/Reg.vue'),
                },
                {
                    path: 'get_password',
                    name: 'index_get_password',
                    component: () => import('@/views/pages/auth/GetPassword.vue'),
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/views/pages/auth/Login.vue'),
                    beforeEnter: async (to, from, next) => {
                        //首先执行自动登录
                        try {
                            const storageObj = new SessionStorageService();
                            const option = {
                                headers: {
                                    Authorization: storageObj.getRfToken() + ',' + storageObj.getToken()
                                }
                            };
                            const refreshResult = await OpenHttpService.post('/open/refreshToken', {}, option);
                            if (refreshResult.ret === 200) {
                                storageObj.setToken(refreshResult.data.access_token);
                                next('/');
                            } else {
                                next();
                            }
                        } catch (error) {
                            console.log(error);
                            next();
                        }
                    },
                },
            ]
        },

        {
            path: '/auth/login',
            name: 'authLlogin',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
    ]
});

//导航守卫
// router.beforeEach((to, from, next) => {
//     if (to.name === 'nopermission') {
//         next();
//         return;
//     }
//     if (to.path.startsWith('/index/')) {
//         next();
//         return;
//     }
//     // 检查用户是否登录
//     const isLoggedIn = checkIfUserIsLoggedIn(); // 这个函数需要根据你的实际情况来实现
//     if (!isLoggedIn && to.name !== 'login') {
//         // 如果用户没有登录且不是访问登录页面，则跳转到登录页面
//         next('/login');
//     } else {
//         next();
//     }
// });

// function checkIfUserIsLoggedIn() {
//     // 从 sessionStorage 中获取存储的 JSON 字符串
//     const storage = new SessionStorageService();
//     const userinfo = storage.getUserInfo();
//     // 如果 userinfo 存在并且解析后的对象有有效的 user_id，则返回 true 表示已登录
//     if (userinfo) {
//         if (userinfo.user_id) {
//             return true;
//         }
//     }
//     // 否则返回 false 表示未登录
//     return false;
// }
export default router;
