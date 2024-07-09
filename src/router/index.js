import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import AppSimpleLayout from '@/simple_layout/AppSimpleLayout.vue';
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
                    path: '',
                    redirect: 'maindash'
                },
                {
                    path: 'maindash',
                    name: 'maindash',
                    component: () => import('@/views/MainDash.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'nopermission',
                    name: 'nopermission',
                    component: () => import('@/views/pages/auth/Access.vue'),
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
            path: '/user/',
            component: AppSimpleLayout,
            meta: { requiresAuth: true },
            children: [
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
                    path: 'orderstatus',
                    name: 'orderstatus',
                    component: () => import('@/views/user/OrderStatus.vue'),
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
                    path: 'category/:id(\\d+)', // 匹配形如 123.html 的路径
                    component: () => import('@/views/index/IndexCategory.vue'),
                    name: 'index_category'
                },
                {
                    path: 'page/:id(\\d+)',
                    component: () => import('@/views/index/IndexPage.vue'),
                    name: 'index_article'
                },
                {
                    path: 'reg',
                    name: 'index_reg',
                    component: () => import('@/views/pages/auth/Reg.vue'),
                },
                {
                    path: 'reg_agreement',
                    name: 'reg_agreement',
                    component: () => import('@/views/index/RegAgreement.vue'),
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
    const atToken = storageObj.getToken();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // 需要权限的页面
        if (_.isEmpty(rfToken)) {
            return next({ name: 'login' });
        }
        try {
            await refreshToken(storageObj, rfToken, atToken);
            return next();
        } catch (error) {
            return next({ name: 'login' });
        }
    } else if (to.name === 'login') {
        // 登录页面
        if (!_.isEmpty(rfToken)) {
            try {
                await refreshToken(storageObj, rfToken, atToken);
                return next({ name: 'maindash' });
            } catch (error) {
                return next();
            }
        } else {
            return next();
        }
    } else {
        return next();
    }
});

async function refreshToken(storageObj, rfToken, atToken) {
    try {
        const option = {
            headers: {
                Authorization: `${rfToken},${atToken}`
            }
        };
        const refreshResult = await OpenHttpService.post('/open/refreshToken', {}, option);
        if (refreshResult.ret === 200) {
            storageObj.setToken(refreshResult.data.access_token);
        } else {
            throw new Error(refreshResult.ret);
        }
    } catch (error) {
        console.error('refresh_token_in_router: '.error.message);
        throw new Error();
    }
}
export default router;
