import configSpec from "./configSpec.json" with { type: "json" };

const getSpec = ({ inKey } = {}) => {
    const localKey = inKey;
    if (localKey && localKey in configSpec) {
        return configSpec[localKey];
    }
    return { ...configSpec };
};

Object.assign(getSpec, configSpec);

export { getSpec, configSpec };
export default getSpec;
