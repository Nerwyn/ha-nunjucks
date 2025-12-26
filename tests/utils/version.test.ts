import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('version', () => {
	it('should return a SemanticVersion object', () => {
		assert.equal(renderTemplate(hass, '{{ version("1.2.3") }}'), '1.2.3');
	});

	it('should support SemanticVersion fields', () => {
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").prefix }}'), '');
		assert.equal(
			renderTemplate(hass, '{{ ("v1.2.3" | version).prefix }}'),
			'v',
		);
		assert.equal(renderTemplate(hass, '{{ version("V.1.2.3").prefix }}'), 'V.');

		assert.equal(renderTemplate(hass, '{{ version("1.2.3").major }}'), '1');
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").minor }}'), '2');
		assert.equal(renderTemplate(hass, '{{ ("1.2.3" | version).patch }}'), '3');
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").modifier }}'), '');
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3").modifier_type }}'),
			'',
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-alpha").modifier }}'),
			'alpha',
		);
		assert.equal(
			renderTemplate(hass, '{{ ("1.2.3-alpha" | version).modifier_type }}'),
			'alpha',
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-alpha.123").modifier }}'),
			'alpha.123',
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-alpha.123").modifier_type }}'),
			'alpha',
		);
	});

	it('should support SemanticVersion getters', () => {
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").alpha }}'), '');
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").beta }}'), '');
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").dev }}'), '');
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3").release_candidate }}'),
			'',
		);

		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-alpha").alpha }}'),
			true,
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-beta.001").beta }}'),
			true,
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-dev.22").dev }}'),
			true,
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-rc.123").release_candidate }}'),
			true,
		);
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").simple }}'), true);

		assert.equal(renderTemplate(hass, '{{ version("1.2.3-foo").alpha }}'), '');
		assert.equal(renderTemplate(hass, '{{ version("1.2.3-foo").rc }}'), '');
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").simple }}'), true);
	});

	it('should support SemanticVersion compare', () => {
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3").compare("0.0.0") }}'),
			1,
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3").compare("1.3.0") }}'),
			-1,
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3").compare("1.2.3-rc.123") }}'),
			1,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ version("1.2.3-beta.345").compare("1.2.3-rc.123") }}',
			),
			-1,
		);
	});

	it('should support SemanticVersion in_range', () => {
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3").in_range("1.2.2", "1.7.0") }}'),
			true,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ version("1.2.3").in_range("1.2.3-beta.001", "1.2.4") }}',
			),
			true,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ version("1.2.3").in_range("1.2.2", "1.2.3-alpha") }}',
			),
			'',
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ version("1.2.3-rc.111").in_range("1.2.3", "1.7.0") }}',
			),
			'',
		);
	});

	it('should support SemanticVersion diff', () => {
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3").diff("1.2.3") }}'),
			'SemanticVersionDiff(major=false, minor=false, patch=false, modifier=false)',
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3").diff("4.5.6") }}'),
			'SemanticVersionDiff(major=true, minor=true, patch=true, modifier=false)',
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3").diff("1.2.3-rc") }}'),
			'SemanticVersionDiff(major=false, minor=false, patch=false, modifier=true)',
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-beta.123").diff("1.2.3-rc") }}'),
			'SemanticVersionDiff(major=false, minor=false, patch=false, modifier=true)',
		);
	});

	it('should support SemanticVersion section', () => {
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").section(0) }}'), 1);
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").section(1) }}'), 2);
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").section(2) }}'), 3);
		assert.equal(renderTemplate(hass, '{{ version("1.2.3").section(3) }}'), 0);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-beta").section(3) }}'),
			'beta',
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-beta").section(4) }}'),
			0,
		);
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3-beta.456").section(4) }}'),
			'456',
		);
	});

	it('should support SemanticVersion direct comparisons', () => {
		assert.equal(
			renderTemplate(hass, '{{ version("1.2.3") > version("1.2.2") }}'),
			true,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ version("1.2.3") > version("1.2.3-beta.001") }}',
			),
			true,
		);
		assert.equal(
			renderTemplate(
				hass,
				'{{ version("1.2.3-rc.123") > version("1.2.3-beta.456") }}',
			),
			true,
		);
	});
});
