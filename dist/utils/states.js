"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._has_value = exports._is_state_attr = exports._state_attr = exports._is_state = exports._states = void 0;
function _states(hass, entity_id) {
    return hass.states[entity_id].state;
}
exports._states = _states;
function _is_state(hass, entity_id, value) {
    const state = _states(hass, entity_id);
    if (typeof value == 'string') {
        return state == value;
    }
    return value.includes(state);
}
exports._is_state = _is_state;
function _state_attr(hass, entity_id, attribute) {
    return hass.states[entity_id].attributes[attribute];
}
exports._state_attr = _state_attr;
function _is_state_attr(hass, entity_id, attribute, value) {
    const stateAttr = _state_attr(hass, entity_id, attribute);
    if (typeof value == 'string') {
        return stateAttr == value;
    }
    return value.includes(stateAttr);
}
exports._is_state_attr = _is_state_attr;
function _has_value(hass, entity_id) {
    try {
        const state = _states(hass, entity_id);
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
exports._has_value = _has_value;
