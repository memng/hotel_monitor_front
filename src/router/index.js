import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import SessionStorageService from '../service/SessionStorageService';

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
                    component: () => import('@/views/pages/auth/Access.vue')
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
        // {
        //     path: '/index/',
        //     component: AppLayout,
        //     children: [
        //         {
        //             path: 'main/:market_id',
        //             name: 'mainview',
        //             component: () => import('@/views/MainView.vue'),
        //             props: (route) => {
        //                 // 使用正则表达式匹配参数
        //                 const marketId = route.params.market_id.replace(/_/g, '.');
        //                 return {
        //                     market_id: marketId
        //                 };
        //             }
        //         },
        //     ]
        // },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue'),
            // 在异步组件加载后执行
            beforeEnter: (to, from, next) => {
                // 检查用户是否登录
                const isLoggedIn = checkIfUserIsLoggedIn(); // 这个函数需要根据你的实际情况来实现
                if (isLoggedIn) {
                    // 用户已登录，跳转到首页
                    next('/');
                } else {
                    // 用户未登录，继续显示登录页面
                    next();
                }
            },
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
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
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

//导航守卫
router.beforeEach((to, from, next) => {
    if (to.name === 'nopermission') {
        next();
        return;
    }
    if (to.path.startsWith('/index/')) {
        next();
        return;
    }
    // 检查用户是否登录
    const isLoggedIn = checkIfUserIsLoggedIn(); // 这个函数需要根据你的实际情况来实现
    if (!isLoggedIn && to.path !== '/login') {
        // 如果用户没有登录且不是访问登录页面，则跳转到登录页面
        next('/login');
    } else {
        next();
    }
});

function checkIfUserIsLoggedIn() {
    // 从 sessionStorage 中获取存储的 JSON 字符串
    const storage = new SessionStorageService();
    const userinfo = storage.getUserInfo();
    // 如果 userinfo 存在并且解析后的对象有有效的 user_id，则返回 true 表示已登录
    if (userinfo) {
        if (userinfo.user_id) {
            return true;
        }
    }
    // 否则返回 false 表示未登录
    return false;
}
export default router;
