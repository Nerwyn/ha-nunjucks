import nunjucks from 'nunjucks';
import { version } from '../package.json';
import { addFilters } from './filters';
import { addGlobals } from './globals';
import { addTests } from './tests';
import { fetchLabelRegistry } from './utils/labels';
import { buildStatesObject } from './utils/states';
if (!window.haNunjucks) {
    window.haNunjucks ||= {};
    window.haNunjucks[version] = {
        states: {},
        labelRegistry: {},
    };
    // Async setup label registry and states object on import
    const registrySetup = async () => {
        const ha = document.querySelector('home-assistant');
        if (!ha ||
            !ha.hass ||
            !ha.hass.connected ||
            !ha.hass.connection ||
            !ha.hass.connection.connected) {
            setTimeout(registrySetup, 10);
            return;
        }
        // Number and datetime translators
        window.haNunjucks[version].numberFormat = new Intl.NumberFormat(ha.hass.language);
        window.haNunjucks[version].dateFormat = new Intl.DateTimeFormat(ha.hass.language, { dateStyle: 'full' });
        window.haNunjucks[version].timeFormat = new Intl.DateTimeFormat(ha.hass.language, { timeStyle: 'long' });
        window.haNunjucks[version].datetimeFormat = new Intl.DateTimeFormat(ha.hass.language, { dateStyle: 'full', timeStyle: 'long' });
        window.haNunjucks[version].ordinalFormat = new Intl.PluralRules('en-US', // ha.hass.language, // Use english for proper numeric suffixes
        { type: 'ordinal' });
        // Label registry and states object
        window.haNunjucks[version].hass = ha.hass;
        fetchLabelRegistry();
        buildStatesObject();
    };
    registrySetup();
    // Initialize global ha-nunjucks environment
    nunjucks.installJinjaCompat();
    window.haNunjucks[version].env = addTests(addFilters(addGlobals(nunjucks.configure({}))));
}
/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @param {object} [context] Additional context to expose to nunjucks
 * @param {boolean} [validate=true] Validate that the input contains a template.
 * @returns {string | boolean} The rendered template string if a string was provided, otherwise the unaltered input
 */
export function renderTemplate(hass, str, context, validate = true) {
    if (validate && !hasTemplate(str)) {
        return str;
    }
    window.haNunjucks[version].hass = hass;
    buildStatesObject();
    str = window.haNunjucks[version].env
        .renderString(structuredClone(str), {
        hass,
        _states: window.haNunjucks[version].states,
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
export function hasTemplate(str) {
    return hasTemplateRegex.test(str);
}
