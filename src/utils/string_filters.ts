import slugifyLib from 'slugify';
export function slugify(str: string, separator: string = '_') {
	return slugifyLib(str, {
		replacement: separator,
		lower: true,
		strict: true,
	});
}

export function ordinal(num: number) {
	if (isNaN(num)) {
		throw Error('Input must be a number');
	}

	const suffixes: Record<string, string> = {
		one: 'st',
		two: 'nd',
		few: 'rd',
		other: 'th',
	};
	const suffix =
		suffixes[window.haNunjucks.ordinalFormat.select(num)] || 'th';
	return `${num}${suffix}`;
}

export function base64_encode(value: string) {
	return btoa(value);
}

export function base64_decode(value: string) {
	return atob(value);
}
