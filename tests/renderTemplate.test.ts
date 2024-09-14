import assert from 'assert';
import { renderTemplate } from '../src';
import { hass } from './hass';

describe('renderTemplate', () => {
	it('returns the input if it is not a string', () => {
		assert.equal(renderTemplate(hass, 5 as unknown as string), 5);
		assert.equal(renderTemplate(hass, 0 as unknown as string), 0);

		assert.equal(renderTemplate(hass, true as unknown as string), true);
		assert.equal(renderTemplate(hass, false as unknown as string), false);

		assert.equal(
			renderTemplate(hass, undefined as unknown as string),
			undefined,
		);
		assert.equal(renderTemplate(hass, null as unknown as string), null);

		assert.deepStrictEqual(
			renderTemplate(hass, [
				'This',
				'is',
				'not',
				'a',
				'string',
			] as unknown as string),
			['This', 'is', 'not', 'a', 'string'],
		);

		assert.deepStrictEqual(
			renderTemplate(hass, {
				foo: 'bar',
				baz: 'bah',
			} as unknown as string),
			{ foo: 'bar', baz: 'bah' },
		);
	});

	it('returns the input string if it is a string but does not include a template', () => {
		assert.equal(renderTemplate(hass, 'foobar'), 'foobar');
		assert.equal(renderTemplate(hass, ''), '');
	});

	it('returns the input string if it is a string but does not contain a complete template', () => {
		let str = '{{ not a template';
		assert.equal(renderTemplate(hass, str), str);
		str = 'not a template }}';
		assert.equal(renderTemplate(hass, str), str);
		str = '{ not a template }}';
		assert.equal(renderTemplate(hass, str), str);
		str = '{{ not a template }';
		assert.equal(renderTemplate(hass, str), str);

		str = `
		{% if 'foo' == 'bar' }
		still not a string
		{% endif }
	`;
		assert.equal(renderTemplate(hass, str), str);
	});

	it('returns the result of a simple templates and does not modify the input', () => {
		const str = '{{ hass["states"]["light.lounge"]["state"] }}';
		assert.equal(renderTemplate(hass, str), 'on');
		assert.equal(str, '{{ hass["states"]["light.lounge"]["state"] }}');
	});

	it('returns an empty string if the result of a template is undefined or null, but not if it is falsey', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ hass["states"]["light.lounge"]["status"] }}',
			),
			'',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ hass["states"]["light.lounge"]["state"] == "off" }}',
			),
			false,
		);
	});

	it('return type should be a string if original value is a number', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ hass["states"]["light.lounge"]["attributes"]["brightness"] }}',
			),
			'155',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ hass["states"]["light.lounge"]["attributes"]["hs_color"][0] }}',
			),
			'28.406',
		);
	});

	it('return type should be a boolean if original value is a boolean', () => {
		assert.equal(renderTemplate(hass, '{{ "foo" == "foo" }}'), true);
		assert.equal(renderTemplate(hass, '{{ "foo" == "bar" }}'), false);
	});

	it('can be given additional context to reference it in templates', () => {
		const context = {
			foo: 'bar',
			doThing(thing: string) {
				return `doing ${thing}!`;
			},
		};
		assert.equal(
			renderTemplate(hass, 'Testing that foo is {{ foo }}', context),
			'Testing that foo is bar',
		);
		assert.equal(
			renderTemplate(hass, 'I am {{ doThing("the dishes") }}', context),
			'I am doing the dishes!',
		);
	});

	it('can still use the built in context when given additional context', () => {
		const context = {
			min: 'minimum',
			doThing(thing: string) {
				return `doing ${thing}!`;
			},
		};

		assert.equal(
			renderTemplate(
				hass,
				'{{ hass.states["light.lounge"].attributes.min_mireds }}',
				context,
			),
			153,
		);
		assert.equal(
			renderTemplate(
				hass,
				'The {{ min }} color temperature is {{ hass.states["light.lounge"].attributes.min_mireds }} mireds. Also I\'m {{ doThing("my taxes") }}',
				context,
			),
			"The minimum color temperature is 153 mireds. Also I'm doing my taxes!",
		);
	});
});
