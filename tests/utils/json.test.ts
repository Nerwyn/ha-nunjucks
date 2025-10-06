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

describe('is_defined', () => {
	it('should throw for undefined input', () => {
		assert.throws(() => renderTemplate(hass, '{{ foo | is_defined }}'));
		assert.throws(() =>
			renderTemplate(
				hass,
				'{{ (\'{"foo":"bar"}\' | from_json)["baz"] | is_defined }}',
			),
		);
	});

	it('should return true for other values', () => {
		assert.equal(renderTemplate(hass, '{{ false | is_defined }}'), false);
		assert.equal(
			renderTemplate(
				hass,
				'{{ (\'{"foo":"bar"}\' | from_json)["foo"] | is_defined }}',
			),
			'bar',
		);
	});
});
