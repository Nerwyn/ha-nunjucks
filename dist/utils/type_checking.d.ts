import { datetime } from 'ts-py-datetime';
export declare function list(value: object[]): boolean;
export declare function set(value: object[]): value is object[] & Set<any>;
export declare function is_datetime(value: object): value is datetime;
export declare function string_like(value: object): value is Buffer | Uint8Array | Uint16Array | Uint32Array | ArrayBuffer;
