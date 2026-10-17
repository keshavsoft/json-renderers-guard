const validateClassToApply = (config) => {
    const localConfig = config?.inConfig ?? config;

    if (!localConfig || typeof localConfig !== "object") {
        throw new TypeError("Config must be an object");
    }

    const localClassToApply = localConfig.classToApply;

    if (localClassToApply === undefined) {
        throw new Error('Missing compulsory key: "classToApply"');
    }

    if (typeof localClassToApply !== "string") {
        throw new TypeError("classToApply must be a string");
    }

    return true;
};

export default validateClassToApply;
