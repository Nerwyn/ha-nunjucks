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

describe('flatten', () => {
	it('should flatten a list of lists', () => {
		assert.equal(
			renderTemplate(hass, '{{ flatten([1, [2, [3]], 4, [5 , 6]]) }}'),
			'1,2,3,4,5,6',
		);
	});

	it('should flatten up to the depth of the levels parameter', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ [1, [2, [3]], 4, [5 , 6]] | flatten(1) | dump | safe }}',
			),
			'[1,2,[3],4,5,6]',
		);
	});
});

describe('intersect', () => {
	it('should return common elements between two lists', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ intersect([1, 2, 5, 3, 4, 10], [1, 2, 3, 4, 5, 11, 99]) }}',
			),
			'1,2,3,4,5',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ ["a", "b", "c"] | intersect(["b", "c", "d"]) }}',
			),
			'b,c',
		);
	});
});

describe('difference', () => {
	it('should return elements that are in the first list but not in the second', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ difference([1, 2, 5, 3, 4, 10, 50], [1, 2, 3, 4, 5, 11, 99]) }}',
			),
			'10,50',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ ["a", "b", "c"] | difference(["b", "c", "d"]) }}',
			),
			'a',
		);
	});
});

describe('symmetric_difference', () => {
	it('should return elements that are in either list but not both', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ symmetric_difference([1, 2, 5, 3, 4, 10, 50], [1, 2, 3, 4, 5, 11, 99]) }}',
			),
			'10,11,50,99',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ ["a", "b", "c"] | symmetric_difference(["b", "c", "d"]) }}',
			),
			'a,d',
		);
	});
});

describe('union', () => {
	it('should combine all unique elements from two lists', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ union([1, 2, 5, 3, 4, 10], [1, 2, 3, 4, 5, 11, 99]) }}',
			),
			'1,2,3,4,5,10,11,99',
		);
		assert.equal(
			renderTemplate(hass, '{{ ["a", "b", "c"] | union(["b", "c", "d"]) }}'),
			'a,b,c,d',
		);
	});
});
