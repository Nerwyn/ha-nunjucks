import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('set', () => {
	it('should convert a list/array to a set', () => {
		assert.equal(
			renderTemplate(hass, '{{ set(["foo", "bar"]) }}'),
			new Set(['foo', 'bar']),
		);
	});

	it('should remove duplicate entries', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ set(["foo", "bar", "foo", "foo", "bar"]) }}',
			),
			new Set(['foo', 'bar']),
		);
	});
});

describe('list', () => {
	it('should convert a set to a list', () => {
		assert.equal(
			renderTemplate(
				hass,
				`
{{ list(set(["foo", "bar"] )) }}`,
			),
			['foo', 'bar'],
		);
	});

	it('should not remove duplicate entries', () => {
		assert.equal(
			renderTemplate(
				hass,
				`
{{ list(set(["foo", "bar"]), ["foo", "bar"]) }}`,
			),
			['foo', 'bar', 'foo', 'bar'],
		);
	});
});
