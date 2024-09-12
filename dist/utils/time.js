"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = now;
exports.utcnow = utcnow;
exports.today_at = today_at;
exports.as_datetime = as_datetime;
exports.as_timestamp = as_timestamp;
exports.as_local = as_local;
exports.strptime = strptime;
exports.timedelta = timedelta;
const py_datetime_1 = __importStar(require("py-datetime"));
function now() {
    return py_datetime_1.default.datetime.now();
}
function utcnow() {
    return py_datetime_1.default.datetime.utcnow();
}
function today_at(value = '00:00') {
    const [hour, minutes, seconds, milliseconds] = value.split(':');
    const now = py_datetime_1.default.datetime.now();
    return py_datetime_1.default.datetime(now.year, now.month, now.day, Number(hour), Number(minutes), Number(seconds), Number(milliseconds));
}
function as_datetime(value, fallback) {
    try {
        if (typeof value == 'number' || typeof value == 'string') {
            return py_datetime_1.default.datetime(Number(value) * 1000);
        }
        if (!value.year || !value.month || !value.day) {
            throw Error('Not a datetime or timestamp');
        }
        const res = py_datetime_1.default.datetime(value);
        for (const field of py_datetime_1.TimeIntervals) {
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
function as_timestamp(value, fallback) {
    try {
        if (typeof value == 'string') {
            return Date.parse(value) / 1000;
        }
        return py_datetime_1.default.datetime(value).jsDate.getTime() / 1000;
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
function as_local(value) {
    return py_datetime_1.default.datetime(py_datetime_1.default.datetime(value).jsDate);
}
function strptime(value, format, fallback) {
    try {
        return py_datetime_1.default.datetime.strptime(value, format);
    }
    catch (e) {
        if (fallback) {
            return fallback;
        }
        throw e;
    }
}
function timedelta(days, seconds, microseconds, milliseconds, minutes, hours, weeks) {
    return py_datetime_1.default.timedelta(days ?? 0, seconds ?? 0, milliseconds ?? 0 + 0.001 * (microseconds ?? 0), minutes ?? 0, hours ?? 0, weeks ?? 0);
}
