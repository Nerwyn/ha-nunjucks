"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.has_value = exports.is_state_attr = exports.state_attr = exports.is_state = exports.states = void 0;
function states(hass, entity_id) {
    return hass.states[entity_id].state;
}
exports.states = states;
function is_state(hass, entity_id, value) {
    const state = states(hass, entity_id);
    if (typeof value == 'string') {
        return state == value;
    }
    return value.includes(state);
}
exports.is_state = is_state;
function state_attr(hass, entity_id, attribute) {
    return hass.states[entity_id].attributes[attribute];
}
exports.state_attr = state_attr;
function is_state_attr(hass, entity_id, attribute, value) {
    const stateAttr = state_attr(hass, entity_id, attribute);
    if (typeof value == 'string') {
        return stateAttr == value;
    }
    return value.includes(stateAttr);
}
exports.is_state_attr = is_state_attr;
function has_value(hass, entity_id) {
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
exports.has_value = has_value;
