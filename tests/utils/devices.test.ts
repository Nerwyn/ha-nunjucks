import { renderTemplate } from '../../src';
import { hass } from '../hass';

test('device_entities should return a stringified list of entity IDs associated with a device ID.', () => {
	expect(
		renderTemplate(
			hass,
			'{{ device_entities("1c81fa4a8d5d3bbc8a9fcf3b9b88b178") }}',
		),
	).toBe('light.driveway_light_1,sensor.driveway_light_1_signal_strength');
});

test('device_attr should return device attribute if it exists.', () => {
	expect(
		renderTemplate(
			hass,
			'{{ device_attr("08d6a7f58fc934fba97d2ec2a66e7bba", "modified_at") }}',
		),
	).toBe('1725659996.044056');
});

test('device_attr should act as state_attr if provided ID is not for a device.', () => {
	expect(
		renderTemplate(hass, '{{ device_attr("light.lounge", "brightness") }}'),
	).toBe('155');
});

test('is_device_attr should return boolean.', () => {
	expect(
		renderTemplate(
			hass,
			'{{ is_device_attr("08d6a7f58fc934fba97d2ec2a66e7bba", "name", "foobar") }}',
		),
	).toBe(false);

	expect(
		renderTemplate(
			hass,
			'{{ is_device_attr("08d6a7f58fc934fba97d2ec2a66e7bba", "name" ,"Bar Light 1") }}',
		),
	).toBe(true);

	expect(
		renderTemplate(
			hass,
			'{{ is_device_attr("08d6a7f58fc934fba97d2ec2a66e7bba", "name" ,["foobar", 7, "Bar Light 1"]) }}',
		),
	).toBe(true);
});

test('is_device_attr should act as is_state_attr if provided ID is not for a device.', () => {
	expect(
		renderTemplate(
			hass,
			'{{ is_device_attr("light.lounge", "brightness", 155) }}',
		),
	).toBe(true);
});

test('device_id should return the device ID of an entity given an entity ID', () => {
	expect(
		renderTemplate(hass, '{{ device_id("light.driveway_light_1") }}'),
	).toBe('1c81fa4a8d5d3bbc8a9fcf3b9b88b178');
});

test('device_id should return the device ID of an entity given a device name', () => {
	expect(renderTemplate(hass, '{{ device_id("Bar Light 1") }}')).toBe(
		'08d6a7f58fc934fba97d2ec2a66e7bba',
	);
});
