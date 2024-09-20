export function contains(list, value) {
    return Array.isArray(list) ? list?.includes(value) : false;
}
