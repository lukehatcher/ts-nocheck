export type FileExtensionKey = 'jsx' | 'js' | 'tsx' | 'ts';
export interface IConfig {
  js: boolean;
  jsx: boolean;
  ts: boolean;
  tsx: boolean;
  path: string;
}

const cliConfigOptionsMap = new Map([
  ['--jsx-off', 'jsx'],
  ['--js-off', 'js'],
  ['--tsx-off', 'tsx'],
  ['--ts-off', 'ts'],
]);

export const cliParser = (args: string[]): IConfig | null => {
  if (!args.length) {
    console.error(`ERROR: no directory path provide.`);
  }

  const seen = new Set<string>(); // make sure there's no repeats args
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
