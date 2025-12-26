import struct from 'python-struct';
export function pack(data, format_string) {
    try {
        return struct.pack(format_string, data);
    }
    catch {
        return undefined;
    }
}
export function unpack(data, format_string, offset = 0) {
    try {
        if (offset) {
            return struct.unpackFrom(format_string, data, undefined, offset);
        }
        return struct.unpack(format_string, data);
    }
    catch {
        return undefined;
    }
}
