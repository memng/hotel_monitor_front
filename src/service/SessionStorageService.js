export default class SessionStorageService {
    constructor() {
        this.userInfoKey = 'user_info';
        this.configKey = 'config';
        this.tokenKey = 'token';
        this.refreshTokenKey = 'rf_token';
        this.currentMenuItem = 'current_menu_item';
    }

    // 保存 user_info
    setUserInfo(userInfo) {
        if (typeof userInfo === 'object') {
            localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
        } else {
            console.error('UserInfo should be an object');
        }
    }

    // 获取 user_info
    getUserInfo() {
        const userInfo = localStorage.getItem(this.userInfoKey);
        return userInfo ? JSON.parse(userInfo) : null;
    }

    // 清除 user_info
    clearUserInfo() {
        localStorage.removeItem(this.userInfoKey);
    }

    // 保存 config
    setConfig(config) {
        if (typeof config === 'object') {
            localStorage.setItem(this.configKey, JSON.stringify(config));
        } else {
            console.error('Config should be an object');
        }
    }

    // 获取 config
    getConfig() {
        const config = localStorage.getItem(this.configKey);
        return config ? JSON.parse(config) : null;
    }

    // 清除 config
    clearConfig() {
        localStorage.removeItem(this.configKey);
    }

    // 保存 current_menu_item
    setCurrentMenuItem(currentMenuItem) {
        if (typeof currentMenuItem === 'object') {
            localStorage.setItem(this.currentMenuItem, JSON.stringify(currentMenuItem));
        } else {
            console.error('CurrentMenuItem should be an object');
        }
    }

    // 获取 current_menu_item
    getCurrentMenuItem() {
        const currentMenu = localStorage.getItem(this.currentMenuItem);
        return currentMenu ? JSON.parse(currentMenu) : null;
    }

    // 清除 current_menu_item
    clearCurrentMenuItem() {
        localStorage.removeItem(this.currentMenuItem);
    }

    // 保存 token
    setToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    // 获取 token
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    // 保存 token
    setRfToken(token) {
        localStorage.setItem(this.refreshTokenKey, token);
    }

    // 获取 token
    getRfToken() {
        return localStorage.getItem(this.refreshTokenKey);
    }

    // 清除 token
    clearToken() {
        localStorage.removeItem(this.tokenKey);
    }

    // 清除所有 localStorage 数据
    clearAll() {
        localStorage.clear();
    }
}
