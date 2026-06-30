import { hashSync } from 'hasha';

export function md5(value: string) {
	// return hash(value, md5_0);
	return hashSync(value, { algorithm: 'md5' });
}

export function sha1(value: string) {
	// return hash(value, sha1_0);
	return hashSync(value, { algorithm: 'sha1' });
}

export function sha256(value: string) {
	// return hash(value, sha256_0);
	return hashSync(value, { algorithm: 'sha256' });
}

export function sha512(value: string) {
	// return hash(value, sha512_0);
	return hashSync(value, { algorithm: 'sha512' });
}
