import nunjucks from 'nunjucks';
import packageInfo from '../package.json';
import { HassElement, HomeAssistant } from './models/interfaces/hass';

import { addFilters } from './filters';
import { addGlobals } from './globals';
import { compareVersions, handleWhenReady } from './helpers';
import { IHaNunjucks } from './models/types';
import { addTests } from './tests';
import { fetchLabelRegistry } from './utils/labels';
import { buildStatesObject } from './utils/states';

const version = packageInfo.version;

window.haNunjucks ||= {} as IHaNunjucks;
if (compareVersions(version, window.haNunjucks.version || '0.0.0') > 0) {
	window.haNunjucks = {
		version,
		states: {},
		labelRegistry: {},
	} as IHaNunjucks;

	// Setup on first import
	handleWhenReady(
		() => {
			const ha = document.querySelector('home-assistant') as HassElement;

			// Label registry and states object
			window.haNunjucks.hass = ha.hass;
			fetchLabelRegistry();
			buildStatesObject();

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
			window.haNunjucks.ordinalFormat = new Intl.PluralRules(
				'en-US', // ha.hass.language, // Use english for proper numeric suffixes
				{ type: 'ordinal' },
			);
		},
		() => {
			const ha = document.querySelector('home-assistant') as HassElement;
			return ha?.hass?.connected && ha?.hass?.connection?.connected;
		},
		10000,
		1,
		'ha-nunjucks failed to initialize - Home Assistant connection timeout',
	);

	// Initialize global ha-nunjucks environment
	nunjucks.installJinjaCompat();
	window.haNunjucks.env = addTests(
		addFilters(
			addGlobals(nunjucks.configure(`${window.location.origin}/local`)),
		),
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
