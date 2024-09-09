import { renderTemplate } from '../../src';
import { hass } from '../hass';

test('floors should return a stringified array of floor IDs.', () => {
	expect(renderTemplate(hass, '{{ floors() }}')).toBe(
		'first_floor,second_floor',
	);
});

test('floor_id should return floor ID if given device ID', () => {
	expect(
		renderTemplate(
			hass,
			'{{ floor_id("08d6a7f58fc934fba97d2ec2a66e7bba") }}',
		),
	).toBe('first_floor');
});

test('floor_id should return floor ID if given entity ID', () => {
	expect(renderTemplate(hass, '{{ floor_id("remote.bedroom") }}')).toBe(
		'second_floor',
	);
});

test('floor_id should return floor ID if given area ID', () => {
	expect(renderTemplate(hass, '{{ floor_id("kitchen") }}')).toBe(
		'first_floor',
	);
});

test('floor_id should return floor ID if given area name', () => {
	expect(renderTemplate(hass, '{{ floor_id("Front Yard") }}')).toBe(
		'first_floor',
	);
});

test('floor_name should return floor name if given device ID', () => {
	expect(
		renderTemplate(
			hass,
			'{{ floor_name("08d6a7f58fc934fba97d2ec2a66e7bba") }}',
		),
	).toBe('First Floor');
});

test('floor_name should return floor name if given entity ID', () => {
	expect(renderTemplate(hass, '{{ floor_name("remote.bedroom") }}')).toBe(
		'Second Floor',
	);
});

test('floor_name should return floor name if given area ID', () => {
	expect(renderTemplate(hass, '{{ floor_name("kitchen") }}')).toBe(
		'First Floor',
	);
});

test('floor_name should return floor name if given floor ID', () => {
	expect(renderTemplate(hass, '{{ floor_name("first_floor") }}')).toBe(
		'First Floor',
	);
});

test('floor_areas should return a stringified array of area IDs associated with a floor ID', () => {
	expect(renderTemplate(hass, '{{ floor_areas("first_floor") }}')).toBe(
		'front_yard,kitchen,lounge',
	);
});

test('floor_areas should return a stringified array of area IDs associated with a floor name', () => {
	expect(renderTemplate(hass, '{{ floor_areas("Second Floor") }}')).toBe(
		'bedroom',
	);
});
