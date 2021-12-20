/**
 * shape of the object that is returned by the cliparser.
 */
export interface IConfig {
  js: boolean;
  jsx: boolean;
  ts: boolean;
  tsx: boolean;
  path: string;
}

/**
 * Map cli flags to file extensions.
 */
const cliConfigOptionsMap = new Map([
  ['--jsx-off', 'jsx'],
  ['--js-off', 'js'],
  ['--tsx-off', 'tsx'],
  ['--ts-off', 'ts'],
]);

// type tbd = '--jsx-off' | '--js-off' | '--tsx-off' | '--ts-off';
export type FileExtensionKey = 'jsx' | 'js' | 'tsx' | 'ts';

export const cliParser = (args: string[]): IConfig | null => {
  if (!args.length) {
    console.error(`ERROR: no directory path provide.`);
  }
  // TODO: add regex for path
  if (!args[args.length - 1]) {
    console.error(`ERROR: invalid directory path provided.`);
  }
  const seen = new Set<string>(); // make sure there's no repeats args

  // What is going to be returned by this cli parser.
  const config: IConfig = {
    jsx: true,
    js: true,
    tsx: true,
    ts: true,
    path: args[args.length - 1],
  };

  for (let i = 0; i < args.length - 1; ++i) {
    if (!cliConfigOptionsMap.has(args[i])) {
      console.error(`ERROR: "${args[i]}" is not an accepted argument.`);
      return null;
    }
    if (seen.has(args[i])) {
      console.error(`ERROR: repeated argument "${args[i]}" used.`);
      return null;
    }
    seen.add(args[i]);

    const key = cliConfigOptionsMap.get(args[i]);
    config[key as FileExtensionKey] = false;
  }
  return config;
};
