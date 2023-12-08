import { hass } from '../hass';
import { renderTemplate } from '../../src';
import {
	states,
	is_state,
	state_attr,
	is_state_attr,
	has_value,
} from '../../src/utils/states';

test('Function states should return state of an entity.', () => {
	const value = hass['states']['light.lounge']['state'];
	expect(states(hass, 'light.lounge')).toBe(value);
	expect(renderTemplate(hass, '{{ states("light.lounge") }}')).toBe(value);

	expect(states(hass, 'foobar')).toBe(undefined);
	expect(renderTemplate(hass, '{{ states("foobar") }}')).toBe('');
});

test('Function is_state should return boolean.', () => {
	const value = hass['states']['light.lounge']['state'];
	expect(is_state(hass, 'light.lounge', value)).toBe(true);
	expect(
		renderTemplate(
			hass,
			'{{ is_state("light.lounge", hass["states"]["light.lounge"]["state"]) }}',
		),
	).toBe(true);

	expect(is_state(hass, 'foobar', 'foobar')).toBe(false);
	expect(renderTemplate(hass, '{{ is_state("foobar", "foobar") }}')).toBe(
		false,
	);
});

test('Function state_attr should return attribute of an entity.', () => {
	let attribute = 'color_mode';
	let value = hass['states']['light.lounge']['attributes'][attribute];
	expect(typeof value).toBe('string');
	expect(state_attr(hass, 'light.lounge', attribute)).toBe(value);
	expect(
		renderTemplate(
			hass,
			`{{ state_attr("light.lounge", "${attribute}") }}`,
		),
	).toBe(value);

	attribute = 'brightness';
	value = hass['states']['light.lounge']['attributes'][attribute];
	expect(typeof value).toBe('number');
	expect(state_attr(hass, 'light.lounge', attribute)).toBe(value);
	expect(
		renderTemplate(
			hass,
			`{{ state_attr("light.lounge", "${attribute}") }}`,
		),
	).toBe(value);

	expect(state_attr(hass, 'foobar', 'foobar')).toBe(undefined);
	expect(renderTemplate(hass, '{{ state_attr("foobar", "foobar") }}')).toBe(
		'',
	);
});

test('Function is_state_attr should return boolean.', () => {
	let attribute = 'color_mode';
	let value = hass['states']['light.lounge']['attributes'][attribute];
	expect(is_state_attr(hass, 'light.lounge', attribute, value)).toBe(true);
	expect(
		renderTemplate(
			hass,
			`{{ is_state_attr("light.lounge", "${attribute}", "${value}") }}`,
		),
	).toBe(true);

	attribute = 'brightness';
	value = hass['states']['light.lounge']['attributes'][attribute];
	expect(is_state_attr(hass, 'light.lounge', attribute, value)).toBe(true);
	expect(
		renderTemplate(
			hass,
			`{{ is_state_attr("light.lounge", "${attribute}", "${value}") }}`,
		),
	).toBe(true);

	expect(is_state_attr(hass, 'foobar', 'foobar', 'foobar')).toBe(false);
	expect(
		renderTemplate(
			hass,
			'{{ is_state_attr("foobar", "foobar", "foobar") }}',
		),
	).toBe(false);
});

test('Function has_value should return boolean.', () => {
	let entity = 'light.lounge';
	expect(has_value(hass, entity)).toBe(true);
	expect(renderTemplate(hass, `{{ has_value("${entity}") }}`)).toBe(true);

	entity = 'input_number.volume';
	expect(hass['states'][entity]['state']).toBe(0);
	expect(has_value(hass, entity)).toBe(true);
	expect(renderTemplate(hass, `{{ has_value("${entity}") }}`)).toBe(true);

	entity = 'foobar';
	expect(has_value(hass, entity)).toBe(false);
	expect(renderTemplate(hass, `{{ has_value("${entity}") }}`)).toBe(false);
});
