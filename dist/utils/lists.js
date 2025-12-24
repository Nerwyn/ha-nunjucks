import MersenneTwister from 'mersenne-twister';
export function shuffle(values, seed) {
    const generator = new MersenneTwister();
    if (seed) {
        generator.init_seed(seed);
    }
    return values.sort(() => generator.random() - 0.5);
}
export function flatten(values, levels = Infinity) {
    return values.flat(levels);
}
export function intersect(list1, list2) {
    return list1.filter((item) => list2.includes(item)).sort((a, b) => a - b);
}
export function difference(list1, list2) {
    return list1.filter((item) => !list2.includes(item)).sort((a, b) => a - b);
}
export function symmetric_difference(list1, list2) {
    return difference(list1, list2)
        .concat(difference(list2, list1))
        .sort((a, b) => a - b);
}
export function union(list1, list2) {
    return [...new Set([...list1, ...list2])].sort((a, b) => a - b);
}
