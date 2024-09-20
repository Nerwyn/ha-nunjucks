import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('to_json', () => {
	it('should turn an object into a string', () => {
		assert.equal(
			renderTemplate(hass, '{{ to_json(testObj) }}', {
				testObj: { foo: 'bar' },
			}),
			'{"foo":"bar"}',
		);
	});

	it('should turn an object into a string and pretty print it if enabled', () => {
		assert.equal(
			renderTemplate(hass, '{{ to_json(testObj, pretty_print=true) }}', {
				testObj: { foo: 'bar' },
			}),
			`{
  "foo": "bar"
}`,
		);
	});

	it("should turn an object into a string and sort it's keys if enabled", () => {
		assert.equal(
			renderTemplate(hass, '{{ to_json(testObj, sort_keys=true) }}', {
				testObj: { foo: 'bar', baz: 'bah' },
			}),
			'{"baz":"bah","foo":"bar"}',
		);
	});
});

describe('from_json', () => {
	it('should parse a string as a JSON', () => {
		assert.equal(
			renderTemplate(hass, '{{ from_json(\'{"foo":"bar"}\')["foo"] }}'),
			'bar',
		);
	});
});

describe('str', () => {
	it("should return the string representation of it's input", () => {
		assert.equal(
			renderTemplate(hass, '{{ str(as_datetime(199999990).year) + 1 }}'),
			'19761',
		);
	});
});
