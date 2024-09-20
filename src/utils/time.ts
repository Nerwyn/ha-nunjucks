import dt, {
	PyDate,
	PyDatetime,
	PyTimedelta,
	PyTimedeltaDict,
} from 'py-datetime';

import { isNaNCheck } from './numeric';

export function now() {
	return dt.datetime.now();
}

export function utcnow() {
	return dt.datetime.utcnow();
}

export function today_at(value: string = '00:00') {
	const [hour, minutes, seconds, milliseconds] = value.split(':');
	const now = dt.datetime.now();
	const res = dt.datetime(
		now.year,
		now.month,
		now.day,
		Number(hour),
		Number(minutes),
		Number(seconds),
		Number(milliseconds),
	);
	isNaNCheck(res.str());
	return res;
}

export function as_datetime(
	value: number | string | PyDatetime | PyDate,
	fallback: string | undefined | Record<string, string | boolean> = undefined,
	utc: boolean = true,
) {
	if (typeof fallback == 'object' && !Array.isArray(fallback)) {
		utc = (fallback.utc as boolean) ?? utc;
		fallback = (fallback.fallback as string) ?? undefined;
	}
	try {
		let res: PyDatetime | undefined = undefined;
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
						res = dt.datetime.strptime(
							value,
							format,
							utc,
						) as PyDatetime;
						break;
					} catch {}
				}
				if (!res) {
					value = parseFloat(value);
				}
			} else {
				value = parseFloat(value);
			}
		}
		if (!res) {
			if (utc) {
				res = dt.datetime.utc(value as PyDatetime);
			} else {
				res = dt.datetime(value as PyDatetime);
			}
		}
		isNaNCheck(res.str());
		if (
			(value as PyDatetime).year &&
			(value as PyDatetime).hour == undefined
		) {
			return new PyDatetime(res.year, res.month, res.day);
		}
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function as_timestamp(
	value: number | string | PyDatetime | PyDate,
	fallback?: string,
) {
	try {
		let res: number;
		if (typeof value == 'string') {
			if (!(value.includes(' ') || value.includes('T'))) {
				value += ' 00:00:00';
			}
			res = Date.parse(value) / 1000;
		} else {
			res = dt.datetime.utc(value as PyDatetime).jsDate.getTime() / 1000;
		}
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function as_local(value: PyDatetime) {
	return dt.datetime(dt.datetime(value).jsDate);
}

export function strptime(
	value: string,
	format: string,
	fallback:
		| PyDatetime
		| string
		| undefined
		| Record<string, PyDatetime | string | boolean> = undefined,
	utc: boolean = false,
) {
	if (
		typeof fallback == 'object' &&
		!Array.isArray(fallback) &&
		!(fallback instanceof PyDatetime) &&
		!((fallback as object) instanceof PyDate)
	) {
		utc = (fallback as Record<string, boolean>).utc ?? utc;
		fallback = (fallback as Record<string, string>).fallback ?? undefined;
	}
	try {
		format = format.replace(/%z/g, '%Z');
		const res = dt.datetime.strptime(value, format, utc);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

function timeDiff(
	datetime: PyDatetime,
	precision: number = 1,
	until: boolean = false,
) {
	if (!(datetime instanceof PyDatetime)) {
		return datetime;
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

	const toSeconds: Record<string, number> = {
		year: 60 * 60 * 24 * 365,
		month: 60 * 60 * 24 * 30,
		day: 60 * 60 * 24,
		hour: 60 * 60,
		minute: 60,
		second: 1,
	} as const;
	const units = Object.keys(toSeconds);
	let res = '';
	let startRes = false;
	for (let i = 0; i < precision; i++) {
		let value = diff / toSeconds[units[i]];
		if (i == precision - 1) {
			value = Math.round(value);
		} else {
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

export function time_since(datetime: PyDatetime, precision: number = 1) {
	return timeDiff(datetime, precision);
}

export function time_until(datetime: PyDatetime, precision: number = 1) {
	return timeDiff(datetime, precision, true);
}

export function timedelta(
	days?: number | PyTimedeltaDict,
	seconds?: number,
	microseconds?: number,
	milliseconds?: number,
	minutes?: number,
	hours?: number,
	weeks?: number,
) {
	let res;
	if (days != null && typeof days != 'number') {
		res = dt.timedelta(days);
	} else {
		res = dt.timedelta(
			days ?? 0,
			seconds ?? 0,
			milliseconds ?? 0 + 0.001 * (microseconds ?? 0),
			minutes ?? 0,
			hours ?? 0,
			weeks ?? 0,
		);
	}
	isNaNCheck(res.str());
	return res;
}

export function as_timedelta(value: string) {
	try {
		let res: PyTimedelta;
		if (
			value.includes(':') ||
			value.includes(' ') ||
			/^\d*\.?\d*$/.test(value)
		) {
			let daysStr, timeStr;
			if (value.includes(' ')) {
				if (value.includes('days')) {
					[daysStr, timeStr] = value.split(' days ');
				} else {
					[daysStr, timeStr] = value.split(' ');
				}
			} else {
				daysStr = 0;
				timeStr = value;
			}
			const [seconds, minutes, hours] = timeStr.split(':').reverse();
			res = dt.timedelta(
				Number(daysStr),
				Number(seconds.replace(',', '.') ?? 0),
				0,
				Number(minutes ?? 0),
				Number(hours ?? 0),
			);
		} else if (value.startsWith('P')) {
			const values = value.replace(/P|T/g, '').match(/(\d*?)[A-Z]/g);
			if (!values) {
				return null;
			}
			const amounts: Record<string, number> = {};
			for (const v of values) {
				const amount = v.match(/^(\d*)/);
				const unit = v.match(/[A-Z]$/);
				if (amount && unit) {
					amounts[unit[0]] = parseFloat(amount[0]);
				}
			}
			res = dt.timedelta(
				amounts.D,
				amounts.S,
				0,
				amounts.M,
				amounts.H,
				amounts.W,
			);
		} else {
			return null;
		}
		isNaNCheck(res.str());
		return res;
	} catch {
		return null;
	}
}
