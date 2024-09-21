// TODO - validate and possibly add https://www.home-assistant.io/docs/configuration/templating/#complex-type-checking

export function set(...args: string[]) {
	return new Set(args.flat(Infinity));
}

export function list(...args: string[][]) {
	return args.map((arg) => Array.from(arg)).flat(Infinity);
}
