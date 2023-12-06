import { HomeAssistant } from 'custom-card-helpers';

export function states(hass: HomeAssistant, entity_id: string) {
	try {
		return hass.states[entity_id].state;
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
