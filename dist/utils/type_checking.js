import { PyDatetime } from 'py-datetime';
// TODO tests
export function list(value) {
    return Array.isArray(value);
}
export function set(value) {
    return value instanceof Set;
}
export function datetime(value) {
    return value instanceof PyDatetime;
}
export function string_like(value) {
    return typeof value == 'string' || value instanceof Uint8Array;
}
