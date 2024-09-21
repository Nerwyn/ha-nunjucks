import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('states', () => {
	it('should return state of an entity', () => {
		assert.equal(
			renderTemplate(hass, '{{ states("light.lounge") }}'),
			'on',
		);
		assert.equal(renderTemplate(hass, '{{ states("foobar") }}'), '');
	});

	describe('with rounded=True', () => {
		it('should round numerical state', () => {
			assert.equal(
				renderTemplate(hass, '{{ states("input_number.volume") }}'),
				'0.4',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ states("input_number.volume", True) }}',
				),
				'0.40',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ states("input_number.volume", rounded=True) }}',
				),
				'0.40',
			);
		});

		it('should return state as is if state is non-numerical', () => {
			assert.equal(
				renderTemplate(hass, '{{ states("light.lounge") }}'),
				'on',
			);
			assert.equal(
				renderTemplate(hass, '{{ states("light.lounge", True) }}'),
				'on',
			);
		});
	});

	describe('with with_unit=True', () => {
		it('should return state with unit_of_measurement attribute appended to the end', () => {
			const value1 = hass['states']['input_number.volume']['state'];
			assert.equal(
				renderTemplate(
					hass,
					'{{ states("input_number.volume", false, true) }}',
				),
				'0.4 %',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ states("input_number.volume", undefined, true) }}',
				),
				'0.40 %',
			);
			assert.equal(
				renderTemplate(
					hass,
					'{{ states("input_number.volume", with_unit=True) }}',
				),
				'0.40 %',
			);
		});
		it('should return state as is if unit_of_measurement is not available', () => {
			assert.equal(
				renderTemplate(
					hass,
					'{{ states("light.lounge", false, true) }}',
				),
				'on',
			);
		});
	});
});

describe('is_state', () => {
	it('should return a boolean', () => {
		assert.equal(
			renderTemplate(hass, '{{ is_state("light.lounge", "on") }}'),
			true,
		);
		assert.equal(
			renderTemplate(hass, '{{ is_state("foobar", "foobar") }}'),
			false,
		);
	});
	it('should also work with arrays', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_state("light.lounge", ["on", "foobar"]) }}',
			),
			true,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_state("light.lounge", ["off", "foobar"]) }}',
			),
			false,
		);
	});
});

describe('state_attr', () => {
	it('should return an attribute of an entity', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ state_attr("light.lounge", "color_mode") }}',
			),
			'color_temp',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ state_attr("light.lounge", "brightness") }}',
			),
			'155',
		);
		assert.equal(
			renderTemplate(hass, '{{ state_attr("foobar", "foobar") }}'),
			'',
		);
	});
});

describe('is_state_attr', () => {
	it('is_state_attr should return boolean', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_state_attr("light.lounge", "color_mode", "color_temp") }}',
			),
			true,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_state_attr("light.lounge", "brightness", 155) }}',
			),
			true,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_state_attr("foobar", "foobar", "foobar") }}',
			),
			false,
		);
	});
	it('should also work with arrays', () => {
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_state_attr("light.lounge", "brightness", [155, "bar"]) }}',
			),
			true,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ is_state_attr("light.lounge", "brightness", [154, "bar"]) }}',
			),
			false,
		);
	});
});

describe('has_value', () => {
	it('should return boolean', () => {
		assert.equal(
			renderTemplate(hass, '{{ has_value("light.lounge") }}'),
			true,
		);
		assert.equal(
			renderTemplate(hass, '{{ has_value("input_number.volume") }}'),
			true,
		);
		assert.equal(renderTemplate(hass, '{{ has_value("foobar") }}'), false);
	});
});

// describe('states object', () => {
// 	it('should allow you to access state objects using just dot notation', () => {
// 		assert.equal(
// 			renderTemplate(hass, '{{ _states.light.ceiling_bulb_1.state }}'),
// 			'off',
// 		);
// 	});
// });
