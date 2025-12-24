function mergeDeep<T extends object>(target: T, ...sources: [T]): T {
	function isObject(item: object) {
		return item && typeof item === 'object' && !Array.isArray(item);
	}

	if (!sources.length) {
		return target;
	}
	const source: object = sources.shift() as object;

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key as keyof object])) {
				if (!target[key as keyof object]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key as keyof object], source[key as keyof object]);
			} else {
				Object.assign(target, {
					[key]: source[key as keyof object],
				});
			}
		}
	}

	return mergeDeep(target, ...sources);
}

export function combine(...args: object[]) {
	let res = args.shift() as object;
	for (const arg of args) {
		res = mergeDeep(res, arg);
	}
	return res;
}
