import fs from 'fs';
import path from 'path';

const folderPath = './src'; // take as arg

// type Extension = '.ts' | '.tsx' | '.js' | '.jsx';
const extensions: ReadonlyArray<string> = ['.ts', '.tsx', '.js', '.jsx'];

const addNocheck = (filePath: string, fileLines: string[]) => {
  // fileLines.unshift('// @ts-nocheck');
  // fileLines.splice(0, 1);
  console.log('hi');
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

export const dfs = async (dir: string) => {
  const filesInDir = fs.readdirSync(dir);
  // TODO: change to for-i loop (perf)
  for (const file of filesInDir) {
    const currPath = path.join(dir, file);
    const stat = fs.lstatSync(currPath);

    if (stat.isDirectory()) {
      dfs(currPath);
    } else {
      // add no-check line to file
      const { ext } = path.parse(currPath);
      if (extensions.includes(ext)) {
        const lines = await getFileLinesAsync(currPath);
        addNocheck(currPath, lines);
      }
    }
  }
};

dfs(folderPath);
