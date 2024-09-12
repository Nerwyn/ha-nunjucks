"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = renderTemplate;
const nunjucks_1 = __importDefault(require("nunjucks"));
const context_1 = require("./context");
nunjucks_1.default.installJinjaCompat();
/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @param {object} [context] Additional context to expose to nunjucks
 * @returns {string | boolean} The rendered template string if a string was provided, otherwise the unaltered input
 */
function renderTemplate(hass, str, context) {
    if (typeof str == 'string' &&
        ((str.includes('{{') && str.includes('}}')) ||
            (str.includes('{%') && str.includes('%}')))) {
        str = nunjucks_1.default
            .renderString(structuredClone(str), {
            ...(0, context_1.CONTEXT)(hass),
            ...context,
        })
            .trim();
        if ([undefined, null, 'undefined', 'null', 'None'].includes(str)) {
            return '';
        }
        if (str.toLowerCase() == 'true') {
            return true;
        }
        if (str.toLowerCase() == 'false') {
            return false;
        }
    }
    return str;
}
