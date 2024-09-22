export function match(value: string, find: string) {
	return new RegExp(`^${find}`).test(value);
}

export function search(value: string, find: string) {
	return new RegExp(find, 'g').test(value);
}

export function test(value: string, find: RegExp) {
	return new RegExp(find).test(value);
}

export function regex_replace(
	value: string,
	find: RegExp | string = '',
	replace: string = '',
) {
	return value.replace(new RegExp(find, 'g'), replace);
}

export function regex_findall(value: string, find: RegExp | string = '') {
	return value.match(new RegExp(find, 'g')) ?? [];
}

export function regex_findall_index(
	value: string,
	find: RegExp | string = '',
	index: number = 0,
) {
	return (value.match(new RegExp(find, 'g')) ?? [])[index];
}
