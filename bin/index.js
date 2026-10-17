#!/usr/bin/env node

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import guardFunc, { configSpec, getSpec } from "../src/index.js";

const runCli = ({ inArgs = [] } = {}) => {
    const localArgs = inArgs;

    if (localArgs.includes("--help") || localArgs.includes("-h")) {
        console.log(`
json-renderers-guard CLI

Usage:
  npx json-renderers-guard                     Output the canonical JSON config template
  npx json-renderers-guard --spec              Output the JSON specification object
  npx json-renderers-guard validate <file>     Validate a JSON config file
  npx json-renderers-guard --help, -h          Show this help message
`);
        return 0;
    }

    if (localArgs[0] === "validate") {
        const localTargetFile = localArgs[1];
        if (!localTargetFile) {
            console.error("Error: Please provide a file path to validate (e.g. npx json-renderers-guard validate config.json)");
            return 1;
        }

        const localResolvedPath = resolve(process.cwd(), localTargetFile);
        if (!existsSync(localResolvedPath)) {
            console.error(`Error: File not found: ${localResolvedPath}`);
            return 1;
        }

        try {
            const localFileContent = readFileSync(localResolvedPath, "utf-8");
            const localParsed = JSON.parse(localFileContent);
            guardFunc({ inConfig: localParsed });
            console.log(`✓ Configuration in "${localTargetFile}" is valid.`);
            return 0;
        } catch (localError) {
            console.error(`✗ Validation failed for "${localTargetFile}": ${localError.message}`);
            return 1;
        }
    }

    if (localArgs.includes("--spec")) {
        console.log(JSON.stringify(getSpec(), null, 2));
        return 0;
    }

    // Default behavior: output canonical config template
    console.log(JSON.stringify(configSpec, null, 2));
    return 0;
};

const exitCode = runCli({ inArgs: process.argv.slice(2) });
if (exitCode !== 0) {
    process.exit(exitCode);
}
