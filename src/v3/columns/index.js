const validateColumns = ({ inConfig, inValue } = {}) => {
    const localConfig = inConfig;
    const localColumns = localConfig ? localConfig.columns : inValue;

    if (localColumns === undefined) {
        throw new Error('Missing compulsory key: "columns"');
    }
    if (!Array.isArray(localColumns)) {
        throw new TypeError("columns must be an Array");
    }
    return true;
};

export default validateColumns;
