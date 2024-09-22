export function match(value, find) {
    return new RegExp(`^${find}`).test(value);
}
export function search(value, find) {
    return new RegExp(find, 'g').test(value);
}
export function test(value, find) {
    return new RegExp(find).test(value);
}
export function regex_replace(value, find = '', replace = '') {
    return value.replace(new RegExp(find, 'g'), replace);
}
export function regex_findall(value, find = '') {
    return value.match(new RegExp(find, 'g')) ?? [];
}
export function regex_findall_index(value, find = '', index = 0) {
    return (value.match(new RegExp(find, 'g')) ?? [])[index];
}
