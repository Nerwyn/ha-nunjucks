import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('issues', () => {
	it('should return the issues registry', () => {
		assert.equal(
			renderTemplate(hass, '{{ issues() | dump | safe }}'),
			JSON.stringify(window.haNunjucks.repairsIssues.issues),
		);
	});
});

describe('issue', () => {
	it('should return an issue given its domain and issue ID', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ issue("mass", "move_integration_to_ha_coremass") | dump | safe }}',
			),
			JSON.stringify(
				window.haNunjucks.repairsIssues.issues[
					'mass,move_integration_to_ha_coremass'
				],
			),
		);
	});
});
