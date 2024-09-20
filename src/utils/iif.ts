import { HomeAssistant } from 'custom-card-helpers';

import { renderTemplate } from '..';

export function iif(
	hass: HomeAssistant,
	condition: string,
	if_true?: string | Record<string, string>,
	if_false?: string,
	if_none?: string,
) {
	if (typeof if_true == 'object' && !Array.isArray(if_true)) {
		if_none = if_true.if_none ?? if_none;
		if_false = if_true.if_false ?? if_false;
		if_true = if_true.if_true ?? undefined;
	}
	if (if_none) {
		const rendered = renderTemplate(hass, condition);
		if (
			[undefined, null, 'undefined', 'null', 'None'].includes(
				rendered as string,
			)
		) {
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
