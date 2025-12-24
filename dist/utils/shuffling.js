import MersenneTwister from 'mersenne-twister';
export function shuffle(values, seed) {
    const generator = new MersenneTwister();
    if (seed) {
        generator.init_seed(seed);
    }
    return values.sort(() => generator.random() - 0.5);
}
