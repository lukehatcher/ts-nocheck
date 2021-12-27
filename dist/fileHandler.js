#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dfs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const addNocheck = (filePath, fileLines, config) => {
    if (config.smartCheck) {
        const firstLine = fileLines[0];
        if (firstLine.trim().startsWith('//')) {
            const commentContent = firstLine.substring(firstLine.indexOf('//') + 2);
            if (commentContent.trim().split(' ')[0] === '@ts-nocheck') {
                return;
            }
        }
    }
    fileLines.unshift('// @ts-nocheck');
    fs_1.default.writeFileSync(filePath, fileLines.join('\n'));
};
const dfs = (dir, config) => __awaiter(void 0, void 0, void 0, function* () {
    const filesInDir = fs_1.default.readdirSync(dir);
    for (let i = 0; i < filesInDir.length; ++i) {
        const currPath = path_1.default.join(dir, filesInDir[i]);
        const stat = fs_1.default.lstatSync(currPath);
        if (stat.isDirectory()) {
            (0, exports.dfs)(currPath, config);
        }
        else {
            const { ext } = path_1.default.parse(currPath);
            if (config[ext.substring(1)]) {
                const lines = fs_1.default.readFileSync(currPath, 'utf8').toString().split('\n');
                addNocheck(currPath, lines, config);
            }
        }
    }
});
exports.dfs = dfs;
