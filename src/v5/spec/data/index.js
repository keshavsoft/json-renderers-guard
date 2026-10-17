const validateData = (config) => {
    const localConfig = config?.inConfig ?? config;

    if (!localConfig || typeof localConfig !== "object") {
        throw new TypeError("Config must be an object");
    }

    const localData = localConfig.data;

    if (localData === undefined) {
        throw new Error('Missing compulsory key: "data"');
    }

    if (!Array.isArray(localData)) {
        throw new TypeError("data must be an Array");
    }

    return true;
};

export default validateData;
