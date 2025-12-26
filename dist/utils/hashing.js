import createHash from 'create-hash';
import process from 'process';
window.process ||= process;
function hash(value, algorithm) {
    const hash = createHash(algorithm);
    hash.update(value);
    return hash.digest('hex');
}
export function md5(value) {
    return hash(value, 'md5');
}
export function sha1(value) {
    return hash(value, 'sha1');
}
export function sha256(value) {
    return hash(value, 'sha256');
}
export function sha512(value) {
    return hash(value, 'sha512');
}
