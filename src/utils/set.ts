export function set(...args: string[]) {
	return new Set(args.flat(Infinity));
}

export function list(...args: string[][]) {
	return args.map((arg) => Array.from(arg)).flat(Infinity);
}
