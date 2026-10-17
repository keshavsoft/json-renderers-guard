const validateAppendPosition = (config) => {
    const localConfig = config?.inConfig ?? config;

    if (!localConfig || typeof localConfig !== "object") {
        throw new TypeError("Config must be an object");
    }

    const localAppendPosition = localConfig.appendPosition;

    if (localAppendPosition === undefined) {
        throw new Error('Missing compulsory key: "appendPosition"');
    }

    if (typeof localAppendPosition !== "string") {
        throw new TypeError("appendPosition must be a string");
    }

    return true;
};

export default validateAppendPosition;
