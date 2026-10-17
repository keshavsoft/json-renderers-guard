import test from "node:test";
import assert from "node:assert/strict";
import guardFunc, {
    getSpec,
    configSpec,
    validateType,
    validateTargetHtmlId,
    validateData,
    validateColumns,
    validateClassToApply,
    validateAppendPosition,
    validateShowLog
} from "../src/index.js";

const validRendererConfig = {
    type: "table",
    targetHtmlId: "ledgerTable",
    data: [{ Name: "Keshav", Designation: "Founder" }],
    columns: [{ columnName: "Name" }],
    classToApply: "table table-striped",
    appendPosition: "replace",
    showLog: false
};

test("Renderer Guard: accepts valid renderer config", () => {
    assert.equal(guardFunc({ inConfig: validRendererConfig }), true);
});

test("Renderer Guard: type can be ANY string", () => {
    assert.equal(guardFunc({ inConfig: { ...validRendererConfig, type: "arbitraryCustomString" } }), true);
});

test("Renderer Guard: rejects missing targetHtmlId", () => {
    const { targetHtmlId, ...incompleteConfig } = validRendererConfig;
    assert.throws(() => guardFunc({ inConfig: incompleteConfig }), /Missing compulsory key: "targetHtmlId"/);
});

test("Renderer Guard: rejects empty or whitespace targetHtmlId", () => {
    assert.throws(() => guardFunc({
        inConfig: { ...validRendererConfig, targetHtmlId: "   " }
    }), /targetHtmlId must be a non-empty string/);
});

test("Renderer Guard: rejects non-array data", () => {
    assert.throws(() => guardFunc({
        inConfig: { ...validRendererConfig, data: "not-an-array" }
    }), /data must be an Array/);
});

test("Renderer Guard: rejects non-array columns", () => {
    assert.throws(() => guardFunc({
        inConfig: { ...validRendererConfig, columns: "not-an-array" }
    }), /columns must be an Array/);
});

test("Autonomous Validator: validateType throws on missing key", () => {
    assert.throws(() => validateType({ inConfig: {} }), /Missing compulsory key: "type"/);
    assert.throws(() => validateType({ inConfig: { type: 123 } }), /type must be a string/);
});

test("Autonomous Validator: validateTargetHtmlId throws on missing key or empty", () => {
    assert.throws(() => validateTargetHtmlId({ inConfig: {} }), /Missing compulsory key: "targetHtmlId"/);
    assert.throws(() => validateTargetHtmlId({ inConfig: { targetHtmlId: "" } }), /targetHtmlId must be a non-empty string/);
});

test("Autonomous Validator: validateData throws on missing key or non-array", () => {
    assert.throws(() => validateData({ inConfig: {} }), /Missing compulsory key: "data"/);
    assert.throws(() => validateData({ inConfig: { data: "string" } }), /data must be an Array/);
});

test("Autonomous Validator: validateColumns throws on missing key or non-array", () => {
    assert.throws(() => validateColumns({ inConfig: {} }), /Missing compulsory key: "columns"/);
    assert.throws(() => validateColumns({ inConfig: { columns: 123 } }), /columns must be an Array/);
});

test("Autonomous Validator: validateShowLog throws on missing key or non-boolean", () => {
    assert.throws(() => validateShowLog({ inConfig: {} }), /Missing compulsory key: "showLog"/);
    assert.throws(() => validateShowLog({ inConfig: { showLog: "false" } }), /showLog must be a boolean/);
});

test("Guard Spec: exports getSpec function and configSpec object", () => {
    const spec = getSpec();
    assert.equal(typeof spec, "object");
    assert.equal(spec.type, "table");
    assert.equal(Array.isArray(spec.data), true);
    assert.equal(Array.isArray(spec.columns), true);
    assert.equal(spec.appendPosition, "replace");
    assert.equal(spec.showLog, false);
    assert.equal(getSpec.type, "table");
    assert.equal(configSpec.type, "table");
    assert.equal(guardFunc.getSpec().type, "table");
});

test("accepts valid form build input", () => {
    assert.equal(guardFunc({ inConfig: {
        type: "form",
        data: [],
        columns: [{ columnName: "Name" }]
    }, contractName: "rendererBuildV19" }), true);
});

