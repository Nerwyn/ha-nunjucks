import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('distance', () => {
	it('should return the distance between a set of coordinates and the home zone', () => {
		assert.equal(
			parseInt(renderTemplate(hass, '{{ distance(0, 0) }}') as string),
			parseInt('7624.498723703572' as string),
		);
	});

	it('should return the distance between an entity and the home zone', () => {
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance("person.john_doe") }}',
				) as string,
			),
			parseInt('800.609239342353' as string),
		);
	});

	it('should return the distance between a state object and the home zone', () => {
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance(hass.states["person.john_doe"]) }}',
				) as string,
			),
			parseInt('800.609239342353' as string),
		);
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance(_states.person.john_doe) }}',
				) as string,
			),
			parseInt('800.609239342353' as string),
		);
	});

	it('should return the distance between two given sets of coordinates', () => {
		assert.equal(
			parseInt(
				renderTemplate(hass, '{{ distance(0, 0, 3, 3) }}') as string,
			),
			parseInt('292.4203712817148' as string),
		);
	});

	it('should return the distance between two entities', () => {
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance("person.john_doe", "person.jane_doe") }}',
				) as string,
			),
			parseInt('815.208567690914' as string),
		);
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance("person.jane_doe", "person.john_doe") }}',
				) as string,
			),
			parseInt('815.208567690914' as string),
		);
	});

	it('should return the distance between two state objects', () => {
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance(hass.states["person.john_doe"], hass.states["person.jane_doe"]) }}',
				) as string,
			),
			parseInt('815.208567690914' as string),
		);
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance(_states.person.jane_doe, _states.person.john_doe) }}',
				) as string,
			),
			parseInt('815.208567690914' as string),
		);
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance(hass.states["person.john_doe"], _states.person.jane_doe) }}',
				) as string,
			),
			parseInt('815.208567690914' as string),
		);
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance(_states.person.john_doe, hass.states["person.jane_doe"]) }}',
				) as string,
			),
			parseInt('815.208567690914' as string),
		);
	});

	it('should return the distance between an entity and a set of coordinates', () => {
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance(0, 0, "person.jane_doe") }}',
				) as string,
			),
			parseInt('7186.499442630041' as string),
		);
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance("person.jane_doe", 0, 0) }}',
				) as string,
			),
			parseInt('7186.499442630041' as string),
		);
	});

	it('should return the distance between an entity and a state object', () => {
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance(hass.states["person.john_doe"], "person.jane_doe") }}',
				) as string,
			),
			parseInt('815.208567690914' as string),
		);
		assert.equal(
			parseInt(
				renderTemplate(
					hass,
					'{{ distance("person.jane_doe", _states.person.john_doe) }}',
				) as string,
			),
			parseInt('815.208567690914' as string),
		);
	});
});

describe('closest', () => {
	describe('if given one argument', () => {
		it('should return the closest entity to home if given hass.states', () => {
			assert.equal(
				renderTemplate(hass, '{{ closest(hass.states).entity_id }}'),
				'person.john_doe',
			);
		});

		it('should return the closest entity to home if given _states', () => {
			assert.equal(
				renderTemplate(hass, '{{ closest(_states).entity_id }}'),
				'person.john_doe',
			);
		});

		it('should return the closest entity to home if given _states.domain', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(_states.device_tracker).entity_id }}',
				),
				'device_tracker.ark_of_the_covenent',
			);
		});

		it('should return the closest entity in a domain if given one', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest("device_tracker").entity_id }}',
				),
				'device_tracker.ark_of_the_covenent',
			);
		});

		it('should return the closest person in any zone if given "zone"', () => {
			assert.equal(
				renderTemplate(hass, '{{ closest("zone").entity_id }}'),
				'person.jane_doe',
			);
		});

		it('should return the closest person in any zone if given a specific zone by entity ID or state object', () => {
			assert.equal(
				renderTemplate(hass, '{{ closest("zone.danger").entity_id }}'),
				'person.jane_doe',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(hass.states["zone.danger"]).entity_id }}',
				),
				'person.jane_doe',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(_states.zone.danger).entity_id }}',
				),
				'person.jane_doe',
			);
		});
	});

	describe('if given multiple arguments', () => {
		it('should return the closest entity to the first listed location', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest("zone.danger", hass.states).entity_id }}',
				),
				'device_tracker.null_island',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest("zone.danger", _states).entity_id }}',
				),
				'device_tracker.null_island',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest("zone.danger", _states.person).entity_id }}',
				),
				'person.john_doe',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest("zone.danger", "person").entity_id }}',
				),
				'person.john_doe',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest("zone.danger", "zone.danger").entity_id }}',
				),
				'person.jane_doe',
			);
		});

		it('should return the closet entity to a given coordinate', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(31, 31, hass.states).entity_id }}',
				),
				'device_tracker.ark_of_the_covenent',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(31, 31, _states).entity_id }}',
				),
				'device_tracker.ark_of_the_covenent',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(31, 31, _states.person).entity_id }}',
				),
				'person.jane_doe',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(31, 31, "device_tracker").entity_id }}',
				),
				'device_tracker.ark_of_the_covenent',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(31, 31, "person").entity_id }}',
				),
				'person.jane_doe',
			);
			assert.equal(
				renderTemplate(hass, '{{ closest(31, 31, "zone").entity_id }}'),
				'person.jane_doe',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(31, 31, "zone.danger").entity_id }}',
				),
				'person.jane_doe',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(31, 31, hass.states["zone.danger"]).entity_id }}',
				),
				'person.jane_doe',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ closest(31, 31, _states.zone.danger).entity_id }}',
				),
				'person.jane_doe',
			);
		});
	});
});
