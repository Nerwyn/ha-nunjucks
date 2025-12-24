import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('shuffle', () => {
	it('should not reproduce the same results with no seed', async () => {
		const s1 = renderTemplate(
			hass,
			'{{ shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) }}',
		);
		await new Promise((resolve) => setTimeout(resolve, 10));
		const s2 = renderTemplate(
			hass,
			'{{ [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] | shuffle }}',
		);

		assert.notEqual(s1, s2);
	});

	it('should reproduce the same results for the same seed', async () => {
		const s1 = renderTemplate(
			hass,
			'{{ [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] | shuffle(123) }}',
		);
		await new Promise((resolve) => setTimeout(resolve, 10));
		const s2 = renderTemplate(
			hass,
			'{{ shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 123) }}',
		);
		assert.equal(s1, s2);
	});
});
