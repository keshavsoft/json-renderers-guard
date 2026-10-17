const validateClassToApply = (config) => {
    const localConfig = config;
    const localClassToApply = localConfig.classToApply;

    if (localClassToApply === undefined) {
        throw new Error('Missing compulsory key: "classToApply"');
    };

    if (typeof localClassToApply !== "string") {
        throw new TypeError("classToApply must be a string");
    };

    return true;
};

export default validateClassToApply;
