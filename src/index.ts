// at the end of the script, print out how many js, ts, jsx, tsx files were edited
import fs from 'fs';
import path from 'path';

const folderPath = './src'; // take as arg

export const dfs = (dir: string) => {
  const filesInDir = fs.readdirSync(dir);
  // TODO: change to for-i loop (perf)
  for (const file of filesInDir) {
    const currPath = path.join(dir, file);
    // const stat = fs.lstatSync(currPath); // not using to avoid memory allocation
    if (fs.lstatSync(currPath).isDirectory()) {
      dfs(currPath);
    } else {
      console.log(currPath, '-> this is a real file');
    }
  }
};

dfs(folderPath);
