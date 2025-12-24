import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('conbine', () => {
	it('should combine multiple objects via deep merges', () => {
		assert.equal(
			renderTemplate(
				hass,
				`
				{% set arr1 = { "a": 1, "b": { "x": 1 } } %}
				{% set arr2 = { "b": { "y": 2 }, "c": 4 } %}
				{% set arr3 = { "c": 5, "d": { "z": 3 } } %}
				{{ combine(arr1, arr2, arr3) | dump | safe }}
				`,
			),
			'{"a":1,"b":{"x":1,"y":2},"c":5,"d":{"z":3}}',
		);
	});
});
