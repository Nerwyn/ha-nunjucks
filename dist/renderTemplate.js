"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
const nunjucks_1 = require("nunjucks");
const context_1 = require("./context");
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
        str = (0, nunjucks_1.renderString)(structuredClone(str), (0, context_1.CONTEXT)(hass)).trim();
        if (str == undefined || str == null) {
            return '';
        }
        if (/^-?(\d+|\d+\.\d+)$/.test(str)) {
            return Number(str);
        }
        if (str == 'true') {
            return true;
        }
        if (str == 'false') {
            return false;
        }
    }
    return str;
}
exports.renderTemplate = renderTemplate;
