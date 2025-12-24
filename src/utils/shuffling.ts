import MersenneTwister from 'mersenne-twister';

export function shuffle(values: any[], seed: number) {
	const generator = new MersenneTwister();
	if (seed) {
		generator.init_seed(seed);
	}
	return values.sort(() => generator.random() - 0.5);
}
