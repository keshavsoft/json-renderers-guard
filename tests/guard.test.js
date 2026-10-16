import test from "node:test";
import assert from "node:assert/strict";
import guardFunc from "../src/index.js";

const validTable = {
    type: "table",
    data: [{ Name: "Keshav", Designation: "Founder" }],
    columns: [{ columnName: "Name", width: "150px" }, { columnName: "Designation", width: "100px" }],
    options: {},
    showLog: false
};

test("accepts valid build input", () => {
    assert.equal(guardFunc({ inConfig: validTable, contractName: "rendererBuildV19" }), true);
});
test("rejects missing columnName", () => {
    assert.throws(() => guardFunc({
        inConfig: { ...validTable, columns: [{ width: "100px" }] },
        contractName: "rendererBuildV19"
    }), /columnName must be a non-empty string/);
});
test("rejects columns unrelated to data keys", () => {
    assert.throws(() => guardFunc({
        inConfig: { ...validTable, columns: [{ columnName: "Missing" }] },
        contractName: "rendererBuildV19"
    }), /Data alignment error/);
});
test("accepts renderer config", () => {
    assert.equal(guardFunc({ contractName: "rendererV17", inConfig: {
        type: "table", targetHtmlId: "ledgerTable", data: [], columns: [],
        classToApply: "", appendPosition: "replace", showLog: false
    }}), true);
});
test("rejects empty targetHtmlId", () => {
    assert.throws(() => guardFunc({ contractName: "rendererV17", inConfig: {
        type: "table", targetHtmlId: " ", data: [], columns: [],
        classToApply: "", appendPosition: "replace", showLog: false
    }}), /targetHtmlId must be a non-empty string/);
});
