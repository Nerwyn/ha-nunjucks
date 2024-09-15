import dt, { PyDatetime } from 'py-datetime';
export function now() {
    return dt.datetime.now();
}
export function utcnow() {
    return dt.datetime.utcnow();
}
export function today_at(value = '00:00') {
    const [hour, minutes, seconds, milliseconds] = value.split(':');
    const now = dt.datetime.utcnow();
    const res = dt.datetime(now.year, now.month, now.day, Number(hour), Number(minutes), Number(seconds), Number(milliseconds));
    isNaNCheck(res.str());
    return res;
}
export function as_datetime(value, fallback) {
    try {
        if (typeof value == 'number' || typeof value == 'string') {
            value = parseFloat(value);
        }
        const res = dt.datetime.utc(value);
        isNaNCheck(res.str());
        if (value.year &&
            value.hour == undefined) {
            return new PyDatetime(res.year, res.month, res.day);
        }
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function as_timestamp(value, fallback) {
    try {
        let res;
        if (typeof value == 'string') {
            if (!(value.includes(' ') || value.includes('T'))) {
                value += ' 00:00:00';
            }
            res = Date.parse(value) / 1000;
        }
        else {
            res = dt.datetime.utc(value).jsDate.getTime() / 1000;
        }
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
export function strptime(value, format, fallback) {
    try {
        format = format.replace(/%z/g, '%Z');
        const res = dt.datetime.strptime(value, format);
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
export function timedelta(days, seconds, microseconds, milliseconds, minutes, hours, weeks) {
    let res;
    if (days != null && typeof days != 'number') {
        res = dt.timedelta(days);
    }
    else {
        res = dt.timedelta(days ?? 0, seconds ?? 0, milliseconds ?? 0 + 0.001 * (microseconds ?? 0), minutes ?? 0, hours ?? 0, weeks ?? 0);
    }
    isNaNCheck(res.str());
    return res;
}
function isNaNCheck(res) {
    if (res.toString().includes('NaN')) {
        throw Error('Result returned NaN.');
    }
}
