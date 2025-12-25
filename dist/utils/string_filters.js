import slugifyLib from 'slugify';
export function slugify(str, separator = '_') {
    return slugifyLib(str, {
        replacement: separator,
        lower: true,
        strict: true,
    });
}
export function ordinal(num) {
    if (isNaN(num)) {
        throw Error('Input must be a number');
    }
    const suffixes = {
        one: 'st',
        two: 'nd',
        few: 'rd',
        other: 'th',
    };
    const suffix = suffixes[window.haNunjucks.ordinalFormat.select(num)] || 'th';
    return `${num}${suffix}`;
}
export function from_hex(value) {
    if (value.length % 2 !== 0) {
        throw Error('Hex string must have an even length.');
    }
    // Create a Uint8Array to store the bytes
    const byteArray = new Uint8Array(value.length / 2);
    for (let i = 0; i < value.length; i += 2) {
        // Extract each two-character pair
        const hexPair = value.slice(i, i + 2);
        // Parse the hex pair into an integer (byte value) with radix 16
        const byteValue = parseInt(hexPair, 16);
        // Assign the byte value to the array
        byteArray[i / 2] = byteValue;
    }
    // Convert the array of byte values into a string using String.fromCharCode()
    return String.fromCharCode(...byteArray);
}
export function base64_encode(value) {
    return btoa(value);
}
export function base64_decode(value) {
    return atob(value);
}
