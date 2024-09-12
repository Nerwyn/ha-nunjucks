import dt, { TimeIntervals } from 'py-datetime';
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
            return dt.datetime(Number(value) * 1000);
        }
        if (!value.year || !value.month || !value.day) {
            throw Error('Not a datetime or timestamp');
        }
        const res = dt.datetime(value);
        for (const field of TimeIntervals) {
            if (!res[field]) {
                res[field] = 0;
            }
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
