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
                    path: 'add',
                    name: 'add',
                    component: () => import('@/views/Add.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'nopermission',
                    name: 'nopermission',
                    component: () => import('@/views/pages/auth/Access.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'changePassword',
                    name: 'changePassword',
                    component: () => import('@/views/user/ChangePassword.vue'),
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
                    path: 'login',
                    name: 'login',
                    component: () => import('@/views/pages/auth/Login.vue')
                },
            ]
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
