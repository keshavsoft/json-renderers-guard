const validateTargetHtmlId = (config) => {
    const localConfig = config?.inConfig ?? config;

    if (!localConfig || typeof localConfig !== "object") {
        throw new TypeError("Config must be an object");
    }

    const localTargetHtmlId = localConfig.targetHtmlId;

    if (localTargetHtmlId === undefined) {
        throw new Error('Missing compulsory key: "targetHtmlId"');
    }

    if (typeof localTargetHtmlId !== "string") {
        throw new TypeError("targetHtmlId must be a string");
    }

    if (localTargetHtmlId.trim().length === 0) {
        throw new Error("targetHtmlId must be a non-empty string");
    }

    return true;
};

export default validateTargetHtmlId;
