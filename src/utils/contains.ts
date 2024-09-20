export function contains(list: string[], value: string) {
	return Array.isArray(list) ? list?.includes(value) : false;
}
