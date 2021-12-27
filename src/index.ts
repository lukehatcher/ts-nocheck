import { cliParser } from './cliParser';
import { dfs } from './fileHandler';

const cliArgs = process.argv.slice(2);

if (cliArgs.length) {
  const config = cliParser(cliArgs);
  if (config) {
    dfs(config.path, config);
  }
} else {
  console.error('ERROR: No arguments given.');
}
