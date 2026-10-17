const validateType = (config) => {
    const localConfig = config;

    const localType = localConfig.type;

    if (localType === undefined) {
        throw new Error('Missing compulsory key: "type"');
    };

    if (typeof localType !== "string") {
        throw new TypeError("type must be a string");
    };

    return true;
};

export default validateType;
