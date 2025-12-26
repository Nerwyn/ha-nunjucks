import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('map', () => {
	it('should perform a function on each item in a list and return the resulting list', () => {
		assert.equal(
			renderTemplate(hass, '{{ [1, 2, 3] | map("multiply", 2) }}'),
			'2,4,6',
		);
	});
});

describe('apply', () => {
	it('should allow you to pass a function to a list', () => {
		assert.equal(
			renderTemplate(hass, '{{ [1, 2, 3] | map("apply", "multiply", 2) }}'),
			'2,4,6',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ [1, 2, "foo", 3] | select("apply", "is_number") }}',
			),
			'1,2,3',
		);
	});
});

describe('as_function', () => {
	it('should allow you to call a macro as a function', () => {
		assert.equal(
			renderTemplate(
				hass,
				`{%- macro foo(args, returns=returns) -%}
					{%- set return_value = args | map("multiply", 2) -%}
					{%- set _ = returns(return_value) -%}
				{%- endmacro -%}
				{{ (foo | as_function)([1,2,3]) }}
			`,
			),
			'2,4,6',
		);
	});
});
