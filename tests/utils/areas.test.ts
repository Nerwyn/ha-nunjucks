import { renderTemplate } from '../../src';
import { hass } from '../hass';

test('areas should return a stringified array of area IDs.', () => {
	expect(renderTemplate(hass, '{{ areas() }}')).toBe(
		'bedroom,front_yard,kitchen,lounge',
	);
});

test('area_id should return an area ID if given a device ID', () => {
	expect(
		renderTemplate(
			hass,
			'{{ area_id("08d6a7f58fc934fba97d2ec2a66e7bba") }}',
		),
	).toBe('kitchen');
});

test('area_id should return an area ID if given an entity ID', () => {
	expect(renderTemplate(hass, '{{ area_id("remote.bedroom") }}')).toBe(
		'bedroom',
	);
});

test('area_id should return an area ID if given an area name', () => {
	expect(renderTemplate(hass, '{{ area_id("Front Yard") }}')).toBe(
		'front_yard',
	);
});

test('area_name should return an area name if given a device ID', () => {
	expect(
		renderTemplate(
			hass,
			'{{ area_name("08d6a7f58fc934fba97d2ec2a66e7bba") }}',
		),
	).toBe('Kitchen');
});

test('area_name should return an area name if given an entity ID', () => {
	expect(renderTemplate(hass, '{{ area_name("remote.bedroom") }}')).toBe(
		'Bedroom',
	);
});

test('area_name should return an area name if given an area ID', () => {
	expect(renderTemplate(hass, '{{ area_name("front_yard") }}')).toBe(
		'Front Yard',
	);
});

test('area_entities should return a stringified array of entity IDs if given an area ID', () => {
	expect(renderTemplate(hass, '{{ area_entities("front_yard") }}')).toBe(
		'light.driveway_light_1,light.driveway_light_2,sensor.driveway_light_1_signal_strength',
	);
});

test('area_entities should return a stringified array of entity IDs if given an area name', () => {
	expect(renderTemplate(hass, '{{ area_entities("Bedroom") }}')).toBe(
		'remote.bedroom',
	);
});

test('area_devices should return a stringified array of device IDs if given an area ID', () => {
	expect(renderTemplate(hass, '{{ area_devices("front_yard") }}')).toBe(
		'1c81fa4a8d5d3bbc8a9fcf3b9b88b178,e4831420557f6df04603fb0850e7850b',
	);
});

test('area_devices should return a stringified array of device IDs if given an area name', () => {
	expect(renderTemplate(hass, '{{ area_devices("Bedroom") }}')).toBe(
		'06c14f4b7dd701890e596ebbe354aa97',
	);
});
