import { md5 as md5_0, sha1 as sha1_0 } from '@noble/hashes/legacy.js';
import { sha256 as sha256_0, sha512 as sha512_0 } from '@noble/hashes/sha2.js';

function hash(value: string, algorithm: CallableFunction) {
	const msgUint8 = new TextEncoder().encode(value);
	const hashBuffer = algorithm(msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
	return hashHex;
}

export function md5(value: string) {
	return hash(value, md5_0);
}

export function sha1(value: string) {
	return hash(value, sha1_0);
}

export function sha256(value: string) {
	return hash(value, sha256_0);
}

export function sha512(value: string) {
	return hash(value, sha512_0);
}
