import dt, { PyDatetime } from 'py-datetime';
import { isNaNCheck } from './numeric';
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
// TODO test
export function as_local(value) {
    return dt.datetime(dt.datetime(value).jsDate);
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
function timeDiff(datetime, precision = 1, until = false) {
    if (!(datetime instanceof PyDatetime)) {
        return null;
    }
    let diff = now().valueOf() - as_local(datetime).valueOf();
    if (until) {
        diff = -1 * diff;
    }
    if (diff <= 0) {
        return datetime;
    }
    if (precision == 0 || precision > 6) {
        precision = 6;
    }
    const toSeconds = {
        year: 60 * 60 * 24 * 365,
        month: 60 * 60 * 24 * 30,
        day: 60 * 60 * 24,
        hour: 60 * 60,
        minute: 60,
        second: 1,
    };
    const units = Object.keys(toSeconds);
    let res = '';
    let startRes = false;
    for (let i = 0; i < precision; i++) {
        let value = diff / toSeconds[units[i]];
        if (i == precision - 1) {
            value = Math.round(value);
        }
        else {
            value = Math.floor(value);
        }
        if (startRes || value > 0) {
            startRes = true;
            res += ` ${value} ${units[i]}${value != 1 ? 's' : ''}`;
            diff -= value * toSeconds[units[i]];
        }
    }
    return res.trim();
}
export function time_since(datetime, precision = 1) {
    return timeDiff(datetime, precision);
}
export function time_until(datetime, precision = 1) {
    return timeDiff(datetime, precision, true);
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
export function as_timedelta(value) { }
