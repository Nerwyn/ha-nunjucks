import nunjucks from 'nunjucks';
import { HomeAssistant } from './models/interfaces/hass';

import { addFilters } from './filters';
import { addGlobals } from './globals';
import { addTests } from './tests';
import { fetchLabelRegistry } from './utils/labels';
import { buildStatesObject } from './utils/states';

if (!window.haNunjucks) {
	window.haNunjucks = {} as typeof window.haNunjucks;
	nunjucks.installJinjaCompat();

	window.haNunjucks.env = addTests(
		addFilters(addGlobals(new nunjucks.Environment())),
	);

	window.haNunjucks.states = {};
	window.hassConnection?.then((hassConnection) => {
		const entities = hassConnection?.conn?._entityRegistryDisplay?.state
			?.entities as Record<string, string>[];
		for (const entity of entities) {
			const [domain, _id] = entity.ei.split('.');
			window.haNunjucks.states![domain] ??= {};
		}
	});
}

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
	if (!window.haNunjucks?.labelRegistry) {
		fetchLabelRegistry(hass);
	}
	window.haNunjucks.hass = hass;

	if (
		typeof str == 'string' &&
		((str.includes('{{') && str.includes('}}')) ||
			(str.includes('{%') && str.includes('%}')))
	) {
		str = window.haNunjucks.env
			.renderString(structuredClone(str), {
				hass,
				_states: buildStatesObject(),
				...context,
			})
			.trim();

		if ([undefined, null, 'undefined', 'null', 'None'].includes(str)) {
			return '';
		}

		const lowerStr = str.toLowerCase();
		if (['true', 'false'].includes(lowerStr)) {
			return lowerStr == 'true';
		}

		return str;
	}

	return str;
}
