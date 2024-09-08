import { renderTemplate } from '../../src';
import { hass } from '../hass';

test('states should return state of an entity.', () => {
	const value = hass['states']['light.lounge']['state'];
	expect(renderTemplate(hass, '{{ states("light.lounge") }}')).toBe(value);

	expect(renderTemplate(hass, '{{ states("foobar") }}')).toBe('');
});

test('states with rounded=True should round state.', () => {
	const value = hass['states']['input_number.volume']['state'].toString();
	expect(renderTemplate(hass, '{{ states("input_number.volume") }}')).toBe(
		value,
	);

	expect(
		renderTemplate(hass, '{{ states("input_number.volume", True) }}'),
	).toBe(Math.round(value as unknown as number).toString());
});

test('states with rounded=True should return state as is if state is non-numerical.', () => {
	const value = hass['states']['light.lounge']['state'];
	expect(renderTemplate(hass, '{{ states("light.lounge") }}')).toBe(value);
	expect(renderTemplate(hass, '{{ states("light.lounge", True) }}')).toBe(
		value,
	);
});

test('states with with_unit=True should return state with unit_of_measurement attribute appended to end after space if available.', () => {
	const value1 = hass['states']['input_number.volume']['state'];
	expect(
		renderTemplate(
			hass,
			'{{ states("input_number.volume", false, true) }}',
		),
	).toBe(
		`${value1} ${hass['states']['input_number.volume']['attributes']['unit_of_measurement']}`,
	);
	const value2 = hass['states']['light.lounge']['state'];
	expect(
		renderTemplate(hass, '{{ states("light.lounge", false, true) }}'),
	).toBe(value2);
});

test('is_state should return boolean.', () => {
	expect(
		renderTemplate(
			hass,
			'{{ is_state("light.lounge", hass["states"]["light.lounge"]["state"]) }}',
		),
	).toBe(true);
	expect(
		renderTemplate(
			hass,
			'{{ is_state("light.lounge", [hass["states"]["light.lounge"]["state"], "foobar"]) }}',
		),
	).toBe(true);
	expect(renderTemplate(hass, '{{ is_state("foobar", "foobar") }}')).toBe(
		false,
	);
});

test('state_attr should return attribute of an entity.', () => {
	let attribute = 'color_mode';
	let value = hass['states']['light.lounge']['attributes'][attribute];
	expect(typeof value).toBe('string');
	expect(
		renderTemplate(
			hass,
			`{{ state_attr("light.lounge", "${attribute}") }}`,
		),
	).toBe(value);

	attribute = 'brightness';
	value = hass['states']['light.lounge']['attributes'][attribute];
	expect(typeof value).toBe('number');
	expect(
		renderTemplate(
			hass,
			`{{ state_attr("light.lounge", "${attribute}") }}`,
		),
	).toBe(value.toString());

	expect(renderTemplate(hass, '{{ state_attr("foobar", "foobar") }}')).toBe(
		'',
	);
});

test('is_state_attr should return boolean.', () => {
	let attribute = 'color_mode';
	let value = hass['states']['light.lounge']['attributes'][attribute];
	expect(
		renderTemplate(
			hass,
			`{{ is_state_attr("light.lounge", "${attribute}", "${value}") }}`,
		),
	).toBe(true);

	attribute = 'brightness';
	value = hass['states']['light.lounge']['attributes'][attribute];
	expect(
		renderTemplate(
			hass,
			`{{ is_state_attr("light.lounge", "${attribute}", ${value}) }}`,
		),
	).toBe(true);

	expect(
		renderTemplate(
			hass,
			'{{ is_state_attr("foobar", "foobar", "foobar") }}',
		),
	).toBe(false);

	expect(
		renderTemplate(
			hass,
			`{{ is_state_attr("light.lounge", "${attribute}", [${value}, "bar"]) }}`,
		),
	).toBe(true);
});

test('has_value should return boolean.', () => {
	let entity = 'light.lounge';
	expect(renderTemplate(hass, `{{ has_value("${entity}") }}`)).toBe(true);

	entity = 'input_number.volume';
	expect(renderTemplate(hass, `{{ has_value("${entity}") }}`)).toBe(true);

	entity = 'foobar';
	expect(renderTemplate(hass, `{{ has_value("${entity}") }}`)).toBe(false);
});
