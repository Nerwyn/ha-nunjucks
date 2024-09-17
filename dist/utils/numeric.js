export function isNaNCheck(res) {
    if (res.toString().includes('NaN')) {
        throw Error('Result returned NaN.');
    }
}
