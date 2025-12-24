import struct from 'python-struct';
export declare function pack(data: struct.DataType[], format_string: string): Buffer<ArrayBufferLike> | undefined;
export declare function unpack(data: Buffer<ArrayBufferLike>, format_string: string, offset?: number): struct.DataType | struct.DataType[] | undefined;
