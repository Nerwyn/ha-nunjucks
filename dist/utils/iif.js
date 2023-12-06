"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iif = void 0;
const __1 = require("..");
function iif(hass, condition, if_true, if_false, if_none) {
    if (if_none) {
        const rendered = (0, __1.renderTemplate)(hass, condition);
        if ([undefined, null, 'undefined', 'null', 'None'].includes(rendered)) {
            return if_none;
        }
    }
    const template = `
		{% if ${condition} %}
		${if_true !== null && if_true !== void 0 ? if_true : true}
		{% else %}
		${if_false !== null && if_false !== void 0 ? if_false : false}
		{% endif %}
	`;
    return (0, __1.renderTemplate)(hass, template);
}
exports.iif = iif;
