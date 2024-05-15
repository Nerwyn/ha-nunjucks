import { hass } from './hass';
import { renderTemplate } from '../src';

test('Returns input if it is not a string.', () => {
	expect(renderTemplate(hass, 5 as unknown as string)).toBe(5);
	expect(renderTemplate(hass, 0 as unknown as string)).toBe(0);

	expect(renderTemplate(hass, true as unknown as string)).toBe(true);
	expect(renderTemplate(hass, false as unknown as string)).toBe(false);

	expect(renderTemplate(hass, undefined as unknown as string)).toBe(
		undefined,
	);
	expect(renderTemplate(hass, null as unknown as string)).toBe(null);

	expect(
		renderTemplate(hass, [
			'This',
			'is',
			'not',
			'a',
			'string',
		] as unknown as string),
	).toStrictEqual(['This', 'is', 'not', 'a', 'string']);

	expect(
		renderTemplate(hass, { foo: 'bar', baz: 'bah' } as unknown as string),
	).toStrictEqual({ foo: 'bar', baz: 'bah' });
});

test('Returns input string if it is a string but does not include a template.', () => {
	expect(renderTemplate(hass, 'foobar')).toBe('foobar');
	expect(renderTemplate(hass, '')).toBe('');
});

test('Returns input string if it is a string but does not contain a complete template.', () => {
	let str = '{{ not a template';
	expect(renderTemplate(hass, str)).toBe(str);
	str = 'not a template }}';
	expect(renderTemplate(hass, str)).toBe(str);
	str = '{ not a template }}';
	expect(renderTemplate(hass, str)).toBe(str);
	str = '{{ not a template }';
	expect(renderTemplate(hass, str)).toBe(str);

	str = `
		{% if 'foo' == 'bar' }
		still not a string
		{% endif }
	`;
	expect(renderTemplate(hass, str)).toBe(str);
});

test('Returns result of simple templates and does not modify the input.', () => {
	const str = '{{ hass["states"]["light.lounge"]["state"] }}';
	expect(renderTemplate(hass, str)).toBe('on');
	expect(str).toBe('{{ hass["states"]["light.lounge"]["state"] }}');
});

test('Returns empty string if result of template is undefined or null, but not if it is falsey.', () => {
	let str = '{{ hass["states"]["light.lounge"]["status"] }}';
	expect(renderTemplate(hass, str)).toBe('');

	str = '{{ hass["states"]["light.lounge"]["state"] == "off" }}';
	expect(renderTemplate(hass, str)).toBe(false);
});

test('Return type should be string if original value is a number.', () => {
	let value = hass['states']['light.lounge']['attributes']['brightness'];
	let str =
		'{{ hass["states"]["light.lounge"]["attributes"]["brightness"] }}';
	expect(typeof value).toBe('number');
	expect(renderTemplate(hass, str)).toBe(
		hass['states']['light.lounge']['attributes']['brightness'].toString(),
	);

	value = hass['states']['light.lounge']['attributes']['hs_color'][0];
	str = '{{ hass["states"]["light.lounge"]["attributes"]["hs_color"][0] }}';
	expect(typeof value).toBe('number');
	expect(renderTemplate(hass, str)).toBe(value.toString());
});

test('Return type should be boolean if original value is a boolean.', () => {
	let value = 'foo' == 'foo';
	let str = '{{ "foo" == "foo" }}';
	expect(typeof value).toBe('boolean');
	expect(renderTemplate(hass, str)).toBe(true);

	value = 'foo' == ('bar' as 'foo');
	str = '{{ "foo" == "bar" }}';
	expect(typeof value).toBe('boolean');
	expect(renderTemplate(hass, str)).toBe(false);
});

test('Users should be able to add additional context and reference it in templates.', () => {
	const context = {
		foo: 'bar',
		doThing(thing: string) {
			return `doing ${thing}!`;
		},
	};

	let str = 'Testing that foo is {{ foo }}.';
	expect(renderTemplate(hass, str, context)).toBe('Testing that foo is bar.');

	str = 'I am {{ doThing("the dishes") }}';
	expect(renderTemplate(hass, str, context)).toBe('I am doing the dishes!');
});

test('Users should be able to still use the built in context when adding additional context.', () => {
	const context = {
		min: 'minimum',
		doThing(thing: string) {
			return `doing ${thing}!`;
		},
	};

	let value = hass['states']['light.lounge']['attributes']['min_mireds'];
	let str = '{{ hass.states["light.lounge"].attributes.min_mireds }}';
	expect(renderTemplate(hass, str, context)).toBe(value.toString());

	value = `The minimum color temperature is ${hass['states']['light.lounge']['attributes']['min_mireds']} mireds. Also I'm doing my taxes!`;
	str =
		'The {{ min }} color temperature is {{ hass.states["light.lounge"].attributes.min_mireds }} mireds. Also I\'m {{ doThing("my taxes") }}';
	expect(renderTemplate(hass, str, context)).toBe(value);
});
