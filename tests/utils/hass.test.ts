import { renderTemplate } from '../../src';
import { hass } from '../hass';

test('hass object should allow users to access entity state object with just dot notation', () => {
	const value = hass['states']['light.lounge']['state'];
	expect(renderTemplate(hass, '{{ hass.states.light.lounge.state }}')).toBe(
		value,
	);
});
