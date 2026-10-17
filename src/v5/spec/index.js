import validateType from "./type/index.js";
import validateData from "./data/index.js";
import validateColumns from "./columns/index.js";
import validateShowLog from "./showLog/index.js";

const guardSpec = (config) => {
    const localConfig = config?.inConfig ?? config;

    if (!localConfig || typeof localConfig !== "object" || Array.isArray(localConfig)) {
        throw new TypeError("Config must be an object");
    }

    validateType(localConfig);
    validateData(localConfig);
    validateColumns(localConfig);
    validateShowLog(localConfig);

    return true;
};

export {
    validateType,
    validateData,
    validateColumns,
    validateShowLog
};

export default guardSpec;
