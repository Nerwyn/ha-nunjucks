import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('area', () => {
	it('should return a stringified array of area IDs', () => {
		assert.equal(
			renderTemplate(hass, '{{ areas() }}'),
			'bedroom,front_yard,kitchen,lounge',
		);
	});
});

describe('area_id', () => {
	it('should return an area ID if given a device ID', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ area_id("08d6a7f58fc934fba97d2ec2a66e7bba") }}',
			),
			'kitchen',
		);
	});

	it('should return an area ID if given a group entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ area_id("light.driveway_lamps") }}'),
			'front_yard',
		);
	});

	it('should return an area ID if given an area name', () => {
		assert.equal(
			renderTemplate(hass, '{{ area_id("Front Yard") }}'),
			'front_yard',
		);
	});
});

describe('area_name', () => {
	it('should return an area name if given a device ID', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ area_name("08d6a7f58fc934fba97d2ec2a66e7bba") }}',
			),
			'Kitchen',
		);
	});

	it('should return an area name if given an entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ area_name("remote.bedroom") }}'),
			'Bedroom',
		);
	});

	it('should return an area name if given an area ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ area_name("front_yard") }}'),
			'Front Yard',
		);
	});
});

describe('area_entities', () => {
	it('should return a stringified array of entity IDs if given an area ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ area_entities("front_yard") }}'),
			'light.driveway_light_1,light.driveway_light_2,sensor.driveway_light_1_signal_strength',
		);
	});

	it('should return a stringified array of entity IDs if given an area name', () => {
		assert.equal(
			renderTemplate(hass, '{{ area_entities("Bedroom") }}'),
			'remote.bedroom',
		);
	});
});

it('area_devices should return a stringified array of device IDs if given an area ID', () => {
	assert.equal(
		renderTemplate(hass, '{{ area_devices("front_yard") }}'),
		'1c81fa4a8d5d3bbc8a9fcf3b9b88b178,e4831420557f6df04603fb0850e7850b',
	);
});

it('area_devices should return a stringified array of device IDs if given an area name', () => {
	assert.equal(
		renderTemplate(hass, '{{ area_devices("Bedroom") }}'),
		'06c14f4b7dd701890e596ebbe354aa97',
	);
});
