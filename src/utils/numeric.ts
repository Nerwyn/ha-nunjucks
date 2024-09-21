export function isNaNCheck(res: string) {
	if (res.toString().includes('NaN')) {
		throw Error('Result returned NaN.');
	}
}

export function float(value: string, fallback?: string) {
	try {
		const res = parseFloat(value);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function is_number(value: number) {
	if (value == Infinity) {
		return false;
	}
	return !isNaN(value);
}

export function int(value: string, fallback?: string) {
	try {
		const res = parseInt(value);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function bool(value: string | number | boolean, fallback?: string) {
	if (typeof value == 'number') {
		if (value != 0) {
			return true;
		} else {
			return false;
		}
	}
	if (typeof value == 'boolean') {
		return value;
	}
	value = value.toLowerCase();
	if (['true', 'yes', 'on', 'enable', '1'].includes(value)) {
		return true;
	}
	if (['false', 'no', 'off', 'disable', '0'].includes(value)) {
		return false;
	}
	if (fallback) {
		return fallback;
	}
	throw Error('Invalid input');
}

export function log(value: number, base: number = Math.E, fallback?: string) {
	try {
		const res = Math.log(value) / Math.log(base);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function sin(value: number, fallback?: string) {
	try {
		const res = Math.sin(value);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function cos(value: number, fallback?: string) {
	try {
		const res = Math.cos(value);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function tan(value: number, fallback?: string) {
	try {
		const res = Math.tan(value);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function asin(value: number, fallback?: string) {
	try {
		const res = Math.asin(value);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function acos(value: number, fallback?: string) {
	try {
		const res = Math.acos(value);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function atan(value: number, fallback?: string) {
	try {
		const res = Math.atan(value);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function atan2(y: number, x: number, fallback?: string) {
	try {
		const res = Math.atan2(y, x);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function sqrt(value: number, fallback?: string) {
	try {
		const res = Math.sqrt(value);
		isNaNCheck(res.toString());
		return res;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function max(...args: number[]) {
	return Math.max(...args.flat(Infinity));
}

export function min(...args: number[]) {
	return Math.min(...args.flat(Infinity));
}

export function average(values: number[], fallback?: string) {
	try {
		values = values.flat(Infinity);
		if (values.some((value) => isNaN(value))) {
			throw Error('Non-numeric values provided');
		}
		return values.reduce((a, b) => a + b) / values.length;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function median(values: number[], fallback?: string) {
	try {
		values = values.flat(Infinity);
		if (values.some((value) => isNaN(value))) {
			throw Error('Non-numeric values provided');
		}
		if (!values.length) {
			throw Error('Empty array provided');
		}
		values = values.sort((a, b) => a - b);
		const mid = Math.floor(values.length / 2);
		if (values.length % 2) {
			return values[mid];
		}
		return (values[mid - 1] + values[mid]) / 2;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export function statistical_mode(values: number[], fallback?: string) {
	try {
		values = values.flat(Infinity);
		if (values.some((value) => isNaN(value))) {
			throw Error('Non-numeric values provided');
		}
		if (!values.length) {
			throw Error('Empty array provided');
		}
		const counts: Record<number, number> = {};
		for (const value of values) {
			if (!counts[value]) {
				counts[value] = 0;
			}
			counts[value]++;
		}
		let mode = values[0];
		let count = 0;
		for (const value in counts) {
			if (counts[value] > count) {
				mode = Number(value);
				count = counts[value];
			}
		}
		return mode;
	} catch (e) {
		if (fallback) {
			return fallback;
		}
		throw e;
	}
}

export const e = Math.E;
export const pi = Math.PI;
export const tau = 2 * Math.PI;
export const inf = Infinity;

// TODO implement filter only functions
export function round(
	value: number,
	precision: number,
	method: 'even' | 'floor' | 'cell' | 'half' = 'even',
	fallback?: string,
) {}

export function bitwise_and(value_one: number, value_two: number) {}

export function bitwise_or(value_one: number, value_two: number) {}

export function bitwise_xor(value_one: number, value_two: number) {}

export function ord(value: string) {}

export function multiply(value: string, arg: number) {}

export function add(value: string, arg: number) {}
