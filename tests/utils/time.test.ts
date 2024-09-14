import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('time', () => {
	it('should return different values for now and utcnow', () => {
		assert.notEqual(
			renderTemplate(hass, '{{ now() }}'),
			renderTemplate(hass, '{{ utcnow() }}'),
		);
	});
});

describe('as_datetime', () => {
	describe('given a timestamp', () => {
		it('should turn a timestamp into a datetime object with readable fields', () => {
			console.log(
				renderTemplate(hass, '{{ as_datetime(199999990).hour }}'),
			);
			assert.equal(
				renderTemplate(hass, '{{ as_datetime(199999990).year }}'),
				'1976',
			);
			assert.equal(
				renderTemplate(hass, '{{ as_datetime(199999990).month }}'),
				'5',
			);
			assert.equal(
				renderTemplate(hass, '{{ as_datetime(199999990).day }}'),
				'3',
			);
			assert.equal(
				renderTemplate(hass, '{{ as_datetime(199999990).hour }}'),
				'19',
			);
			assert.equal(
				renderTemplate(hass, '{{ as_datetime(199999990).minute }}'),
				'33',
			);
			assert.equal(
				renderTemplate(hass, '{{ as_datetime(199999990).second }}'),
				'10',
			);
		});

		it('string representation should be the date and time', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_datetime(512345151) }}'),
				'1986-03-27 22:05:51.000000',
			);
		});

		it('should accept a datetime object and not mutate it', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_datetime(512345151) }}'),
				renderTemplate(
					hass,
					'{{ as_datetime(as_datetime(512345151)) }}',
				),
			);
		});

		it('should accept a date object and set its time to 00:00:00', () => {
			console.log(
				renderTemplate(
					hass,
					'{{ as_datetime(512345151).date().hour }}',
				),
			);
			console.log(
				renderTemplate(
					hass,
					'{{ as_datetime(512345151).date().minute }}',
				),
			);
			console.log(
				renderTemplate(
					hass,
					'{{ as_datetime(512345151).date().second }}',
				),
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_datetime(as_datetime(512345151).date()) }}',
				),
				'1986-03-27 00:00:00.000000',
			);
		});

		it('should return a fallback value on error', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_datetime("foo", "bar") }}'),
				'bar',
			);
		});
	});
});
