// httpService.js
import router from '../router';
import SessionStorageService from './SessionStorageService';

class HttpService {
    constructor() {
        // 初始化 URL 前缀属性
        this.urlPrefix = '';
    }
    async request(url, toast, data, options) {
        try {
            const storage = new SessionStorageService();
            const userInfo = storage.getUserInfo();
            const token = userInfo ? userInfo.token : null;
            // 添加验证信息到请求头
            const headers = {
                ...options.headers,
                // 添加验证信息
                Authorization: token
            };
            options.headers = headers;

            // 在请求的 URL 前面添加 URL 前缀
            const fullUrl = this.urlPrefix + url;
            const response = await fetch(fullUrl, options);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log(data.ret);
            if (data.ret === 500) {
                // 跳转到无权限页面
                router.push('/nopermission');
                throw new Error('no permission');
            } else if (data.ret !== 200) {
                // 显示错误消息
                toast.add({
                    severity: 'error',
                    summary: '错误',
                    detail: data.message, // 假设返回的数据中包含错误消息
                    life: 3000
                });
                throw new Error('data error');
            }
            return data.data;
        } catch (error) {
            // 显示错误消息
            toast.add({
                severity: 'error',
                summary: '错误',
                detail: '网络请求错误,请重试', // 假设返回的数据中包含错误消息
                life: 3000
            });
            throw error;
        }
    }

    async get(url, toast, options = {}) {
        options.method = 'GET';
        return await this.request(url, options);
    }

    async post(url, toast, data = {}, options = {}) {
        options.method = 'POST';
        const formData = new FormData();
        // 将 data 中的数据添加到 FormData 对象中
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        options.headers = {
            ...options.headers,
            'Content-Type': 'multipart/form-data' // 设置正确的 Content-Type
        };
        options.body = formData;
        return await this.request(url, toast, data, options); // 使用 await 等待异步请求完成
    }
}

export default new HttpService();
