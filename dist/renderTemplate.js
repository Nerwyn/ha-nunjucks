"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
const nunjucks_1 = require("nunjucks");
const context_1 = require("./context");
/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @param {object} [context] Additional context to expose to nunjucks
 * @returns {string} The rendered template string if a string was provided, otherwise the unaltered input
 */
function renderTemplate(hass, str, context) {
    if (typeof str == 'string' &&
        ((str.includes('{{') && str.includes('}}')) ||
            (str.includes('{%') && str.includes('%}')))) {
        str = (0, nunjucks_1.renderString)(structuredClone(str), Object.assign(Object.assign({}, (0, context_1.CONTEXT)(hass)), context)).trim();
        if ([undefined, null, 'undefined', 'null', 'None'].includes(str)) {
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
