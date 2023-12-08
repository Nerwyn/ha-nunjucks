import { hass } from '../hass';
import { renderTemplate } from '../../src';
import { iif } from '../../src/utils/iif';

test('Function iif should return true or false if only condition is given.', () => {
	let condition = '"foo" == "foo"';
	expect(iif(hass, condition)).toBe(true);
	expect(renderTemplate(hass, `{{ iif(${condition}) }}`)).toBe(true);

	condition = '"foo" == "bar"';
	expect(iif(hass, condition)).toBe(false);
	expect(renderTemplate(hass, `{{ iif(${condition}) }}`)).toBe(false);
});

test('Function iif should return if_true if condition is true or false otherwise.', () => {
	let condition = '"foo" == "foo"';
	const isTrue = 'is foo';
	expect(iif(hass, condition, isTrue)).toBe(isTrue);
	expect(renderTemplate(hass, `{{ iif(${condition}, "${isTrue}") }}`)).toBe(
		isTrue,
	);

	condition = '"foo" == "bar"';
	expect(iif(hass, condition, isTrue)).toBe(false);
	expect(renderTemplate(hass, `{{ iif(${condition}, "${isTrue}") }}`)).toBe(
		false,
	);
});

test('Function iif should return if_true if condition is true or if_false otherwise.', () => {
	let condition = '"foo" == "foo"';
	const isTrue = 'is foo';
	const isFalse = 'is not foo';
	expect(iif(hass, condition, isTrue, isFalse)).toBe(isTrue);
	expect(
		renderTemplate(
			hass,
			`{{ iif(${condition}, "${isTrue}", "${isFalse}") }}`,
		),
	).toBe(isTrue);

	condition = '"foo" == "bar"';
	expect(iif(hass, condition, isTrue, isFalse)).toBe(isFalse);
	expect(
		renderTemplate(
			hass,
			`{{ iif(${condition}, "${isTrue}", "${isFalse}") }}`,
		),
	).toBe(isFalse);
});

test('Function iif should return is_none if comparison.', () => {
	const condition = 'None';
	const isTrue = 'is true';
	const isFalse = 'is false';
	const isNone = 'is none';
	expect(iif(hass, condition, isTrue, isFalse, isNone)).toBe(isNone);
	expect(
		renderTemplate(
			hass,
			`{{ iif(${condition}, "${isTrue}", "${isFalse}", "${isNone}") }}`,
		),
	);
});
