"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iif = iif;
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
		${if_true ?? true}
		{% else %}
		${if_false ?? false}
		{% endif %}
	`;
    return (0, __1.renderTemplate)(hass, template);
}
