import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('states', () => {
	it('should return state of an entity', () => {
		assert.equal(
			renderTemplate(hass, '{{ states("light.lounge") }}'),
			'on',
		);
		assert.equal(renderTemplate(hass, '{{ states("foobar") }}'), '');
	});
});
