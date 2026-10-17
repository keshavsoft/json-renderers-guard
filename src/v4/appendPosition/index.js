const validateAppendPosition = ({ inConfig, inValue } = {}) => {
    const localConfig = inConfig;
    const localAppendPosition = localConfig ? localConfig.appendPosition : inValue;

    if (localAppendPosition === undefined) {
        throw new Error('Missing compulsory key: "appendPosition"');
    }
    if (typeof localAppendPosition !== "string") {
        throw new TypeError("appendPosition must be a string");
    }
    return true;
};

export default validateAppendPosition;
