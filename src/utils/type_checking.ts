import { PyDatetime } from 'py-datetime';

export function list(value: object[]) {
	return Array.isArray(value);
}

export function set(value: object[]) {
	return value instanceof Set;
}

export function datetime(value: object) {
	return value instanceof PyDatetime;
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
