import dt, { PyDate, PyDatetime } from 'py-datetime';

export function now() {
	return dt.datetime.now();
}

export function utcnow() {
	return dt.datetime.utcnow();
}

export function today_at(value: string = '00:00') {
	const [hour, minutes, seconds, milliseconds] = value.split(':');
	const now = dt.datetime.now();
	return dt.datetime(
		now.year,
		now.month,
		now.day,
		Number(hour),
		Number(minutes),
		Number(seconds),
		Number(milliseconds),
	);
}

export function as_datetime(
	value: number | string | PyDatetime | PyDate,
	fallback?: string,
) {
	try {
		if (typeof value == 'number' || typeof value == 'string') {
			value = parseFloat(value as string) * 1000;
		}
		const res = dt.datetime.utc(value as PyDatetime);
		if (res.str().includes('NaN')) {
			throw Error('Input string not a number.');
		}
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
			res = Date.parse(value);
		} else {
			res = dt.datetime.utc(value as PyDatetime).jsDate.getTime();
		}
		if (res.toString().includes('NaN')) {
			throw Error('Input string not a number.');
		}
		return res / 1000;
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

export function strptime(value: string, format: string, fallback?: string) {
	try {
		return dt.datetime.strptime(value, format);
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function timedelta(
	days?: number,
	seconds?: number,
	microseconds?: number,
	milliseconds?: number,
	minutes?: number,
	hours?: number,
	weeks?: number,
) {
	return dt.timedelta(
		days ?? 0,
		seconds ?? 0,
		milliseconds ?? 0 + 0.001 * (microseconds ?? 0),
		minutes ?? 0,
		hours ?? 0,
		weeks ?? 0,
	);
}
