const validateType = ({ inConfig, inValue } = {}) => {
    const localConfig = inConfig;
    const localType = localConfig ? localConfig.type : inValue;

    if (localType === undefined) {
        throw new Error('Missing compulsory key: "type"');
    }
    if (typeof localType !== "string") {
        throw new TypeError("type must be a string");
    }
    return true;
};

export default validateType;
