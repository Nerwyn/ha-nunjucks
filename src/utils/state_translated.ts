import { date, datetime, time } from 'ts-py-datetime';
import {
	DateFormat,
	HomeAssistant,
	NumberFormat,
} from '../models/interfaces/hass';

export function getNumberFormatter(hass: HomeAssistant) {
	// https://github.com/home-assistant/frontend/blob/52ac052baf139e94b7ed6891eb0beace7e2f47d3/src/common/number/format_number.ts#L24
	let language: string | string[];
	switch (hass.locale.number_format) {
		case NumberFormat.comma_decimal:
			language = ['en-US', 'en']; // Use United States with fallback to English formatting 1,234,567.89
			break;
		case NumberFormat.decimal_comma:
			language = ['de', 'es', 'it']; // Use German with fallback to Spanish then Italian formatting 1.234.567,89
			break;
		case NumberFormat.space_comma:
			language = ['fr', 'sv', 'cs']; // Use French with fallback to Swedish and Czech formatting 1 234 567,89
			break;
		case NumberFormat.quote_decimal:
			language = ['de-CH']; // Use German (Switzerland) formatting 1'234'567.89
			break;
		default:
			language = hass.locale.language ?? hass.language;
			break;
	}
	return new Intl.NumberFormat(language);
}

export function state_translated(
	hass: HomeAssistant,
	entity_id: string,
	state?: string,
) {
	try {
		return hass.formatEntityState(hass.states[entity_id], state);
	} catch {
		return state ?? hass.states[entity_id]?.state ?? undefined;
	}
}

export function attr_name_translated(
	hass: HomeAssistant,
	entity_id: string,
	attr_name: string,
) {
	try {
		return hass.formatEntityAttributeName(hass.states[entity_id], attr_name);
	} catch {
		return (
			attr_name ?? hass.states[entity_id]?.attributes?.[attr_name] ?? undefined
		);
	}
}

export function attr_value_translated(
	hass: HomeAssistant,
	entity_id: string,
	attr_name: string,
	attr_value?: string,
) {
	try {
		return hass.formatEntityAttributeValue(
			hass.states[entity_id],
			attr_name,
			attr_value,
		);
	} catch {
		return (
			attr_value ?? hass.states[entity_id]?.attributes?.[attr_name] ?? undefined
		);
	}
}

export function number_translated(value: number, precision?: number) {
	value = Number(value);
	if (isNaN(value)) {
		return value;
	}
	if (precision) {
		return value.toLocaleString(window.haNunjucks.hass.language, {
			minimumFractionDigits: precision,
			maximumFractionDigits: precision,
		});
	}
	return window.haNunjucks.numberFormat.format(value);
}

export function date_translated(hass: HomeAssistant, value: date | datetime) {
	// https://github.com/home-assistant/frontend/blob/52ac052baf139e94b7ed6891eb0beace7e2f47d3/src/common/datetime/format_date.ts#L59
	try {
		let order: string[];
		switch (hass.locale.date_format) {
			case DateFormat.DMY:
				order = ['day', 'month', 'year'];
				break;
			case DateFormat.MDY:
				order = ['month', 'day', 'year'];
				break;
			case DateFormat.YMD:
				order = ['year', 'month', 'day'];
				break;
			default:
				return window.haNunjucks.dateFormat.format(value.jsDate);
		}

		const parts = window.haNunjucks.dateFormat.formatToParts(value.jsDate);

		const partsObj: Record<string, string | undefined> = {
			literal: parts.find((value) => value.type === 'literal')?.value,
			day: parts.find((value) => value.type === 'day')?.value,
			month: parts.find((value) => value.type === 'month')?.value,
			year: parts.find((value) => value.type === 'year')?.value,
		};

		const lastPart = parts[parts.length - 1];
		partsObj.lastLiteral = lastPart?.type === 'literal' ? lastPart?.value : '';
		if (
			hass.locale.language === 'bg' &&
			hass.locale.date_format === DateFormat.YMD
		) {
			partsObj.lastLiteral = '';
		}

		return `${partsObj[order[0]]}${partsObj.literal}${partsObj[order[1]]}${partsObj.literal}${partsObj[order[2]]}${partsObj.lastLiteral}`;
	} catch {
		return value;
	}
}

export function time_translated(value: time | datetime) {
	try {
		return window.haNunjucks.timeFormat.format(value.jsDate);
	} catch {
		return value;
	}
}

export function datetime_translated(value: datetime) {
	try {
		return window.haNunjucks.datetimeFormat.format(value.jsDate);
	} catch {
		return value;
	}
}
