export default class SessionStorageService {
    constructor() {
        this.userInfoKey = 'user_info';
        this.configKey = 'config';
        this.tokenKey = 'token';
        this.currentMenuItem = 'current_menu_item';
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

    // 保存 current_menu_item
    setCurrentMenuItem(currentMenuItem) {
        if (typeof userInfo === 'object') {
            sessionStorage.setItem(this.currentMenuItem, JSON.stringify(currentMenuItem));
        } else {
            console.error('CurrentMenuItem should be an object');
        }
    }

    // 获取 current_menu_item
    getCurrentMenuItem() {
        const currentMenu = sessionStorage.getItem(this.currentMenuItem);
        return currentMenu ? JSON.parse(currentMenu) : null;
    }

    // 清除 current_menu_item
    clearCurrentMenuItem() {
        sessionStorage.removeItem(this.currentMenuItem);
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
