import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('expand', () => {
	it('should return a sorted array of state objects if given a list of entity IDs', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "device_tracker.null_island", "person.john_doe")[0].entity_id }}',
			),
			'device_tracker.null_island',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "device_tracker.null_island", "person.john_doe")[1].entity_id }}',
			),
			'input_number.volume',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "device_tracker.null_island", "person.john_doe")[2].entity_id }}',
			),
			'person.john_doe',
		);
	});

	it('should return a sorted array of state objects if given a list of state objects', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand(hass.states["device_tracker.null_island"], hass.states["person.john_doe"], hass.states["input_number.volume"])[0].entity_id }}',
			),
			'device_tracker.null_island',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand(hass.states["device_tracker.null_island"], hass.states["person.john_doe"], hass.states["input_number.volume"])[1].entity_id }}',
			),
			'input_number.volume',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand(hass.states["device_tracker.null_island"], hass.states["person.john_doe"], hass.states["input_number.volume"])[2].entity_id }}',
			),
			'person.john_doe',
		);
	});

	it('should expand group entities into their children and not include the parent entity', () => {
		assert.match(
			renderTemplate(
				hass,
				'{{ to_json(expand("input_number.volume", "zone.home", "light.lounge")) }}',
			) as string,
			/person\.jane_doe/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ to_json(expand("input_number.volume", "zone.home", "light.lounge")) }}',
			) as string,
			/light\.ceiling_bulb_1/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ to_json(expand("input_number.volume", "zone.home", "light.lounge")) }}',
			) as string,
			/light\.ceiling_bulb_2/g,
		);
		assert.doesNotMatch(
			renderTemplate(
				hass,
				'{{ to_json(expand("input_number.volume", "zone.home", "light.lounge")) }}',
			) as string,
			/zone\.home/g,
		);
		assert.doesNotMatch(
			renderTemplate(
				hass,
				'{{ to_json(expand("input_number.volume", "zone.home", "light.lounge")) }}',
			) as string,
			/light\.lounge/g,
		);
	});
});
