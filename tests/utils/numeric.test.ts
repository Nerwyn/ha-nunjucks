import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('float', () => {
	it('should return a value cast to a float', () => {
		assert.equal(renderTemplate(hass, '{{ float("1.23") }}'), '1.23');
		assert.equal(renderTemplate(hass, '{{ float(1.23) }}'), '1.23');
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ float("foo", "bar") }}'), 'bar');
	});
});

describe('is_number', () => {
	it('should return correctly determine if a value is a number', () => {
		assert.equal(renderTemplate(hass, '{{ is_number("1.23") }}'), true);
		assert.equal(renderTemplate(hass, '{{ is_number(1.23) }}'), true);
		assert.equal(renderTemplate(hass, '{{ is_number(e) }}'), true);
		assert.equal(renderTemplate(hass, '{{ is_number(pi) }}'), true);
		assert.equal(renderTemplate(hass, '{{ is_number(tau) }}'), true);

		assert.equal(renderTemplate(hass, '{{ is_number(NaN) }}'), false);
		assert.equal(renderTemplate(hass, '{{ is_number("foobar") }}'), false);
		assert.equal(renderTemplate(hass, '{{ is_number(inf) }}'), false);
	});
});

describe('int', () => {
	it('should return a value cast to a int', () => {
		assert.equal(renderTemplate(hass, '{{ int("1.23") }}'), '1');
		assert.equal(renderTemplate(hass, '{{ int(1.23) }}'), '1');
		assert.equal(renderTemplate(hass, '{{ int("1") }}'), '1');
		assert.equal(renderTemplate(hass, '{{ int(1) }}'), '1');
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ int("foo", "bar") }}'), 'bar');
	});
});

describe('bool', () => {
	it('should return a human readable truthy or falsey string to a boolean', () => {
		assert.equal(renderTemplate(hass, '{{ bool("true") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("True") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("TRUE") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("yes") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("YES") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("Yes") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("on") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("On") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("ON") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("enable") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("Enable") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("ENABLE") }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool("1") }}'), true);

		assert.equal(renderTemplate(hass, '{{ bool("false") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("False") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("FALSE") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("no") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("NO") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("No") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("off") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("Off") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("Off") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("disable") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("Disable") }}'), false);
		assert.equal(renderTemplate(hass, '{{ bool("0") }}'), false);
	});

	it('should determine the truthiness of a number', () => {
		assert.equal(renderTemplate(hass, '{{ bool(1) }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool(12) }}'), true);
		assert.equal(renderTemplate(hass, '{{ bool(-2) }}'), true);

		assert.equal(renderTemplate(hass, '{{ bool(0) }}'), false);
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ bool("foo", "bar") }}'), 'bar');
	});
});

describe('log', () => {
	it('should return the natural log if given one argument', () => {
		assert.equal(renderTemplate(hass, '{{ log(12) }}'), 2.4849066497880004);
	});

	it('should return the log of argument 1 with base argument 2', () => {
		assert.equal(
			renderTemplate(hass, '{{ log(12, 2) }}'),
			3.5849625007211565,
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(
			renderTemplate(hass, '{{ log("foo", "baz", "bar") }}'),
			'bar',
		);
	});
});

describe('sin', () => {
	it('should return the sin of a given value', () => {
		assert.equal(renderTemplate(hass, '{{ sin(2) }}'), 0.9092974268256817);
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ sin("foo", "bar") }}'), 'bar');
	});
});

describe('cos', () => {
	it('should return the cos of a given value', () => {
		assert.equal(renderTemplate(hass, '{{ cos(2) }}'), -0.4161468365471424);
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ cos("foo", "bar") }}'), 'bar');
	});
});

describe('tan', () => {
	it('should return the tan of a given value', () => {
		assert.equal(renderTemplate(hass, '{{ tan(2) }}'), -2.185039863261519);
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ tan("foo", "bar") }}'), 'bar');
	});
});

describe('asin', () => {
	it('should return the asin of a given value', () => {
		assert.equal(
			renderTemplate(hass, '{{ asin(0.2) }}'),
			0.2013579207903308,
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ asin("foo", "bar") }}'), 'bar');
	});
});

describe('acos', () => {
	it('should return the acos of a given value', () => {
		assert.equal(
			renderTemplate(hass, '{{ acos(0.2) }}'),
			1.369438406004566,
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ acos("foo", "bar") }}'), 'bar');
	});
});

describe('atan', () => {
	it('should return the atan of a given value', () => {
		assert.equal(
			renderTemplate(hass, '{{ atan(0.2) }}'),
			0.19739555984988078,
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ atan("foo", "bar") }}'), 'bar');
	});
});

describe('atan2', () => {
	it('should return the atan of a given value', () => {
		assert.equal(
			renderTemplate(hass, '{{ atan2(0.2, 0.3) }}'),
			0.5880026035475676,
		);
	});

	it('should return a fallback value on error', () => {
		assert.equal(
			renderTemplate(hass, '{{ atan2("foo", "baz", "bar") }}'),
			'bar',
		);
	});
});

describe('sqrt', () => {
	it('should return the sqrt of a given value', () => {
		assert.equal(renderTemplate(hass, '{{ sqrt(4) }}'), 2);
	});

	it('should return a fallback value on error', () => {
		assert.equal(renderTemplate(hass, '{{ sqrt("foo", "bar") }}'), 'bar');
	});
});

describe('max', () => {
	it('should return the max value of a number of given values', () => {
		assert.equal(renderTemplate(hass, '{{ max(2, 4, 6, 9, -11, 7) }}'), 9);
		assert.equal(
			renderTemplate(hass, '{{ max([2, 4, 6], [9, [-11, 7]]) }}'),
			9,
		);
	});
});

describe('min', () => {
	it('should return the max value of a number of given values', () => {
		assert.equal(
			renderTemplate(hass, '{{ min(2, 4, 6, 9, -11, 7) }}'),
			-11,
		);
		assert.equal(
			renderTemplate(hass, '{{ min([2, 4, 6], [9, [-11, 7]]) }}'),
			-11,
		);
	});
});

describe('average', () => {
	it('should return the average of a given array', () => {
		assert.equal(
			renderTemplate(hass, '{{ average([2, 4, 6, 9, -11, 8]) }}'),
			3,
		);

		it('should return a fallback value on error', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ average([2, 4, 6, "foo", -11, 7], "bar") }}',
				),
				'bar',
			);
		});
	});
});

describe('median', () => {
	it('should return the median of a given array', () => {
		assert.equal(
			renderTemplate(hass, '{{ median([2, 4, 6, 9, -11, 8]) }}'),
			5,
		);
		assert.equal(
			renderTemplate(hass, '{{ median([2, 4, 6, 9, -11, 8, 8]) }}'),
			6,
		);

		it('should return a fallback value on error', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ median([2, 4, 6, "foo", -11, 7], "bar") }}',
				),
				'bar',
			);
		});
	});
});

describe('statistical_mode', () => {
	it('should return the first mode of a given array', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ statistical_mode([2, 4, 6, 2, 9, -11, 8]) }}',
			),
			2,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ statistical_mode([2, 4, 6, 2, 9, -11, 8, 8]) }}',
			),
			2,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ statistical_mode([2, 4, 6, 9, -11, 8, 8, 2]) }}',
			),
			2,
		);

		it('should return a fallback value on error', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ statistical_mode([2, 4, 6, "foo", -11, 7], "bar") }}',
				),
				'bar',
			);
		});
	});
});

describe('e', () => {
	it("should be equal to Euler's number", () => {
		assert.equal(renderTemplate(hass, '{{ e }}'), Math.E);
	});
});

describe('pi', () => {
	it('should be equal to pi', () => {
		assert.equal(renderTemplate(hass, '{{ pi }}'), Math.PI);
	});
});
describe('tau', () => {
	it('should be equal to tau', () => {
		assert.equal(renderTemplate(hass, '{{ tau }}'), 2 * Math.PI);
	});
});
describe('inf', () => {
	it('should be equal to infinity', () => {
		assert.equal(renderTemplate(hass, '{{ inf }}'), Infinity);
	});
});
