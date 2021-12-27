#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliParser_1 = require("./cliParser");
const fileHandler_1 = require("./fileHandler");
const cliArgs = process.argv.slice(2);
if (cliArgs.length) {
    const config = (0, cliParser_1.cliParser)(cliArgs);
    if (config) {
        (0, fileHandler_1.dfs)(config.path, config);
    }
}
else {
    console.error('ERROR: No arguments given.');
}
