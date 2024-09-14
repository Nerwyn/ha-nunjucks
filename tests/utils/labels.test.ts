import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('labels', () => {
	it('should return all labels if no argument is provided', () => {
		assert.equal(
			renderTemplate(hass, '{{ labels() }}'),
			'ir,lighting,lounge_ceiling_fan,outside',
		);
	});

	it(' should return all labels associated with a provided entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ labels("light.driveway_lamps") }}'),
			'lighting',
		);
	});

	it('should return all labels associated with a provided device ID', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ labels("06c14f4b7dd701890e596ebbe354aa97") }}',
			),
			'ir',
		);
	});

	it('should return all labels associated with a provided area ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ labels("front_yard") }}'),
			'outside',
		);
	});
});

describe('label_areas', () => {
	it('label_areas should return a list of area IDs for a given label ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ label_areas("outside") }}'),
			'front_yard',
		);
	});
});

describe('label_devices', () => {
	it('label_devices should return a list of device IDs for a given label ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ label_devices("ir") }}'),
			'06c14f4b7dd701890e596ebbe354aa97',
		);
	});
});

describe('label_entities', () => {
	it('label_entities should return a list of entity IDs for a given label ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ label_entities("lighting") }}'),
			'light.driveway_lamps',
		);
	});
});
