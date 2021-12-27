import { cliParser, IConfig } from '../cliParser';

const dir = './src';

describe('The CLI argument parser for ts-nocheck', () => {
  test('Should return default config object when no options are passed.', () => {
    const config = cliParser([dir]);

    const defaultConfig: IConfig = {
      jsx: true,
      js: true,
      tsx: true,
      ts: true,
      smartCheck: true,
      path: dir,
    };

    expect(config).toEqual(defaultConfig);
  });

  test('Should turn off jsx option when `--jsx-off` flag is passed.', () => {
    const config = cliParser(['--jsx-off', dir]);
    expect(config?.jsx).toBe(false);
  });

  test('Should turn off js option when `--js-off` flag is passed.', () => {
    const config = cliParser(['--js-off', dir]);
    expect(config?.js).toBe(false);
  });

  test('Should turn off tsx option when `--tsx-off` flag is passed.', () => {
    const config = cliParser(['--tsx-off', dir]);
    expect(config?.tsx).toBe(false);
  });

  test('Should turn off ts option when `--ts-off` flag is passed.', () => {
    const config = cliParser(['--ts-off', dir]);
    expect(config?.ts).toBe(false);
  });

  test('Should turn off samrt check option when `--smart-check-off` flag is passed.', () => {
    const config = cliParser(['--smart-check-off', dir]);
    expect(config?.smartCheck).toBe(false);
  });

  test('Should return null when an invalid argument is passed.', () => {
    const config = cliParser(['asdf', dir]);
    expect(config).toBe(null);
  });

  test('Should return null when a vaild argument is repeated.', () => {
    const config = cliParser(['--js-off', '--js-off', dir]);
    expect(config).toBe(null);
  });
});
