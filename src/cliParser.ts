// class CliParser {
//   private readonly options: Map<string, string>;
//   constructor() {
//     options = new Map([["jsx": true]])
//   }
// }

// const options = new Map([
//   ["--jsx-off"]
// ])

// defaults to add to all ts files

interface IConfig {
  js: boolean;
  jsx: boolean;
  ts: boolean;
  tsx: boolean;
}

const cliConfigOptionsMap = new Map([
  ['--jsx-off', 'jsx'],
  ['--js-off', 'js'],
  ['--tsx-off', 'tsx'],
  ['--ts-off', 'ts'],
]);

// const cliConfigOptionsSet = new Set(...cliConfigOptionsMap.values());

const parse = (params: string[]): IConfig => {
  const seen = new Set<string>(); // make sure there's no repeats
  const config: IConfig = {
    jsx: true,
    js: true,
    tsx: true,
    ts: true,
  };
  for (let i = 0; i < params.length; i++) {
    if (!cliConfigOptionsMap.has(params[i])) {
      console.log(
        `did not recognize the command line argument {param[i]}, run "npx ts-nocheck -h" to see accepted commands`
      );
    }
    if (seen.has(params[i])) {
      console.log('repeated cli arg, try again');
    }
    seen.add(params[i]);

    const key = cliConfigOptionsMap.get(params[i]);
    config[key as keyof IConfig] = false;
  }
  return config;
};
