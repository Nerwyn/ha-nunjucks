export function isNaNCheck(res) {
    if (res.toString().includes('NaN')) {
        throw Error('Result returned NaN.');
    }
}
export function float(value, fallback) {
    try {
        const res = parseFloat(value);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function is_number(value) {
    if (value == Infinity) {
        return false;
    }
    return !isNaN(value);
}
export function int(value, fallback) {
    try {
        const res = parseInt(value);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function bool(value, fallback) {
    if (typeof value == 'number') {
        if (value != 0) {
            return true;
        }
        else {
            return false;
        }
    }
    if (typeof value == 'boolean') {
        return value;
    }
    value = value.toLowerCase();
    if (['true', 'yes', 'on', 'enable', '1'].includes(value)) {
        return true;
    }
    if (['false', 'no', 'off', 'disable', '0'].includes(value)) {
        return false;
    }
    if (fallback) {
        return fallback;
    }
    throw Error('Invalid input');
}
export function log(value, base = Math.E, fallback) {
    try {
        const res = Math.log(value) / Math.log(base);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function sin(value, fallback) {
    try {
        const res = Math.sin(value);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function cos(value, fallback) {
    try {
        const res = Math.cos(value);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function tan(value, fallback) {
    try {
        const res = Math.tan(value);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function asin(value, fallback) {
    try {
        const res = Math.asin(value);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function acos(value, fallback) {
    try {
        const res = Math.acos(value);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function atan(value, fallback) {
    try {
        const res = Math.atan(value);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function atan2(y, x, fallback) {
    try {
        const res = Math.atan2(y, x);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function sqrt(value, fallback) {
    try {
        const res = Math.sqrt(value);
        isNaNCheck(res.toString());
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function max(...args) {
    return Math.max(...args.flat(Infinity));
}
export function min(...args) {
    return Math.min(...args.flat(Infinity));
}
export function average(values, fallback) {
    try {
        values = values.flat(Infinity);
        if (values.some((value) => isNaN(value))) {
            throw Error('Non-numeric values provided');
        }
        return values.reduce((a, b) => a + b) / values.length;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function median(values, fallback) {
    try {
        values = values.flat(Infinity);
        if (values.some((value) => isNaN(value))) {
            throw Error('Non-numeric values provided');
        }
        if (!values.length) {
            throw Error('Empty array provided');
        }
        values = values.sort((a, b) => a - b);
        const mid = Math.floor(values.length / 2);
        if (values.length % 2) {
            return values[mid];
        }
        return (values[mid - 1] + values[mid]) / 2;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function statistical_mode(values, fallback) {
    try {
        values = values.flat(Infinity);
        if (values.some((value) => isNaN(value))) {
            throw Error('Non-numeric values provided');
        }
        if (!values.length) {
            throw Error('Empty array provided');
        }
        const counts = {};
        for (const value of values) {
            if (!counts[value]) {
                counts[value] = 0;
            }
            counts[value]++;
        }
        let mode = values[0];
        let count = 0;
        for (const value in counts) {
            if (counts[value] > count) {
                mode = Number(value);
                count = counts[value];
            }
        }
        return mode;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export const e = Math.E;
export const pi = Math.PI;
export const tau = 2 * Math.PI;
export const inf = Infinity;
