const validateShowLog = ({ inConfig, inValue } = {}) => {
    const localConfig = inConfig;
    const localShowLog = localConfig ? localConfig.showLog : inValue;

    if (localShowLog === undefined) {
        throw new Error('Missing compulsory key: "showLog"');
    }
    if (typeof localShowLog !== "boolean") {
        throw new TypeError("showLog must be a boolean");
    }
    return true;
};

export default validateShowLog;
