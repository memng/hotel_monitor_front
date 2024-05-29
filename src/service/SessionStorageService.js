export default class SessionStorageService {
    constructor() {
        this.userInfoKey = 'user_info';
        this.configKey = 'config';
        this.tokenKey = 'token';
    }

    // 保存 user_info
    setUserInfo(userInfo) {
        if (typeof userInfo === 'object') {
            sessionStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
        } else {
            console.error('UserInfo should be an object');
        }
    }

    // 获取 user_info
    getUserInfo() {
        const userInfo = sessionStorage.getItem(this.userInfoKey);
        return userInfo ? JSON.parse(userInfo) : null;
    }

    // 清除 user_info
    clearUserInfo() {
        sessionStorage.removeItem(this.userInfoKey);
    }

    // 保存 config
    setConfig(config) {
        if (typeof config === 'object') {
            sessionStorage.setItem(this.configKey, JSON.stringify(config));
        } else {
            console.error('Config should be an object');
        }
    }

    // 获取 config
    getConfig() {
        const config = sessionStorage.getItem(this.configKey);
        return config ? JSON.parse(config) : null;
    }

    // 清除 config
    clearConfig() {
        sessionStorage.removeItem(this.configKey);
    }

    // 保存 token
    setToken(token) {
        sessionStorage.setItem(this.tokenKey, token);
    }

    // 获取 token
    getToken() {
        return sessionStorage.getItem(this.tokenKey);
    }

    // 清除 token
    clearToken() {
        sessionStorage.removeItem(this.tokenKey);
    }

    // 清除所有 sessionStorage 数据
    clearAll() {
        sessionStorage.clear();
    }
}
