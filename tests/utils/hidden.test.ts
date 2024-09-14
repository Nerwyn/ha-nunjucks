import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('is_hidden_entity', () => {
	it('should return true only if hidden is true', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_hidden_entity("light.driveway_light_1") }}',
			),
			true,
		);
	});

	it('should return false if hidden field is not present', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_hidden_entity("light.driveway_lamps") }}',
			),
			false,
		);
	});
});
