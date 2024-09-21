import { PyDatetime } from 'py-datetime';
export declare function list(value: object[]): boolean;
export declare function set(value: object[]): value is object[] & Set<any>;
export declare function datetime(value: object): value is PyDatetime;
export declare function string_like(value: object): value is Uint8Array;
