import dt, { date, datetime } from 'ts-py-datetime';
import { isNaNCheck } from './numeric';
export function now() {
    return dt.datetime.now();
}
export function utcnow() {
    return dt.datetime.utcnow();
}
export function today_at(value = '00:00') {
    const [hour, minutes, seconds, milliseconds] = value.split(':');
    const now = dt.datetime.now();
    const res = dt.datetime(now.year, now.month, now.day, Number(hour ?? 0), Number(minutes ?? 0), Number(seconds ?? 0), Number(milliseconds ?? 0));
    isNaNCheck(res.toString());
    return res;
}
export function as_datetime(value, fallback = undefined, utc = true) {
    if (typeof fallback == 'object' && !Array.isArray(fallback)) {
        utc = fallback.utc ?? utc;
        fallback = fallback.fallback ?? undefined;
    }
    try {
        let res = undefined;
        if (typeof value == 'string') {
            if (/[^\d]/g.test(value)) {
                value = value.replace(/T/g, ' ');
                const formats = [
                    '%Y-%m-%d %H:%M:%S.%f%Z',
                    '%Y-%m-%d %H:%M:%S.%f',
                    '%Y-%m-%d %H:%M:%S%Z',
                    '%Y-%m-%d %H:%M:%S',
                ];
                for (const format of formats) {
                    try {
                        res = dt.datetime.strptime(value, format, utc);
                        break;
                    }
                    catch { }
                }
                if (!res) {
                    value = parseFloat(value);
                }
            }
            else {
                value = parseFloat(value);
            }
        }
        else if (typeof value == 'number') {
            if (utc) {
                res = dt.datetime.utcfromtimestamp(value);
            }
            else {
                res = dt.datetime.fromtimestamp(value);
            }
        }
        else if (value instanceof date) {
            res = dt.datetime(value.year, value.month, value.day);
        }
        else {
            res = value;
        }
        isNaNCheck((res ?? 'NaN').toString());
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
        else if (typeof value == 'number') {
            res =
                dt.datetime.utcfromtimestamp(value).jsDate.getTime() /
                    1000;
        }
        else {
            res = value.jsDate.getTime() / 1000;
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
export function as_local(value) {
    return dt.datetime.fromjsdate(dt.datetime(value).jsDate);
}
export function strptime(value, format, fallback = undefined, utc = false) {
    if (typeof fallback == 'object' &&
        !Array.isArray(fallback) &&
        !(fallback instanceof datetime) &&
        !(fallback instanceof date)) {
        utc = fallback.utc ?? utc;
        fallback = fallback.fallback ?? undefined;
    }
    try {
        format = format.replace(/%z/g, '%Z');
        const res = dt.datetime.strptime(value, format, utc);
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
function timeDiff(input, precision = 1, until = false) {
    if (!(input instanceof datetime)) {
        return input;
    }
    let diff = now().valueOf() - as_local(input).valueOf();
    if (until) {
        diff = -1 * diff;
    }
    if (diff <= 0) {
        return input;
    }
    if (precision < 1 || precision > 6) {
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
    let p = 0;
    for (let i = 0; i < units.length; i++) {
        let value = diff / toSeconds[units[i]];
        if (i == p - 1) {
            value = Math.round(value);
        }
        else {
            value = Math.floor(value);
        }
        if (startRes || value > 0) {
            startRes = true;
            if (value > 0) {
                p += 1;
                res += ` ${value} ${units[i]}${value != 1 ? 's' : ''}`;
                diff -= value * toSeconds[units[i]];
            }
        }
        if (startRes && precision == p) {
            break;
        }
    }
    return res.trim();
}
export function relative_time(input) {
    return timeDiff(input);
}
export function time_since(input, precision = 1) {
    return timeDiff(input, precision);
}
export function time_until(input, precision = 1) {
    return timeDiff(input, precision, true);
}
export function as_timedelta(value) {
    try {
        let res;
        if (value.includes(':') ||
            value.includes(' ') ||
            /^\d*\.?\d*$/.test(value)) {
            let daysStr, timeStr;
            if (value.includes(' ')) {
                if (value.includes('days')) {
                    [daysStr, timeStr] = value.split(' days ');
                }
                else {
                    [daysStr, timeStr] = value.split(' ');
                }
            }
            else {
                daysStr = 0;
                timeStr = value;
            }
            const [seconds, minutes, hours] = timeStr.split(':').reverse();
            res = dt.timedelta(Number(daysStr), Number(seconds.replace(',', '.') ?? 0), 0, Number(minutes ?? 0), Number(hours ?? 0));
        }
        else if (value.startsWith('P')) {
            const values = value.replace(/P|T/g, '').match(/(\d*?)[A-Z]/g);
            if (!values) {
                return null;
            }
            const amounts = {};
            for (const v of values) {
                const amount = v.match(/^(\d*)/);
                const unit = v.match(/[A-Z]$/);
                if (amount && unit) {
                    amounts[unit[0]] = parseFloat(amount[0]);
                }
            }
            res = dt.timedelta(amounts.D, amounts.S, 0, amounts.M, amounts.H, amounts.W);
        }
        else {
            return null;
        }
        isNaNCheck(res.toString());
        return res;
    }
    catch {
        return null;
    }
}
export function timestamp_local(value, fallback) {
    try {
        const res = dt.datetime
            .fromtimestamp(value)
            .strftime('%Y-%m-%dT%H:%M:%S%Z');
        isNaNCheck(res);
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function timestamp_utc(value, fallback) {
    try {
        const res = dt.datetime
            .utcfromtimestamp(value)
            .strftime('%Y-%m-%dT%H:%M:%S%Z');
        isNaNCheck(res);
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
export function timestamp_custom(value, format_string, local = true, fallback = undefined) {
    if (typeof local == 'object' && !Array.isArray(local)) {
        fallback = local.fallback ?? fallback;
        local = local.local ?? true;
    }
    try {
        const res = (local
            ? dt.datetime.fromtimestamp(value)
            : dt.datetime.utcfromtimestamp(value)).strftime(format_string);
        isNaNCheck(res);
        return res;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
