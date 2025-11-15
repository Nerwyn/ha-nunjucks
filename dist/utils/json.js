export function to_json(obj, ensure_ascii = false, pretty_print = false, sort_keys = false) {
    if (typeof ensure_ascii == 'object' && !Array.isArray(ensure_ascii)) {
        sort_keys = ensure_ascii.sort_keys ?? sort_keys;
        pretty_print = ensure_ascii.pretty_print ?? pretty_print;
        ensure_ascii = ensure_ascii.ensure_ascii ?? false;
    }
    if (sort_keys) {
        obj = Object.keys(obj)
            .sort()
            .reduce((obj2, key) => {
            obj2[key] = obj[key];
            return obj2;
        }, {});
    }
    let res = JSON.stringify(obj, undefined, pretty_print ? 2 : undefined);
    if (ensure_ascii) {
        res = res.replace(/[\u007F-\uFFFF]/g, (chr) => `\\u'${('0000' + chr.charCodeAt(0).toString(16)).substring(-4)}`);
    }
    return res;
}
export function from_json(value) {
    return JSON.parse(value);
}
export function is_defined(value) {
    if (value == undefined) {
        throw Error('UndefinedError: input is undefined');
    }
    return value;
}
