# json-renderers-guard

> Universal, declarative input contracts and schema validation for JSON-driven specification builders.  
> Decouples instruction dispatch from component semantics — zero DOM, pure data transformation.

[![npm](https://img.shields.io/npm/v/json-renderers-guard?label=npm&color=cb3837)](https://www.npmjs.com/package/json-renderers-guard)
[![downloads](https://img.shields.io/npm/dm/json-renderers-guard?label=downloads&color=2563eb)](https://www.npmjs.com/package/json-renderers-guard)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![CDN](https://img.shields.io/badge/CDN-dist%2Fmin.js-orange.svg)](https://cdn.jsdelivr.net/npm/json-renderers-guard)
[![Live Demo](https://img.shields.io/badge/live-docs-brightgreen.svg)](https://keshavsoft.github.io/json-renderers-guard/docs/)

---

## 📖 The Story: Why This Exists

### The Monolithic Problem

In early declarative architectures, specification builders (such as `json-renderers-build-table`) were monolithic. The logic that iterated over columns, stamped table headers, computed cells, and mounted elements to the DOM was tightly fused with the instruction execution mechanism.

When validation rules and input examples were copied between different repositories, they began to drift. One package might enforce that a column must have a string `columnName`, while another might silently ignore missing columns, causing unexpected runtime crashes deep inside DOM mutation loops.

### The Architectural Solution

`json-renderers-guard` provides **one versioned, centralized contract authority** to validate input objects before any downstream specification builder or DOM renderer processes them:

- **Pure Data Transformation**: Zero DOM dependency. Runs seamlessly in Node.js, CLI scripts, Web Workers, or browsers.
- **Fail-Fast Boundary**: Rejects invalid types, missing keys, or empty target IDs upfront with clear, actionable errors.
- **Decoupled Pipeline**: Builders focus solely on AST generation, renderers focus on DOM mounting, and GUARD enforces contract integrity.

---

## 🧩 The Four-Repository Pipeline

| Repository                                                                                 | Responsibility                                              | Environment                |
| :----------------------------------------------------------------------------------------- | :---------------------------------------------------------- | :------------------------- |
| **[json-renderers-guard](https://github.com/keshavsoft/json-renderers-guard)**             | Shared input contracts and boundary schema validation       | Pure Data (Node / Browser) |
| **[json-renderers-build-table](https://github.com/keshavsoft/json-renderers-build-table)** | Table-specific AST specification generation                 | Pure Data                  |
| **[json-renderers-build](https://github.com/keshavsoft/json-renderers-build)**             | Component specification building for multiple UI primitives | Pure Data                  |
| **[json-renderers](https://github.com/keshavsoft/json-renderers)**                         | Rendering orchestration and DOM mounting                    | DOM Mount                  |
| **[json-to-tag](https://github.com/keshavsoft/json-to-tag)**                               | Converts JSON tag specs into native DOM elements            | DOM Native                 |

---

## 📦 Installation

```bash
# npm
npm install json-renderers-guard

# pnpm
pnpm add json-renderers-guard

# yarn
yarn add json-renderers-guard
```

---

## ⚡ Quick Start & Usage

### 1. Full Pipeline Validation

```javascript
import guardFunc from "json-renderers-guard";

const tableConfig = {
  type: "table",
  targetHtmlId: "users-table-container",
  data: [
    { id: 1, name: "Keshav", role: "Architect" },
    { id: 2, name: "Nalam", role: "Engineer" },
  ],
  columns: [
    { columnName: "name", width: "150px" },
    { columnName: "role", width: "120px" },
  ],
  appendPosition: "replace",
  showLog: false,
};

// Returns true if valid; throws descriptive TypeError/Error if invalid
guardFunc(tableConfig);
```

### 2. Dual-Phase Modular Validation

```javascript
import { guardSpec, guardMount } from "json-renderers-guard";

// 1. Headless specification validation (no targetHtmlId needed)
guardSpec({
  type: "table",
  data: [{ id: 101, title: "Report" }],
  columns: [{ columnName: "title" }],
});

// 2. Mount target validation (verifies DOM container ID)
guardMount({
  targetHtmlId: "app-root",
  appendPosition: "replace",
});
```

---

## 📋 The Column Contract

A column definition has strict boundary contracts:

| Field        | Status         | Purpose                                                                                            |
| :----------- | :------------- | :------------------------------------------------------------------------------------------------- |
| `columnName` | **Required**   | Identifies the data key represented by the column. Rejects missing or blank values.                |
| `width`      | Optional       | Table-specific sizing guideline for column-group/column width behavior.                            |
| `template`   | Optional in V1 | Broader table-level description coordinating multiple table regions (header, rows, cells, footer). |

---

## 🛠️ NPX Command Line Interface

```bash
# Output canonical config template to stdout
npx json-renderers-guard

# Scaffold fresh config.json
npx json-renderers-guard > config.json

# Validate any local JSON configuration file
npx json-renderers-guard validate ./my-table.json

# Output complete JSON schema specification
npx json-renderers-guard --spec
```

---

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](docs/index.html) directory and online:

- 📖 **[Documentation Home](https://keshavsoft.github.io/json-renderers-guard/docs/)**
- ❓ **[Why Use GUARD?](https://keshavsoft.github.io/json-renderers-guard/docs/page/why-use.html)** — The architectural story and solving configuration drift.
- 🚀 **[How to Use](https://keshavsoft.github.io/json-renderers-guard/docs/page/how-to-use.html)** — Step-by-step developer tutorial, modular APIs, and error handling.
- 💡 **[Examples & Recipes](https://keshavsoft.github.io/json-renderers-guard/docs/page/examples.html)** — Real-world table configs and edge-case demos.
- ⚙️ **[NPX CLI Guide](https://keshavsoft.github.io/json-renderers-guard/docs/npx/index.html)** — Terminal workflows and CI validation.

---

## 🧪 Testing

```bash
npm test
```

Executes built-in Node.js test runner covering autonomous field validators, modular guards, and CLI commands.

---

## 📄 License

MIT © KeshavSoft
