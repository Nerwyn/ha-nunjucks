import { renderTemplate } from '../../src';
import { hass } from '../hass';

test('floors should return a stringified array of floor IDs.', () => {
	expect(renderTemplate(hass, '{{ floors() }}')).toBe(
		'first_floor,second_floor',
	);
});

test('floor_id should return a floor ID if given a device ID', () => {
	expect(
		renderTemplate(
			hass,
			'{{ floor_id("08d6a7f58fc934fba97d2ec2a66e7bba") }}',
		),
	).toBe('first_floor');
});

test('floor_id should return a floor ID if given an entity ID', () => {
	expect(renderTemplate(hass, '{{ floor_id("remote.bedroom") }}')).toBe(
		'second_floor',
	);
});

test('floor_id should return a floor ID if given a group entity ID', () => {
	expect(renderTemplate(hass, '{{ floor_id("light.driveway_lamps") }}')).toBe(
		'first_floor',
	);
});

test('floor_id should return a floor ID if given an area ID', () => {
	expect(renderTemplate(hass, '{{ floor_id("kitchen") }}')).toBe(
		'first_floor',
	);
});

test('floor_id should return a floor ID if given an area name', () => {
	expect(renderTemplate(hass, '{{ floor_id("Front Yard") }}')).toBe(
		'first_floor',
	);
});

test('floor_areas should return a stringified array of area IDs associated with a floor ID', () => {
	expect(renderTemplate(hass, '{{ floor_areas("first_floor") }}')).toBe(
		'front_yard,kitchen,lounge',
	);
});
