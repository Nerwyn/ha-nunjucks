import { HomeAssistant } from '../models/interfaces/hass';

export function buildStatesObject() {
	for (const entityId in window.haNunjucks.hass.states) {
		const [domain, id] = entityId.split('.');
		window.haNunjucks.states[domain] ??= {};
		window.haNunjucks.states[domain][id] =
			window.haNunjucks.hass.states[entityId];
	}
}

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
			state = Number(state).toFixed(precision);
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
	value: string,
) {
	try {
		return state_attr(hass, entity_id, attribute) == value;
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
