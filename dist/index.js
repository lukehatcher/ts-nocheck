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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cliParser_1 = require("./cliParser");
const smartCheck = true;
const addNocheck = (filePath, fileLines) => {
    if (smartCheck) {
        const firstLine = fileLines[0];
        if (firstLine.trim().startsWith('//')) {
            const commentContent = firstLine.substring(firstLine.indexOf('//') + 2);
            if (commentContent.trim().split(' ')[0] === '@ts-nocheck') {
                console.log('has a nocheck already');
                return;
            }
        }
    }
    fs_1.default.writeFile(filePath, fileLines.join('\n'), (err) => {
        if (err)
            console.error(err);
    });
};
const getFileLinesAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filePath, 'utf8', (err, file) => {
            if (err)
                reject(err);
            resolve(file.toString().split('\n'));
        });
    });
};
const dfs = (dir, config) => __awaiter(void 0, void 0, void 0, function* () {
    const filesInDir = fs_1.default.readdirSync(dir);
    for (let i = 0; i < filesInDir.length; ++i) {
        const currPath = path_1.default.join(dir, filesInDir[i]);
        const stat = fs_1.default.lstatSync(currPath);
        if (stat.isDirectory()) {
            dfs(currPath, config);
        }
        else {
            const { ext } = path_1.default.parse(currPath);
            if (config[ext.substring(1)]) {
                const lines = yield getFileLinesAsync(currPath);
                addNocheck(currPath, lines);
            }
        }
    }
});
const cliArgs = process.argv.slice(2);
const config = (0, cliParser_1.cliParser)(cliArgs);
if (config) {
    dfs(config.path, config);
}
