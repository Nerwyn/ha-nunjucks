import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('list', () => {
	it('should return if the input is an array/list', () => {
		assert(renderTemplate(hass, '{{ ["foo"] is list }}'));
		assert(renderTemplate(hass, '{{ ["foo", "bar"] is list }}'));
		assert(renderTemplate(hass, '{{ list("foo", "bar") is list }}'));
		assert(renderTemplate(hass, '{{ "foo" is not list }}'));
	});
});

describe('set', () => {
	it('should return if the input is a set', () => {
		assert(renderTemplate(hass, '{{ set("foo") is set }}'));
		assert(renderTemplate(hass, '{{ set("foo", "bar", "foo") is set }}'));
		assert(renderTemplate(hass, '{{ ["foo", "bar"] is not set }}'));
		assert(
			renderTemplate(hass, '{{ list(set("foo", "bar", "foo")) is not set }}'),
		);
	});
});

describe('datetime', () => {
	it('should return if the input is a datetime', () => {
		assert(renderTemplate(hass, '{{ now() is datetime }}'));
		assert(renderTemplate(hass, '{{ 199999990 is not datetime }}'));
	});
});

describe('string_like', () => {
	it('should return if the input is a string', () => {
		assert(renderTemplate(hass, '{{ "foobar" is string_like }}'));
		assert(renderTemplate(hass, '{{ 1234 is not string_like }}'));
	});
});

describe('typeof', () => {
	it('should return the python type of the input', () => {
		assert.equal(renderTemplate(hass, '{{ typeof(42) }}'), 'int');
		assert.equal(renderTemplate(hass, '{{ 4.2 | typeof }}'), 'float');
		assert.equal(renderTemplate(hass, '{{ typeof("foo") }}'), 'str');
		assert.equal(renderTemplate(hass, '{{ True | typeof }}'), 'bool');
		assert.equal(renderTemplate(hass, '{{ [1,2,"foo"] | typeof }}'), 'list');
		assert.equal(renderTemplate(hass, '{{ typeof({"foo": "bar"}) }}'), 'dict');
		assert.equal(renderTemplate(hass, '{{ typeof() }}'), 'NoneType');
	});
});
