import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('ordinal', () => {
	it('should return the number with the correct ordinal suffix', () => {
		assert.equal(renderTemplate(hass, '{{ 1 | ordinal }}'), '1st');
		assert.equal(renderTemplate(hass, '{{ 2 | ordinal }}'), '2nd');
		assert.equal(renderTemplate(hass, '{{ "3" | ordinal }}'), '3rd');
		assert.equal(renderTemplate(hass, '{{ 4 | ordinal }}'), '4th');
		assert.equal(renderTemplate(hass, '{{ 11 | ordinal }}'), '11th');
		assert.equal(renderTemplate(hass, '{{ "12" | ordinal }}'), '12th');
		assert.equal(renderTemplate(hass, '{{ "13" | ordinal }}'), '13th');
		assert.equal(renderTemplate(hass, '{{ "21" | ordinal }}'), '21st');
		assert.equal(renderTemplate(hass, '{{ 22 | ordinal }}'), '22nd');
		assert.equal(renderTemplate(hass, '{{ 23 | ordinal }}'), '23rd');
	});
});

describe('base64_encode', () => {
	it('should return the base64 encoded string', () => {
		assert.equal(
			renderTemplate(hass, '{{ "Hello World!" | base64_encode }}'),
			'SGVsbG8gV29ybGQh',
		);
	});
});

describe('base64_decode', () => {
	it('should return the base64 decoded string', () => {
		assert.equal(
			renderTemplate(hass, '{{ "SGVsbG8gV29ybGQh" | base64_decode }}'),
			'Hello World!',
		);
	});
});
