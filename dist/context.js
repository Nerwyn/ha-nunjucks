"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTEXT = void 0;
const states_1 = require("./utils/states");
const iif_1 = require("./utils/iif");
const css_1 = require("./utils/css");
const CONTEXT = (hass) => ({
    True: true,
    False: false,
    None: null,
    hass: hass,
    states(entity_id) {
        return (0, states_1.states)(hass, entity_id);
    },
    is_state(entity_id, value) {
        return (0, states_1.is_state)(hass, entity_id, value);
    },
    state_attr(entity_id, attribute) {
        return (0, states_1.state_attr)(hass, entity_id, attribute);
    },
    is_state_attr(entity_id, attribute, value) {
        return (0, states_1.is_state_attr)(hass, entity_id, attribute, value);
    },
    has_value(entity_id) {
        return (0, states_1.has_value)(hass, entity_id);
    },
    iif(condition, if_true, if_false, if_none) {
        return (0, iif_1.iif)(hass, condition, if_true, if_false, if_none);
    },
    match_media(mediaquery) {
        return (0, css_1.match_media)(mediaquery);
    },
});
exports.CONTEXT = CONTEXT;
