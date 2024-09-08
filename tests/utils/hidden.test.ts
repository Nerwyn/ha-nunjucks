import { renderTemplate } from '../../src';
import { hass } from '../hass';

test('is_hidden_entity should return true only if hidden is true.', () => {
	expect(
		renderTemplate(
			hass,
			'{{ is_hidden_entity("light.driveway_light_1") }}',
		),
	).toBe(true);
});

test('is_hidden_entity should return false if hidden field is not present.', () => {
	expect(
		renderTemplate(hass, '{{ is_hidden_entity("light.driveway_lamps") }}'),
	).toBe(false);
});
