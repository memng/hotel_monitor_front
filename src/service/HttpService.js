// httpService.js
import { createToast } from 'primevue/toast'; // 导入 PrimeVue 的 toast 组件
import router from './router';

class HttpService {
    async request(url, options) {
        try {
            // 添加验证信息到请求头
            const headers = {
                ...options.headers,
                // 添加验证信息
                Authorization: 'Bearer newToken'
            };
            options.headers = headers;

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            if (data.ret === 500) {
                // 跳转到无权限页面
                router.push('/no-permission');
            } else if (data.ret !== 200) {
                // 显示错误消息
                createToast({
                    severity: 'error',
                    summary: '错误',
                    detail: data.message, // 假设返回的数据中包含错误消息
                    life: 3000
                });
            }
            return data.data;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    }

    async get(url, options = {}) {
        options.method = 'GET';
        return await this.request(url, options);
    }

    async post(url, data = {}, options = {}) {
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
        return await this.request(url, options); // 使用 await 等待异步请求完成
    }
}

export default new HttpService();
