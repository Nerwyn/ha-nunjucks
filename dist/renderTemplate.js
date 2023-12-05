"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
const nunjucks_1 = require("nunjucks");
const states_1 = require("./utils/states");
const iif_1 = require("./utils/iif");
const css_1 = require("./utils/css");
/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @returns {string} The rendered template string if a string was provided, otherwise the unaltered input
 */
function renderTemplate(hass, str) {
    if (typeof str == 'string' &&
        ((str.includes('{{') && str.includes('}}')) ||
            (str.includes('{%') && str.includes('%}')))) {
        const context = {
            True: true,
            False: false,
            None: null,
            states(entity_id) {
                return (0, states_1._states)(hass, entity_id);
            },
            is_state(entity_id, value) {
                return (0, states_1._is_state)(hass, entity_id, value);
            },
            state_attr(entity_id, attribute) {
                return (0, states_1._state_attr)(hass, entity_id, attribute);
            },
            is_state_attr(entity_id, attribute, value) {
                return (0, states_1._is_state_attr)(hass, entity_id, attribute, value);
            },
            has_value(entity_id) {
                return (0, states_1._has_value)(hass, entity_id);
            },
            iif(condition, if_true, if_false, if_none) {
                return (0, iif_1._iif)(hass, condition, if_true, if_false, if_none);
            },
            match_media(mediaquery) {
                return (0, css_1._match_media)(mediaquery);
            },
        };
        str = (0, nunjucks_1.renderString)(structuredClone(str), context).trim();
        if (str == undefined || str == null) {
            str = '';
        }
    }
    return str;
}
exports.renderTemplate = renderTemplate;
