export declare type FileExtensionKey = 'jsx' | 'js' | 'tsx' | 'ts';
export interface IConfig {
    js: boolean;
    jsx: boolean;
    ts: boolean;
    tsx: boolean;
    path: string;
}
export declare const cliParser: (args: string[]) => IConfig | null;
