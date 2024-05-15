import { HomeAssistant } from 'custom-card-helpers';
import { renderString } from 'nunjucks';

import { CONTEXT } from './context';

/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @param {object} [context] Additional context to expose to nunjucks
 * @returns {string | boolean} The rendered template string if a string was provided, otherwise the unaltered input
 */
export function renderTemplate(
	hass: HomeAssistant,
	str: string,
	context?: object,
): string | boolean {
	if (
		typeof str == 'string' &&
		((str.includes('{{') && str.includes('}}')) ||
			(str.includes('{%') && str.includes('%}')))
	) {
		str = renderString(structuredClone(str), {
			...CONTEXT(hass),
			...context,
		}).trim();

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
