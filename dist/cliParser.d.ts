export declare type FileExtensionKey = 'jsx' | 'js' | 'tsx' | 'ts';
export interface IConfig {
    js: boolean;
    jsx: boolean;
    ts: boolean;
    tsx: boolean;
    smartCheck: boolean;
    path: string;
}
export declare const cliParser: (args: string[]) => IConfig | null;
