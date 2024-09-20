export function set(...args) {
    return new Set(args.flat(Infinity));
}
export function list(...args) {
    return args.map((arg) => Array.from(arg)).flat(Infinity);
}
