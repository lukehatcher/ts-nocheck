"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dfs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const folderPath = './src';
const addNoCheckLine = (filepath) => {
    const lines = fs_1.default.readFileSync(filepath).toString().split('\n');
    console.log(lines);
};
const dfs = (dir) => {
    const filesInDir = fs_1.default.readdirSync(dir);
    for (const file of filesInDir) {
        const currPath = path_1.default.join(dir, file);
        if (fs_1.default.lstatSync(currPath).isDirectory()) {
            (0, exports.dfs)(currPath);
        }
        else {
            addNoCheckLine(currPath);
        }
    }
};
exports.dfs = dfs;
(0, exports.dfs)(folderPath);
