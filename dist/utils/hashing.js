// import { md5 as md5_0, sha1 as sha1_0 } from '@noble/hashes/legacy.js';
// import { sha256 as sha256_0, sha512 as sha512_0 } from '@noble/hashes/sha2.js';
// @ts-ignore
import Hashes from 'jshashes';
const MD5 = new Hashes.MD5();
const SHA1 = new Hashes.SHA1();
const SHA256 = new Hashes.SHA256();
const SHA512 = new Hashes.SHA512();
export function md5(value) {
    return MD5.hex(value);
}
export function sha1(value) {
    return SHA1.hex(value);
}
export function sha256(value) {
    return SHA256.hex(value);
}
export function sha512(value) {
    return SHA512.hex(value);
}
