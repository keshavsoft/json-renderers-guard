const validateClassToApply = ({ inConfig, inValue } = {}) => {
    const localConfig = inConfig;
    const localClassToApply = localConfig ? localConfig.classToApply : inValue;

    if (localClassToApply === undefined) {
        throw new Error('Missing compulsory key: "classToApply"');
    }
    if (typeof localClassToApply !== "string") {
        throw new TypeError("classToApply must be a string");
    }
    return true;
};

export default validateClassToApply;
