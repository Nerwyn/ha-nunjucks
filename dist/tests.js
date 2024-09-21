import { Template } from 'nunjucks';
import { contains } from './utils/contains';
import { is_device_attr } from './utils/devices';
import { is_hidden_entity } from './utils/entities';
import { match, search } from './utils/regexp';
import { has_value, is_state, is_state_attr } from './utils/states';
export function addTests(env) {
    for (const t in TESTS) {
        env.addTest(t, function (...args) {
            return TESTS[t](...args);
        });
    }
    for (const t in HASS_TESTS) {
        env.addTest(t, function (...args) {
            const hass = JSON.parse(new Template('{{ hass | dump | safe }}').render(
            // @ts-ignore
            this.getVariables()));
            return HASS_TESTS[t](hass, ...args);
        });
    }
    return env;
}
const HASS_TESTS = {
    // States
    is_state,
    is_state_attr,
    has_value,
    // Entities
    is_hidden_entity,
    // Devices
    is_device_attr,
    // Contains
    contains,
    // Regular Expressions
    match,
    search,
};
const TESTS = {};
