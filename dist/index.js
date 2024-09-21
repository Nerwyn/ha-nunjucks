import nunjucks from 'nunjucks';
import { CONTEXT } from './context';
import { FILTERS, HASS_FILTERS } from './filters';
import { HASS_TESTS, TESTS } from './tests';
nunjucks.installJinjaCompat();
const env = new nunjucks.Environment();
const getHass = () => JSON.parse(new nunjucks.Template('{{ to_json(hass) }}')
    .render(
// @ts-ignore
this.getVariables())
    .replace(/&quot;/g, '"'));
for (const f in FILTERS) {
    env.addFilter(f, function (...args) {
        return FILTERS[f](...args);
    });
}
for (const f in HASS_FILTERS) {
    env.addFilter(f, function (...args) {
        return HASS_FILTERS[f](getHass(), ...args);
    });
}
for (const t in TESTS) {
    env.addTest(t, function (...args) {
        return TESTS[t](...args);
    });
}
for (const t in HASS_TESTS) {
    env.addTest(t, function (...args) {
        return HASS_TESTS[t](getHass(), ...args);
    });
}
/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @param {object} [context] Additional context to expose to nunjucks
 * @returns {string | boolean} The rendered template string if a string was provided, otherwise the unaltered input
 */
export function renderTemplate(hass, str, context) {
    if (typeof str == 'string' &&
        ((str.includes('{{') && str.includes('}}')) ||
            (str.includes('{%') && str.includes('%}')))) {
        str = env
            .renderString(structuredClone(str), {
            ...CONTEXT(hass),
            ...context,
        })
            .trim();
        if ([undefined, null, 'undefined', 'null', 'None'].includes(str)) {
            return '';
        }
        if (str.toLowerCase() == 'true') {
            return true;
        }
        if (str.toLowerCase() == 'false') {
            return false;
        }
        return str.replace(/&quot;/g, '"');
    }
    return str;
}
