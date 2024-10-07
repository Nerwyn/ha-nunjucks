import { entityRegistry } from './entities';
export function states(hass, entity_id, rounded, with_unit) {
    if (typeof rounded == 'object' && !Array.isArray(rounded)) {
        with_unit = rounded.with_unit ?? with_unit;
        rounded = rounded.rounded ?? undefined;
    }
    try {
        const stateObj = hass.states[entity_id];
        let state = stateObj?.state;
        if (with_unit && rounded == undefined) {
            rounded = true;
        }
        if (rounded && !isNaN(stateObj?.state)) {
            const precision = entityRegistry(hass)[entity_id]?.display_precision ?? 0;
            state = Number(state).toPrecision(precision);
        }
        if (with_unit && stateObj?.attributes?.unit_of_measurement) {
            state = `${state} ${stateObj?.attributes?.unit_of_measurement}`;
        }
        return state;
    }
    catch {
        return undefined;
    }
}
export function is_state(hass, entity_id, value) {
    try {
        const state = states(hass, entity_id);
        if (Array.isArray(value)) {
            return value.includes(state);
        }
        return state == value;
    }
    catch {
        return false;
    }
}
export function state_attr(hass, entity_id, attribute) {
    try {
        return hass.states[entity_id].attributes[attribute];
    }
    catch {
        return undefined;
    }
}
export function is_state_attr(hass, entity_id, attribute, value) {
    try {
        const stateAttr = state_attr(hass, entity_id, attribute);
        if (typeof value == 'string' &&
            value.startsWith('[') &&
            value.endsWith(']')) {
            value = JSON.parse(value);
        }
        if (Array.isArray(value)) {
            return value.includes(stateAttr);
        }
        return stateAttr == value;
    }
    catch {
        return false;
    }
}
export function has_value(hass, entity_id) {
    try {
        const state = states(hass, entity_id);
        if ([false, 0, -0, ''].includes(state)) {
            return true;
        }
        else {
            return Boolean(state);
        }
    }
    catch {
        return false;
    }
}
export function buildStatesObject(hass) {
    const states = {};
    for (const entityId in hass.states) {
        const [domain, entity] = entityId.split('.');
        states[domain] = states[domain] ?? {};
        states[domain][entity] = hass.states[entityId];
    }
    return states;
}
