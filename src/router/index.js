import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import SessionStorageService from '../service/SessionStorageService';
import OpenHttpService from '@/service/OpenHttpService';
import IndexLayout from '@/views/index/IndexLayout.vue';
import _ from 'lodash';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },
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
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: 'maindash',
                    name: 'maindash',
                    component: () => import('@/views/MainDash.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'mainempty',
                    name: 'mainviewempty',
                    component: () => import('@/views/MainViewEmpty.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'nopermission',
                    name: 'nopermission',
                    component: () => import('@/views/pages/auth/Access.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'usercentre',
                    name: 'usercentre',
                    component: () => import('@/views/user/UserCentre.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'goodsintro',
                    name: 'goodsintro',
                    component: () => import('@/views/user/GoodsIntro.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'logout',
                    name: 'logout',
                    component: () => import('@/views/user/Logout.vue'),
                    meta: { requiresAuth: true }
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
                    component: () => import('@/views/pages/auth/Login.vue')
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
router.beforeEach(async (to, from, next) => {
    const storageObj = new SessionStorageService();
    const rfToken = storageObj.getRfToken();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // 需要权限的页面
        if (_.isEmpty(rfToken)) {
            return next({ name: 'login' });
        }
        try {
            const option = {
                headers: {
                    Authorization: `${rfToken},${storageObj.getToken()}`
                }
            };
            const refreshResult = await OpenHttpService.post('/open/refreshToken', {}, option);
            if (refreshResult.ret === 200) {
                storageObj.setToken(refreshResult.data.access_token);
                return next();
            } else {
                return next({ name: 'login' });
            }
        } catch (error) {
            console.log(error);
            return next({ name: 'login' });
        }
    } else if (to.name === 'login') {
        // 登录页面
        if (!_.isEmpty(rfToken)) {
            try {
                const option = {
                    headers: {
                        Authorization: `${rfToken},${storageObj.getToken()}`
                    }
                };
                const refreshResult = await OpenHttpService.post('/open/refreshToken', {}, option);
                if (refreshResult.ret === 200) {
                    storageObj.setToken(refreshResult.data.access_token);
                    return next({ name: 'mainviewempty' });
                } else {
                    return next();
                }
            } catch (error) {
                console.log(error);
                return next();
            }
        } else {
            return next();
        }
    } else {
        return next();
    }
});
export default router;
