import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('md5', () => {
	it('should md5 hash an input', () => {
		assert.equal(
			renderTemplate(hass, '{{ md5("Home Assistant") }}'),
			'3d15e5c102c3413d0337393c3287e006',
		);
		assert.equal(
			renderTemplate(hass, '{{ "Home Assistant" | md5 }}'),
			'3d15e5c102c3413d0337393c3287e006',
		);
	});
});

describe('sha1', () => {
	it('should sha1 hash an input', () => {
		assert.equal(
			renderTemplate(hass, '{{ sha1("Home Assistant") }}'),
			'c8fd3bb19b94312664faa619af7729bdbf6e9f8a',
		);
		assert.equal(
			renderTemplate(hass, '{{ "Home Assistant" | sha1 }}'),
			'c8fd3bb19b94312664faa619af7729bdbf6e9f8a',
		);
	});
});

describe('sha256', () => {
	it('should sha256 hash an input', () => {
		assert.equal(
			renderTemplate(hass, '{{ sha256("Home Assistant") }}'),
			'2a366abb0cd47f51f3725bf0fb7ebcb4fefa6e20f4971e25fe2bb8da8145ce2b',
		);
		assert.equal(
			renderTemplate(hass, '{{ "Home Assistant" | sha256 }}'),
			'2a366abb0cd47f51f3725bf0fb7ebcb4fefa6e20f4971e25fe2bb8da8145ce2b',
		);
	});
});

describe('sha512', () => {
	it('should sha512 hash an input', () => {
		assert.equal(
			renderTemplate(hass, '{{ sha512("Home Assistant") }}'),
			'9e3c2cdd1fbab0037378d37e1baf8a3a4bf92c54b56ad1d459deee30ccbb2acbebd7a3614552ea08992ad27dedeb7b4c5473525ba90cb73dbe8b9ec5f69295bb',
		);
		assert.equal(
			renderTemplate(hass, '{{ "Home Assistant" | sha512 }}'),
			'9e3c2cdd1fbab0037378d37e1baf8a3a4bf92c54b56ad1d459deee30ccbb2acbebd7a3614552ea08992ad27dedeb7b4c5473525ba90cb73dbe8b9ec5f69295bb',
		);
	});
});
