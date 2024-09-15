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

describe('today_at', () => {
	it("should return a datetime with today's date and the provided time", () => {
		const now = new Date();
		assert.equal(
			renderTemplate(hass, '{{ today_at("12:34") }}'),
			`${now.getUTCFullYear()}-${(now.getUTCMonth() + 1).toString().padStart(2, '0')}-${now.getUTCDate().toString().padStart(2, '0')} 12:34:00`,
		);
	});

	it("should return a datetime with today's date at midnight if no input is provided", () => {
		const now = new Date();
		assert.equal(
			renderTemplate(hass, '{{ today_at() }}'),
			`${now.getUTCFullYear()}-${(now.getUTCMonth() + 1).toString().padStart(2, '0')}-${now.getUTCDate().toString().padStart(2, '0')} 00:00:00`,
		);
	});
});

describe('as_datetime', () => {
	describe('given a timestamp', () => {
		it('should turn a timestamp into a datetime object with readable fields', () => {
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
				'1986-03-27 22:05:51',
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
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_datetime(as_datetime(512345151).date()) }}',
				),
				'1986-03-27 00:00:00',
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

describe('as_timestamp', () => {
	it('should convert a datetime object into a timestamp', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ as_timestamp(as_datetime(15123412512)) }}',
			),
			'15123412512',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ as_timestamp(as_datetime(as_datetime(57493759182))) }}',
			),
			'57493759182',
		);
	});

	it('should convert a date object into a timestamp', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ as_timestamp(as_datetime(as_datetime(57493759182).date())) }}',
			),
			'57493774800',
		);
	});

	it('should parse string dates and datetimes', () => {
		assert.equal(
			renderTemplate(hass, '{{ as_timestamp("1988-03-21") }}'),
			'574923600',
		);
		assert.equal(
			renderTemplate(hass, '{{ as_timestamp("1988-03-21 08:53:12") }}'),
			'574955592',
		);
		assert.equal(
			renderTemplate(hass, '{{ as_timestamp("1988-03-21T08:53:12") }}'),
			'574955592',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ as_timestamp("1988-03-21T08:53:12+00:00") }}',
			),
			'574937592',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ as_timestamp("1988-03-21T08:53:12+05:30") }}',
			),
			'574917792',
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(
			renderTemplate(hass, '{{ as_timestamp("foo", "bar") }}'),
			'bar',
		);
	});
});

describe('strptime', () => {
	it('should parse a datetime string using format codes', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ strptime("2020-11-10T8:12:50", "%Y-%m-%dT%H:%M:%S") }}',
			),
			'2020-11-10 08:12:50',
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ strptime("not a date", "%Y-%m-%dT%H:%M:%S", "foobar") }}',
			),
			'foobar',
		);
	});
});

describe('timedelta', () => {
	it('should return a timedelta object with string representation', () => {
		assert.equal(
			renderTemplate(hass, '{{ timedelta(4, 32, 0, 0, 32, 8, 2) }}'),
			'18 days, 8:32:32',
		);
	});

	it("should ignore microseconds in it's string representation due to JS limitations", () => {
		assert.equal(
			renderTemplate(hass, '{{ timedelta(4, 32, 11, 120, 32, 8, 2) }}'),
			'18 days, 8:32:32.120000',
		);
	});

	it('should return a new timestamp when added to a datetime due to JS limitations', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ strptime("2020-11-10T8:12:50", "%Y-%m-%dT%H:%M:%S") - timedelta({ days: 3, hours: 2, minutes: 1 })}}',
			),
			'1604747510',
		);
	});
});
