const validateData = (config) => {
    const localConfig = config;
    const localData = localConfig.data;

    if (localData === undefined) {
        throw new Error('Missing compulsory key: "data"');
    };

    if (!Array.isArray(localData)) {
        throw new TypeError("data must be an Array");
    };

    return true;
};

export default validateData;
