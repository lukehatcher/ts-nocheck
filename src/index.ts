import { cliParser } from './cliParser';
import { dfs } from './fileHandler';

const config = cliParser(process.argv.slice(2));

if (config) {
  dfs(config.path, config);
}
