// httpService.js
import router from '../router';
import SessionStorageService from './SessionStorageService';
import { useAuthMessage } from '@/layout/global_state/auth_message_show';
import { useMessage } from '@/layout/global_state/message_show';
const { message: authMessage } = useAuthMessage();
const { message: generalMessage } = useMessage();

class HttpService {
    constructor() {
        // 初始化 URL 前缀属性
        //this.urlPrefix = 'http://8.141.13.176:88';
        //this.urlPrefix = 'http://127.0.0.1';
        this.urlPrefix = 'http://47.119.139.175:88';
    }
    async request(url, toast, options) {
        try {
            const storage = new SessionStorageService();
            const token = storage.getRfToken() + ',' + storage.getToken();
            // 添加验证信息到请求头
            const headers = {
                ...options.headers,
                // 添加验证信息
                Authorization: token,
            };
            options.headers = headers;

            // 在请求的 URL 前面添加 URL 前缀
            const fullUrl = this.urlPrefix + url;
            const response = await fetch(fullUrl, options);
            if (!response.ok) {
                throw new Error('网络错误');
            }
            const data = await response.json();
            if (data.ret === 401) {
                // 跳转到无权限页面
                generalMessage.value = data.msg;
                router.push({ name: 'login' });
                throw new Error(data.msg);
            } else if (data.ret === 403) {
                authMessage.value = data.msg;
                router.push({ name: 'nopermission' });
                throw new Error('无权限');
            } else if (data.ret !== 200) {
                throw new Error(data.msg);
            }
            return data.data;
        } catch (error) {
            // 显示错误消息
            toast.add({
                severity: 'error',
                summary: '错误',
                detail: error.message, // 假设返回的数据中包含错误消息
                life: 5000
            });
            throw error;
        }
    }

    async get(url, toast, params = {}, options = {}) {
        options.method = 'GET';
        options.headers = {};
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        return await this.request(fullUrl, toast, options);
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
            //'Content-Type': 'multipart/form-data' // 设置正确的 Content-Type
        };
        options.body = formData;
        return await this.request(url, toast, options); // 使用 await 等待异步请求完成
    }
}

export default new HttpService();
