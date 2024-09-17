export function isNaNCheck(res: string) {
	if (res.toString().includes('NaN')) {
		throw Error('Result returned NaN.');
	}
}
