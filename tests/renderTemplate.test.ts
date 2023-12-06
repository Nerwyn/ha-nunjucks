import { HomeAssistant } from 'custom-card-helpers';
import { renderTemplate } from '../src';
import { hassTestObject } from './hass';

const hass = hassTestObject as unknown as HomeAssistant;

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

test('Returns input string if it is a string but does not include a template', () => {
	expect(renderTemplate(hass, 'foobar')).toBe('foobar');
	expect(renderTemplate(hass, '')).toBe('');
});

test('Returns input string if it is a string but does not contain a complete template', () => {
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

test('Returns result of simple templates and does not modify the input', () => {
	const str = '{{ hass["states"]["light.lounge"]["state"] }}';
	expect(renderTemplate(hass, str)).toBe('on');
});
