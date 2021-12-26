#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliParser = void 0;
const cliConfigOptionsMap = new Map([
    ['--jsx-off', 'jsx'],
    ['--js-off', 'js'],
    ['--tsx-off', 'tsx'],
    ['--ts-off', 'ts'],
    ['--smart-check-off', 'smartCheck'],
]);
const cliParser = (args) => {
    if (!args.length) {
        console.error(`ERROR: no directory path provide.`);
    }
    const seen = new Set();
    const config = {
        jsx: true,
        js: true,
        tsx: true,
        ts: true,
        smartCheck: true,
        path: args[args.length - 1],
    };
    for (let i = 0; i < args.length - 1; ++i) {
        if (!cliConfigOptionsMap.has(args[i])) {
            console.error(`ERROR: "${args[i]}" is not an accepted argument.`);
            return null;
        }
        if (seen.has(args[i])) {
            console.error(`ERROR: repeated argument "${args[i]}" used.`);
            return null;
        }
        seen.add(args[i]);
        const key = cliConfigOptionsMap.get(args[i]);
        config[key] = false;
    }
    return config;
};
exports.cliParser = cliParser;
