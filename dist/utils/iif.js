import { renderTemplate } from '..';
export function iif(hass, condition, if_true, if_false, if_none) {
    if (typeof if_true == 'object' && !Array.isArray(if_true)) {
        if_none = if_true.if_none ?? if_none;
        if_false = if_true.if_false ?? if_false;
        if_true = if_true.if_true ?? undefined;
    }
    if (if_none) {
        const rendered = renderTemplate(hass, condition);
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
    return renderTemplate(hass, template);
}
