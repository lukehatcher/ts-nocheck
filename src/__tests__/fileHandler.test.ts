// @ts-nocheck
import fs from 'fs';
import path from 'path';
import mock from 'mock-fs';
import { dfs } from '../fileHandler';
import { FileExtensionKey, IConfig } from '../cliParser';

const dirPath = path.join(process.cwd(), 'srcMock');
const filePath = (ext: FileExtensionKey): string => path.join(process.cwd(), 'srcMock', 'folderMock', `index.${ext}`);
const config = (key?: keyof Omit<IConfig, 'path'>): IConfig => {
  const defaultConfig = {
    jsx: true,
    js: true,
    tsx: true,
    ts: true,
    smartCheck: true,
    path: dirPath,
  };

  if (key) {
    defaultConfig[key] = false;
  }
  return defaultConfig;
};

describe('The file handler for @ts-nocheck (default config)', () => {
  afterEach(() => {
    mock.restore();
  });

  test('Adds a @no-check to js, jsx, ts, tsx file', async () => {
    mock({
      'srcMock/folderMock': {
        'index.js': '// hello world',
        'index.jsx': '// hello world',
        'index.ts': '// hello world',
        'index.tsx': '// hello world',
      },
    });

    await dfs(dirPath, config());

    const linesJs = fs.readFileSync(filePath('js'), 'utf8').toString().split('\n');
    const linesJsx = fs.readFileSync(filePath('jsx'), 'utf8').toString().split('\n');
    const linesTs = fs.readFileSync(filePath('ts'), 'utf8').toString().split('\n');
    const linesTsx = fs.readFileSync(filePath('tsx'), 'utf8').toString().split('\n');
    expect(linesJs[0]).toBe('// @ts-nocheck');
    expect(linesJsx[0]).toBe('// @ts-nocheck');
    expect(linesTs[0]).toBe('// @ts-nocheck');
    expect(linesTsx[0]).toBe('// @ts-nocheck');
  });

  // smartCheck config option

  test('Does not add a @no-check to a file who already has one (default config)', async () => {
    mock({
      'srcMock/folderMock': {
        'index.ts': '// @ts-nocheck\n// hello world',
      },
    });

    await dfs(dirPath, config());
    const lines = fs.readFileSync(filePath('ts'), 'utf8').toString().split('\n');
    expect(lines[1]).toBe('// hello world');
  });

  test('Adds a @no-check to a file which already has one when smartCheck is off', async () => {
    mock({
      'srcMock/folderMock': {
        'index.ts': '// @ts-nocheck',
      },
    });

    await dfs(dirPath, config('smartCheck'));
    const lines = fs.readFileSync(filePath('ts'), 'utf8').toString().split('\n');
    expect(lines[1]).toBe('// @ts-nocheck');
  });

  // File extension config option

  test('Should not add @no-check to js file when js config option is off', async () => {
    mock({
      'srcMock/folderMock': {
        'index.js': '// hello world',
      },
    });

    await dfs(dirPath, config('js'));
    const lines = fs.readFileSync(filePath('js'), 'utf8').toString().split('\n');
    expect(lines[0]).toBe('// hello world');
  });

  test('Should not add @no-check to jsx file when jsx config option is off', async () => {
    mock({
      'srcMock/folderMock': {
        'index.jsx': '// hello world',
      },
    });

    await dfs(dirPath, config('jsx'));
    const lines = fs.readFileSync(filePath('jsx'), 'utf8').toString().split('\n');
    expect(lines[0]).toBe('// hello world');
  });

  test('Should not add @no-check to ts file when ts config option is off', async () => {
    mock({
      'srcMock/folderMock': {
        'index.ts': '// hello world',
      },
    });

    await dfs(dirPath, config('ts'));
    const lines = fs.readFileSync(filePath('ts'), 'utf8').toString().split('\n');
    expect(lines[0]).toBe('// hello world');
  });

  test('Should not add @no-check to tsx file when tsx config option is off', async () => {
    mock({
      'srcMock/folderMock': {
        'index.tsx': '// hello world',
      },
    });

    await dfs(dirPath, config('tsx'));
    const lines = fs.readFileSync(filePath('tsx'), 'utf8').toString().split('\n');
    expect(lines[0]).toBe('// hello world');
  });
});
