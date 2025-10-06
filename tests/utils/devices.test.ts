import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('device_entities', () => {
	it('should return a stringified list of entity IDs associated with a device ID', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ device_entities("1c81fa4a8d5d3bbc8a9fcf3b9b88b178") }}',
			),
			'light.driveway_light_1,sensor.driveway_light_1_signal_strength',
		);
	});
});

describe('device_attr', () => {
	it('should return device attribute if it exists', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ device_attr("08d6a7f58fc934fba97d2ec2a66e7bba", "modified_at") }}',
			),
			'1725659996.044056',
		);
	});

	it('should act as state_attr if provided ID is not for a device', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ device_attr("light.lounge", "brightness") }}',
			),
			'155',
		);
	});
});

describe('is_device_attr', () => {
	it('should return a boolean', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_device_attr("08d6a7f58fc934fba97d2ec2a66e7bba", "name", "foobar") }}',
			),
			false,
		);

		assert.equal(
			renderTemplate(
				hass,
				'{{ is_device_attr("08d6a7f58fc934fba97d2ec2a66e7bba", "name" ,"Bar Light 1") }}',
			),
			true,
		);
	});

	it('is_device_attr should act as is_state_attr if provided ID is not for a device', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_device_attr("light.lounge", "brightness", 155) }}',
			),
			true,
		);
	});
});

describe('device_id', () => {
	it('should return the device ID of an entity given an entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ device_id("light.driveway_light_1") }}'),
			'1c81fa4a8d5d3bbc8a9fcf3b9b88b178',
		);
	});

	it('should return the device ID of an entity given a device name', () => {
		assert.equal(
			renderTemplate(hass, '{{ device_id("Bar Light 1") }}'),
			'08d6a7f58fc934fba97d2ec2a66e7bba',
		);
	});
});

describe('device_name', () => {
	it('should return the device name as defined by the user given an entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ device_name("light.driveway_light_1") }}'),
			'Driveway Lamp 1',
		);
	});

	it('should return the original device name if no user defined name exists given an entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ device_name("light.driveway_light_2") }}'),
			'Driveway Light 2',
		);
	});

	it('should return the device name as defined by the user given an device ID', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ device_name("1c81fa4a8d5d3bbc8a9fcf3b9b88b178") }}',
			),
			'Driveway Lamp 1',
		);
	});

	it('should return the original device name if no user defined name exists given an device ID', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ device_name("e4831420557f6df04603fb0850e7850b") }}',
			),
			'Driveway Light 2',
		);
	});
});
