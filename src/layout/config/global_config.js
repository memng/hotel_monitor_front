const refreshTokenIntervalTime = 30 * 60 * 1000;
const refreshConfigIntervalTime = 6 * 60 * 60 * 1000;

export function useGlobalConfig() {
    return { refreshTokenIntervalTime, refreshConfigIntervalTime };
}
