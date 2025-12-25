export function map(arr, fn, ...args) {
    if (typeof fn == 'string') {
        for (const getter of ['getGlobal', 'getFilter', 'getTest']) {
            try {
                fn = window.haNunjucks.env[getter](fn);
            }
            catch { }
        }
    }
    return arr.map((item) => fn(item, ...args));
}
export function apply(value, fn, ...args) {
    if (typeof fn == 'string') {
        for (const getter of ['getGlobal', 'getFilter', 'getTest']) {
            try {
                fn = window.haNunjucks.env[getter](fn);
            }
            catch { }
        }
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
