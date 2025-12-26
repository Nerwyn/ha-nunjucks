function getFunction(name) {
    for (const getter of ['getGlobal', 'getFilter', 'getTest']) {
        try {
            return window.haNunjucks.env[getter](name);
        }
        catch { }
    }
}
export function map(arr, fn, ...args) {
    if (typeof fn == 'string') {
        fn = getFunction(fn);
    }
    return arr.map((item) => fn(item, ...args));
}
export function apply(value, fn, ...args) {
    if (typeof fn == 'string') {
        fn = getFunction(fn);
    }
    return fn(value, ...args);
}
export function as_function(macro) {
    function wrapper(...args) {
        let returnValue = undefined;
        function returns(value) {
            returnValue = value;
            return value;
        }
        macro(...args, returns);
        return returnValue;
    }
    return wrapper;
}
