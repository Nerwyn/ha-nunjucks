function getFunction(name: string) {
	for (const getter of ['getGlobal', 'getFilter', 'getTest']) {
		try {
			return (
				window.haNunjucks.env as unknown as Record<string, CallableFunction>
			)[getter](name);
		} catch {}
	}
}

export function map(arr: any[], fn: CallableFunction, ...args: any[]) {
	if (typeof fn == 'string') {
		fn = getFunction(fn);
	}
	return arr.map((item) => fn(item, ...args));
}

export function apply(value: any, fn: CallableFunction, ...args: any[]) {
	if (typeof fn == 'string') {
		fn = getFunction(fn);
	}
	return fn(value, ...args);
}

export function as_function(macro: CallableFunction) {
	function wrapper(...args: any[]) {
		let returnValue = undefined;

		function returns(value: any) {
			returnValue = value;
			return value;
		}

		macro(...args, returns);
		return returnValue;
	}

	return wrapper;
}
