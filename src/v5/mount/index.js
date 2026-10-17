import validateTargetHtmlId from "./targetHtmlId/index.js";
import validateAppendPosition from "./appendPosition/index.js";
import validateClassToApply from "./classToApply/index.js";

const guardMount = (config) => {
    const localConfig = config?.inConfig ?? config;

    if (!localConfig || typeof localConfig !== "object" || Array.isArray(localConfig)) {
        throw new TypeError("Config must be an object");
    }

    validateTargetHtmlId(localConfig);
    validateAppendPosition(localConfig);
    validateClassToApply(localConfig);

    return true;
};

export {
    validateTargetHtmlId,
    validateAppendPosition,
    validateClassToApply
};

export default guardMount;
