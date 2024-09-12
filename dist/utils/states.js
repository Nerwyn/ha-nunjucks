"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.states = states;
exports.is_state = is_state;
exports.state_attr = state_attr;
exports.is_state_attr = is_state_attr;
exports.has_value = has_value;
exports.state_translated = state_translated;
exports.attr_name_translated = attr_name_translated;
exports.attr_value_translated = attr_value_translated;
function states(hass, entity_id, rounded, with_unit) {
    try {
        const stateObj = hass.states[entity_id];
        let state = stateObj?.state;
        // https://www.home-assistant.io/docs/configuration/templating/#formatting-sensor-states
        if (with_unit && rounded == undefined) {
            rounded = true;
        }
        if (rounded && !isNaN(stateObj?.state)) {
            const precision = parseInt(hass['entities'][entity_id]?.display_precision ?? 0);
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
function is_state(hass, entity_id, value) {
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
function state_attr(hass, entity_id, attribute) {
    try {
        return hass.states[entity_id].attributes[attribute];
    }
    catch {
        return undefined;
    }
}
function is_state_attr(hass, entity_id, attribute, value) {
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
    catch {
        return false;
    }
}
function state_translated(hass, entity_id, state) {
    try {
        return hass['formatEntityState'](hass.states[entity_id], state);
    }
    catch {
        return state ?? hass.states[entity_id]?.state ?? undefined;
    }
}
function attr_name_translated(hass, entity_id, attr_name, attr_value) {
    try {
        return hass['formatEntityAttributeName'](hass.states[entity_id], attr_name, attr_value);
    }
    catch {
        return (attr_name ??
            hass.states[entity_id]?.attributes?.[attr_name] ??
            undefined);
    }
}
function attr_value_translated(hass, entity_id, attr_name, attr_value) {
    try {
        return hass['formatEntityAttributeValue'](hass.states[entity_id], attr_name, attr_value);
    }
    catch {
        return (attr_value ??
            hass.states[entity_id]?.attributes?.[attr_name] ??
            undefined);
    }
}
