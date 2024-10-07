import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('floors', () => {
	it('should return a stringified array of floor IDs', () => {
		assert.equal(
			renderTemplate(hass, '{{ floors() }}'),
			'first_floor,second_floor',
		);
	});
});

describe('floor_id', () => {
	it('should return a floor ID if given a device ID', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ floor_id("08d6a7f58fc934fba97d2ec2a66e7bba") }}',
			),
			'first_floor',
		);
	});

	it('should return a floor ID if given an entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_id("remote.bedroom") }}'),
			'second_floor',
		);
	});

	it('should return a floor ID if given a group entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_id("light.driveway_lamps") }}'),
			'first_floor',
		);
	});

	it('should return a floor ID if given an area ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_id("kitchen") }}'),
			'first_floor',
		);
	});

	it('should return a floor ID if given an area name', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_id("Front Yard") }}'),
			'first_floor',
		);
	});
});

describe('floor_name', () => {
	it('should return a floor name if given a device ID', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ floor_name("08d6a7f58fc934fba97d2ec2a66e7bba") }}',
			),
			'First Floor',
		);
	});

	it('should return a floor name if given an entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_name("remote.bedroom") }}'),
			'Second Floor',
		);
	});

	it('should return a floor name if given a group entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_name("light.driveway_lamps") }}'),
			'First Floor',
		);
	});

	it('should return a floor name if given an area ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_name("kitchen") }}'),
			'First Floor',
		);
	});

	it('should return a floor name if given an area name', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_name("Front Yard") }}'),
			'First Floor',
		);
	});

	it('should return a floor name if given a floor ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_name("second_floor") }}'),
			'Second Floor',
		);
	});
});

describe('floor_areas', () => {
	it('should return a stringified array of area IDs associated with a floor ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_areas("first_floor") }}'),
			'front_yard,kitchen,lounge',
		);
	});

	it('should return a stringified array of area IDs associated with a floor name', () => {
		assert.equal(
			renderTemplate(hass, '{{ floor_areas("First Floor") }}'),
			'front_yard,kitchen,lounge',
		);
	});
});
