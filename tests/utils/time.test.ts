import assert from 'assert';
import dt from 'ts-py-datetime';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('now and utcnow', () => {
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
			`${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} 12:34:00`,
		);
	});

	it("should return a datetime with today's date at midnight if no input is provided", () => {
		const now = new Date();
		assert.equal(
			renderTemplate(hass, '{{ today_at() }}'),
			`${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} 00:00:00`,
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
			assert.notEqual(
				renderTemplate(
					hass,
					'{{ as_datetime(199999990, utc=false).hour }}',
				),
				'19',
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

		it('should parse a datetime string in format YYYY-MM-DD HH:MM:SS', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_datetime("2020-04-06 14:32:12") }}',
				),
				'2020-04-06 14:32:12',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_timestamp(as_datetime("2020-04-06 14:32:12", "", false))}}',
				),
				'1586197932',
			);
		});

		it('should parse a datetime string in format YYYY-MM-DD HH:MM:SS+0400', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_datetime("2020-04-06 14:32:12+0400") }}',
				),
				'2020-04-06 10:32:12',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_timestamp(as_datetime("2020-04-06 14:32:12+0400", "", false))}}',
				),
				'1586169132',
			);
		});

		it('should parse a datetime string in format YYYY-MM-DD HH:MM:SS.ffffff', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_datetime("2020-04-06 14:32:12.123000") }}',
				),
				'2020-04-06 14:32:12.123000',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_timestamp(as_datetime("2020-04-06 14:32:12.123000", "", false))}}',
				),
				'1586197932.123',
			);
		});

		it('should parse a datetime string in format YYYY-MM-DD HH:MM:SS.ffffff+0400', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_datetime("2020-04-06 14:32:12.123000+0400") }}',
				),
				'2020-04-06 10:32:12.123000',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ as_timestamp(as_datetime("2020-04-06 14:32:12.123000+0400", "", false))}}',
				),
				'1586169132.123',
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

describe('as_local', () => {
	it('should convert a datetime object to local time', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ as_local(as_datetime("2020-11-10 8:12:50+0200")) }}',
			),
			'2020-11-10 01:12:50',
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

describe('relative_time', () => {
	it('should only return the biggest unit', () => {
		const res = renderTemplate(
			hass,
			'{{ relative_time(as_datetime(1608336000)) }}',
		) as string;
		assert.match(res, /year/g);
		assert.doesNotMatch(res, /month/g);
		assert.doesNotMatch(res, /day/g);
		assert.doesNotMatch(res, /hour/g);
		assert.doesNotMatch(res, /minute/g);
		assert.doesNotMatch(res, /second/g);
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

	it('should return the input if it is not a datetime', () => {
		assert.equal(
			renderTemplate(hass, '{{ time_since("foobar") }}'),
			'foobar',
		);
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

	it('should return the input if it is not a datetime', () => {
		assert.equal(
			renderTemplate(hass, '{{ time_until("foobar") }}'),
			'foobar',
		);
	});
});

describe('dt.timedelta', () => {
	it('should return a timedelta object with string representation', () => {
		assert.equal(
			renderTemplate(hass, '{{ dt.timedelta(4, 32, 0, 32, 8, 2) }}'),
			'18 days, 8:32:32',
		);
	});

	it('should return a new timestamp when added to a datetime due to JS limitations', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ strptime("2020-11-10T8:12:50", "%Y-%m-%dT%H:%M:%S") - dt.timedelta(days=3, hours=2, minutes=1) }}',
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
				renderTemplate(hass, '{{ as_timedelta("PT12H30M5S") }}'),
				'12:30:05',
			);
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("PT26H30M5S") }}'),
				'1 day, 2:30:05',
			);
		});

		it('PnS', () => {
			assert.equal(
				renderTemplate(hass, '{{ as_timedelta("PT5S") }}'),
				'0:00:05',
			);
		});
	});
});

describe('timestamp_local', () => {
	it('should convert a UNIX timestamp to the ISO format string representation in your local timezone', () => {
		assert.equal(
			renderTemplate(hass, '{{ 199999990 | timestamp_local }}'),
			'1976-05-03T15:33:10-0400',
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(
			renderTemplate(hass, '{{ "bar" | timestamp_local("foo") }}'),
			'foo',
		);
	});
});

describe('timestamp_utc', () => {
	it('should convert a UNIX timestamp to the ISO format string representation in your local timezone', () => {
		assert.equal(
			renderTemplate(hass, '{{ 199999990 | timestamp_utc }}'),
			'1976-05-03T19:33:10+0000',
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(
			renderTemplate(hass, '{{ "bar" | timestamp_utc("foo") }}'),
			'foo',
		);
	});
});

describe('timestamp_custom', () => {
	it('should convert a UNIX timestamp to its string representation based on a custom format in your local timezone as default', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ 199999990 | timestamp_custom("%Y%m%d %H%M%S") }}',
			),
			'19760503 153310',
		);
	});
	it('should convert a UNIX timestamp to its string representation based on a custom format in UTC if local is false', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ 199999990 | timestamp_custom("%Y%m%d %H%M%S", false) }}',
			),
			'19760503 193310',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ 199999990 | timestamp_custom("%Y%m%d %H%M%S", local=false) }}',
			),
			'19760503 193310',
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ "bar" | timestamp_custom("%Y%m%d %H%M%S", true, "foo") }}',
			),
			'foo',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ "bar" | timestamp_custom("%Y%m%d %H%M%S", fallback="foo") }}',
			),
			'foo',
		);
	});
});

describe('dt', () => {
	it('should return its constants when called upon', () => {
		assert.equal(renderTemplate(hass, '{{ dt.MINYEAR }}'), '100');
		assert.equal(renderTemplate(hass, '{{ dt.MAXYEAR }}'), '9999');
	});

	it('should allow for use of its construction functions', () => {
		assert.equal(
			renderTemplate(hass, '{{ dt.datetime(2020, 6, 12) }} '),
			'2020-06-12 00:00:00',
		);
		assert.equal(
			renderTemplate(hass, '{{ dt.datetime(2020, 6, 12, 11, 34, 22) }} '),
			'2020-06-12 11:34:22',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ dt.datetime(2020, 6, 12, 11, 34, 22, 987) }} ',
			),
			'2020-06-12 11:34:22.987000',
		);
		assert.equal(
			renderTemplate(hass, '{{ dt.date(2020, 6, 12) }} '),
			'2020-06-12',
		);
		assert.equal(
			renderTemplate(hass, '{{ dt.time(11, 34, 22) }} '),
			'11:34:22',
		);
		assert.equal(
			renderTemplate(hass, '{{ dt.time(11, 34, 22, 987) }} '),
			'11:34:22.987000',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ dt.timedelta(hours=11, minutes=34, milliseconds=987) }} ',
			),
			'11:34:00.987000',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ dt.datetime(year=2020, month=5, day=2, hour=14, second=45) }}',
			),
			'2020-05-02 14:00:45',
		);
	});

	it('should allow for use of instance methods', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ dt.datetime(2019, 11, 10, 9, 8, 7, 123).ctime() }}',
			),
			'Sun Nov 10 09:08:07 2019',
		);
	});
});

describe('datetime classes', () => {
	it('should allow access to their static constants and methods', () => {
		assert.equal(
			renderTemplate(hass, '{{ datetime.min }}'),
			dt.datetime.min.toString(),
		);
		assert.equal(
			renderTemplate(hass, '{{ date.fromordinal(999999) }}'),
			'2738-11-26',
		);
		assert.equal(
			renderTemplate(hass, '{{ time.fromisoformat("11:10:09") }}'),
			'11:10:09',
		);
		assert.equal(
			renderTemplate(hass, '{{ timedelta.max.total_seconds() }}'),
			'8640000000000',
		);
	});
});
