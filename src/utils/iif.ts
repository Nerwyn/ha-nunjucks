import { HomeAssistant } from 'custom-card-helpers';

import { renderTemplate } from '..';

export function iif(
	hass: HomeAssistant,
	condition: string,
	if_true?: string,
	if_false?: string,
	if_none?: string,
) {
	const template = `
		{% if ${condition} %}
		${if_true ?? true}
		{% else %}
		${if_false ?? false}
		{% endif %}
	`;

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
	return renderTemplate(hass, template);
}
