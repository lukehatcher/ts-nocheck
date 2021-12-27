import fs from 'fs';
import path from 'path';
import { FileExtensionKey, IConfig } from './cliParser';

const addNocheck = (filePath: string, fileLines: string[], config: IConfig) => {
  // smartCheck is on as default.
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
  // Using sync version for unit testing. Trade off for perf.
  fs.writeFileSync(filePath, fileLines.join('\n'));
};

export const dfs = async (dir: string, config: IConfig): Promise<void> => {
  const filesInDir = fs.readdirSync(dir);

  for (let i = 0; i < filesInDir.length; ++i) {
    const currPath = path.join(dir, filesInDir[i]);
    const stat = fs.lstatSync(currPath);

    if (stat.isDirectory()) {
      dfs(currPath, config);
    } else {
      // Add no-check line to file iff extension is specified in config.
      const { ext } = path.parse(currPath);
      if (config[ext.substring(1) as FileExtensionKey]) {
        // Using sync version for unit testing. Trade off for perf.
        const lines = fs.readFileSync(currPath, 'utf8').toString().split('\n');
        addNocheck(currPath, lines, config);
      }
    }
  }
};
