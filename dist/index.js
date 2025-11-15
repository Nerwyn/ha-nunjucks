import nunjucks from 'nunjucks';
import packageInfo from '../package.json';
import { addFilters } from './filters';
import { addGlobals } from './globals';
import { addTests } from './tests';
import { fetchLabelRegistry } from './utils/labels';
import { buildStatesObject } from './utils/states';
export const version = packageInfo.version;
window.haNunjucks ||= {};
if (!window.haNunjucks[version]) {
    window.haNunjucks[version] = {
        states: {},
        labelRegistry: {},
    };
    // Setup on first import
    handleWhenReady(() => {
        const ha = document.querySelector('home-assistant');
        // Label registry and states object
        window.haNunjucks[version].hass = ha.hass;
        fetchLabelRegistry();
        buildStatesObject();
        // Number and datetime translators
        window.haNunjucks[version].numberFormat = new Intl.NumberFormat(ha.hass.language);
        window.haNunjucks[version].dateFormat = new Intl.DateTimeFormat(ha.hass.language, { dateStyle: 'full' });
        window.haNunjucks[version].timeFormat = new Intl.DateTimeFormat(ha.hass.language, { timeStyle: 'long' });
        window.haNunjucks[version].datetimeFormat = new Intl.DateTimeFormat(ha.hass.language, { dateStyle: 'full', timeStyle: 'long' });
        window.haNunjucks[version].ordinalFormat = new Intl.PluralRules('en-US', // ha.hass.language, // Use english for proper numeric suffixes
        { type: 'ordinal' });
    }, () => {
        const ha = document.querySelector('home-assistant');
        return ha?.hass?.connected && ha?.hass?.connection?.connected;
    }, 10000, 1, 'ha-nunjucks failed to initialize - Home Assistant connection timeout');
    // Initialize global ha-nunjucks environment
    nunjucks.installJinjaCompat();
    window.haNunjucks[version].env = addTests(addFilters(addGlobals(nunjucks.configure(`${window.location.origin}/local`))));
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
/**
 * Call a handler function when a ready function returns true.
 * If the ready function returns false, this method recursively recalls itself on a timeout.
 * The function continues to recall itself with an exponentially increasing timeout until
 * the ready function returns true or the timeout is exceeded.
 * @param {() => void | Promise<void>} handler The function to call when ready
 * @param {() => boolean | Promise<boolean>} handleReady The function to check and return true when ready
 * @param {number} timeout The max time to wait in milliseconds, defaults to 20000
 * @param {number} delay The initial delay in milliseconds, defaults to 10
 */
async function handleWhenReady(handler, handleReady, timeout = 20000, delay = 10, errorMessage = `handleWhenReady ${timeout}ms timeout exceeded`) {
    if (delay > timeout) {
        console.error(errorMessage);
        return;
    }
    if (!(await handleReady())) {
        setTimeout(async () => await handleWhenReady(handler, handleReady, timeout, delay * 2), delay);
        return;
    }
    await handler();
}
