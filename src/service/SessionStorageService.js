export default class SessionStorageService {
    constructor() {
        this.userInfoKey = 'user_info';
        this.tokenKey = 'token';
        this.refreshTokenKey = 'rf_token';
        this.sessionIdKey = 'session_id';
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

    // 保存 session_id
    setSessionId(sessionId) {
        localStorage.setItem(this.sessionIdKey, sessionId);
    }

    // 获取 session_id
    getSessionId() {
        return localStorage.getItem(this.sessionIdKey);
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
