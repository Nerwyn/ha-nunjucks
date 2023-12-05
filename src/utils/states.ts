import { HomeAssistant } from 'custom-card-helpers';

/**
 * @internal
 * @param hass
 * @param entity_id
 * @returns
 */
export function _states(hass: HomeAssistant, entity_id: string) {
	return hass.states[entity_id].state;
}

/**
 * @internal
 * @param hass
 * @param entity_id
 * @param value
 * @returns
 */
export function _is_state(
	hass: HomeAssistant,
	entity_id: string,
	value: string | string[],
) {
	const state = _states(hass, entity_id);
	if (typeof value == 'string') {
		return state == value;
	}
	return value.includes(state);
}

/**
 * @internal
 * @param hass
 * @param entity_id
 * @param attribute
 * @returns
 */
export function _state_attr(
	hass: HomeAssistant,
	entity_id: string,
	attribute: string,
) {
	return hass.states[entity_id].attributes[attribute];
}

/**
 * @internal
 * @param hass
 * @param entity_id
 * @param attribute
 * @param value
 * @returns
 */
export function _is_state_attr(
	hass: HomeAssistant,
	entity_id: string,
	attribute: string,
	value: string | string[],
) {
	const stateAttr = _state_attr(hass, entity_id, attribute);
	if (typeof value == 'string') {
		return stateAttr == value;
	}
	return value.includes(stateAttr);
}

/**
 * @internal
 * @param hass
 * @param entity_id
 * @returns
 */
export function _has_value(hass: HomeAssistant, entity_id: string) {
	try {
		const state = _states(hass, entity_id);
		if ([false, 0, -0, ''].includes(state)) {
			return true;
		} else {
			return Boolean(state);
		}
	} catch {
		return false;
	}
}
