import { PyDate, PyDatetime } from 'py-datetime';
export declare function now(): PyDatetime;
export declare function utcnow(): PyDatetime;
export declare function today_at(value?: string): PyDatetime;
export declare function as_datetime(value: number | string | PyDate, fallback?: string): string | PyDatetime;
export declare function as_timestamp(value: string, fallback?: string): string | number;
export declare function as_local(value: PyDatetime): PyDatetime;
export declare function strptime(value: string, format: string, fallback?: string): string | PyDatetime;
export declare function timedelta(days?: number, seconds?: number, microseconds?: number, milliseconds?: number, minutes?: number, hours?: number, weeks?: number): import("py-datetime").PyTimedelta;
