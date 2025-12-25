import { datetime } from 'ts-py-datetime';

export function list(value: object[]) {
	return Array.isArray(value);
}

export function set(value: object[]) {
	return value instanceof Set;
}

export function is_datetime(value: object) {
	return value instanceof datetime;
}

export function string_like(value: object) {
	return (
		typeof value == 'string' ||
		value instanceof Buffer ||
		value instanceof Uint8Array ||
		value instanceof Uint16Array ||
		value instanceof Uint32Array ||
		value instanceof ArrayBuffer
	);
}

export function pytypeof(value: any) {
	switch (typeof value) {
		case 'string':
			return 'str';
		case 'bigint':
		case 'number':
			return Number.isInteger(value) ? 'int' : 'float';
		case 'boolean':
			return 'bool';
		case 'function':
			return 'function';
		case 'symbol':
		case 'object':
			return Array.isArray(value) ? 'list' : 'dict';
		case 'undefined':
		default:
			return 'NoneType';
	}
}
