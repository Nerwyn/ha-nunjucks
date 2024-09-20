import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('zip', () => {
	it('should allow you to iterate over multiple collections in one operation', () => {
		assert.match(
			renderTemplate(
				hass,
				`{% set names = ['Null Island', 'Ark of the Covenant'] %}
{% set entities = ['device_tracker.null_island', 'device_tracker.ark_of_the_covenent'] %}
{% set attributes = ['latitude', 'longitude'] %}
{% for name, entity, attribute in zip(names, entities, attributes) %}
The {{ attribute }} of {{ name }} is {{ state_attr(entity, attribute) }}
{% endfor %}`,
			) as string,
			/(The latitude of Null Island is 0)|(The longitude of Ark of the Covenant is 29\.26883)/,
		);
	});

	it('should also unzip instead if a single list is given', () => {
		assert.match(
			renderTemplate(
				hass,
				`{% set information = [
  ['Living Room', 'sensor.living_room_temperature'],
  ['Dining Room', 'sensor.dining_room_temperature']
] %}
{% set names_entities = zip(information) %}
The names are {{ names_entities[0] | join(', ') }}
The entities are {{ names_entities[1] | join(', ') }}`,
			) as string,
			/(The names are Living Room, Dining Room)|(The entities are sensor\.living_room_temperature, sensor\.dining_room_temperature)/g,
		);
	});
});
