import dt, { date, datetime, timedelta } from 'ts-py-datetime';

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
		Number(hour ?? 0),
		Number(minutes ?? 0),
		Number(seconds ?? 0),
		Number(milliseconds ?? 0),
	);
	isNaNCheck(res.toString());
	return res;
}

export function as_datetime(
	value: number | string | datetime | date,
	fallback: string | undefined | Record<string, string | boolean> = undefined,
	utc: boolean = true,
) {
	if (typeof fallback == 'object' && !Array.isArray(fallback)) {
		utc = (fallback.utc as boolean) ?? utc;
		fallback = (fallback.fallback as string) ?? undefined;
	}
	try {
		let res: datetime | undefined = undefined;
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
						) as datetime;
						break;
					} catch {}
				}
				if (!res) {
					value = parseFloat(value);
				}
			} else {
				value = parseFloat(value);
			}
		} else if (typeof value == 'number') {
			if (utc) {
				res = dt.datetime.utcfromtimestamp(value);
			} else {
				res = dt.datetime.fromtimestamp(value);
			}
		} else if (value instanceof date) {
			res = dt.datetime(value.year, value.month, value.day);
		} else {
			res = value;
		}
		isNaNCheck((res ?? 'NaN').toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function as_timestamp(
	value: number | string | datetime | date,
	fallback?: string,
) {
	try {
		let res: number;
		if (typeof value == 'string') {
			if (!(value.includes(' ') || value.includes('T'))) {
				value += ' 00:00:00';
			}
			res = Date.parse(value) / 1000;
		} else if (typeof value == 'number') {
			res =
				dt.datetime.utcfromtimestamp(value as number).jsDate.getTime() /
				1000;
		} else {
			res = value.jsDate.getTime() / 1000;
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

export function as_local(value: datetime) {
	return dt.datetime.fromjsdate(dt.datetime(value).jsDate);
}

export function strptime(
	value: string,
	format: string,
	fallback:
		| datetime
		| string
		| undefined
		| Record<string, datetime | string | boolean> = undefined,
	utc: boolean = false,
) {
	if (
		typeof fallback == 'object' &&
		!Array.isArray(fallback) &&
		!(fallback instanceof datetime) &&
		!((fallback as object) instanceof date)
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
	input: datetime,
	precision: number = 1,
	until: boolean = false,
) {
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
	let p = 0;
	for (let i = 0; i < units.length; i++) {
		let value = diff / toSeconds[units[i]];
		if (i == p - 1) {
			value = Math.round(value);
		} else {
			value = Math.floor(value);
		}
		if (value > 0) {
			p += 1;
			res += ` ${value} ${units[i]}${value != 1 ? 's' : ''}`;
			diff -= value * toSeconds[units[i]];
		}
		if (res.length && precision == p) {
			break;
		}
	}
	return res.trim();
}

export function relative_time(input: datetime) {
	return timeDiff(input);
}

export function time_since(input: datetime, precision: number = 1) {
	return timeDiff(input, precision);
}

export function time_until(input: datetime, precision: number = 1) {
	return timeDiff(input, precision, true);
}

export function as_timedelta(value: string) {
	try {
		let res: timedelta;
		if (
			value.includes(':') ||
			value.includes(' ') ||
			/^\d*\.?\d*$/.test(value)
		) {
			let daysStr, timeStr;
			if (value.includes(' ')) {
				[daysStr, timeStr] = value
					.replace(/day(s?)/g, '')
					.replace(/\s+/g, ' ')
					.split(' ');
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
		isNaNCheck(res.toString());
		return res;
	} catch {
		return null;
	}
}

export function timestamp_local(value: number, fallback?: string) {
	try {
		const res = dt.datetime
			.fromtimestamp(value)
			.strftime('%Y-%m-%dT%H:%M:%S%Z');
		isNaNCheck(res);
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function timestamp_utc(value: number, fallback?: string) {
	try {
		const res = dt.datetime
			.utcfromtimestamp(value)
			.strftime('%Y-%m-%dT%H:%M:%S%Z');
		isNaNCheck(res);
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function timestamp_custom(
	value: number,
	format_string: string,
	local: boolean | Record<string, string | boolean> = true,
	fallback: string | undefined = undefined,
) {
	if (typeof local == 'object' && !Array.isArray(local)) {
		fallback = (local.fallback as string) ?? fallback;
		local = (local.local as boolean) ?? true;
	}
	try {
		const res = (
			local
				? dt.datetime.fromtimestamp(value)
				: dt.datetime.utcfromtimestamp(value)
		).strftime(format_string);
		isNaNCheck(res);
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}
