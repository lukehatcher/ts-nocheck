"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dfs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const folderPath = './src';
const dfs = (dir) => {
    const filesInDir = fs_1.default.readdirSync(dir);
    for (const file of filesInDir) {
        const currPath = path_1.default.join(dir, file);
        if (fs_1.default.lstatSync(currPath).isDirectory()) {
            console.log('this is a folder');
            (0, exports.dfs)(currPath);
        }
        else {
            console.log(currPath, '-> this is a real file');
        }
    }
};
exports.dfs = dfs;
(0, exports.dfs)(folderPath);
