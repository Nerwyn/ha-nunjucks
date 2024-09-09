import { renderTemplate } from '../../src';
import { hass } from '../hass';

test('integration_entities should return a stringified array of entity IDs.', () => {
	expect(
		renderTemplate(hass, '{{ integration_entities("meross_lan") }}'),
	).toBe(
		'light.driveway_light_1,light.driveway_light_2,sensor.driveway_light_1_signal_strength',
	);
});
