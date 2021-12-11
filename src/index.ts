// at the end of the script, print out how many js, ts, jsx, tsx files were edited
import fs from 'fs';
import path from 'path';

const folderPath = './src'; // take as arg

const addNoCheckLine = async (filepath: string) => {
  const lines = await fs.readFile(filepath, (err, file) => {
    if (err) console.error(err);
  });
  lines.toString().split('\n').unshift('// @ts-nocheck');
  fs.writeFileSync(filepath, lines.join('\n'));
};

const readfile = (filePath: string):  => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, file) => {
    if (err) reject(err);
    resolve(file);
  })
})

export const dfs = (dir: string) => {
  const filesInDir = fs.readdirSync(dir);
  // TODO: change to for-i loop (perf)
  for (const file of filesInDir) {
    const currPath = path.join(dir, file);
    // const stat = fs.lstatSync(currPath); // not using to avoid memory allocation
    if (fs.lstatSync(currPath).isDirectory()) {
      dfs(currPath);
    } else {
      // add line to file
      // console.log(currPath, '-> this is a real file');
      addNoCheckLine(currPath);
    }
  }
};

dfs(folderPath);
