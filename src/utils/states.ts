import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant } from '../models/hass';

export function states(
	hass: HomeAssistant,
	entity_id: string,
	rounded?: boolean | Record<string, boolean>,
	with_unit?: boolean,
) {
	if (typeof rounded == 'object' && !Array.isArray(rounded)) {
		with_unit = rounded.with_unit ?? with_unit;
		rounded = rounded.rounded ?? undefined;
	}
	try {
		const stateObj = hass.states[entity_id];
		let state: string | number | boolean = stateObj?.state;
		if (with_unit && rounded == undefined) {
			rounded = true;
		}
		if (rounded && !isNaN(stateObj?.state as unknown as number)) {
			const precision = hass.entities[entity_id]?.display_precision ?? 0;
			state = Number(state).toPrecision(precision);
		}
		if (with_unit && stateObj?.attributes?.unit_of_measurement) {
			state = `${state} ${stateObj?.attributes?.unit_of_measurement}`;
		}
		return state;
	} catch {
		return undefined;
	}
}

export function is_state(
	hass: HomeAssistant,
	entity_id: string,
	value: string | string[],
) {
	try {
		const state = states(hass, entity_id);
		if (Array.isArray(value)) {
			return value.includes(state as string);
		}
		return state == value;
	} catch {
		return false;
	}
}

export function state_attr(
	hass: HomeAssistant,
	entity_id: string,
	attribute: string,
) {
	try {
		return hass.states[entity_id].attributes[attribute];
	} catch {
		return undefined;
	}
}

export function is_state_attr(
	hass: HomeAssistant,
	entity_id: string,
	attribute: string,
	value: string | string[],
) {
	try {
		const stateAttr = state_attr(hass, entity_id, attribute);
		if (
			typeof value == 'string' &&
			value.startsWith('[') &&
			value.endsWith(']')
		) {
			value = JSON.parse(value);
		}
		if (Array.isArray(value)) {
			return value.includes(stateAttr);
		}
		return stateAttr == value;
	} catch {
		return false;
	}
}

export function has_value(hass: HomeAssistant, entity_id: string) {
	try {
		const state = states(hass, entity_id);
		if ([false, 0, -0, ''].includes(state as string)) {
			return true;
		} else {
			return Boolean(state);
		}
	} catch {
		return false;
	}
}

export function buildStatesObject(hass: HomeAssistant) {
	const states: Record<string, Record<string, HassEntity>> = {};
	for (const entityId in hass.states) {
		const [domain, entity] = entityId.split('.');
		states[domain] = states[domain] ?? {};
		states[domain][entity] = hass.states[entityId];
	}
	return states;
}
