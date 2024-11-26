import SessionStorageService from "./SessionStorageService";

class OpenHttpService {
    constructor() {
        // 初始化 URL 前缀属性
        this.urlPrefix = 'http://8.141.13.176:88';
    }
    async request(url, options) {
        const fullUrl = this.urlPrefix + url;
        const sssObj = new SessionStorageService();
        // 添加验证信息到请求头
        const headers = {
            ...options.headers,
            // 添加验证信息
            Session: sssObj.getSessionId(),
        };
        options.headers = headers;
        const response = await fetch(fullUrl, options);
        if (!response.ok) {
            throw new Error('网络错误');
        }
        const contentType = response.headers.get('Content-Type');
        let data = null;
        if (contentType.includes('application/json')) {
            // 处理JSON响应
            data = await response.json();
        } else if (contentType.includes('image')) {
            // 处理图片响应
            const blob = await response.blob();
            data = URL.createObjectURL(blob);
        } else {
            console.error('Unexpected content type:', contentType);
        }
        return data;
    }

    async get(url, params = {}, options = {}) {
        options.method = 'GET';
        options.headers = {};
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        return await this.request(fullUrl, options);
    }

    async post(url, data = {}, options = {}) {
        //console.log(data);
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
        return await this.request(url, options); // 使用 await 等待异步请求完成
    }
}

export default new OpenHttpService();
