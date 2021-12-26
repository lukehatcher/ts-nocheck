<h1 align="center"><strong>ts-nocheck</strong></h1>
<h4 align="center">TS -> JS migration tool. Painlessly add  <code>@ts-nocheck</code> to the files you need it in.</h4>

## Default behavior

Prepends `// @ts-nocheck` to the top of all .js, .jsx, .ts and .tsx files in a given directory which do not already have one.

## Usage

```bash
$ npx ts-nocheck .
```

## API

```
ts-nocheck [options] dir

Options configuration:
  --js-off                Disable adding nocheck to js files
  --jsx-off               Disable adding nocheck to js files
  --ts-off                Disable adding nocheck to ts files
  --tsx-off               Disable adding nocheck to tsx files
  --smart-check-off        Add nocheck to all js, jsx, ts, tsx files even if it already has one
```

## Motivation

Changing the file extension of all your .js/.jsx files to .ts/.tsx at once at the start of your migration comes with the benefit of much more readable Git diffs in the future. For example, if a file is renamed (aka extension changed) and then enough file changes are made, Git will list this as two seperate files, a file deletion (JS file) + a brand new file (TS file). This makes the diffs hard to compare.

However, changing all file extensions to .ts/.tsx at once obviously prevents you from compiling until types for all files are added. Adding [`// @ts-nocheck`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#-ts-nocheck-in-typescript-files) to the top of all your files can help ease the pain of a JS to TS migration.

Pairs well with tools such as [js-to-tsx](https://github.com/markogresak/js-to-tsx).
