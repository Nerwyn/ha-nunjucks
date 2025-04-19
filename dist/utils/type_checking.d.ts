import { datetime } from 'ts-py-datetime';
export declare function list(value: object[]): boolean;
export declare function set(value: object[]): value is object[] & Set<any>;
export declare function is_datetime(value: object): value is datetime;
export declare function string_like(value: object): value is ArrayBuffer | Buffer<ArrayBuffer> | Buffer<any> | Uint8Array<ArrayBufferLike> | Uint16Array<ArrayBufferLike> | Uint32Array<ArrayBufferLike>;
