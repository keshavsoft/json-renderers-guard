const validateColumns = (config) => {
    const localConfig = config;
    const localColumns = localConfig.columns;

    if (localColumns === undefined) {
        throw new Error('Missing compulsory key: "columns"');
    };

    if (!Array.isArray(localColumns)) {
        throw new TypeError("columns must be an Array");
    };

    return true;
};

export default validateColumns;
