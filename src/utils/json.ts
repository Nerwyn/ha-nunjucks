export function to_json(
	obj: object,
	ensure_ascii: boolean | Record<string, boolean> = true,
	pretty_print: boolean = false,
	sort_keys: boolean = false,
) {
	if (typeof ensure_ascii == 'object') {
		sort_keys = ensure_ascii.sort_keys ?? sort_keys;
		pretty_print = ensure_ascii.pretty_print ?? pretty_print;
		ensure_ascii = ensure_ascii.ensure_ascii ?? ensure_ascii;
	}

	if (sort_keys) {
		obj = Object.keys(obj)
			.sort()
			.reduce((obj2, key) => {
				obj2[key as keyof object] = obj[key as keyof object];
				return obj2;
			}, {});
	}
	let res = JSON.stringify(obj, undefined, pretty_print ? 2 : undefined);
	if (ensure_ascii) {
		res = res.replace(
			/[\u007F-\uFFFF]/g,
			(chr) =>
				`\\u'${('0000' + chr.charCodeAt(0).toString(16)).substring(-4)}`,
		);
	}
	return res;
}

export function from_json(value: string) {
	return JSON.parse(value);
}

export function str(value: string) {
	return value.toString();
}
