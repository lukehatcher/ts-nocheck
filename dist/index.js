#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliParser_1 = require("./cliParser");
const fileHandler_1 = require("./fileHandler");
const config = (0, cliParser_1.cliParser)(process.argv.slice(2));
if (config) {
    (0, fileHandler_1.dfs)(config.path, config);
}
