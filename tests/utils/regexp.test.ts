import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('match', () => {
	it('should return if the find string matches the beginning of the input', () => {
		assert(renderTemplate(hass, '{{ "foobar" is match("foo") }}'));
		assert(renderTemplate(hass, '{{ "foobar" is not match("bar") }}'));
		assert(renderTemplate(hass, '{{ "foobar" is not match("FOO") }}'));
	});
});

describe('search', () => {
	it('should return if the find string matches anywhere in the input', () => {
		assert(renderTemplate(hass, '{{ "foobar" is search("foo") }}'));
		assert(renderTemplate(hass, '{{ "foobar" is search("bar") }}'));
		assert(renderTemplate(hass, '{{ "foobar" is search("ob") }}'));
		assert(renderTemplate(hass, '{{ "foobar" is not search("FOO") }}'));
	});
});

describe('test', () => {
	it('should return if the find user provided regular expression matches the input', () => {
		assert(renderTemplate(hass, '{{ "foobar" is test(r/^foo/) }}'));
		assert(renderTemplate(hass, '{{ "foobar" is test(r/bar$/) }}'));
		assert(renderTemplate(hass, '{{ "foobar" is test(r/ob/g) }}'));
		assert(renderTemplate(hass, '{{ "foobar" is not test(r/baz/g) }}'));
	});
});

describe('regex_replace', () => {
	it('should replace all instances of a string find', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_replace("the", "da") }}',
			),
			'da quick brown fox jumped over da lazy dog',
		);
	});

	it('should replace all instances of a regular expression find', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_replace(r/th/, "d") }}',
			),
			'de quick brown fox jumped over de lazy dog',
		);
	});
});

describe('regex_findall', () => {
	it('should find all instances of a string find', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_findall("the") | to_json }}',
			),
			'["the","the"]',
		);
	});

	it('should find all instances of a regular expression find', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_findall(r/th./g) | to_json }}',
			),
			'["the","the"]',
		);
	});
});

describe('regex_findall_index', () => {
	it('should find the first instance of a string find', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_findall_index("the") }}',
			),
			'the',
		);
	});

	it('should find the first instance of a regular expression find', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_findall_index(r/o./) }}',
			),
			'ow',
		);
	});

	it('should find the nth instance of a regular expression find given an index', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_findall_index(r/o./, 0) }}',
			),
			'ow',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_findall_index(r/o./, 1) }}',
			),
			'ox',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_findall_index(r/o./, 2) }}',
			),
			'ov',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ "the quick brown fox jumped over the lazy dog" | regex_findall_index(r/o./, 3) }}',
			),
			'og',
		);
	});
});
