import dt, { PyDatetime } from 'py-datetime';
export function now() {
    return dt.datetime.now();
}
export function utcnow() {
    return dt.datetime.utcnow();
}
export function today_at(value = '00:00') {
    const [hour, minutes, seconds, milliseconds] = value.split(':');
    const now = dt.datetime.now();
    return dt.datetime(now.year, now.month, now.day, Number(hour), Number(minutes), Number(seconds), Number(milliseconds));
}
export function as_datetime(value, fallback) {
    try {
        if (typeof value == 'number' || typeof value == 'string') {
            value = parseFloat(value) * 1000;
        }
        const res = dt.datetime.utc(value);
        if (res.str().includes('NaN')) {
            throw Error('Input string not a number.');
        }
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
        if (typeof value == 'string') {
            return Date.parse(value) / 1000;
        }
        return dt.datetime(value).jsDate.getTime() / 1000;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function as_local(value) {
    return dt.datetime(dt.datetime(value).jsDate);
}
export function strptime(value, format, fallback) {
    try {
        return dt.datetime.strptime(value, format);
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function timedelta(days, seconds, microseconds, milliseconds, minutes, hours, weeks) {
    return dt.timedelta(days ?? 0, seconds ?? 0, milliseconds ?? 0 + 0.001 * (microseconds ?? 0), minutes ?? 0, hours ?? 0, weeks ?? 0);
}
