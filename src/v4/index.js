import validateType from "./type/index.js";
import validateTargetHtmlId from "./targetHtmlId/index.js";
import validateData from "./data/index.js";
import validateColumns from "./columns/index.js";
import validateClassToApply from "./classToApply/index.js";
import validateAppendPosition from "./appendPosition/index.js";
import validateShowLog from "./showLog/index.js";
import getSpec, { configSpec } from "./getSpec.js";

const guardFunc = (config) => {
    const localConfig = config;

    if (!localConfig || typeof localConfig !== "object" || Array.isArray(localConfig)) {
        throw new TypeError("Config must be an object");
    }

    validateType(localConfig);
    validateTargetHtmlId(localConfig);
    validateData(localConfig);
    validateColumns(localConfig);
    validateClassToApply(localConfig);
    validateAppendPosition(localConfig);
    validateShowLog(localConfig);

    return true;
};

guardFunc.getSpec = getSpec;
guardFunc.configSpec = configSpec;

export {
    guardFunc,
    getSpec,
    configSpec,
    validateType,
    validateTargetHtmlId,
    validateData,
    validateColumns,
    validateClassToApply,
    validateAppendPosition,
    validateShowLog
};

export default guardFunc;
