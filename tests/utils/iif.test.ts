import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('iif', () => {
	it('should return true or false if only condition is given', () => {
		assert.equal(renderTemplate(hass, '{{ iif("foo" == "foo") }}'), true);
		assert.equal(renderTemplate(hass, '{{ iif("foo" == "bar") }}'), false);
	});

	it('should return if_true if condition is true or false otherwise', () => {
		assert.equal(
			renderTemplate(hass, `{{ iif("foo" == "foo", "is foo") }}`),
			'is foo',
		);
		assert.equal(
			renderTemplate(hass, `{{ iif("foo" == "bar", "is foo") }}`),
			false,
		);
	});

	it('should return if_true if condition is true or if_false otherwise', () => {
		assert.equal(
			renderTemplate(
				hass,
				`{{ iif("foo" == "foo", "is foo", "is not foo") }}`,
			),
			'is foo',
		);
		assert.equal(
			renderTemplate(
				hass,
				`{{ iif("foo" == "bar", "is foo", "is not foo") }}`,
			),
			'is not foo',
		);
		assert.equal(
			renderTemplate(
				hass,
				`{{ iif("foo" == "bar", if_false="is not foo") }}`,
			),
			'is not foo',
		);
	});

	it('should return is_none if comparison', () => {
		assert.equal(
			renderTemplate(
				hass,
				`{{ iif(None, "is true", "is false", "is none") }}`,
			),
			'is none',
		);
		assert.equal(
			renderTemplate(hass, `{{ iif(None, if_none="is none") }}`),
			'is none',
		);
	});
});
