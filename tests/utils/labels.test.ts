import { renderTemplate } from '../../src';
import { hass } from '../hass';

test('labels should return all labels if no argument is provided.', () => {
	expect(renderTemplate(hass, '{{ labels() }}')).toBe(
		'ir,lighting,lounge_ceiling_fan,outside',
	);
});

test('labels should return all labels associated with a provided entity ID.', () => {
	expect(renderTemplate(hass, '{{ labels("light.driveway_lamps") }}')).toBe(
		'lighting',
	);
});

test('labels should return all labels associated with a provided device ID.', () => {
	expect(
		renderTemplate(
			hass,
			'{{ labels("06c14f4b7dd701890e596ebbe354aa97") }}',
		),
	).toBe('ir');
});

test('labels should return all labels associated with a provided area ID.', () => {
	expect(renderTemplate(hass, '{{ labels("front_yard") }}')).toBe('outside');
});

test('label_areas should return a list of area IDs for a given label ID.', () => {
	expect(renderTemplate(hass, '{{ label_areas("outside") }}')).toBe(
		'front_yard',
	);
});

test('label_devices should return a list of device IDs for a given label ID.', () => {
	expect(renderTemplate(hass, '{{ label_devices("ir") }}')).toBe(
		'06c14f4b7dd701890e596ebbe354aa97',
	);
});

test('label_entities should return a list of entity IDs for a given label ID.', () => {
	expect(renderTemplate(hass, '{{ label_entities("lighting") }}')).toBe(
		'light.driveway_lamps',
	);
});
