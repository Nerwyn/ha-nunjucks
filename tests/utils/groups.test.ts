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

	it('should return a sorted array of state objects if given a list of hass states', () => {
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

	it('should return a sorted array of state objects if given a list of _states objects', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand(_states.device_tracker.null_island, _states.person.john_doe, _states.input_number.volume)[0].entity_id }}',
			),
			'device_tracker.null_island',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand(_states.device_tracker.null_island, _states.person.john_doe, _states.input_number.volume)[1].entity_id }}',
			),
			'input_number.volume',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand(_states.device_tracker.null_island, _states.person.john_doe, _states.input_number.volume)[2].entity_id }}',
			),
			'person.john_doe',
		);
	});

	it('should return a sorted array of state objects if given one or more _states domain object', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand(_states.device_tracker)[0].entity_id }}',
			),
			'device_tracker.ark_of_the_covenent',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ expand(_states.device_tracker, _states.zone)[3].entity_id }}',
			),
			'zone.home',
		);
	});

	it('should return all state objects if given _states', () => {
		assert.equal(
			renderTemplate(hass, '{{ expand(_states).length }}'),
			Object.keys(hass.states)
				.filter(
					(entityId) => !hass.states[entityId].attributes?.persons,
				)
				.length.toString(),
		);
	});

	it('should expand group entities into their children and not include the parent entity', () => {
		assert.match(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", "light.lounge") | to_json }}',
			) as string,
			/person\.jane_doe/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", hass.states["zone.home"], "light.lounge") | to_json }}',
			) as string,
			/person\.jane_doe/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", _states.zone.home, "light.lounge") | to_json }}',
			) as string,
			/person\.jane_doe/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", "light.lounge") | to_json }}',
			) as string,
			/light\.ceiling_bulb_1/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", "light.lounge") | to_json }}',
			) as string,
			/light\.ceiling_bulb_2/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", hass.states["light.lounge"]) | to_json }}',
			) as string,
			/light\.ceiling_bulb_1/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", hass.states["light.lounge"]) | to_json }}',
			) as string,
			/light\.ceiling_bulb_2/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", _states.light.lounge) | to_json }}',
			) as string,
			/light\.ceiling_bulb_1/g,
		);
		assert.match(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", _states.light.lounge) | to_json }}',
			) as string,
			/light\.ceiling_bulb_2/g,
		);
		assert.doesNotMatch(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", "light.lounge") | to_json }}',
			) as string,
			/zone\.home/g,
		);
		assert.doesNotMatch(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", hass.states["zone.home"], "light.lounge") | to_json }}',
			) as string,
			/zone\.home/g,
		);
		assert.doesNotMatch(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", _states.zone.home, "light.lounge") | to_json }}',
			) as string,
			/zone\.home/g,
		);
		assert.doesNotMatch(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", "light.lounge") | to_json }}',
			) as string,
			/light\.lounge/g,
		);
		assert.doesNotMatch(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", hass.states["light.lounge"]) | to_json }}',
			) as string,
			/light\.lounge/g,
		);
		assert.doesNotMatch(
			renderTemplate(
				hass,
				'{{ expand("input_number.volume", "zone.home", _states.light.lounge) | to_json }}',
			) as string,
			/light\.lounge/g,
		);
	});
});
