const validateShowLog = (config) => {
    const localConfig = config?.inConfig ?? config;

    if (!localConfig || typeof localConfig !== "object") {
        throw new TypeError("Config must be an object");
    }

    const localShowLog = localConfig.showLog;

    if (localShowLog !== undefined && typeof localShowLog !== "boolean") {
        throw new TypeError("showLog must be a boolean");
    }

    return true;
};

export default validateShowLog;
