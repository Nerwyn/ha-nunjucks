import { Template } from 'nunjucks';
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
// TODO add tests
const HASS_TESTS = {};
const TESTS = {};
