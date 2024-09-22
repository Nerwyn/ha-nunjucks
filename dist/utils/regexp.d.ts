export declare function match(value: string, find: string): boolean;
export declare function search(value: string, find: string): boolean;
export declare function test(value: string, find: RegExp): boolean;
export declare function regex_replace(value: string, find?: RegExp | string, replace?: string): string;
export declare function regex_findall(value: string, find?: RegExp | string): [] | RegExpMatchArray;
export declare function regex_findall_index(value: string, find?: RegExp | string, index?: number): string;
