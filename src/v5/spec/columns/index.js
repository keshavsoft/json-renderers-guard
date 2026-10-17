const validateColumns = (config) => {
    const localConfig = config?.inConfig ?? config;

    if (!localConfig || typeof localConfig !== "object") {
        throw new TypeError("Config must be an object");
    }

    const localColumns = localConfig.columns;

    if (localColumns === undefined) {
        throw new Error('Missing compulsory key: "columns"');
    }

    if (!Array.isArray(localColumns)) {
        throw new TypeError("columns must be an Array");
    }

    return true;
};

export default validateColumns;
