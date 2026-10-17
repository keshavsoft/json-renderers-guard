const validateData = ({ inConfig, inValue } = {}) => {
    const localConfig = inConfig;
    const localData = localConfig ? localConfig.data : inValue;

    if (localData === undefined) {
        throw new Error('Missing compulsory key: "data"');
    }
    if (!Array.isArray(localData)) {
        throw new TypeError("data must be an Array");
    }
    return true;
};

export default validateData;
