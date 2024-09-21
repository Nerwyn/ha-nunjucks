import { Template } from 'nunjucks';
import { match, search } from './utils/regexp';
import { datetime, list, set, string_like } from './utils/type_checking';
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
    // Complex Type Checking
    list,
    set,
    datetime,
    string_like,
    // Regular Expressions
    match,
    search,
};
const TESTS = {};
