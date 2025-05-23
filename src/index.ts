import nunjucks from 'nunjucks';
import { HassElement, HomeAssistant } from './models/interfaces/hass';

import { addFilters } from './filters';
import { addGlobals } from './globals';
import { addTests } from './tests';
import { fetchLabelRegistry } from './utils/labels';
import { buildStatesObject } from './utils/states';

if (!window.haNunjucks) {
	window.haNunjucks = {
		states: {},
		labelRegistry: {},
	} as typeof window.haNunjucks;

	// Async setup label registry and states object on import
	const registrySetup = async () => {
		const ha = document.querySelector('home-assistant') as HassElement;
		if (
			!ha ||
			!ha.hass ||
			!ha.hass.connected ||
			!ha.hass.connection ||
			!ha.hass.connection.connected
		) {
			setTimeout(registrySetup, 10);
			return;
		}

		// Number and datetime translators
		window.haNunjucks.numberFormat = new Intl.NumberFormat(
			ha.hass.language,
		);
		window.haNunjucks.dateFormat = new Intl.DateTimeFormat(
			ha.hass.language,
			{ dateStyle: 'full' },
		);
		window.haNunjucks.timeFormat = new Intl.DateTimeFormat(
			ha.hass.language,
			{ timeStyle: 'long' },
		);
		window.haNunjucks.datetimeFormat = new Intl.DateTimeFormat(
			ha.hass.language,
			{ dateStyle: 'full', timeStyle: 'long' },
		);

		// Label registry and states object
		window.haNunjucks.hass = ha.hass;
		fetchLabelRegistry();
		buildStatesObject();
	};
	registrySetup();

	// Initialize global ha-nunjucks environment
	nunjucks.installJinjaCompat();
	window.haNunjucks.env = addTests(
		addFilters(addGlobals(new nunjucks.Environment())),
	);
}

/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @param {object} [context] Additional context to expose to nunjucks
 * @param {boolean} [validate=true] Validate that the input contains a template.
 * @returns {string | boolean} The rendered template string if a string was provided, otherwise the unaltered input
 */
export function renderTemplate(
	hass: HomeAssistant,
	str: string,
	context?: object,
	validate: boolean = true,
): string | boolean {
	if (validate && !hasTemplate(str)) {
		return str;
	}

	window.haNunjucks.hass = hass;
	buildStatesObject();
	str = window.haNunjucks.env
		.renderString(structuredClone(str), {
			hass,
			_states: window.haNunjucks.states,
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

const hasTemplateRegex = /{{.*?}}|{%.*?%}/;

/**
 * Test if the input contains a valid template
 * @param {any} str the variable to check
 * @returns if the input is a string that contains a template
 */
export function hasTemplate(str: any) {
	return hasTemplateRegex.test(str);
}
