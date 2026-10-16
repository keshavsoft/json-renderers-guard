import contractSpecs from "./contracts.json" with { type: "json" };

const VALID_TYPES = ["table", "tableFromSpec", "select", "selectOptionsOnly", "dataList", "datalist"];
const TABLE_TYPES = ["table", "tableFromSpec"];

function guardFunc({ inConfig, contractName = "rendererBuildV19" } = {}) {
    const localConfig = inConfig;
    const localContractName = contractName;
    const localSpec = contractSpecs[localContractName];

    if (!localSpec) {
        throw new Error(`Unknown guard contract: ${localContractName}`);
    }
    if (!localConfig || typeof localConfig !== "object" || Array.isArray(localConfig)) {
        throw new TypeError("Config must be an object");
    }

    if (localContractName === "rendererV17") {
        for (const key of Object.keys(localSpec)) {
            if (!(key in localConfig) || localConfig[key] === undefined) {
                throw new Error(`Missing compulsory key: "${key}"`);
            }
            if (Array.isArray(localSpec[key])) {
                if (!Array.isArray(localConfig[key])) throw new TypeError(`${key} must be an Array`);
            } else if (typeof localConfig[key] !== typeof localSpec[key]) {
                throw new TypeError(`${key} must be of type ${typeof localSpec[key]}`);
            }
        }
        if (!localConfig.targetHtmlId.trim()) throw new TypeError("targetHtmlId must be a non-empty string");
        return true;
    }

    if (typeof localConfig.type !== "string" || !VALID_TYPES.includes(localConfig.type)) {
        throw new Error(`type must be one of: ${VALID_TYPES.join(", ")}`);
    }
    if (!Array.isArray(localConfig.data)) throw new TypeError("data must be an Array");
    if (localConfig.showLog !== undefined && typeof localConfig.showLog !== "boolean") {
        throw new TypeError("showLog must be a boolean");
    }

    if (TABLE_TYPES.includes(localConfig.type)) {
        if (!Array.isArray(localConfig.columns)) throw new TypeError("columns must be an array for table rendering");
        for (let i = 0; i < localConfig.columns.length; i++) {
            const col = localConfig.columns[i];
            if (!col || typeof col !== "object" || Array.isArray(col)) throw new TypeError(`columns[${i}] must be an object`);
            if (typeof col.columnName !== "string" || !col.columnName.trim()) {
                throw new TypeError(`columns[${i}].columnName must be a non-empty string`);
            }
        }
        for (let i = 0; i < localConfig.data.length; i++) {
            const row = localConfig.data[i];
            if (!row || typeof row !== "object" || Array.isArray(row)) throw new TypeError(`data[${i}] must be an object`);
        }
        if (localConfig.columns.length && localConfig.data.length) {
            const names = localConfig.columns.map(col => col.columnName);
            const rowKeys = Object.keys(localConfig.data[0]);
            if (!names.some(name => rowKeys.includes(name))) {
                throw new Error(`Data alignment error: None of the columns [${names.join(", ")}] match any keys in data rows [${rowKeys.join(", ")}]`);
            }
        }
    }
    return true;
}

export default guardFunc;
