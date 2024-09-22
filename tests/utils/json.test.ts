import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('to_json', () => {
	it('should turn an object into a string', () => {
		assert.equal(
			renderTemplate(hass, '{{ testObj | to_json | safe }}', {
				testObj: { foo: 'bar' },
			}),
			'{"foo":"bar"}',
		);
	});

	it('should turn an object into a string and pretty print it if enabled', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ testObj | to_json(pretty_print=true) | safe }}',
				{
					testObj: { foo: 'bar' },
				},
			),
			`{
  "foo": "bar"
}`,
		);
	});

	it("should turn an object into a string and sort it's keys if enabled", () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ testObj | to_json(sort_keys=true) | safe }}',
				{
					testObj: { foo: 'bar', baz: 'bah' },
				},
			),
			'{"baz":"bah","foo":"bar"}',
		);
	});
});

describe('from_json', () => {
	it('should parse a string as a JSON', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ (\'{"foo":"bar"}\' | from_json)["foo"] }}',
			),
			'bar',
		);
	});
});
