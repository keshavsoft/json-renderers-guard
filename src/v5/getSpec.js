import configSpec from "./configSpec.json" with { type: "json" };

const getSpec = (key) => {
    const localKey = typeof key === "object" && key !== null ? (key.inKey ?? key.key) : key;
    if (localKey && localKey in configSpec) {
        return configSpec[localKey];
    }
    return { ...configSpec };
};

Object.assign(getSpec, configSpec);

export { getSpec, configSpec };
export default getSpec;
