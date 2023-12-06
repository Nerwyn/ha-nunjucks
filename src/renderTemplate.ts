import { HomeAssistant } from 'custom-card-helpers';
import { renderString } from 'nunjucks';

import { CONTEXT } from './context';

/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @returns {string} The rendered template string if a string was provided, otherwise the unaltered input
 */
export function renderTemplate(hass: HomeAssistant, str: string): string {
	if (
		typeof str == 'string' &&
		((str.includes('{{') && str.includes('}}')) ||
			(str.includes('{%') && str.includes('%}')))
	) {
		str = renderString(structuredClone(str), CONTEXT(hass)).trim();

		if (str == undefined || str == null) {
			str = '';
		}
	}

	return str;
}
