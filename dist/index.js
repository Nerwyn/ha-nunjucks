import nunjucks from 'nunjucks';
import packageInfo from '../package.json';
import { addFilters } from './filters';
import { addGlobals } from './globals';
import { handleWhenReady } from './helpers';
import { addTests } from './tests';
import { subscribeConfigEntries } from './utils/config_entry';
import { fetchEntityRegistry } from './utils/entities';
import { fetchRepairsIssues } from './utils/issues';
import { fetchLabelRegistry } from './utils/labels';
import { getNumberFormatter, getTimeFormatter } from './utils/state_translated';
import { buildStatesObject } from './utils/states';
import { version } from './utils/version';
window.haNunjucks ||= {};
if (version(packageInfo.version).compare(window.haNunjucks.version || '0.0.0') > 0) {
    window.haNunjucks = {
        renderTemplate,
        version: packageInfo.version,
        states: {},
        labelRegistry: {},
        entityRegistry: {},
        configEntries: {},
        repairsIssues: {},
    };
    // Setup on first import
    handleWhenReady(() => {
        const ha = document.querySelector('home-assistant');
        // Initialize window object
        window.haNunjucks = {
            ...window.haNunjucks,
            hass: ha.hass,
            labelRegistry: {
                updateEvent: 'label_registry_updated',
                fetchRegistry: fetchLabelRegistry,
                labelId: {},
                name2LabelId: {},
            },
            entityRegistry: {
                updateEvent: 'entity_registry_updated',
                fetchRegistry: fetchEntityRegistry,
                entityId2ConfigEntryId: {},
                configEntryId2EntityIds: {},
            },
            repairsIssues: {
                updateEvent: 'repairs_issue_registry_updated',
                fetchRegistry: fetchRepairsIssues,
                issues: {},
            },
            configEntries: {
                entryId: {},
                title2EntryId: {},
            },
        };
        const registries = [
            'labelRegistry',
            'entityRegistry',
            'repairsIssues',
        ];
        for (const registry of registries) {
            window.haNunjucks[registry].fetchRegistry(ha.hass);
            ha.hass.connection.subscribeEvents(() => {
                clearTimeout(window.haNunjucks[registry].timeout);
                window.haNunjucks[registry].timeout = setTimeout(() => {
                    window.haNunjucks[registry].fetchRegistry(ha.hass);
                }, 500);
            }, window.haNunjucks[registry].updateEvent);
        }
        subscribeConfigEntries(ha.hass);
        // Number and datetime translators
        window.haNunjucks.numberFormat = getNumberFormatter(ha.hass);
        window.haNunjucks.dateFormat = new Intl.DateTimeFormat(ha.hass.language, {
            dateStyle: 'long',
        });
        window.haNunjucks.timeFormat = getTimeFormatter(ha.hass);
        window.haNunjucks.ordinalFormat = new Intl.PluralRules('en-US', // ha.hass.language, // Use english for proper numeric suffixes
        { type: 'ordinal' });
        console.info(`%c HA-NUNJUCKS v${packageInfo.version}`, 'color: white; font-weight: bold; background: darkgreen');
    }, () => {
        const ha = document.querySelector('home-assistant');
        return ha?.hass?.connected && ha?.hass?.connection?.connected;
    }, 10000, 10, 'ha-nunjucks failed to initialize - Home Assistant connection timeout');
    // Initialize global ha-nunjucks environment
    nunjucks.installJinjaCompat();
    window.haNunjucks.env = addTests(addFilters(addGlobals(nunjucks.configure(`${window.location.origin}/local`))));
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
    window.haNunjucks.hass = hass;
    if (str.includes('_states')) {
        buildStatesObject();
    }
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
export function hasTemplate(str) {
    return hasTemplateRegex.test(str);
}
