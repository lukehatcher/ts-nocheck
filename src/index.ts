import fs from 'fs';
import path from 'path';
import { cliParser, FileExtensionKey, IConfig } from './cliParser';

// options
const smartCheck = true;

const addNocheck = (filePath: string, fileLines: string[]) => {
  // fileLines.splice(0, 1);

  // smartCheck is on by default.
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
  fileLines.unshift('// @ts-nocheck');
  fs.writeFile(filePath, fileLines.join('\n'), (err) => {
    if (err) console.error(err);
  });
};

const getFileLinesAsync = (filePath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) reject(err);
      // resolve promise with array of lines
      resolve(file.toString().split('\n'));
    });
  });
};

const dfs = async (dir: string, config: IConfig) => {
  const filesInDir = fs.readdirSync(dir);
  for (let i = 0; i < filesInDir.length; ++i) {
    const currPath = path.join(dir, filesInDir[i]);
    const stat = fs.lstatSync(currPath);

    if (stat.isDirectory()) {
      dfs(currPath, config);
    } else {
      // add no-check line to file iff specified in file
      const { ext } = path.parse(currPath);
      if (config[ext.substring(1) as FileExtensionKey]) {
        const lines = await getFileLinesAsync(currPath);
        addNocheck(currPath, lines);
      }
    }
  }
};

const cliArgs = process.argv.slice(2);
const config = cliParser(cliArgs);
if (config) {
  dfs(config.path, config);
}
