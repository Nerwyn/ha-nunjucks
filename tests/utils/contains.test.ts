import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('contains', () => {
	it('should return whether a value exists in a list', () => {
		assert(
			renderTemplate(
				hass,
				'{{ state_attr("light.lounge", "supported_color_modes") | contains("rgb") }}',
			),
		);
	});
});
