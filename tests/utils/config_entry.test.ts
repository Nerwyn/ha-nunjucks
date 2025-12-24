import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('config_entry_id', () => {
	it('should return the config entry for an entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ config_entry_id("light.ceiling_bulb_1") }}'),
			'6e90d52c9ed31698e6be9a5b2df42c74',
		);
		assert.equal(
			renderTemplate(hass, '{{ "light.ceiling_bulb_2" | config_entry_id }}'),
			'b2a208c58f6ed7b83b83e0ced9392303',
		);
	});

	it('should return undefined for an invalid entity ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ "light.ceiling_bulb_3" | config_entry_id }}'),
			'',
		);
	});
});

describe('config_entry_attr', () => {
	it('should return the value of an attribute', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ config_entry_attr("6e90d52c9ed31698e6be9a5b2df42c74", "state") }}',
			),
			'loaded',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ "b2a208c58f6ed7b83b83e0ced9392303" | config_entry_attr("domain") }}',
			),
			'meross_lan',
		);
	});

	it('should return undefined for an invalid config entry ID', () => {
		assert.equal(
			renderTemplate(hass, '{{ "foobar" | config_entry_attr("domain") }}'),
			'',
		);
	});

	it('should throw an error if given an invalid attribute', () => {
		assert.throws(() =>
			renderTemplate(
				hass,
				'{{ config_entry_attr("6e90d52c9ed31698e6be9a5b2df42c74", "foobar") }}',
			),
		);
		assert.throws(() =>
			renderTemplate(
				hass,
				'{{ "b2a208c58f6ed7b83b83e0ced9392303" | config_entry_attr("modified_at") }}',
			),
		);
	});
});
