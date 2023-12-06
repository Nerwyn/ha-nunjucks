import { HomeAssistant } from 'custom-card-helpers';

export function states(hass: HomeAssistant, entity_id: string) {
	return hass.states[entity_id].state;
}

export function is_state(
	hass: HomeAssistant,
	entity_id: string,
	value: string | string[],
) {
	const state = states(hass, entity_id);
	if (typeof value == 'string') {
		return state == value;
	}
	return value.includes(state);
}

export function state_attr(
	hass: HomeAssistant,
	entity_id: string,
	attribute: string,
) {
	return hass.states[entity_id].attributes[attribute];
}

export function is_state_attr(
	hass: HomeAssistant,
	entity_id: string,
	attribute: string,
	value: string | string[],
) {
	const stateAttr = state_attr(hass, entity_id, attribute);
	if (typeof value == 'string') {
		return stateAttr == value;
	}
	return value.includes(stateAttr);
}

export function has_value(hass: HomeAssistant, entity_id: string) {
	try {
		const state = states(hass, entity_id);
		if ([false, 0, -0, ''].includes(state)) {
			return true;
		} else {
			return Boolean(state);
		}
	} catch {
		return false;
	}
}
