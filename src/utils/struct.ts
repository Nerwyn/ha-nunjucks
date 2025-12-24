import struct from 'python-struct';

export function pack(data: struct.DataType[], format_string: string) {
	try {
		return struct.pack(format_string, data);
	} catch {
		return undefined;
	}
}

export function unpack(
	data: Buffer<ArrayBufferLike>,
	format_string: string,
	offset: number = 0,
) {
	try {
		if (offset) {
			return struct.unpackFrom(format_string, data, undefined, offset);
		}
		return struct.unpack(format_string, data);
	} catch {
		return undefined;
	}
}
