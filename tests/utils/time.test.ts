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

describe('time_since', () => {
	it('should return the correct units for each precision', () => {
		const p0 = renderTemplate(
			hass,
			'{{ time_since(as_datetime(1608336000), 0) }}',
		) as string;
		assert.match(p0, /year/g);
		assert.match(p0, /month/g);
		assert.match(p0, /day/g);
		assert.match(p0, /hour/g);
		assert.match(p0, /minute/g);
		assert.match(p0, /second/g);

		const p1 = renderTemplate(
			hass,
			'{{ time_since(as_datetime(1608336000), 1) }}',
		) as string;
		assert.match(p1, /year/g);
		assert.doesNotMatch(p1, /month/g);
		assert.doesNotMatch(p1, /day/g);
		assert.doesNotMatch(p1, /hour/g);
		assert.doesNotMatch(p1, /minute/g);
		assert.doesNotMatch(p1, /second/g);

		const p2 = renderTemplate(
			hass,
			'{{ time_since(as_datetime(1608336000), 2) }}',
		) as string;
		assert.match(p2, /year/g);
		assert.match(p2, /month/g);
		assert.doesNotMatch(p2, /day/g);
		assert.doesNotMatch(p2, /hour/g);
		assert.doesNotMatch(p2, /minute/g);
		assert.doesNotMatch(p2, /second/g);

		const p3 = renderTemplate(
			hass,
			'{{ time_since(as_datetime(1608336000), 3) }}',
		) as string;
		assert.match(p3, /year/g);
		assert.match(p3, /month/g);
		assert.match(p3, /day/g);
		assert.doesNotMatch(p3, /hour/g);
		assert.doesNotMatch(p3, /minute/g);
		assert.doesNotMatch(p3, /second/g);

		const p4 = renderTemplate(
			hass,
			'{{ time_since(as_datetime(1608336000), 4) }}',
		) as string;
		assert.match(p4, /year/g);
		assert.match(p4, /month/g);
		assert.match(p4, /day/g);
		assert.match(p4, /hour/g);
		assert.doesNotMatch(p4, /minute/g);
		assert.doesNotMatch(p4, /second/g);

		const p5 = renderTemplate(
			hass,
			'{{ time_since(as_datetime(1608336000), 5) }}',
		) as string;
		assert.match(p5, /year/g);
		assert.match(p5, /month/g);
		assert.match(p5, /day/g);
		assert.match(p5, /hour/g);
		assert.match(p5, /minute/g);
		assert.doesNotMatch(p5, /second/g);

		const p6 = renderTemplate(
			hass,
			'{{ time_since(as_datetime(1608336000), 6) }}',
		) as string;
		assert.match(p6, /year/g);
		assert.match(p6, /month/g);
		assert.match(p6, /day/g);
		assert.match(p6, /hour/g);
		assert.match(p6, /minute/g);
		assert.match(p6, /second/g);
	});

	it('should return the input datetime if the given datetime is in the future', () => {
		// Will need to update in the year 4707
		assert.equal(
			renderTemplate(hass, '{{ time_since(as_datetime(86400000000)) }}'),
			renderTemplate(hass, '{{ as_datetime(86400000000) }}'),
		);
	});

	it('should return nothing if the input is not a datetime', () => {
		assert.equal(renderTemplate(hass, '{{ time_since("foobar") }}'), '');
	});
});

describe('time_until', () => {
	it('should return the correct units for each precision', () => {
		const p0 = renderTemplate(
			hass,
			'{{ time_until(as_datetime(86400000000), 0) }}',
		) as string;
		assert.match(p0, /year/g);
		assert.match(p0, /month/g);
		assert.match(p0, /day/g);
		assert.match(p0, /hour/g);
		assert.match(p0, /minute/g);
		assert.match(p0, /second/g);

		const p1 = renderTemplate(
			hass,
			'{{ time_until(as_datetime(86400000000), 1) }}',
		) as string;
		assert.match(p1, /year/g);
		assert.doesNotMatch(p1, /month/g);
		assert.doesNotMatch(p1, /day/g);
		assert.doesNotMatch(p1, /hour/g);
		assert.doesNotMatch(p1, /minute/g);
		assert.doesNotMatch(p1, /second/g);

		const p2 = renderTemplate(
			hass,
			'{{ time_until(as_datetime(86400000000), 2) }}',
		) as string;
		assert.match(p2, /year/g);
		assert.match(p2, /month/g);
		assert.doesNotMatch(p2, /day/g);
		assert.doesNotMatch(p2, /hour/g);
		assert.doesNotMatch(p2, /minute/g);
		assert.doesNotMatch(p2, /second/g);

		const p3 = renderTemplate(
			hass,
			'{{ time_until(as_datetime(86400000000), 3) }}',
		) as string;
		assert.match(p3, /year/g);
		assert.match(p3, /month/g);
		assert.match(p3, /day/g);
		assert.doesNotMatch(p3, /hour/g);
		assert.doesNotMatch(p3, /minute/g);
		assert.doesNotMatch(p3, /second/g);

		const p4 = renderTemplate(
			hass,
			'{{ time_until(as_datetime(86400000000), 4) }}',
		) as string;
		assert.match(p4, /year/g);
		assert.match(p4, /month/g);
		assert.match(p4, /day/g);
		assert.match(p4, /hour/g);
		assert.doesNotMatch(p4, /minute/g);
		assert.doesNotMatch(p4, /second/g);

		const p5 = renderTemplate(
			hass,
			'{{ time_until(as_datetime(86400000000), 5) }}',
		) as string;
		assert.match(p5, /year/g);
		assert.match(p5, /month/g);
		assert.match(p5, /day/g);
		assert.match(p5, /hour/g);
		assert.match(p5, /minute/g);
		assert.doesNotMatch(p5, /second/g);

		const p6 = renderTemplate(
			hass,
			'{{ time_until(as_datetime(86400000000), 6) }}',
		) as string;
		assert.match(p6, /year/g);
		assert.match(p6, /month/g);
		assert.match(p6, /day/g);
		assert.match(p6, /hour/g);
		assert.match(p6, /minute/g);
		assert.match(p6, /second/g);
	});

	it('should return the input datetime if the given datetime is in the past', () => {
		assert.equal(
			renderTemplate(hass, '{{ time_until(as_datetime(1608336000)) }}'),
			renderTemplate(hass, '{{ as_datetime(1608336000) }}'),
		);
	});

	it('should return nothing if the input is not a datetime', () => {
		assert.equal(renderTemplate(hass, '{{ time_until("foobar") }}'), '');
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

describe('as_timedelta', () => {
	describe('should support the timedelta string format - ', () => {
		it('DD HH:MM:SS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 8:20:40") }}'),
				'2 days, 8:20:40',
			);
		});

		it('D days HH:MM:SS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 days 8:20:40") }}'),
				'2 days, 8:20:40',
			);
		});

		it('DD MM:SS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 20:40") }}'),
				'2 days, 0:20:40',
			);
		});

		it('D days MM:SS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 days 20:40") }}'),
				'2 days, 0:20:40',
			);
		});

		it('DD SS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 40") }}'),
				'2 days, 0:00:40',
			);
		});

		it('D days SS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 days 40") }}'),
				'2 days, 0:00:40',
			);
		});

		it('DD HH:MM:SS.fff', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 8:20:40.123") }}'),
				'2 days, 8:20:40.123000',
			);
		});

		it('D days HH:MM:SS.fff', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_timedelta("2 days 8:20:40.123") }}',
				),
				'2 days, 8:20:40.123000',
			);
		});

		it('DD MM:SS.fff', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 20:40.123") }}'),
				'2 days, 0:20:40.123000',
			);
		});

		it('D days MM:SS.fff', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 days 20:40.123") }}'),
				'2 days, 0:20:40.123000',
			);
		});

		it('DD SS.fff', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 40.123") }}'),
				'2 days, 0:00:40.123000',
			);
		});

		it('D days SS.fff', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("2 days 40.123") }}'),
				'2 days, 0:00:40.123000',
			);
		});

		it('HH:MM:SS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("8:20:40") }}'),
				'8:20:40',
			);
		});

		it('MM:SS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("20:40") }}'),
				'0:20:40',
			);
		});

		it('SS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("40") }}'),
				'0:00:40',
			);
		});

		it('HH:MM:SS.fff', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("8:20:40.123000") }}'),
				'8:20:40.123000',
			);
		});

		it('MM:SS.fff', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("20:40.123000") }}'),
				'0:20:40.123000',
			);
		});

		it('SS.fff', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("40.123000") }}'),
				'0:00:40.123000',
			);
		});

		it('PnWnDTnHnMnS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("P2W4DT12H30M5S") }}'),
				'18 days, 12:30:05',
			);
		});

		it('PnDTnHnMnS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("P4DT12H30M5S") }}'),
				'4 days, 12:30:05',
			);
		});

		it('PTnHnMnS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("P12H30M5S") }}'),
				'12:30:05',
			);
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("P26H30M5S") }}'),
				'1 day, 2:30:05',
			);
		});

		it('PnS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("P5S") }}'),
				'0:00:05',
			);
		});
	});
});
