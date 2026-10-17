import guardSpec, {
    validateType,
    validateData,
    validateColumns,
    validateShowLog
} from "./spec/index.js";

import guardMount, {
    validateTargetHtmlId,
    validateAppendPosition,
    validateClassToApply
} from "./mount/index.js";

import getSpec, { configSpec } from "./getSpec.js";

const guardFunc = (config) => {
    const localConfig = config?.inConfig ?? config;

    if (!localConfig || typeof localConfig !== "object" || Array.isArray(localConfig)) {
        throw new TypeError("Config must be an object");
    }

    guardSpec(localConfig);
    guardMount(localConfig);

    return true;
};

guardFunc.getSpec = getSpec;
guardFunc.configSpec = configSpec;
guardFunc.guardSpec = guardSpec;
guardFunc.guardMount = guardMount;

export {
    guardFunc,
    guardSpec,
    guardMount,
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
