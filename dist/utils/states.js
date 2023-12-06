"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.has_value = exports.is_state_attr = exports.state_attr = exports.is_state = exports.states = void 0;
function states(hass, entity_id) {
    try {
        return hass.states[entity_id].state;
    }
    catch (_a) {
        return undefined;
    }
}
exports.states = states;
function is_state(hass, entity_id, value) {
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
exports.is_state = is_state;
function state_attr(hass, entity_id, attribute) {
    try {
        return hass.states[entity_id].attributes[attribute];
    }
    catch (_a) {
        return undefined;
    }
}
exports.state_attr = state_attr;
function is_state_attr(hass, entity_id, attribute, value) {
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
