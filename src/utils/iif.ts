import { HomeAssistant } from 'custom-card-helpers';

import { renderTemplate } from '..';

export function _iif(
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

	const rendered = renderTemplate(hass, template);
	if (rendered == '' && if_none) {
		return if_none;
	} else {
		return rendered;
	}
}
