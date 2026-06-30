import MD5 from 'jscrypto/MD5';
import SHA1 from 'jscrypto/SHA1';
import SHA256 from 'jscrypto/SHA256';
import SHA512 from 'jscrypto/SHA512';
export function md5(value) {
    return MD5.MD5.hash(value).toString();
}
export function sha1(value) {
    return SHA1.SHA1.hash(value).toString();
}
export function sha256(value) {
    return SHA256.SHA256.hash(value).toString();
}
export function sha512(value) {
    return SHA512.SHA512.hash(value).toString();
}
