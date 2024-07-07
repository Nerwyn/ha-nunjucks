export function states(hass, entity_id) {
    try {
        return hass.states[entity_id].state;
    }
    catch (_a) {
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
    catch (_a) {
        return false;
    }
}
export function state_attr(hass, entity_id, attribute) {
    try {
        return hass.states[entity_id].attributes[attribute];
    }
    catch (_a) {
        return undefined;
    }
}
export function is_state_attr(hass, entity_id, attribute, value) {
    try {
        const stateAttr = state_attr(hass, entity_id, attribute);
        if (Array.isArray(value)) {
            return value.includes(stateAttr);
        }
        return stateAttr == value;
    }
    catch (_a) {
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
    catch (_a) {
        return false;
    }
}
