import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('integration_entities', () => {
	it('should return a stringified array of entity IDs', () => {
		assert.equal(
			renderTemplate(hass, '{{ integration_entities("meross_lan") }}'),
			'light.driveway_light_1,light.driveway_light_2,sensor.driveway_light_1_signal_strength',
		);
	});
});
