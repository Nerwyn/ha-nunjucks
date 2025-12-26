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

export function clamp(v: number, min: number, max: number) {
	try {
		v = Number(v);
		min = Number(min);
		max = Number(max);
		if ([v, min, max].some((x) => isNaN(x))) {
			throw Error();
		}
	} catch {
		throw TypeError(
			`function requires numeric arguments, got v=${v}, min=${min}, max=${max}`,
		);
	}
	return Math.max(min, Math.min(v, max));
}

export function mod(n: number, m: number) {
	if (m == 0) {
		throw Error('cannot divide by 0');
	}
	return ((n % m) + m) % m;
}

export function wrap(v: number, min: number, max: number) {
	try {
		v = Number(v);
		min = Number(min);
		max = Number(max);
		if ([v, min, max].some((x) => isNaN(x))) {
			throw Error();
		}
	} catch {
		throw TypeError(
			`function requires numeric arguments, got v=${v}, min=${min}, max=${max}`,
		);
	}

	try {
		return mod(v - min, max - min) + min;
	} catch {
		// Assume divide by zero error
		return min;
	}
}

type RemapEdge = 'none' | 'clamp' | 'wrap' | 'mirror';

export function remap(
	v: number,
	in_min: number,
	in_max: number,
	out_min: number,
	out_max: number,
	steps: number | Record<string, RemapEdge | number> = 0,
	edges: RemapEdge = 'none',
) {
	if (typeof steps == 'object') {
		edges = (steps['edges'] as RemapEdge) || 'none';
		steps = (steps['steps'] as number) || 0;
	}

	try {
		v = Number(v);
		in_min = Number(in_min);
		in_max = Number(in_max);
		out_min = Number(out_min);
		out_max = Number(out_max);
		if ([v, in_min, in_max, out_min, out_max].some((x) => isNaN(x))) {
			throw Error();
		}
	} catch {
		throw TypeError(
			`function requires numeric arguments, got v=${v}, in_min=${in_min}, in_max=${in_max}, out_min=${out_min}, out_max=${out_max}`,
		);
	}

	switch (edges) {
		case 'clamp':
			v = clamp(v, in_min, in_max);
			break;
		case 'wrap':
			if (in_min == in_max) {
				throw RangeError(`in_min=${in_min} must not equal in_max=${in_max}`);
			}
			v = wrap(v, in_min, in_max);
			break;
		case 'mirror':
			if (in_min == in_max) {
				throw RangeError(`in_min=${in_min} must not equal in_max=${in_max}`);
			}
			const range = in_max - in_min;
			const offset = v - in_min;
			const period = Math.floor(offset / range);
			let position = offset - period * range;
			if (period < 0 || period % 2 != 0) {
				position = range - position;
			}
			v = in_min + position;
			break;
		case 'none':
		default:
			break;
	}

	steps = Math.max(steps, 0);

	if (!steps && in_min == out_min && in_max == out_max) {
		return v;
	}

	let normalized = (v - in_min) / (in_max - in_min);
	if (steps) {
		normalized = Math.round(normalized * steps) / steps;
	}

	return out_min + normalized * (out_max - out_min);
}

export const e = Math.E;
export const pi = Math.PI;
export const tau = 2 * Math.PI;
export const inf = Infinity;

export function bitwise_and(value_one: number, value_two: number) {
	return value_one & value_two;
}

export function bitwise_or(value_one: number, value_two: number) {
	return value_one | value_two;
}

export function bitwise_xor(value_one: number, value_two: number) {
	return value_one ^ value_two;
}

export function bitwise_not(value: number) {
	return ~value;
}

export function ord(value: string) {
	if (value.length == 1) {
		return value.codePointAt(0);
	}
	throw Error('Expected a character, but received a string');
}

export function multiply(value: string, arg: number) {
	return Number(value) * Number(arg);
}

export function add(value: string, arg: number) {
	return Number(value) + Number(arg);
}
