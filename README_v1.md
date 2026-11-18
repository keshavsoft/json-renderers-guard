# json-renderers-guard

Shared input contracts and validation for the JSON-renderer pipeline.

## Why this repository exists

The input object describes a component's type, target, data, columns, and presentation choices. Different repositories consume different parts of that object. When validation rules and examples are copied between repositories, they can drift. GUARD provides one versioned place to describe and check those inputs without taking over the work of building specifications or DOM elements.

## Related repositories

- [json-renderers-build-table](https://github.com/keshavsoft/json-renderers-build-table) — table-specific specification building.
- [json-renderers-build](https://github.com/keshavsoft/json-renderers-build) — component specification building.
- [json-renderers](https://github.com/keshavsoft/json-renderers) — rendering orchestration and DOM mounting.
- [json-to-tag](https://github.com/keshavsoft/json-to-tag) — JSON element specifications to native DOM elements.

GUARD is an additional shared package, not a replacement for any of these projects.

## V1 contracts

- `rendererBuildV19` preserves the build package's checks for supported type, collection data, column objects, required `columnName`, row objects, and a column/data key match.
- `rendererV17` preserves the renderer's required top-level keys and type checks, including a non-empty `targetHtmlId`.

These contracts remain separate because the repositories accept different input shapes.

## Column definition: required and optional fields

A column object is not a free-form universe. `columnName` is required because it identifies the data field represented by the column. `width` is optional and table-specific; it guides the table's column-group/column sizing behavior. `template` is optional in the current contract. It is a broader table-level concept than width: a template can describe how multiple table regions—header, rows, cells, and footer—are shaped. It is not mandatory in V1, but may become a required table input in a future contract when that behavior is formalized.

See [docs/contracts/columns.html](docs/contracts/columns.html) for the focused explanation.

## Usage

```js
import guardFunc from "json-renderers-guard";

guardFunc({
    inConfig: {
        type: "table",
        data: [{ Name: "Keshav" }],
        columns: [{ columnName: "Name", width: "150px" }],
        options: {},
        showLog: false
    },
    contractName: "rendererBuildV19"
});
```

Valid input returns `true`; invalid input throws an error.

## Documentation

Start at [docs/index.html](docs/index.html). The documentation is organized by concept rather than placing every page in the root.

## Versioning

This first package contains V1 only. Do not create V2 or V3 until a real subsequent implementation needs to be preserved.

## Tests

Run `npm test`. These are package unit tests; the two consuming repositories still need their own builds and integration tests after installing this package.
